import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Wook Company | 프리미엄 비즈니스 솔루션",
  description: "Wook Company는 혁신과 탁월함을 바탕으로 미래 지향적인 비즈니스 솔루션을 제공합니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <div className="bg-grid"></div>
        <div className="glow-orb" style={{ top: '10%', right: '10%' }}></div>
        <div className="glow-orb" style={{ bottom: '10%', left: '10%', animationDelay: '-5s' }}></div>
        {children}
      </body>
    </html>
  );
}
