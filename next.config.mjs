/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  // async redirects() {
  //   return [
  //     {
  //       source: "/joinourteam",
  //       destination: "https://airtable.com/appYIG35eAHZmzkqz/shrWZZEal9dtF1YqN",
  //       permanent: true,
  //     },
  //   ];
  // },
};

export default nextConfig;
