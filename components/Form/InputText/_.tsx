'use client'
import { type ReactNode } from 'react'
import style from './_.module.css'
import { type UseFormRegisterReturn } from "react-hook-form"
import { type SetCSSVariable } from '@components/utility'
import { type InputHTMLAttributes } from 'react'


const setCSSVariable:SetCSSVariable<[
  "--label-min-width"
]> = ({labelMinWidth}) => {
  return   {
    "--label-min-width": labelMinWidth ?? '',
  }
}


export default function InputText({
  label, registerReturn, message, labelMinWidth, inputHTMLAttribute,
}:{
  label: ReactNode,
  registerReturn: UseFormRegisterReturn,
  message?: string,
  labelMinWidth?: string,
  inputHTMLAttribute? : InputHTMLAttributes<HTMLInputElement>,
}){

  return  (
    <div className={`${style.wrap}`} style={setCSSVariable({labelMinWidth})}>
      <label className={style.label}>
        {
          typeof label === 'string' ?
          (<span className={style.innerLabel}>{label}</span>)
          : label
        }
        <input className={style.input} type='text' {...registerReturn} {...inputHTMLAttribute}/>
      </label>
      <div aria-live='polite' role='alert'>
        {message !==undefined && (
          <p className={style.errorMessage}>{message}</p>
        )}
      </div>
    </div>
    )
}