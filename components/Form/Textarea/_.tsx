import style from './_.module.css'
import { type SetCSSVariable, type FormTextareaItemExtended } from '@components/utility'


const setCSSVariable:SetCSSVariable<[
  "--area-min-height"
]> = ({areaMinHeight}) => {
  return   {
    "--area-min-height": areaMinHeight ?? '',
  }
}


export default function Textarea({
  elms, message, areaMinHeight,
}:FormTextareaItemExtended & {
  areaMinHeight?: string,
}){
  const {
    label,
    registerReturn,
    baseAttributes
  } = elms
  return  (
    <div className={`${style.wrap}`} style={setCSSVariable({areaMinHeight})}>
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