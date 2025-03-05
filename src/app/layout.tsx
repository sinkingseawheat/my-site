import type { Metadata, Viewport } from "next";
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

const PROTOCOL_AND_FQDN = process.env.NEXT_PUBLIC_PROTOCOL_AND_FQDN;

export const generateMetadata = async (): Promise<Metadata> => {
  const metaData:Metadata = {
    "metadataBase": PROTOCOL_AND_FQDN===undefined ? null : new URL(PROTOCOL_AND_FQDN),
    "title":{
      "default": "sinkingseawheatのページです",
      "template": "%s | ssw's site"
    },
    "robots": {
      "index": true,
      "follow": true,
      "nocache": false
    },
    "description": "Generated by create next app",
    "generator": "Next.js",
    "applicationName": "Next.js",
    "creator": "sinkingseawheat",
    "publisher": "sinkingseawheat",
    "authors": { "name": "sinkingseawheat", "url": "/" },
    "referrer": "origin-when-cross-origin",
    "formatDetection": {
      "email": false,
      "address": false,
      "telephone": false
    },
    "alternates": {
      "canonical": "/"
    }
  }
  return metaData;
};

export const viewport: Viewport = {
  colorScheme: 'dark light',
  viewportFit:'cover',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja-JP">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
