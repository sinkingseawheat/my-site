'use client'
import { type ReactNode } from 'react'
import style from './_.module.css'
import { type UseFormRegisterReturn } from "react-hook-form"
/* import { type SetCSSVariable } from '@components/utility' */


/* const setCSSVariable:SetCSSVariable<[
  "--label-min-width"
]> = ({labelMinWidth}) => {
  return   {
    "--label-min-width": labelMinWidth ?? '',
  }
} */


export default function InputText({
  elms, message,
}:{
  elms:{
    label: ReactNode,
    registerReturn: UseFormRegisterReturn,
  }[],
  message?: string,
}){

  return  (
    <div className={`${style.wrap}`}>
      <div className={style.wrapCheckboxes}>
        {elms.map(({
          label,
          registerReturn
        })=>{
          return(
            <div className={style.wrapCheckboxes__item} key={registerReturn.name}>
              <label className={style.label}>
                <input className={style.input} type='checkbox' {...registerReturn}/>
                <span className={style.pseudo} role='presentation'>
                <svg className={style.svg} viewBox="0 0 21 16" xmlns="http://www.w3.org/2000/svg">
                  <use href='#svgFormCheckmark' />
                </svg>
                </span>
                {
                  typeof label === 'string' ?
                  (<span className={style.innerLabel}>{label}</span>)
                  : label
                }
              </label>
            </div>
          );
        })}
      </div>
      <div aria-live='polite' role='alert'>
        {message !==undefined && (
          <p className={style.errorMessage}>{message}</p>
        )}
      </div>
    </div>
    )
}