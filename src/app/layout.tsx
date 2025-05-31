import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Starticoins",
  description:
    "Track Stati's development progress and milestones with Starticoins, your central hub for monitoring project advancement.",
  keywords: ["stati", "development", "progress", "tracking", "starticoins"],
  authors: [{ name: "Stati Team" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster
          position="top-center"
          richColors
          closeButton
          swipeDirections={["left", "right", "top", "bottom"]}
        />
        {children}
      </body>
    </html>
  );
}
