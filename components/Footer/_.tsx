'use client'
import { useContext } from 'react';
import style from './_.module.css';

import { ToggleHeaderFooter, LinkElm, L } from '@components/all';
import { HeaderFooterContext } from '@components/context';

export default function Footer() {

  const {isHFExpanded, setIsHFExpanded} = useContext(HeaderFooterContext)

  return (<>
    {
      (isHFExpanded !== undefined && setIsHFExpanded !== undefined)
      && <ToggleHeaderFooter isHFExpanded={isHFExpanded} setIsHFExpanded={setIsHFExpanded}
    />}
    <footer
      className={style.l_f}
      id={isHFExpanded !== undefined ? 'aria-footer' : undefined}
      aria-hidden={isHFExpanded !== undefined ? !isHFExpanded : undefined}
      inert={isHFExpanded !== undefined ? !isHFExpanded : undefined}
    >
      <div className={style.l_f__inner}>
        <div className={style.l_f__inner}>
          <div className={`${style.l_f_i} ${style['-nav']}`}>
            <L.flex styleValue={{'--row-gap':'0'}}>
              <LinkElm href='/privacypolicy/' isOpenAnotherTab={false} styleValue={{'--fz-link-text':'0.75rem'}}>プライバシーポリシー</LinkElm>
              <LinkElm href='/accessibility/' isOpenAnotherTab={false} styleValue={{'--fz-link-text':'0.75rem'}}>ウェブアクセシビリティ方針</LinkElm>
            </L.flex>
          </div>
        </div>
        <div className={`${style.l_f_i} ${style['-copyright']}`}>
          <p className={style.c_copyright}>
            <span className={style.c_copyright_i}>
              &copy;2024 midori-no-kiga
            </span>
          </p>
        </div>
      </div>
    </footer>
  </>);
}