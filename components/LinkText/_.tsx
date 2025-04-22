'use client';
import style from './_.module.css';
import { type StyleValue } from '@components/utility';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SVGIcon } from '@components/all';

export default function LinkText({
  href,
  isOpenAnotherTab,
  children,
  styleValue
}:{
    href: string,
    isOpenAnotherTab: boolean,
    children: React.ReactNode,
    styleValue?: StyleValue<'--fz-link-text'>
}){
  if(href === usePathname()){
    return (
      <Link
        className={style.link}
        href={href}
        style={styleValue}
        aria-current='page'
      >
        {typeof children === 'string' ?
          (<span className={style.text}>{children}</span>)
          : children
        }
      </Link>);
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
            <SVGIcon.linkAnotherTab styleVariable={{'--color-stroke':'var(--color-primary)'}} />
            : <SVGIcon.link styleVariable={{'--color-stroke':'var(--color-primary)'}} />
          }
      </span>
      </Link>
    );
  }
}
