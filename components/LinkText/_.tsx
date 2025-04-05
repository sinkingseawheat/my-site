'use client';
import style from './_.module.css';
import { type SetCSSVariable } from '@components/utility';
import Link from 'next/link';
import { type LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';

const setCSSVariable:SetCSSVariable<[
  "--fz-link-text"
]> = ({fontSize}) => {
  return   {
    "--fz-link-text": fontSize ?? '',
  }
}

export default function LinkText({
  href,
  isOpenAnotherTab,
  elm,
  prefetch,
  fontSize,
}:{
    href: string,
    isOpenAnotherTab: boolean,
    elm: React.ReactElement | string,
    prefetch?:LinkProps['prefetch'],
    fontSize?:string
}){
  if(href === usePathname()){
    return (
      <Link
        className={style.link}
        href={href}
        prefetch={false}
        style={setCSSVariable({fontSize})}
        aria-current='page'
      >
        {typeof elm === 'string' ?
          (<span className={style.text}>{elm}</span>)
          : elm
        }
      </Link>);
  }else{
    return (
      <Link
        className={style.link}
        href={href}
        target={isOpenAnotherTab ? '_blank' : undefined}
        prefetch={prefetch}
        style={setCSSVariable({fontSize})}
      >
        {typeof elm === 'string' ?
          (<span className={style.text}>{elm}</span>)
          : elm
        }
        <span className={style.linkIcon}>
          {isOpenAnotherTab ?
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 209 209" fillRule="evenodd" clipRule="evenodd" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="1.5">
            <title>別タブでページを開く</title>
              <path className={style.strokeCurrentColor} d="M197.831,115.533l-0,45.165c-0,20.688 -16.796,37.483 -37.483,37.483l-112.449,0c-20.687,0 -37.482,-16.795 -37.482,-37.483l-0,-112.799c-0,-20.687 16.795,-37.482 37.482,-37.482l99.439,-0" fill="none" strokeWidth="20.83px"/>
              <path className={style.strokeCurrentColor} d="M162.318,102.915l35.666,-31.623" fill="none" strokeWidth="20.83px"/>
              <path className={style.strokeCurrentColor} d="M161.935,39.197l36.029,31.944" fill="none" strokeWidth="20.83px"/>
              <path className={style.strokeCurrentColor} d="M174.77,71.303c-49.514,0 -93.642,31.234 -110.104,77.931c16.462,-46.697 60.59,-77.931 110.104,-77.931Z" fill="none" strokeWidth="20.83px"/>
              <path className={style.strokeCurrentColor} d="M117.191,147.334l53.242,0" fill="none" strokeWidth="10.83px"/>
              <path className={style.strokeCurrentColor} d="M143.812,120.713l-0,53.242" fill="none" strokeWidth="10.73px"/>
            </svg>
            : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 209 209" fillRule="evenodd" clipRule="evenodd" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="1.5">
            <title>このタブでページを開く</title>
            <path className={style.strokeCurrentColor} d="M198.398,47.899l-0,112.799c-0,20.688 -16.796,37.483 -37.483,37.483l-112.448,0c-20.688,0 -37.483,-16.795 -37.483,-37.483l-0,-112.799c-0,-20.687 16.795,-37.482 37.483,-37.482l112.448,-0c20.687,-0 37.483,16.795 37.483,37.482Z" fill="none" strokeWidth="20.83px"/>
            <path className={style.strokeCurrentColor} d="M123.18,141.002l41.397,-36.705" fill="none" strokeWidth="20.83px"/>
            <path className={style.strokeCurrentColor} d="M123.059,67.332l41.495,36.79" fill="none" strokeWidth="20.83px"/>
            <path className={style.strokeCurrentColor} d="M164.295,104.268l-119.36,-0" fill="none" strokeWidth="20.83px"/>
          </svg>
          }
      </span>
      </Link>
    );
  }
}
