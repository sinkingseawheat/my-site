'use client'
import style from './_.module.css'
import { type StyleValue, type FormInputItemExtended } from '@components/utility'
import { type ChangeEventHandler, type MouseEventHandler } from 'react'
import { L } from '@components/all'

export default function InputFileImages({
  elms, message, handleOnChangeImages, resolveHandleOnClickButton, files, styleValue
}:FormInputItemExtended<false> & {
  handleOnChangeImages: ChangeEventHandler<HTMLInputElement>,
  resolveHandleOnClickButton: (index:number)=>MouseEventHandler<HTMLButtonElement>,
  files: File[],
  styleValue?: StyleValue<'--preview-min-width'>
}){
  const {
    label,
    registerReturn,
    baseAttributes
  } = elms

  return  (
    <div className={style.wrap}>
      <div className="label">{label}</div>
      <label>
        <span className={style.innerLabel}>アップロードする画像を選択する（ドラッグ&ドロップでも可能）</span>
        <input type='file' className={style.input} accept='image/*' multiple onChange={handleOnChangeImages} {...baseAttributes} />
      </label>
      <input type='hidden' {...registerReturn} />
      <div className={style.preview}>
        <L.grid styleValue={{'--min-width':styleValue?.['--preview-min-width'] ?? '20em'}}>
          {files.map((file, index)=>{
            return (
              <L.modal
                key={index}
                btnElm={<img src={URL.createObjectURL(file)} alt='' onLoad={(e)=>{URL.revokeObjectURL(e.currentTarget.src)}} />}
              >
                <L.item>
                  <img src={URL.createObjectURL(file)} alt='' onLoad={(e)=>{URL.revokeObjectURL(e.currentTarget.src)}} />
                  <button onClick={resolveHandleOnClickButton(index)}>この画像を削除する</button>
                </L.item>
              </L.modal>
            )
          })}
        </L.grid>
      </div>
      <div aria-live='polite' role='alert'>
        {message !==undefined && (
          <p className={style.errorMessage}>{message}</p>
        )}
      </div>
    </div>
  )
}