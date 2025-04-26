"use client"
import { schemaPageListItem } from '@preprocess/getPageListItem';
import z from 'zod'
import { S, List, LinkElm } from '@components/all';
import { useState, useEffect } from 'react';

export default function PageList(){

  const [list, setList] = useState<z.infer<typeof schemaPageListItem>[]>([])

  useEffect(()=>{
    (async ()=>{
      const response = await fetch(`/pagelist.json`)
      if(response.ok){
        const json = await response.json()
        setList(json)
      }
    })();
  },[]);

  return (
    <S.lv2 title='リンク一覧'>
      <List bullet=''>
        {list.filter((linkElm)=>linkElm.label==='other').map((linkElm)=>{
          return (<LinkElm href={linkElm.url} key={linkElm.url} isOpenAnotherTab={false} isNeedAriaCurrent={true}>{linkElm.title}</LinkElm>)
        })}
      </List>
      <S.lv3 title='開発した・しているツール'>
        <List bullet=''>
          {list.filter((linkElm)=>linkElm.label==='tool').map((linkElm)=>{
            return (<LinkElm href={linkElm.url} key={linkElm.url} isOpenAnotherTab={false} isNeedAriaCurrent={true}>{linkElm.title}</LinkElm>)
          })}
        </List>
      </S.lv3>
      <S.lv3 title='外部サイトにあるもの'>
        <List bullet=''>
          {list.filter((linkElm)=>linkElm.label==='outside').map((linkElm)=>{
            return (<LinkElm href={linkElm.url} key={linkElm.url} isOpenAnotherTab={true} isNeedAriaCurrent={true}>{linkElm.title}</LinkElm>)
          })}
        </List>
      </S.lv3>
    </S.lv2>
  )
}