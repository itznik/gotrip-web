import type { Metadata } from "next";
import { Outfit } from "next/font/google"; // Using 'Outfit' for that modern travel look
import "./globals.css";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GoTrip - Explore the World",
  description: "Your journey starts here.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={outfit.className}>{children}</body>
    </html>
  );
}
