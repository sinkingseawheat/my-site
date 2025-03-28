import { type ReactNode, type InputHTMLAttributes } from "react"
import { type UseFormRegisterReturn } from "react-hook-form"

export type VariableCSSProperties<TKeys extends `--${string}`[]> = React.CSSProperties & {
  [key in TKeys[number]]:string
}

export type SetCSSVariable<TKeys extends `--${string}`[]> = (styleValue:Partial<Record<string,string>>)=>VariableCSSProperties<TKeys>

export type FormItemExtended = {
  elms: {
    label: ReactNode,
    registerReturn: UseFormRegisterReturn,
    inputHTMLAttribute? : Omit<InputHTMLAttributes<HTMLInputElement>,'type'>,
  }[],
  message?: string,
}