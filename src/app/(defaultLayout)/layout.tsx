'use client'
// import type { Metadata } from "next";
import { L, SkipNav, Header, Footer, BottomPopup, SVGIcon, ShareButton, AdsenseBlock } from '@components/all';
import { PopupContext, HeaderFooterContext } from '@components/context';
import { useState, useRef, type ReactNode, useEffect, Suspense } from 'react';
import Script from 'next/script';
import { userSpecificData } from '@/../my-site.config';

const { googleAnalyticsId } = userSpecificData

export default function LayoutDefault({
  children,
}: Readonly<{
  children: React.ReactNode
}>){

  const [ isHFExpanded, setIsHFExpanded] = useState<boolean>(true)
  const [ popupMessage, setPopupMessage ] = useState<ReactNode>('')
  const [ isNotifiedRedirect, setIsNotifiedRedirect] = useState<boolean>(false)

  const headerRef = useRef<HTMLElement|null>(null);

  useEffect(()=>{
    if(isNotifiedRedirect === false && location.href.endsWith('?ref=sinkingseawheat')){
      setPopupMessage(`旧ドメインのsinkingseawheat.comからリダイレクトされました`)
      setIsNotifiedRedirect((_prev)=>!_prev)
    }
  },[isNotifiedRedirect])

  return (<L.innerBody>
        <PopupContext.Provider value={[popupMessage,setPopupMessage]}>
          <HeaderFooterContext.Provider value={{
            headerRef, isHFExpanded, setIsHFExpanded
          }}>
            <L.vb className='header'>
              <SkipNav idToMove="main-content"/>
              <Header headerRef={headerRef}/>
            </L.vb>
            <L.vb className='content'>
              <noscript>
                JavaScriptの実行が許可されていません。ページの機能に不具合が出る可能性があります
              </noscript>
              <main id="main-content">
                {children}
              </main>
              <aside>
                <L.column styleValue={{'--margin-top': '4rem'}}>
                  <Suspense>
                    <ShareButton/>
                  </Suspense>
                </L.column>
                <AdsenseBlock id='bottomPage' />
              </aside>
            </L.vb>
            <L.vb className='footer'>
              <BottomPopup />
              <Footer/>
            </L.vb>
          </HeaderFooterContext.Provider>
        </PopupContext.Provider>
        {
        googleAnalyticsId !== undefined && process.env.NODE_ENV === 'production' ?
        (<><Script strategy="beforeInteractive" async src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`} />
          <Script strategy="beforeInteractive" id="gtagInitialize">{`window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', '${googleAnalyticsId}');`}</Script>
        </>)
        : <></>}
        <SVGIcon.hiddenData />
      </L.innerBody>);
}