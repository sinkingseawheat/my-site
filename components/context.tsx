import { createContext, type ReactNode, type Dispatch, type SetStateAction } from "react";

export const PopupContext = createContext<
  [ReactNode, Dispatch<SetStateAction<ReactNode>>]
>(['', ()=>{}])

export const RefFixedAtTopContext = createContext<
  React.RefObject<HTMLElement|null>[]
>([])