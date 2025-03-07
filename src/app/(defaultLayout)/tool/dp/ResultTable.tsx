'use client'
import style from './ResultTable.module.css'
import { Button } from '@components/all'
import { useState, useEffect, useContext } from 'react'
import { PopupContext } from '@components/context'

type VariableCSSProperties = React.CSSProperties & {
  [key:`--${string}`]:string,
}

const setVariableWrap = ({contentHeight, cellMinWidth}:{contentHeight?:string, cellMinWidth?:string}):VariableCSSProperties => (
  {
    "--content-height":contentHeight ?? '',
    "--min-cell-width":cellMinWidth ?? ''
  }
)

export function ResultTable<T extends string[]>({
  cellMinWidth,
  contentHeight,
  caption,
  data,
  fillType,
}: {
  cellMinWidth?:string,
  contentHeight?:string,
  caption: React.ReactElement|string,
  data: T[],
  fillType: string,
}) {

  const [, setPopupMessage] = useContext(PopupContext)

  const fillInBrowserType01:(row:T)=>T = (row)=>{
    const v = structuredClone(row)
    v[1] = window.matchMedia(`${v[0]}`)?.matches.toString()
    return v;
  }

  const fillInBrowserType02:(row:T)=>T = (row)=>{
    const v = structuredClone(row)
    v[3] = `(${v[0]}${v[1] ? `: ${v[1]}` : ''})`
    v[2] = window.matchMedia(`${v[3]}`)?.matches.toString()
    return v;
  };

  const [filledData, setFilledData] = useState<T[]>([]);

  useEffect(()=>{
    setFilledData(data.map((row,index) => {
      if(index===0){
        return row;
      }else{
        if(fillType==='1'){
          return fillInBrowserType01(row)
        }else if(fillType==='2'){
          return fillInBrowserType02(row)
        }else{
          return row
        }
      }})
    );
  },[data, fillType]);

  const [theadData, ...tbodyData] = filledData;
  if(!Array.isArray(tbodyData) || tbodyData.length===0){
    return (<></>)
  }

  const textCopying = tbodyData.map((row)=>row.join('\t')).join('\n');

  return (
    <div className={style.wrap} style={setVariableWrap({contentHeight, cellMinWidth})}>
      <table className={style.table}>
        <caption className={style.caption}>
          <span className={style.caption_i}>
            {caption}
            <Button type="button" onClick={()=>{
              navigator.clipboard.writeText(textCopying).then(()=>{
                if(setPopupMessage !== undefined){
                  setPopupMessage(`クリップボードにコピーしました\n${textCopying}`)
                }
              })
            }}>
              データをタブ区切りかつ結合無しでコピーする
            </Button>
          </span>
        </caption>
        <thead>
          <tr>
            {theadData.map((cell)=>{
              return (<th scope='col' key={`thead${cell}`}>{cell}</th>);
            })}
          </tr>
        </thead>
        <tbody className="p_table__body">
          {tbodyData.map((row)=>{
            return (
              <tr className={style.tr} key={`tBodyTr${row[0]}${row[1]}`} data-match-media={row.includes('true')}>
                {row.map((cell, index)=>{
                  return (
                    index===0 ?
                    <th scope='row' key={`tBody${index}`}>{cell}</th>
                    : <td key={`tBody${index}`}>{cell}</td>
                  )
                })}
              </tr>
              )
          })}
        </tbody>
      </table>
    </div>
  );
}