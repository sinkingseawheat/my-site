import style from './_.module.css'
import React from 'react'

import { type StyleValue } from '@components/utility'

/**
 * React.Childrenは壊れやすいので注意。カスタマイズしない。
 */
export default function grid({
  children,
  styleValue,
}:{
  children?: React.ReactNode,
} & {styleValue?: StyleValue<'--min-width'|'--column-gap'|'--row-gap'|'--margin-top'|'--fill-or-fit'>})
{
  if(children === undefined || children === null){return <></>}
  return (
    <div className={style.wrap} style={styleValue}>
      {
        React.Children.map(
          children, (item, index)=>
        (
          <div className={style.item} key={index}>
            {item}
          </div>
        ))
      }
    </div>
  )
}