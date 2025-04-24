import { createContext, type ReactNode, type Dispatch, type SetStateAction } from "react";

export const PopupContext = createContext<
  [ReactNode, Dispatch<SetStateAction<ReactNode>>]
>(['', ()=>{}])

export const HeaderFooterContext = createContext<
  {
    headerRef?: React.RefObject<HTMLElement|null>,
    isHFExpanded: boolean,
    setIsHFExpanded: Dispatch<SetStateAction<boolean>>,
  }
>({
  headerRef:undefined,
  isHFExpanded:true,
  setIsHFExpanded:()=>{}
})