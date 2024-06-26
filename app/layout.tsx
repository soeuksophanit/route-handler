import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { MyNavbar } from "@/components/AnimateNavbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Route Handler",
  description: "Build a simple restful service with NextJS features",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MyNavbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
