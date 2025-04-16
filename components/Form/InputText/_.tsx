import style from './_.module.css'
import { type SetCSSVariable, type FormInputItemExtended } from '@components/utility'


const setCSSVariable:SetCSSVariable<[
  "--label-min-width"
]> = ({labelMinWidth}) => {
  return   {
    "--label-min-width": labelMinWidth ?? '',
  }
}


export default function InputText({
  elms, message, labelMinWidth,
}:FormInputItemExtended<false> & {
  labelMinWidth?: string,
}){
  const {
    label,
    registerReturn,
    inputHTMLAttribute
  } = elms
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