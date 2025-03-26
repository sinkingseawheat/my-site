'use client'
import style from './_.module.css'
import { type SetCSSVariable, type FormItemExtended } from '@components/utility'


const setCSSVariable:SetCSSVariable<[
  "--label-min-width"
]> = ({labelMinWidth}) => {
  return   {
    "--label-min-width": labelMinWidth ?? '',
  }
}


export default function InputText({
  elms, message, labelMinWidth,
}:FormItemExtended & {
  labelMinWidth?: string,
}){

  return  (
    <div className={`${style.wrap}`} style={setCSSVariable({labelMinWidth})}>
      {elms.map(({label, registerReturn, inputHTMLAttribute})=>{
        return (
          <label className={style.label} key={registerReturn.name}>
            {
              typeof label === 'string' ?
              (<span className={style.innerLabel}>{label}</span>)
              : label
            }
            <input className={style.input} type='text' {...registerReturn} {...inputHTMLAttribute}/>
          </label>
        )
      })}
      <div aria-live='polite' role='alert'>
        {message !==undefined && (
          <p className={style.errorMessage}>{message}</p>
        )}
      </div>
    </div>
    )
}