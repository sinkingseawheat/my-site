'use client'
import style from './_.module.css';
import { type KeyboardEvent, useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { FOCUSABLE_ELEMENTS_SELECTOR } from '@components/utility'
import { SVGIcon } from '@components/all';

export default function modal({
  btnElm,
  children,
}:{
  btnElm: React.ReactNode,
  children: React.ReactNode,
}){

  const _pathname = usePathname()
  const _searchParams = useSearchParams()

  // 遷移が発生したらモーダルを閉じる
  useEffect(()=>{
    handleCloseDialog()
  },[_pathname, _searchParams])

  const refDialog = useRef<HTMLDialogElement>(null)

  const handleShowDialog = ()=>{
    if(refDialog.current){
      refDialog.current?.showModal()
      if(window.matchMedia(`(prefers-reduced-motion: no-preference)`).matches){
        refDialog.current.animate([
        {transform:`scale(0)`},
        {transform:`scale(1)`},
      ],{
        duration:300,
        easing:'ease-out'
      })
      }
    }
  }

  const handleCloseDialog = ()=>{
    if(refDialog.current){
      if(window.matchMedia(`(prefers-reduced-motion: no-preference)`).matches){
        const animation =refDialog.current.animate([
          {transform:`scale(1)`},
          {transform:`scale(0)`},
        ],{
          duration:300,
          easing:'ease-out'
        })
        animation.onfinish = (()=>{
          refDialog?.current?.close();
        })
      }else{
        refDialog.current.close();
      }
    }
  }

  const onHandleKeyDown = (e:KeyboardEvent<HTMLDialogElement>)=>{
    if(e.key === 'Tab'){
      const focusedElement = e.target
      const elms = Array.from(e.currentTarget.querySelectorAll<HTMLElement>(FOCUSABLE_ELEMENTS_SELECTOR))
      if(e.shiftKey && focusedElement === elms.at(0)){
        e.preventDefault()
        elms?.at(-1)?.focus()
        return false
      }
      if(!e.shiftKey && focusedElement === elms.at(-1)){
        e.preventDefault()
        elms?.at(0)?.focus()
        return false
      }
      return true
    }
  }

  return (<>
    <button
      type='button'
      className={style.openHamburgerBtn}
      onClick={handleShowDialog}
      aria-label='モーダルを開く'
    >
      {btnElm}
    </button>
    <dialog
      className={style.wrap}
      ref={refDialog}
      onClick={e=>{
        if(e.target === refDialog.current){
          handleCloseDialog()
        }
      }}
      onKeyDownCapture={onHandleKeyDown}
    >
      <div className={style.inner}>
        <div className={style.wrapBtn}>
          <button
            type='button'
            autoFocus
            aria-label='モーダルを閉じる'
            onClick={handleCloseDialog}
          >
            <SVGIcon.btnClose styleValue={{'--color-bg-svg':'var(--color-primary)','--color-fg-svg':'var(--color-bg)'}} />
          </button>
        </div>
        <div className={style.wrapContent}>
          {children}
        </div>
      </div>
    </dialog>
    </>
  )
}