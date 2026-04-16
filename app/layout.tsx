import type { Metadata } from "next";
import Script from "next/script";
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
  title: {
    default: "ColorPagePrints | Premium Coloring Books & Free Printable Pages",
    template: "%s | ColorPagePrints"
  },
  description: "ColorPagePrints storefront and content hub"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${dmSerifDisplay.variable}`}>
      <head>
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX" />
        <Script id="ga4-placeholder" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-XXXXXXXXXX');`}
        </Script>
      </head>
      <body>
        <Nav />
        <main className="container-1200 min-h-[calc(100vh-64px)] py-8 pb-24 md:pb-10">{children}</main>
        <Footer />
        <MobileBottomBar />
      </body>
    </html>
  );
}
