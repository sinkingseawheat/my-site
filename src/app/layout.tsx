import type { Metadata, Viewport } from "next";
import { object, z } from 'zod'
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import fs from 'fs/promises';
import path from 'path';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const defaultMetaScheme = z.object({
  _metadataBaseURL: z.string(),
  title:z.object({
    default: z.string(),
    template: z.string(),
  }),
  robots: z.object({
    index: z.boolean(),
    follow: z.boolean(),
    nocache: z.boolean(),
  }),
  description: z.string(),
  generator: z.string(),
  applicationName: z.string(),
  creator: z.string(),
  publisher: z.string(),
  authors: z.object({ name: z.string(), url: z.string() }),
  referrer: z.string(),
  formatDetection: z.object({
    email: z.boolean(),
    address: z.boolean(),
    telephone: z.boolean(),
  }),
  alternates: object({
    canonical: z.string()
  })
})

export const generateMetadata = async (): Promise<Metadata> => {
  const buffer = await fs.readFile(path.join(process.cwd(),`./public_sitemeta.json`),'utf-8') // SSGビルドにしか使用しない現状なので、エラーの場合のハンドリングはしない
  const defaultMetaData = JSON.parse(buffer);
  defaultMetaScheme.parse(defaultMetaData);
  const metadataBase = {
    metadataBase:new URL(defaultMetaData["_metadataBaseURL"])
  }
  return {...metadataBase, ...defaultMetaData} as Metadata; // refererプロパティに型エラーが出るが、一旦アサーション
};

export const viewport: Viewport = {
  colorScheme: 'dark light',
  viewportFit:'cover',
}

export default function RootLayout({
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
