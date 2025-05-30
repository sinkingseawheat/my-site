'use client'
import style from './_.module.css'
import { type StyleValue, type FormInputItemExtended } from '@components/utility'
import { useId, useState } from 'react'
import { L, } from '@components/all'
import { InputFileImages__preview } from './sub/InputFileImages__preview'

export default function InputFileImages({
  elms, message, styleValue, getValues, setValue, trigger, isEditable,
}:FormInputItemExtended<false> & {
  styleValue?: StyleValue<'--preview-min-width'>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getValues: (name:any)=>FileList|undefined, // 一旦anyでごまかす
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setValue: (name:any, fileList:FileList)=>void, // 一旦anyでごまかす
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  trigger: (name:any)=>void, // 一旦anyでごまかす
  isEditable: boolean,
}){
  const {
    label,
    registerReturn,
    baseAttributes
  } = elms

  const name = registerReturn.name

  const [imageFiles, setImageFiles] = useState<File[]>([])

  const inputFileDescriptionId = useId()

  return  (
    <div className={style.wrap}>
      {isEditable || <hr />}
      <p className={style.title}>{label}</p>
      {isEditable && <label className={style.label}>
        <span
          id={inputFileDescriptionId}
          className={style.innerLabel}>
          送信する画像を選択する（約6MBまでのjpgまたはpngを選択可能）
        </span>
        <input
          aria-describedby={inputFileDescriptionId}
          type='file'
          className={style.input}
          accept='image/png, image/jpeg'
          multiple
          {...baseAttributes}
          onClick={(e)=>{ e.currentTarget.value='' }}
          onChange={(e)=>{
            const files = e.currentTarget.files
            if(files !== null){
              // 重複はまだ考慮しない。
              const dataTransfer = new DataTransfer()
              const prevFiles = Array.from(getValues(name) ?? [])
              for(const file of prevFiles){
                dataTransfer.items.add(file)
              }
              const newFiles = Array.from(files)
              for(const file of newFiles){
                dataTransfer.items.add(file)
              }
              setValue(name, dataTransfer.files)
              setImageFiles(Array.from(dataTransfer.files))
              trigger(name)
          }}}
        />
      </label>}
      <input type='hidden' autoComplete='off' {...registerReturn} />
      <div className={style.preview}>
        <L.grid styleValue={{'--min-width':styleValue?.['--preview-min-width'] ?? '20em','--fill-or-fit':'auto-fill'}}>
          {imageFiles.length === 0 ? <p>画像が選択されていません</p> : imageFiles.map(
            (file, index)=><InputFileImages__preview key={index} {...{isEditable, file, getValues, setValue, trigger, setImageFiles, index, registerReturn}}/>
          )}
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