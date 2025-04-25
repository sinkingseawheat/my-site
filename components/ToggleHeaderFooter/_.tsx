'use client'
import style from './_.module.css';
import { type SetStateAction } from 'react';
import { SVGIcon } from '@components/all';

export default function ToggleHeaderFooter({
  isHFExpanded,
  setIsHFExpanded,
}:{
  isHFExpanded:boolean,
  setIsHFExpanded:React.Dispatch<SetStateAction<boolean>>,
}){
  return (
    <button
      type='button'
      className={style.wrap}
      aria-expanded={isHFExpanded}
      aria-controls='aria-header aria-footer'
      aria-label={isHFExpanded ? `ヘッダーとフッターを隠す` : 'ヘッダーとフッターを表示する'}
      onClick={(e)=>{
        e.preventDefault()
        e.stopPropagation()
        setIsHFExpanded( isHFExpanded => !isHFExpanded )
      }}
    >
      <span className={style.svgIcon}>
        <SVGIcon.toggleHFtoShrink styleValue={{'--color-fg-svg':'var(--color-bg)','--color-bg-svg':'var(--color-primary)'}} />
      </span>
      <span className={style.svgIcon}>
        <SVGIcon.toggleHFtoExpanded styleValue={{'--color-fg-svg':'var(--color-bg)','--color-bg-svg':'var(--color-primary)'}} />
      </span>
    </button>
  );
}