import style from './_.module.css'
import { type StyleValue, type FormInputItemExtended } from '@components/utility'


export default function InputText({
  elms, message, styleValue, type
}:FormInputItemExtended<false> & {
  styleValue?: StyleValue<'--label-min-width'>,
  type?: 'text'|'email',
}){
  const {
    label,
    registerReturn,
    baseAttributes
  } = elms
  return  (
    <div className={`${style.wrap}`} style={styleValue}>
      <label className={style.label}>
        {
          typeof label === 'string' ?
          (<span className={style.innerLabel}>{label}</span>)
          : label
        }
        <input className={style.input} type={type ?? 'text'} {...registerReturn} {...baseAttributes}/>
      </label>
      <div aria-live='polite' role='alert'>
        {message !==undefined && (
          <p className={style.errorMessage}>{message}</p>
        )}
      </div>
    </div>
    )
}