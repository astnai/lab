import type { Metadata } from "next";
import { Geist, Geist_Mono, Lora, Pixelify_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";


const pixelifySans = Pixelify_Sans({
  variable: "--font-pixelify-sans",
  subsets: ["latin"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "astnai/lab",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-x-hidden touch-manipulation">
      <body
        className={`${geistSans.className} ${geistMono.variable} ${lora.variable} ${pixelifySans.variable} antialiased text-sm sm:text-base text-neutral-800 dark:text-neutral-200`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
