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
  metadataBase: new URL("https://www.colorpageprints.com"),
  title: {
    default: "ColorPagePrints | Premium Coloring Books & Free Printable Pages",
    template: "%s | ColorPagePrints"
  },
  description: "ColorPagePrints storefront and content hub",
  openGraph: {
    siteName: "ColorPagePrints",
    images: ["/images/og-default.png"]
  },
  twitter: {
    card: "summary_large_image",
    images: ["/images/og-default.png"]
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${dmSerifDisplay.variable}`}>
      <head>
        {/* TODO: Replace G-XXXXXXXXXX with real GA4 Measurement ID */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX" strategy="afterInteractive" />
        <Script id="gtag-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-XXXXXXXXXX');`}
        </Script>

        {/* TODO: Replace this Meta Pixel placeholder with real Pixel ID and events */}
        <Script id="meta-pixel-placeholder" strategy="afterInteractive">
          {`window.fbq = window.fbq || function(){(window.fbq.q = window.fbq.q || []).push(arguments);};`}
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
