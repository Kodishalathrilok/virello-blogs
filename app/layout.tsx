import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans, Inter } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://virelloliving.com"),
  title: {
    default: "Virello Living — Home Organization & Small Space Living",
    template: "%s · Virello Living",
  },
  description:
    "Practical, budget-friendly home organization and small space living ideas made for Indian apartments. Curated decor picks and honest recommendations.",
  keywords: [
    "home organization India",
    "small space living",
    "Indian apartment storage",
    "home decor India",
    "1BHK organization",
  ],
  openGraph: {
    title: "Virello Living — Home Organization & Small Space Living",
    description:
      "Practical, budget-friendly home organization ideas made for Indian apartment living.",
    type: "website",
    locale: "en_IN",
    siteName: "Virello Living",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${dmSans.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-white text-black">{children}</body>
    </html>
  );
}
