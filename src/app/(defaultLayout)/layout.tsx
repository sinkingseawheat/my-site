'use client'
// import type { Metadata } from "next";
import { L, SkipNav } from '@components/all';
import { Header, Footer } from '@components/all';
import Script from 'next/script';
import { useState, useRef } from 'react';

export default function LayoutDefault({
  children,
}: Readonly<{
  children: React.ReactNode;
}>){

  const [ isHFExpanded, setIsHFExpanded] = useState<boolean>(true);

  const offsetElmRef = useRef<HTMLElement>(null)

  return (<L.innerBody>
        <L.vb classNameOption='header'>
          <SkipNav idToMove="main-content" ref={offsetElmRef}/>
          <Header isHFExpanded={isHFExpanded} ref={offsetElmRef}/>
        </L.vb>
        <L.vb classNameOption='content'>
          <noscript>
            JavaScriptの実行が許可されていません。ページの機能に不具合が出る可能性があります
          </noscript>
          <main id="main-content">
            {children}
          </main>
        </L.vb>
        <L.vb classNameOption='footer'>
          <Footer isHFExpanded={isHFExpanded} setIsHFExpanded={setIsHFExpanded}/>
        </L.vb>
        {/* google ANALYTICS */}
        <Script strategy="beforeInteractive" async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}`} />
        <Script strategy="beforeInteractive" id="gtagInitialize">{`window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}');`}</Script>
      </L.innerBody>);
}