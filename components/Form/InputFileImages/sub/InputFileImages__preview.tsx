import { F } from '@components/all'
import style from '../_.module.css'
import { type Dispatch, type SetStateAction, useState } from 'react'
import { type UseFormRegisterReturn } from 'react-hook-form'
import { getNumbersWithDigitSeparators } from '@components/utility'

export function InputFileImages__preview({
  isEditable, file, getValues, setValue, trigger, setImageFiles, index, registerReturn
}:{
  isEditable: boolean,
  file: File,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getValues: (name:any)=>FileList|undefined, // 一旦anyでごまかす
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setValue: (name:any, fileList:FileList)=>void, // 一旦anyでごまかす
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  trigger: (name:any)=>void, // 一旦anyでごまかす
  setImageFiles: Dispatch<SetStateAction<File[]>>,
  index: number,
  registerReturn: UseFormRegisterReturn,
}){
  const [imageWidth, setImageWidth] = useState<number>(0)
  const name = registerReturn.name
  return (
    <>
    <figure>
      <img
        src={URL.createObjectURL(file)}
        alt=''
        onLoad={(e)=>{
          URL.revokeObjectURL(e.currentTarget.src)
          setImageWidth(e.currentTarget.naturalWidth)
        }}
        />
      <figcaption>
        {file.name}<br />
        <strong>サイズ</strong>: {getNumbersWithDigitSeparators(file.size)} Byte<br />
        {imageWidth !== 0 && <><strong>画像の幅</strong>: {getNumbersWithDigitSeparators(imageWidth)}px</>}<br />
        {imageWidth > 600 && <span>⚠️幅600pxにリサイズされます</span>}
      </figcaption>
    </figure>
    {isEditable && <F.Button
      type='button'
      className={style.removeBtn}
      styleValue={{'--color-button-bdr':'var(--color-fg)','--color-button-bg':'var(--color-bg)','--color-button-fg':'var(--color-fg)'}}
      onClick={()=>{
        const is = window.confirm(`${file.name}を削除しますか？`)
        if(!is){ return undefined }
        const dataTransfer = new DataTransfer()
        const removedData = Array.from(getValues(name) ?? []).filter((_, indexOfThisImage) => index !== indexOfThisImage )
        for(const file of removedData){
          dataTransfer.items.add(file)
        }
        setValue(name, dataTransfer.files)
        setImageFiles(Array.from(dataTransfer.files))
        trigger(name)
      }}>この画像を削除する
    </F.Button>}
    </>
  )
}