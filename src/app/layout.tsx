import type { Metadata } from "next";
import { Bangers } from "next/font/google";
import { cn } from "@/lib/utils";
import "@/app/globals.css";

const fontBanger = Bangers({
  subsets: ["latin-ext"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Kahootish",
  description: "A Kahoot clone built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-green antialiased",
          fontBanger.className
        )}
      >
        {children}
      </body>
    </html>
  );
}
