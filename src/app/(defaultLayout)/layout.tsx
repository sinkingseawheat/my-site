'use client'
// import type { Metadata } from "next";
import { L, SkipNav, Header, Footer, BottomPopup, SVGIcon } from '@components/all';
import { PopupContext } from '@components/context';
import { useState, useRef, type ReactNode } from 'react';
import Script from 'next/script';

export default function LayoutDefault({
  children,
}: Readonly<{
  children: React.ReactNode;
}>){

  const [ isHFExpanded, setIsHFExpanded] = useState<boolean>(true);
  const [ popupMessage, setPopupMessage ] = useState<ReactNode>('');

  const offsetElmRef = useRef<HTMLElement>(null)

  return (<L.innerBody>
        <PopupContext.Provider value={[popupMessage,setPopupMessage]}>
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
            <BottomPopup />
            <Footer isHFExpanded={isHFExpanded} setIsHFExpanded={setIsHFExpanded}/>
          </L.vb>
        </PopupContext.Provider>
        {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID === undefined ? <></> : <><Script strategy="beforeInteractive" async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}`} />
        <Script strategy="beforeInteractive" id="gtagInitialize">{`window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}');`}</Script></>}
        <SVGIcon />
      </L.innerBody>);
}