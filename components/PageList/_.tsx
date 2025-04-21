"use client"
import { type schemaPageList } from '@preprocess/getPageList';
import z from 'zod'
import { S, List, LinkText } from '@components/all';
import { useState, useEffect } from 'react';

export default function PageList(){

  const [list, setList] = useState<z.infer<typeof schemaPageList>[]>([])

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
      <List>
        {list.filter((linkElm)=>linkElm.label==='other').map((linkElm)=>{
          return (<LinkText href={linkElm.url} key={linkElm.url} isOpenAnotherTab={false}>{linkElm.title}</LinkText>)
        })}
      </List>
      <S.lv3 title='開発した・しているツール'>
        <List>
          {list.filter((linkElm)=>linkElm.label==='tool').map((linkElm)=>{
            return (<LinkText href={linkElm.url} key={linkElm.url} isOpenAnotherTab={false}>{linkElm.title}</LinkText>)
          })}
        </List>
      </S.lv3>
      <S.lv3 title='外部サイトにあるもの'>
        <List>
          {list.filter((linkElm)=>linkElm.label==='outside').map((linkElm)=>{
            return (<LinkText href={linkElm.url} key={linkElm.url} isOpenAnotherTab={true}>{linkElm.title}</LinkText>)
          })}
        </List>
      </S.lv3>
    </S.lv2>
  )
}