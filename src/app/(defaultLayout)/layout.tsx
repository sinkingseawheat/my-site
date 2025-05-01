'use client'
import { L, SkipNav, Header, Footer, BottomPopup, SVGIcon, ShareButton, AdsenseBlock } from '@components/all';
import { PopupContext, RefFixedAtTopContext } from '@components/context';
import { useState, useRef, type ReactNode, useEffect, Suspense } from 'react';
import Script from 'next/script';
import { userSpecificData } from '@/../my-site.config';
import { usePathname } from 'next/navigation';

const { googleAnalyticsId } = userSpecificData

export default function LayoutDefault({
  children,
}: Readonly<{
  children: React.ReactNode
}>){

  const [ popupMessage, setPopupMessage ] = useState<ReactNode>('')
  const [ isNotifiedRedirect, setIsNotifiedRedirect] = useState<boolean>(false)

  const refHeader = useRef<HTMLElement|null>(null);

  useEffect(()=>{
    if(isNotifiedRedirect === false && location.href.endsWith('?ref=sinkingseawheat')){
      setPopupMessage(`旧ドメインのsinkingseawheat.comからリダイレクトされました`)
      setIsNotifiedRedirect((_prev)=>!_prev)
    }
  },[isNotifiedRedirect])

  useEffect(()=>{
    document.querySelector('link[rel="canonical"]')?.setAttribute('href',`${location.protocol}//${location.host}${location.pathname}`)
  },[usePathname()])

  return (
    <L.innerBody>
      <RefFixedAtTopContext.Provider value={[refHeader]}>
        <PopupContext.Provider value={[popupMessage, setPopupMessage]}>
          <L.vb className='header'>
            <SkipNav idToMove="main-content"/>
            <Header refHeader={refHeader}/>
          </L.vb>
          <L.vb className='content'>
            <noscript>
              JavaScriptの実行が許可されていません。ページの機能に不具合が出る可能性があります
            </noscript>
            <main id="main-content">
              {children}
            </main>
            <aside>
              <L.grid styleValue={{'--margin-top': '4rem'}}>
                <Suspense>
                  <ShareButton/>
                </Suspense>
              </L.grid>
              <AdsenseBlock id='bottomPage' />
            </aside>
          </L.vb>
          <L.vb className='footer'>
            <BottomPopup />
            <Footer/>
          </L.vb>
        </PopupContext.Provider>
      </RefFixedAtTopContext.Provider>
      {
      googleAnalyticsId !== undefined && process.env.NODE_ENV === 'production' ?
      (<><Script strategy="beforeInteractive" async src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`} />
        <Script strategy="beforeInteractive" id="gtagInitialize">{`window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', '${googleAnalyticsId}');`}</Script>
      </>)
      : <></>}
      <SVGIcon.hiddenData />
    </L.innerBody>
  );
}