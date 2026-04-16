import type { Metadata } from "next";
import { DM_Sans, DM_Serif_Display } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/layout/footer";
import { MobileBottomBar } from "@/components/layout/mobile-bottom-bar";
import { Nav } from "@/components/layout/nav";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap"
});

const dmSerifDisplay = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-heading",
  display: "swap"
});

export const metadata: Metadata = {
  title: "ColorPagePrints",
  description: "ColorPagePrints storefront and content hub"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${dmSerifDisplay.variable}`}>
      <body>
        <Nav />
        <main className="container-1200 py-8 pb-24 md:pb-8">{children}</main>
        <Footer />
        <MobileBottomBar />
      </body>
    </html>
  );
}
