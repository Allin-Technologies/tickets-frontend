import type { Metadata } from "next";
import localFont from "next/font/local";
import { cn } from "@/lib/utils";
import "./globals.css";
import { Footer } from "@/components/navigation/footer";
import { Toaster } from "@/components/ui/sonner";

const plusJakartaSans = localFont({
  src: [
    {
      path: "./fonts/PlusJakartaSans[wght].ttf",
      weight: "200 800",
      style: "normal",
    },
    // italics
    {
      path: "./fonts/PlusJakartaSans-Italic[wght].ttf",
      weight: "200 800",
      style: "italic",
    },
  ],
  variable: "--font-plus-jakarta-sans",
});

export const metadata: Metadata = {
  title: "Tickets by All-in",
  description: "Ticket  experience made easy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={cn(
          "font-plus-jakarta-sans antialiased",
          plusJakartaSans.variable
        )}
      >
        {children}
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
