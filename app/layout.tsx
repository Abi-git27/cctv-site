import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CyberEye Security Systems | Bangalore",
  description: "Authorized dealer of CP Plus, Hikvision, and Dahua. Uncompromised CCTV solutions in Bommanahalli, Bangalore.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}