'use client'
import style from './_.module.css'
import { type StyleValue, type FormInputItemExtended } from '@components/utility'
import { useId, useState } from 'react'
import { L } from '@components/all'

export default function InputFileImages({
  elms, message, styleValue, getValues, setValue, trigger,
}:FormInputItemExtended<false> & {
  styleValue?: StyleValue<'--preview-min-width'>,
  getValues: (name:any)=>FileList|undefined, // 一旦anyでごまかす
  setValue: (name:any, fileList:FileList)=>void, // 一旦anyでごまかす
  trigger: (name:any)=>void, // 一旦anyでごまかす
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
      <p className={style.title}>{label}</p>
      <label className={style.label}>
        <span id={inputFileDescriptionId} className={style.innerLabel}>アップロードする画像を選択する（ドラッグ&ドロップでも可能）</span>
        <input aria-describedby={inputFileDescriptionId} type='file' className={style.input} accept='image/*' multiple {...baseAttributes} onChange={(e)=>{
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
              }
            }} />
      </label>
      <input type='hidden' {...registerReturn} />
      <div className={style.preview}>
        <L.grid styleValue={{'--min-width':styleValue?.['--preview-min-width'] ?? '20em'}}>
          {imageFiles.map((file, index)=>{
            return (
              <L.modal
                key={index}
                btnElm={<img src={URL.createObjectURL(file)} alt='' onLoad={(e)=>{URL.revokeObjectURL(e.currentTarget.src)}} />}
              >
                <L.item>
                  <img src={URL.createObjectURL(file)} alt='' onLoad={(e)=>{URL.revokeObjectURL(e.currentTarget.src)}} />
                  <button onClick={()=>{
                  const dataTransfer = new DataTransfer()
                  const removedData = Array.from(getValues('images') ?? []).filter((_, indexOfThisImage) => index !== indexOfThisImage )
                  for(const file of removedData){
                    dataTransfer.items.add(file)
                  }
                  setValue('images', dataTransfer.files)
                  setImageFiles(Array.from(dataTransfer.files))
                  trigger('images')
                  // todo:削除したらモーダルを閉じる
                }}>この画像を削除する</button>
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