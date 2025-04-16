import { type ReactNode, type InputHTMLAttributes, TextareaHTMLAttributes } from "react"
import { type UseFormRegisterReturn } from "react-hook-form"

export type VariableCSSProperties<TKeys extends `--${string}`[]> = React.CSSProperties & {
  [key in TKeys[number]]:string
}

export type SetCSSVariable<TKeys extends `--${string}`[]> = (styleValue:Partial<Record<string,string>>)=>VariableCSSProperties<TKeys>

export type FormInputItemExtended<TIsArray extends Boolean = true> = {
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