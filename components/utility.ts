import { type ReactNode, type InputHTMLAttributes, TextareaHTMLAttributes } from "react"
import { type UseFormRegisterReturn } from "react-hook-form"

export type StyleValue<TProperty extends `--${string}`, TValue extends string|string[] = string> = React.CSSProperties & Partial<Record<TProperty, TValue>>

export type FormInputItemExtended<TIsArray extends boolean = true> = {
  elms: TIsArray extends true ? {
    label: ReactNode,
    registerReturn: UseFormRegisterReturn,
    baseAttributes? : Omit<InputHTMLAttributes<HTMLInputElement>,'type'>,
  }[] : {
    label: ReactNode,
    registerReturn: UseFormRegisterReturn,
    baseAttributes? : Omit<InputHTMLAttributes<HTMLInputElement>,'type'>,
  },
  message?: string,
}

export type FormTextareaItemExtended = {
  elms: {
    label: ReactNode,
    registerReturn: UseFormRegisterReturn,
    baseAttributes? : TextareaHTMLAttributes<HTMLTextAreaElement>,
  },
  message?: string,
}

export const FOCUSABLE_ELEMENTS_SELECTOR = 'a[href],button,[tabindex]:not([tabindex="-1"]),[role="button"],input:not([type="hidden"]),textarea,select,iframe'

export const getNumbersWithDigitSeparators = (targetNumbers:number|string, separator:string=','):string => {
  let returnValue:string = ''
  if(typeof targetNumbers === 'string'){
    if(
      !/^[\-\+]?(0|[1-9]\d*)$/.test(targetNumbers) // 0以外の数値で、0始まりの場合
      || !(new RegExp(`^[\\-\\+]?[\\d\\${separator}]`).test(targetNumbers)) // 数値とセパレータ以外を含む
    ){
      console.error(`「${targetNumbers}」を桁区切りにできませんでした`)
      return targetNumbers // 桁区切りにできなかったらそのまま返す
    }
  }else{
    if(
      Math.abs(targetNumbers) !== Math.abs(Math.floor(targetNumbers))
    ){
      console.error(`「${targetNumbers}」を桁区切りにできませんでした`)
      return targetNumbers.toString() // 桁区切りにできなかったらstring型に変換するだけ
    }
  }
  returnValue = typeof targetNumbers === 'number' ? targetNumbers.toString() : targetNumbers.replaceAll(separator, '')
  return returnValue.replace(/(\d+?)(?=(\d{3})+(?!\d))/g, `$1${separator}`)
}