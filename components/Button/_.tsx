import style from './_.module.css';
import Link from 'next/link';
import type { JSX, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';
import { SVGIcon } from '@components/all';

type ButtonElm = {
  type:'button',
  isSubmit?:boolean,
  isDisabled?:boolean,
} & ButtonHTMLAttributes<Element>;

type LinkElm = {
  type:'link',
  isOpenAnotherTab:boolean,
} & AnchorHTMLAttributes<Element>;;

export function Button(args:ButtonElm):JSX.Element;

export function Button(args:LinkElm):JSX.Element;

export default function Button(args:ButtonElm|LinkElm){
  if(args.type === 'button'){
    const { children, onClick, isSubmit, isDisabled, className } = args;
    return (
    <button className={`${style.button}${className ? ` ${className}` : ''}`} type={isSubmit ? 'submit' : 'button'} onClick={onClick} disabled={isDisabled}>
      {
        typeof children === 'string' ?
        <span className={style.button_i}>{children}</span>
        : children
      }
      </button>
    );
  }else{
    const { children, href, isOpenAnotherTab, className } = args;
    // hrefが未定義ならばリンクではなく<span>にする
    if(href === undefined){
      return (
        <span className={`${style.buttonLink}${className ? ` ${className}` : ''}`}>
        {
          typeof children === 'string' ?
          <span className={style.buttonLink_i}>{children}</span>
          : children
        }
        </span>
      )
    }
    return (
      <Link
        className={`${style.buttonLink}${className ? ` ${className}` : ''}`}
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
            <SVGIcon.linkAnotherTab styleValue={{'--color-stroke':'var(--color-primary)'}} />
            : <SVGIcon.link styleValue={{'--color-stroke':'var(--color-primary)'}} />
          }
        </span>
      </Link>
    );
  }
}