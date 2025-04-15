'use client'
import { L, SkipNav, Header, Footer, BottomPopup, SVGIcon, } from '@components/all';
import { PopupContext } from '@components/context';
import { useState, useRef, type ReactNode, useEffect, } from 'react';

import {S, PageList} from '@components/all'

export default function Page() {

  const [ isHFExpanded, setIsHFExpanded] = useState<boolean>(true)
  const [ popupMessage, setPopupMessage ] = useState<ReactNode>('')
  const [ isNotifiedRedirect, setIsNotifiedRedirect] = useState<boolean>(false)

  const offsetElmRef = useRef<HTMLElement>(null)

  useEffect(()=>{
    if(isNotifiedRedirect === false && location.href.endsWith('?ref=sinkingseawheat')){
      setPopupMessage(`旧ドメインのsinkingseawheat.comからリダイレクトされました`)
      setIsNotifiedRedirect((_prev)=>!_prev)
    }
  },[isNotifiedRedirect])
  return (
    <L.innerBody>
      <PopupContext.Provider value={[popupMessage,setPopupMessage]}>
        <L.vb className='header'>
          <SkipNav idToMove="main-content" ref={offsetElmRef}/>
          <Header isHFExpanded={isHFExpanded} ref={offsetElmRef}/>
        </L.vb>
        <L.vb className='content'>
          <noscript>
            JavaScriptの実行が許可されていません。ページの機能に不具合が出る可能性があります
          </noscript>
          <main id="main-content">
            <S.lv1 isSrOnly={false} h1Elm={`お探しのページは見つかりませんでした`} />
              <PageList />
          </main>
        </L.vb>
        <L.vb className='footer'>
          <BottomPopup />
          <Footer isHFExpanded={isHFExpanded} setIsHFExpanded={setIsHFExpanded}/>
        </L.vb>
      </PopupContext.Provider>
      <SVGIcon />
    </L.innerBody>);
}