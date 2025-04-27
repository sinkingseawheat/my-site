'use client'
import style from './_.module.css'
import { Picture, L, PageList, SVGIcon } from '@components/all';
import { HeaderFooterContext } from '@components/context';
import Link from 'next/link';
import { Suspense, useContext } from 'react';

export default function Header({
  refHeader
}:{
  refHeader:React.RefObject<HTMLElement|null>
}){

  const { isHFExpanded } = useContext(HeaderFooterContext)

  return (
  <header
    className={style.l_h}
    id={isHFExpanded !== undefined ? 'aria-header' : undefined}
    aria-hidden={isHFExpanded !== undefined ? !isHFExpanded : undefined}
    inert={isHFExpanded != undefined ? !isHFExpanded : undefined}
    ref={refHeader}
  >
    <div className={style.l_h__inner}>
      <div className={style.l_h_i}>
        <Link href='/' className={style.c_headerLogo}>
          <Picture src='/c/image/icon_ssw_logo_penguin@2x.png' width={45} height={39} alt=''/>
          <Picture src='/c/image/icon_ssw_logo_text@2x.png' width={45} height={32} alt='sinkingseawheat'/>
        </Link>
      </div>
      {isHFExpanded !== undefined && 
        <div className={style.l_h_i}>
          <Suspense>
            <L.modal btnElm={<SVGIcon.hamburgerMenu styleValue={{'--color-bg-svg':'var(--color-primary)','--color-fg-svg':'var(--color-bg)'}} />}>
              <nav>
                <PageList />
              </nav>
            </L.modal>
          </Suspense>
        </div>
      }
    </div>
  </header>
  );
}