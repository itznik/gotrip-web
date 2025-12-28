import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import VisitorTracker from "@/components/VisitorTracker"; // <--- Import

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
    <html lang="en" suppressHydrationWarning>
      <body className={outfit.className}>
        <ThemeProvider>
          <VisitorTracker /> {/* <--- Add here */}
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
