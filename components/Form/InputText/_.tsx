'use client'
import { type ReactNode } from 'react'
import style from './_.module.css'
import { type UseFormRegisterReturn } from "react-hook-form"
import { type SetCSSVariable } from '@components/utility'


const setCSSVariable:SetCSSVariable<[
  "--label-min-width"
]> = ({labelMinWidth}) => {
  return   {
    "--label-min-width": labelMinWidth ?? '',
  }
}


export default function InputText({
  label, registerReturn, message, labelMinWidth
}:{
  label: ReactNode,
  registerReturn: UseFormRegisterReturn,
  message?: string,
  labelMinWidth?: string
}){

  return  (
    <div className={`${style.wrap}`} style={setCSSVariable({labelMinWidth})}>
      <label className={style.label}>
        {
          typeof label === 'string' ?
          (<span className={style.innerLabel}>{label}</span>)
          : label
        }
        <input className={style.input} type='text' {...registerReturn}/>
      </label>
      <div aria-live='polite' role='alert'>
        {message !==undefined && (
          <p className={style.errorMessage}>{message}</p>
        )}
      </div>
    </div>
    )
}