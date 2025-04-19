import style from './_.module.css'
import { type StyleValue, type FormTextareaItemExtended } from '@components/utility'


export default function Textarea({
  elms, message, styleValue,
}:FormTextareaItemExtended & {
  styleValue?: StyleValue<'--area-min-height'>
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
        <textarea className={style.textarea} {...registerReturn} {...baseAttributes}/>
      </label>
      <div aria-live='polite' role='alert'>
        {message !==undefined && (
          <p className={style.errorMessage}>{message}</p>
        )}
      </div>
    </div>
    )
}