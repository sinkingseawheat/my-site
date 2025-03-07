'use client'
// import type { Metadata } from "next";
import { L, SkipNav, Header, Footer, GoogleAnalytics, BottomPopup } from '@components/all';
import { PopupContext } from '@components/context';
import { useState, useRef, type ReactNode } from 'react';

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
        <GoogleAnalytics />
      </L.innerBody>);
}