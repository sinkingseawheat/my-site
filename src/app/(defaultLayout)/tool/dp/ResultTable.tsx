'use client'
import { Table, L } from '@components/all'
import { useState, useEffect, } from 'react'

export function ResultTable() {
  const [filledData1, setFilledData1] = useState([
    ['all',''],
    ['print',''],
    ['screen',''],
    ['speech',''],
  ])
  const [filledData2, setFilledData2] = useState([
    ['any-hover','none','',''],
    ['any-hover','hover','',''],
    ['hover','none','',''],
    ['hover','hover','',''],
    ['any-pointer','none','',''],
    ['any-pointer','coarse','',''],
    ['any-pointer','fine','',''],
    ['pointer','none','',''],
    ['pointer','coarse','',''],
    ['pointer','fine','',''],
    ['prefers-reduced-motion','no-preference','',''],
    ['prefers-reduced-motion','reduce','',''],
    ['update','none','',''],
    ['update','slow','',''],
    ['update','fast','',''],
    ['prefers-color-scheme','light','',''],
    ['prefers-color-scheme','dark','',''],
    ['scripting','none','',''],
    ['scripting','initial-only','',''],
    ['scripting','enabled','',''],
    ['monochrome','0','',''],
    ['monochrome','','',''],
    ['orientation','portrait','',''],
    ['orientation','landscape','',''],
    ['display-mode','fullscreen','',''],
    ['display-mode','standalone','',''],
    ['display-mode','minimal-ui','',''],
    ['display-mode','browser','',''],
    ['color','','',''],
    ['color-gamut','srgb','',''],
    ['color-gamut','p3','',''],
    ['color-gamut','rec2020','',''],
    ['forced-colors','none','',''],
    ['forced-colors','active','',''],
    ['prefers-contrast','no-preference','',''],
    ['prefers-contrast','more','',''],
    ['prefers-contrast','less','',''],
    ['inverted-colors','none','',''],
    ['inverted-colors','inverted','',''],
    ['overflow-block','none','',''],
    ['overflow-block','scroll','',''],
    ['overflow-block','optional-paged','',''],
    ['overflow-block','paged','',''],
    ['overflow-inline','none','',''],
    ['overflow-inline','scroll','',''],
    ['grid','0','',''],
    ['grid','1','',''],
  ])

  useEffect((()=>{
    setFilledData1((prev)=>prev.map((([p])=>[p, window.matchMedia(p).matches.toString()])))
    setFilledData2((prev)=>prev.map(([group,v])=>{
      const condition = `(${v ? `${group}: ${v}` : group})`
      const isMatch = window.matchMedia(condition).matches.toString()
      return [group, v, isMatch, condition]
    }))
  }),[])

  return (
      <L.column styleValue={{'--min-width':'35em','--column-gap':'2em'}}>
    <Table
      styleValue={{'--max-height':'60vh'}}
      styleValueArray={{'--min-column-width':['6em','6em']}}
      caption='メディア種別'
      theadElement={['プロパティ','真偽値']}
    >
      {filledData1}
    </Table>
    <Table
      styleValue={{'--max-height':'60vh'}}
      styleValueArray={{'--min-column-width':['8em','8em','8em','8em']}}
      caption='メディア特性'
      theadElement={['プロパティ','値','真偽値','メディアクエリ']}
    >
      {filledData2}
    </Table>
    </L.column>)
}