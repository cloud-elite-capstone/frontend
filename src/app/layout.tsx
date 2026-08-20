import type { Metadata } from "next";
import { Josefin_Sans } from "next/font/google";
import "./globals.css";

const josefinSans = Josefin_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-josefin-sans",
});

export const metadata: Metadata = {
  title: "Cartesian - AI Shopping Assistant",
  description: "Autonomous agentic AI shopping assistant",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={josefinSans.variable} suppressHydrationWarning>
      <body className={josefinSans.className} suppressHydrationWarning>{children}</body>
    </html>
  );
}
