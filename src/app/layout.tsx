import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { userSpecificData } from "../../my-site.config";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const {
  protocolAndFQDN,
  authorName,
  siteName
} = userSpecificData

export const generateMetadata = async (): Promise<Metadata> => {
  const metaData:Metadata = {
    "metadataBase": protocolAndFQDN===undefined ? undefined : new URL(protocolAndFQDN),
    "title":{
      "default": `${authorName}のページです`,
      "template": `%s | ${siteName}`
    },
    "robots": {
      "index": true,
      "follow": true,
      "nocache": false
    },
    "description": `Generated by create next app`,
    "generator": `Next.js`,
    "applicationName": `Next.js`,
    "creator": `${authorName}`,
    "publisher": `${authorName}`,
    "authors": { "name": `${authorName}`, "url": `/` },
    "referrer": `origin-when-cross-origin`,
    "formatDetection": {
      "email": false,
      "address": false,
      "telephone": false
    },
    "alternates": {
      "canonical": `/`
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
