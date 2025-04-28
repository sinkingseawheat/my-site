'use client'
import style from './_.module.css';

import { LinkElm, L } from '@components/all';

export default function Footer() {

  return (
    <footer
      className={style.l_f}
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
  );
}