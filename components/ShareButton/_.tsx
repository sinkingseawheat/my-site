'use client'
import { useState, useEffect } from 'react';
import { usePathname, useSearchParams  } from 'next/navigation';

import style from './_.module.css';

export default function ShareButton(){

  const [currentHref, setCurrentHref] = useState<null | string>(null)
  const [pageTitle, setPageTitle] = useState<null | string>(null)

  const _pathname = usePathname()
  const _searchParams = useSearchParams()

  useEffect(()=>{
    setCurrentHref(encodeURIComponent(window.location.href));
    setPageTitle(encodeURIComponent(document?.getElementsByTagName('title')?.[0]?.textContent ?? ''))
  },[_pathname, _searchParams])

  return currentHref !== null && (
    <dl className={style.c_shareButton}>
      <div className={style.c_shareButton_i}>
        {/* <!-- Todo:aria-labelledbyでリンクをちゃんと説明する --> */}
        <dt className={style.c_shareButton__ttl}>
          <span className={style.c_shareButton__ttl_i}>記事を共有する</span>
        </dt>
        <dd className={style.c_shareButton__desc}>
          <ul className={style.c_shareButton__list}>
            <li className={style.c_shareButton__item}>
              <a
                className={`${style.c_shareButton__link} ${style['-x']} twitter-share-button`}
                href='https://twitter.com/share?ref_src=twsrc%5Etfw'
                data-show-count='false'
                target='_blank'
              >
                <img
                  className={style.c_shareButton__icon}
                  width='1200'
                  height='1227'
                  src='/c/vendor/logo/logo_x.svg'
                  alt='X'
                />
              </a>
            </li>
            <li className={style.c_shareButton__item}>
              <a
                className={`${style.c_shareButton__link} ${style['-bluesky']}`}
                href={currentHref === null ? `javascript:void(0);` : `https://bsky.app/intent/compose?text=${currentHref}`}
                target='_blank'
              >
                <img
                  className={style.c_shareButton__icon}
                  width='576'
                  height='512'
                  src='/c/vendor/logo/bluesky.svg'
                  alt='bluesky'
                />
              </a>
            </li>
            <li className={style.c_shareButton__item}>
              <a
                className={`${style.c_shareButton__link} ${style['-line']}`}
                href={currentHref === null ? `javascript:void(0);` : `https://social-plugins.line.me/lineit/share?url=${currentHref}`}
                target='_blank'
              >
                <img className={style.c_shareButton__icon} src={`/c/vendor/logo/LINE_Brand_icon.png`} alt='Line' />
              </a>
            </li>
            <li className={style.c_shareButton__item}>
              <a
                className={`${style.c_shareButton__link} ${style['-hatena']}`}
                href={currentHref === null ? `javascript:void(0);` : `http://b.hatena.ne.jp/add?mode=confirm&url=${currentHref}&title=${pageTitle}`}
                target='_blank'
              >
                <img className={style.c_shareButton__icon} src={`/c/vendor/logo/hatenabookmark_symbolmark.png`} alt='はてなブックマーク'/>
              </a>
            </li>
            <li className={style.c_shareButton__item}>
              <a
                className={`${style.c_shareButton__link} ${style['-pocket']}`}
                href={currentHref === null ? `javascript:void(0);` : `http://getpocket.com/edit?url=${currentHref}&title=${pageTitle}`}
                target='_blank'
              >
                <img
                  className={style.c_shareButton__icon}
                  width='448'
                  height='512'
                  src='/c/vendor/logo/pocket.svg'
                  alt='pocket'
                />
              </a>
            </li>
          </ul>
        </dd>
      </div>
    </dl>
  );
}