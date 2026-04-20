import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Good Health Portal",
  description: "An all-in-one local health dashboard powered by AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
