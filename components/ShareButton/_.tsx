'use client'
import { useState, useEffect, use } from 'react';
import { usePathname, useSearchParams  } from 'next/navigation';
import { Section, L, F, SVGIcon } from '@components/all';
import { PopupContext } from '@components/context';

import style from './_.module.css';

export default function ShareButton(){

  const [currentHref, setCurrentHref] = useState<null | string>(null)
  const [pageTitle, setPageTitle] = useState<null | string>(null)
  const [, setPopupMessage] = use(PopupContext)

  const _pathname = usePathname()
  const _searchParams = useSearchParams()

  useEffect(()=>{
    setCurrentHref(window.location.href);
    setPageTitle(document?.getElementsByTagName('title')?.[0]?.textContent ?? '')
  },[_pathname, _searchParams])

  return currentHref !== null && (
    <Section type='dl' title="記事を共有する">
      <hr />
      <p>ボタンを押すとページのURLとタイトルがコピーされます。</p>
      <L.flex>
        <p className={style.source}>
          {currentHref ?? ''}<br />{pageTitle ?? ''}
        </p>
        <F.Button
          aria-label='ページのURLとタイトルをコピーする'
          onClick={async ()=>{
            if(currentHref){
              await navigator.clipboard.writeText(currentHref + (pageTitle ? '\n' + pageTitle : ''))
              setPopupMessage(<>{currentHref ?? ''}<br />{pageTitle ?? ''}</>)
            }else{
              setPopupMessage('ページURLの取得に失敗しました')
            }
          }}
        >
          <SVGIcon.copy styleValue={{'--color-stroke':'var(--color-bg)'}} />
        </F.Button>
      </L.flex>
      <hr />
    </Section>
  );
}