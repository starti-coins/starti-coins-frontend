import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
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
      <body className={`${poppins.variable} antialiased`}>
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
