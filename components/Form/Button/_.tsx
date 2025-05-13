import style from './_.module.css'
import type { ButtonHTMLAttributes } from 'react'
import { StyleValue } from '@components/utility'

type ButtonElm = {
  isDisabled?:boolean,
  styleValue?:StyleValue<'--color-button-fg'|'--color-button-bg'|'--color-button-bdr'>
} & ButtonHTMLAttributes<Element>

export default function Button({
  children, onClick, type, isDisabled, styleValue
}:ButtonElm){
  return (
    <div className={style.wrap} style={styleValue}>
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