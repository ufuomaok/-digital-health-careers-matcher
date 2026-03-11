import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Digital Health Career Matcher",
  description: "Find your ideal digital health role based on your skills and background.",
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