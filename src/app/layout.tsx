import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "適正広告費計算ツール | tekisei-ad",
  description: "あなたのビジネスで広告にいくら使っていいかを、小学生でもわかる言葉で診断します。専門用語なしで簡単に計算できます。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
