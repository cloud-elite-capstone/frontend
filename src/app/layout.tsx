import type { Metadata } from "next";
import { Josefin_Sans, Open_Sans } from "next/font/google";
import "./globals.css";

const josefinSans = Josefin_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-josefin-sans",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-open-sans",
});

export const metadata: Metadata = {
  title: "Cartesian - AI Shopping Assistant",
  description: "Autonomous agentic AI shopping assistant",
};

// root app layout configuring global google fonts and hydration wrappers
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${josefinSans.variable} ${openSans.variable}`}
      suppressHydrationWarning
    >
      <body className={openSans.className} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
