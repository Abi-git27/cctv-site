import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CyberEye Security Systems | Authorized Dealer Bangalore",
  description: "Uncompromised CCTV solutions in Bangalore. Authorized dealer for CP Plus, Hikvision, and Dahua. Professional installation in Bommanahalli and beyond.",
  keywords: "CyberEye Bangalore, CCTV Installation Bangalore, CP Plus Dealer, Hikvision Bangalore, Dahua CCTV, Security Systems ITI Layout",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}