import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Digital Health Career Matcher",
  description: "Find your ideal digital health role based on your skills and background.",
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
      <head>
        <style>{`
          *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
          html { scroll-behavior: smooth; }
          body { color: #111720; font-family: system-ui, sans-serif; -webkit-font-smoothing: antialiased; }
        `}</style>
      </head>
      <body>{children}</body>
    </html>
  );
}