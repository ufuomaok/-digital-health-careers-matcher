import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Digital Health Career Matcher",
  description: "Find your ideal digital health role in the based on your skills and background.",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}