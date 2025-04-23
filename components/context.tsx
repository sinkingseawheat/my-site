import { createContext, type ReactNode, type Dispatch, type SetStateAction } from "react";

export const PopupContext = createContext<
  [ReactNode, Dispatch<SetStateAction<ReactNode>>]
>(['', ()=>{}])