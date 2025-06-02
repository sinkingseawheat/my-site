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
} & {styleValue?: StyleValue<'--min-width'|'--max-width'|'--column-gap'|'--row-gap'|'--margin-top'|'--fill-or-fit'>})
{
  const _styleValue = {
    ...{
      '--min-width':'auto',
      '--max-width':'1fr',
      '--column-gap':'1rem',
      '--row-gap':'1rem',
      '--margin-top':'0',
      '--fill-or-fit':'auto-fit',
    },
    ...styleValue
  }
  if(children === undefined || children === null){return <></>}
  return (
    <div className={style.wrap} style={_styleValue}>
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