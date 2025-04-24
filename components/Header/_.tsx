'use client'
import style from './_.module.css'
import { Picture, GlobalMenu } from '@components/all';
import { HeaderFooterContext } from '@components/context';
import Link from 'next/link';
import { Suspense, useContext } from 'react';

export default function Header({
  headerRef
}:{
  headerRef:React.RefObject<HTMLElement|null>
}){

  const { isHFExpanded } = useContext(HeaderFooterContext)

  return (
  <header
    className={style.l_h}
    id={isHFExpanded !== undefined ? 'aria-header' : undefined}
    aria-hidden={isHFExpanded !== undefined ? !isHFExpanded : undefined}
    inert={isHFExpanded != undefined ? !isHFExpanded : undefined}
    ref={headerRef}
  >
    <div className={style.l_h__inner}>
      <div className={style.l_h_i}>
        <Link href='/' className={style.c_headerLogo}>
          <Picture imgSrc='/c/image/icon_ssw_logo_penguin@2x.png' width={45} height={39} alt=''/>
          <Picture imgSrc='/c/image/icon_ssw_logo_text@2x.png' width={45} height={32} alt='sinkingseawheat'/>
        </Link>
      </div>
      {isHFExpanded !== undefined && 
        <div className={style.l_h_i}>
          <Suspense>
            <GlobalMenu />
          </Suspense>
        </div>
      }
    </div>
  </header>
  );
}