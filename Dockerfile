# Base image: Install the necessary dependencies
FROM node:20-alpine AS base

# Install libc6-compat for compatibility
RUN apk add --no-cache libc6-compat

# Ensure Corepack is enabled properly
RUN corepack enable && corepack prepare pnpm@latest --activate

# Install dependencies in a separate stage (only when needed)
FROM base AS deps
WORKDIR /app

# Copy package.json and lock files for dependency installation
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Build stage: Compile the source code (Only rebuild when the source code changes)
FROM base AS builder
WORKDIR /app

# Copy node_modules from the deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy the application source code
COPY . .

# Define build-time arguments (e.g., API keys, environment URLs, etc.)
ARG API_BASE_URL

# Set environment variables for the build stage
ENV API_BASE_URL=$API_BASE_URL

# Run the build step
RUN pnpm run build 

# Production stage: Set up the production image with minimal size
FROM node:20-alpine AS runner
WORKDIR /app

# Set runtime environment variables (these will be available when the app is running)
ENV NODE_ENV=production
ENV API_BASE_URL=$API_BASE_URL

# Create and use a non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy public and build artifacts from the builder stage
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Change to the non-root user
USER nextjs

# Expose the app's port
EXPOSE 3000

# Set environment variables (runtime)
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Start the Next.js server
CMD ["node", "server.js"]