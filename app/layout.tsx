import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Alcohol Rehab Near Me | Private Rehab UK | Wellbourne",
  description:
    "Private Alcohol Rehab and drug rehab in Warwickshire, UK. Compassionate support for Alcohol Dependence, detox, therapy and ongoing recovery.",
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
