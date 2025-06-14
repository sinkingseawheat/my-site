'use client'
import style from './_.module.css'
import { useState, useDeferredValue, useContext, useEffect } from 'react'
import { F, SVGIcon } from "@components/all"
import { StyleValue } from '@components/utility'
import { copyTextData } from './sub/copy'
import { PopupContext } from '@components/context'
import { getTextDataFromReactNode } from './sub/getTextDataFromReactNode'

/**
 * 推論による型決定ではReact.ReactNodeの配列とは定まらない場合があります。そのため、
 * ```tsx
 * <Table<[React.ReactNode, React.ReactNode]>>
 * ```
 * のようにインスタンス化しないとエラーが出る場合があります。
 */
export default function Table<TRows extends Readonly<React.ReactNode>[]>({
  styleValue,
  styleValueArray,
  caption,
  theadElement,
  mergedViewOption,
  children,
}: {
  styleValue?: StyleValue<'--max-height'>,
  styleValueArray?: StyleValue<'--min-column-width',string[]>
  caption: React.ReactNode,
  theadElement: TRows,
  mergedViewOption?: 'rowspan'|'colspan',
  children: Readonly<Readonly<TRows>[]>,
}) {
  // 最初の行と列に項番を追加
  type Data = [
    number[],
    ...([number, ...TRows][])
  ]

  const [_data, setData] = useState<Data | null>(null)
  const data = useDeferredValue(_data, null)
  const [, setPopupMessage] = useContext(PopupContext)

  // 最初の行に項番と見出し、最初の列に項番を追加する。そして、各配列の添え字のみを複製してミュータブルにして並び替えを可能にする。
  // thは一旦最初の行で固定する
  // -1  0  1  2 ...
  // -1 th th th ...
  //  0 td td td ...
  useEffect(()=>{
    setData([
      (new Array((children.length)+1).fill('').map((_, index) => index-1)),
      [-1, ...theadElement],
      ...children.map<[number, ...TRows]>((row, index) => [index, ...row])
    ])
  },[children, theadElement])

  if(data === null){
    return <></>
  }
  return (
    <div className={style.wrap} style={styleValue}>
      <div className={style.func}>
      </div>
      <table className={style.table}>
        <caption>
          <span className={style.captionInner}>
            <span className={style.captionText}>
              {caption}
            </span>
            <span className={style.captionButton}>
              <F.Button type="button"
                onClick={async ()=>{
                  await copyTextData(data)
                  if (setPopupMessage !== undefined) {
                    setPopupMessage(`「${getTextDataFromReactNode(caption)}」のデータクリップボードにコピーしました`)
                  }
                }}
              >
                <SVGIcon.copy styleValue={{'--color-stroke':'var(--color-bg)'}}/>
              </F.Button>
            </span>
          </span>
        </caption>
        <thead className={style.thead}>
          <tr className={style.theadTr}>
            {data[1].toSpliced(0,1).map((cell, cellIndex)=>{
              return (<th
                className={style.th}
                scope='column'
                key={`cell-${data[1][0]}-${data[0][cellIndex+1]}`}
                style={{'--min-column-width': styleValueArray?.['--min-column-width']?.[data[0][cellIndex+1]]} as StyleValue<'--min-column-width'>}> {/* いい案が浮かばないのでアサートでごまかす */}
                {cell}
              </th>)
            })}
          </tr>
        </thead>
        <tbody className={style.body}>
          {data.toSpliced(0,2).map((_row)=>_row.toSpliced(0,1)).map((row, rowIndex) => {
            const matrix = data.toSpliced(0,2).map((row)=>row.toSpliced(0,1))
            return (
              <tr className={style.tbodyTr} key={`tr-${data[rowIndex+2][0]}`}>
                {row.map((cell, cellIndex, allRowData) => {
                  // string型などのプリミティブ型なら、同じデータが並んだときはセルをマージする
                  if(
                    (mergedViewOption === 'colspan' && cellIndex >= 1 && cell === allRowData[cellIndex-1])
                    || (mergedViewOption === 'rowspan' && rowIndex >= 1 && cell === matrix[rowIndex-1][cellIndex])
                  ){
                    // 左または上のセルと同じデータならスキップ
                    return null
                  }
                  const allColumnData = matrix.map((_row)=>_row[cellIndex])
                  let rowspan = 1
                  if(mergedViewOption==='rowspan'){
                    while(allColumnData[rowIndex+rowspan] !== undefined && cell === allColumnData[rowIndex+rowspan]){
                      rowspan++
                    }
                  }
                  // 右のセルと同じならcolspanを追加
                  let colspan = 1
                  if(mergedViewOption === 'colspan'){
                    while(allRowData[cellIndex+colspan] !== undefined && cell === allRowData[cellIndex+colspan]){
                      colspan++
                    }
                  }
                  return (
                    <td
                      className={style.td}
                      key={`cell-${data[rowIndex+2][0]}-${data[0][cellIndex+1]}`}
                      colSpan={colspan!==1 ? colspan : undefined}
                      rowSpan={rowspan!==1 ? rowspan : undefined}
                    >
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