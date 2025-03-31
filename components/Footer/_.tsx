import style from './_.module.css';

import { ToggleHeaderFooter, LinkText } from '@components/all';

export default function Footer({
  isHFExpanded,
  setIsHFExpanded,
}:Parameters<typeof ToggleHeaderFooter>[0]){
  return (<>
    <ToggleHeaderFooter isHFExpanded={isHFExpanded} setIsHFExpanded={setIsHFExpanded}/>
    <footer className={style.l_f} id='aria-footer' aria-hidden={!isHFExpanded} inert={!isHFExpanded}>
      <div className={style.l_f__inner}>
        <div className={style.l_f__inner}>
          <div className={`${style.l_f_i} ${style['-nav']}`}>
            <LinkText href='/privacypolicy' isOpenAnotherTab={false} elm='プライバシーポリシー' fontSize='0.75rem'/>
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