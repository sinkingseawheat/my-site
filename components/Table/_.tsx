'use client'
import style from './_.module.css'
import { useState, useDeferredValue, useContext } from 'react';
import { Button } from "@components/all";
import { PopupContext } from '@components/context'
import { SetCSSVariable } from '@components/utility'
import { EOL } from "node:os"
import { getTextDataFromReactNode } from "./sub/getTextDataFromReactNode"

const setCSSVariable: SetCSSVariable<[
  "--max-height",
  "--min-column-width"
]> = ({ maxHeight, columnMinWidth }) => (
  {
    "--max-height": maxHeight ?? '',
    "--min-column-width": columnMinWidth ?? ''
  }
)

export default function Table<TRows extends Readonly<React.ReactNode>[]>({
  maxHeight,
  columnMinWidthArray,
  caption,
  theadElement,
  originalData,
}: {
  maxHeight?: string,
  columnMinWidthArray?: string[],
  caption: React.ReactNode,
  theadElement: TRows,
  originalData: Readonly<Readonly<TRows>[]>,
}) {
  // 最初の行と列に項番を追加
  type Data = [
    number[],
    ...([number, ...TRows][])
  ]

  const [_data, setData] = useState<Data | null>(null)
  const data = useDeferredValue(_data, null)

  const [_, setPopupMessage] = useContext(PopupContext)

  // 最初の行に項番と見出し、最初の列に項番を追加する。そして、各配列の添え字のみを複製してミュータブルにして並び替えを可能にする。
  // thは一旦最初の行で固定する
  // -1  0  1  2 ...
  // -1 th th th ...
  //  0 td td td ...
  if (data === null) {
    setData([
      (new Array(originalData.length+1).fill('').map((_, index) => index-1)),
      [-1, ...theadElement],
      ...originalData.map<[number, ...TRows]>((row, index) => [index, ...row])
    ])
  }
  if(data === null){
    return <></>
  }
  return (
    <div className={style.wrap} style={setCSSVariable({ maxHeight })}>
      <div className={style.func}>
        <Button type="button" onClick={async () => {
          const textData = data.map((rows) => {
            [, ...rows].map((cell) => { getTextDataFromReactNode(cell) }).join(`\t`)
          }).join(EOL)
          await navigator.clipboard.writeText(textData)
          if (setPopupMessage !== undefined) {
            setPopupMessage(`「${caption}」のデータクリップボードにコピーしました`)
          }
        }}>
          データをタブ区切りかつ結合無しでコピーする
        </Button>
      </div>
      <table className={style.table}>
        <caption className={style.caption}>
          {caption}
        </caption>
        <thead className={style.thead}>
          <tr className={style.theadTr}>
            {data[1].map((cell, cellIndex)=>{
              // 項番は非表示
              if(cellIndex === 0){
                return null
              }
              return (<th
                className={style.th}
                scope='column'
                key={`cell-${data[1][0]}-${data[0][cellIndex]}`}
                style={setCSSVariable({columnMinWidth: columnMinWidthArray?.[data[0][cellIndex]]})}>
                {cell}
              </th>)
            }).filter((cell)=>cell!==null)}
          </tr>
        </thead>
        <tbody className={style.body}>
          {data.map((row, rowIndex) => {
            // 項番は非表示。theadはスキップ
            if(rowIndex === 0 || rowIndex === 1){
              return null
            }
            return (
              <tr className={style.tbodyTr} key={`tr-${row[0]}`}>
                {row.map((cell, cellIndex) => {
                  // 項番は非表示
                  if(cellIndex === 0){
                    return null
                  }
                  return (
                    cellIndex === 0 ?
                      <th
                        className={style.th}
                        scope='column'
                        key={`cell-${data[rowIndex][0]}-${data[0][cellIndex]}`}
                        style={setCSSVariable({columnMinWidth: columnMinWidthArray?.[cellIndex]})}>
                        {cell}
                      </th>
                      : <td
                        className={style.th}
                        key={`cell-${data[rowIndex][0]}-${data[0][cellIndex]}`}>
                          {cell}
                      </td>
                  )
                }).filter((cell)=>cell!==null)}
              </tr>
            )
          }).filter((row)=>row!==null)}
        </tbody>
      </table>
    </div>
  )
}