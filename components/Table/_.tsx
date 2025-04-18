'use client'
import style from './_.module.css'
import { useState, useDeferredValue, useContext, useEffect } from 'react';
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

/**
 * 推論による型決定ではReact.ReactNodeの配列とは定まらない場合があります。そのため、
 * ```tsx
 * <Table<[React.ReactNode, React.ReactNode]>>
 * ```
 * のようにインスタンス化しないとエラーが出る場合があります。
 */
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
  useEffect(()=>{
    setData([
      (new Array((originalData.length)+1).fill('').map((_, index) => index-1)),
      [-1, ...theadElement],
      ...originalData.map<[number, ...TRows]>((row, index) => [index, ...row])
    ])
  },[originalData, theadElement])
  if(data === null){
    return <></>
  }
  return (
    <div className={style.wrap} style={setCSSVariable({ maxHeight })}>
      <div className={style.func}>
        <Button type="button" onClick={async () => {
          const textData = data.toSpliced(0,1).map(
            (rows) => rows.toSpliced(0,1).map(
              (cell) => getTextDataFromReactNode(cell)
            ).join(`\t`)).join(EOL)
          await navigator.clipboard.writeText(textData)
          if (setPopupMessage !== undefined) {
            setPopupMessage(`「${getTextDataFromReactNode(caption)}」のデータクリップボードにコピーしました`)
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
            {data[1].toSpliced(0,1).map((cell, cellIndex)=>{
              return (<th
                className={style.th}
                scope='column'
                key={`cell-${data[1][0]}-${data[0][cellIndex+1]}`}
                style={setCSSVariable({columnMinWidth: columnMinWidthArray?.[data[0][cellIndex+1]]})}>
                {cell}
              </th>)
            })}
          </tr>
        </thead>
        <tbody className={style.body}>
          {data.toSpliced(0,2).map((row, rowIndex) => {
            return (
              <tr className={style.tbodyTr} key={`tr-${data[rowIndex+2][0]}`}>
                {row.toSpliced(0,1).map((cell, cellIndex) => {
                  return (
                    <td
                      className={style.th}
                      key={`cell-${data[rowIndex+2][0]}-${data[0][cellIndex+1]}`}>
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