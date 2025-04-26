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