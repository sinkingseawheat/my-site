import style from './_.module.css';
import type { ButtonHTMLAttributes } from 'react';

type ButtonElm = {
  isDisabled?:boolean,
} & ButtonHTMLAttributes<Element>;

export default function Button({
  children, onClick, type, isDisabled, className
}:ButtonElm){
  const mergedClassName = className ? `${style.button} ${className}` : style.button
    return (
    <button className={mergedClassName} type={type ?? 'submit'} onClick={onClick} disabled={isDisabled}>
      {
        typeof children === 'string' ?
        <span className={style.button_i}>{children}</span>
        : children
      }
      </button>
    )
}