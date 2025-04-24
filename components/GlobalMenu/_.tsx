'use client'
import style from './_.module.css';
import { type KeyboardEvent, useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { PageList } from '@components/all';

export default function GlobalMenu(){

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
      const elms = Array.from(e.currentTarget.querySelectorAll<HTMLElement>('a[href],button,[tabindex]:not([tabindex="-1"]),[role="button"],input,textarea'))
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
      className={style.openHumbergerBtn}
      onClick={handleShowDialog}
      aria-label='モーダルを開く'
    >
      <svg viewBox="0 0 44 44" className={style.humberger} xmlns="http://www.w3.org/2000/svg">
        <circle className={style.humberger__circle} cx="22" cy="22" r="21"/>
        <circle className={style.humberger__circle} cx="22" cy="22" r="19"/>
        <line className={style.humberger__line} x1="11" y1="15" x2="33" y2="15" strokeLinecap="round" strokeWidth="2"/>
        <line className={style.humberger__line} x1="11" y1="22" x2="33" y2="22" strokeLinecap="round" strokeWidth="2"/>
        <line className={style.humberger__line} x1="11" y1="29" x2="33" y2="29" strokeLinecap="round" strokeWidth="2"/>
      </svg>
    </button>
    <dialog
      className={style.wrapModal}
      ref={refDialog}
      onClick={e=>{
        if(e.target === refDialog.current){
          handleCloseDialog()
        }
      }}
      onKeyDownCapture={onHandleKeyDown}
    >
      <div className={style.wrapModalInner}>
        <div className={style.wrapBtn}>
          <button
            className={style.closeBtn}
            type='button'
            autoFocus
            aria-label='モーダルを閉じる'
            onClick={handleCloseDialog}
          >
            <svg className={style.svg} viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg">
              <circle className={style.svg__fg} cx="22" cy="22" r="21"/>
              <circle className={style.svg__bg} cx="22" cy="22" r="19"/>
              <line className={style.svg__fg} x1="14" y1="14" x2="29.4" y2="29.4" strokeLinecap="round" strokeWidth="2"/>
              <line className={style.svg__fg} x1="14.2" y1="29.8" x2="29.8" y2="14.2" strokeLinecap="round" strokeWidth="2"/>
            </svg>
          </button>
        </div>
        <div className={style.wrapContent}>

        <nav>
          <PageList />
        </nav>
        </div>
      </div>
    </dialog>
    </>
  )
}