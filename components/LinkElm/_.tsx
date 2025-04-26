'use client';
import style from './_.module.css';
import { type StyleValue } from '@components/utility';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SVGIcon } from '@components/all';
import { useContext } from 'react';
import { HeaderFooterContext } from '@components/context';

export default function LinkElm({
  href,
  isOpenAnotherTab,
  children,
  styleValue,
  isNeedAriaCurrent,
}:{
    href: string,
    isOpenAnotherTab: boolean,
    children: React.ReactNode,
    styleValue?: StyleValue<'--fz-link-text'>,
    isNeedAriaCurrent?: boolean,
}){
  const { refHeader } = useContext(HeaderFooterContext)
  const hrefHash = URL.canParse(href, 'https://example.com') && (new URL(href, 'https://example.com')).hash
  if(href === usePathname()){
    // pathnameが同じ場合はリンクのスタイルをつけない
    return (
      <span
        className={style.link}
        style={styleValue}
        aria-current={isNeedAriaCurrent ? 'page' : undefined}
        data-disabled={true}
      >
        {typeof children === 'string' ?
          (<span className={style.text}>{children}</span>)
          : children
        }
        <span className={style.viewing}>（現在のページ）</span>
      </span>);
  }else if(hrefHash){
    return (<Link
      className={style.link}
      href={href}
      style={styleValue}
      onClick={()=>{
        if(refHeader && refHeader.current !== null){
          document.documentElement.style.setProperty('--scroll-padding-top', `calc(20vh + ${refHeader.current.clientHeight}px)`)
        }
        return true
      }}
    >
      {typeof children === 'string' ?
        (<span className={style.text}>{children}</span>)
        : children
      }
    </Link>)
  }else{
    return (
      <Link
        className={style.link}
        href={href}
        target={isOpenAnotherTab ? '_blank' : undefined}
        style={styleValue}
      >
        {typeof children === 'string' ?
          (<span className={style.text}>{children}</span>)
          : children
        }
        <span className={style.linkIcon}>
          {isOpenAnotherTab ?
            <SVGIcon.linkAnotherTab styleValue={{'--color-stroke':'var(--color-primary)'}} />
            : <SVGIcon.link styleValue={{'--color-stroke':'var(--color-primary)'}} />
          }
        </span>
      </Link>
    );
  }
}
