import style from './_.module.css';
import type { ButtonHTMLAttributes } from 'react';

type ButtonElm = {
  isDisabled?:boolean,
} & ButtonHTMLAttributes<Element>;

export default function Button({
  children, onClick, type, isDisabled,
}:ButtonElm){
  return (
    <div className={style.wrap}>
      <button className={style.button} type={type ?? 'submit'} onClick={onClick} disabled={isDisabled}>
        {
          typeof children === 'string' ?
          <span className={style.button_i}>{children}</span>
          : children
        }
      </button>
    </div>
  )
}