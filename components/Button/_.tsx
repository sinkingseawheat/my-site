import style from './_.module.css';
import Link from 'next/link';
import type { JSX } from 'react';

type ButtonElm = {
  type:'button',
  children: React.ReactElement | string,
  onClick: React.MouseEventHandler<HTMLButtonElement>,
};

type LinkElm = {
  type:'link',
  children: React.ReactElement | string,
  href:string,
  isOpenAnotherTab:boolean
};

export function Button(args:ButtonElm):JSX.Element;

export function Button(args:LinkElm):JSX.Element;

export default function Button(args:ButtonElm|LinkElm){
  if(args.type === 'button'){
    const { children, onClick, } = args;
    return (
    <button className={style.button} type='button' onClick={onClick}>
      {
        typeof children === 'string' ?
        <span className={style.button_i}>{children}</span>
        : children
      }
      </button>
    );
  }else{
    const { children, href, isOpenAnotherTab } = args;
    return (
      <Link
        className={style.buttonLink}
        href={href}
        target={isOpenAnotherTab ? '_blank' : undefined}
      >
        {
          typeof children === 'string' ?
          <span className={style.buttonLink_i}>{children}</span>
          : children
        }
        <span className={style.buttonLinkIcon}>
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