import style from './_.module.css'
import React from 'react'

import { type StyleValue } from '@components/utility'

/**
 * React.Childrenは壊れやすいので注意。カスタマイズしない。
 */
export default function item({
  children,
  styleValue,
}:{
  children?: React.ReactNode,
} & {styleValue?: StyleValue<'--justify-content'|'--align-items'>})
{
  if(children === undefined){return <></>}
  return (
    <div className={style.wrap} style={styleValue}>
      {children}
    </div>
  )
}