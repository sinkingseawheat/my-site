'use client'
import style from './_.module.css'
import { Picture, L, PageList, SVGIcon } from '@components/all'
import Link from 'next/link'
import { Suspense, useState, useEffect, useRef, useCallback } from 'react'

export default function Header({
  refHeader,
  elmsAppendedToNav,
}:{
  refHeader:React.RefObject<HTMLElement|null>,
  elmsAppendedToNav?:React.ReactNode,
}){

  const [isHidden, setIsHidden] = useState(false)
  const prevScrollY = useRef(0)
  const lastExecution = useRef(0)
  const THROTTOLE_INTERVAL = 300
  const IGNORE_OFFSET = 20
  const IGNORE_BOTH_END = 200

  const handleScroll = useCallback(()=>{
    const now = Date.now()
    const currentScrollY = window.scrollY
    if(
      currentScrollY < IGNORE_BOTH_END
    ){
      setIsHidden(false)
      // prevScrollY.current = currentScrollY
    }else if(
      currentScrollY + window.innerHeight > document.documentElement.scrollHeight - IGNORE_BOTH_END
    ){
      setIsHidden(true)
      // prevScrollY.current = currentScrollY
    }else if(now - lastExecution.current >= THROTTOLE_INTERVAL){
      lastExecution.current = now
      if( currentScrollY > prevScrollY.current + IGNORE_OFFSET ){
        setIsHidden(true)
      }else if( currentScrollY < prevScrollY.current - IGNORE_OFFSET ){
        setIsHidden(false)
      }
      prevScrollY.current = currentScrollY
    }
  }, [])

  useEffect(()=>{
    window.addEventListener('scroll', handleScroll)
    return () => {
      // コンポーネントアンマウント時のみリスナーを削除
      window.removeEventListener('scroll', handleScroll)
    }
  },[handleScroll])

  return (
  <header
    className={style.l_h}
    ref={refHeader}
    data-ishidden={isHidden}
  >
    <div className={style.l_h__inner}>
      <div className={style.l_h_i}>
        <Link href='/' className={style.c_headerLogo}>
          <Picture src='/c/image/icon_ssw_logo_penguin@2x.png' width={45} height={39} alt=''/>
          <Picture src='/c/image/icon_ssw_logo_text@2x.png' width={45} height={32} alt='sinkingseawheat'/>
        </Link>
      </div>
      <div className={style.l_h_i}>
        <Suspense>
          <L.modal btnElm={<SVGIcon.hamburgerMenu styleValue={{'--color-bg-svg':'var(--color-primary)','--color-fg-svg':'var(--color-bg)'}} />}>
            <nav aria-label='ページ一覧'>
              <PageList />
            </nav>
            {elmsAppendedToNav}
          </L.modal>
        </Suspense>
      </div>
    </div>
  </header>
  )
}