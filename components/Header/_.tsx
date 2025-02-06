import style from './_.module.css'
import { Picture, GlobalMenu, S, List, LinkText, ToggleHeaderFooter } from '@components/all';
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
          <GlobalMenu>
              <nav>
                <S.lv2 title='リンク一覧'>
                  <>
                  <List>
                    <LinkText href='/' isOpenAnotherTab={false} elm='TOPページ' />
                    <LinkText href='/profile/' isOpenAnotherTab={false} elm='作者の紹介ページ' />
                  </List>
                  <S.lv3 title='開発した・しているツール'>
                    <List>
                      <LinkText href='/tool/dp/' isOpenAnotherTab={false} elm='メディアの種別と特性を確認' />
                      <LinkText href='/tool/genRandomString/' isOpenAnotherTab={false} elm='ランダム文字列生成ツール' />
                    </List>
                  </S.lv3>
                  </>
                </S.lv2>
              </nav>
          </GlobalMenu>
        </Suspense>
      </div>
    </div>
  </header>
  );
}