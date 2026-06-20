import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://alcoholrehab-detox.co.uk"),
  title: "Alcohol Detox Guide UK | Symptoms, Timeline & Safe Treatment",
  description:
    "A clinically informed guide to alcohol detox in the UK. Understand withdrawal symptoms, the detox timeline and when to seek professional medical support.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Alcohol Detox Guide UK | Symptoms, Timeline & Safe Treatment",
    description:
      "A complete UK guide to alcohol detox — withdrawal symptoms, the detox timeline and when medical support matters.",
    url: "https://alcoholrehab-detox.co.uk",
    siteName: "Alcohol Rehab Detox",
    locale: "en_GB",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB">
      <body>{children}</body>
    </html>
  );
}
