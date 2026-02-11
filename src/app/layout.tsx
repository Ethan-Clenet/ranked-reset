import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import DiscordBubble from "@/components/DiscordBubble";
import { I18nProvider } from "@/lib/i18n";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ranked Reset — Dates de reset ranked des jeux",
  description:
    "Suivez les dates de reset des saisons ranked de vos jeux préférés : League of Legends, Valorant, Apex Legends, Overwatch 2, et plus.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-background text-foreground`}
      >
        <I18nProvider>
          <Header />
          <main>{children}</main>
          <DiscordBubble />
        </I18nProvider>
      </body>
    </html>
  );
}
