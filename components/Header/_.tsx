import style from './_.module.css'
import { Picture, GlobalMenu, ToggleHeaderFooter } from '@components/all';
import Link from 'next/link';
import { Suspense } from 'react';

export default function Header({
  isHFExpanded,
  ref,
}:Pick<Parameters<typeof ToggleHeaderFooter>[0],"isHFExpanded"> & {ref:React.RefObject<HTMLElement | null>}
){
  return (
  <header className={style.l_h} id='aria-header' aria-hidden={!isHFExpanded} inert={!isHFExpanded} ref={ref}>
    <div className={style.l_h__inner}>
      <div className={style.l_h_i}>
        <Link href='/' className={style.c_headerLogo}>
          <Picture imgSrc='/c/image/icon_ssw_logo_penguin@2x.png' width={45} height={39} alt=''/>
          <Picture imgSrc='/c/image/icon_ssw_logo_text@2x.png' width={45} height={32} alt='sinkingseawheat'/>
        </Link>
      </div>
      <div className={style.l_h_i}>
        <Suspense>
          <GlobalMenu />
        </Suspense>
      </div>
    </div>
  </header>
  );
}