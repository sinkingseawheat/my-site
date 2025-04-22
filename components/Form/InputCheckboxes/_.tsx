import style from './_.module.css'
import { type FormInputItemExtended } from '@components/utility'
import { SVGIcon } from '@components/all';

export default function InputCheckBoxes({
  elms, message,
}:FormInputItemExtended){

  return  (
    <div className={`${style.wrap}`}>
      <div className={style.wrapCheckboxes}>
        {elms.map(({
          label,
          registerReturn,
          baseAttributes,
        })=>{
          return(
            <div className={style.wrapCheckboxes__item} key={registerReturn.name}>
              <label className={style.label}>
                <input className={style.input} type='checkbox' {...registerReturn} {...baseAttributes}/>
                <span className={style.pseudo} role='presentation'>
                <SVGIcon.checkbox styleVariable={{'--color-fill':'var(--color-fixed-black)','--color-stroke':'var(--color-fg)'}} />
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