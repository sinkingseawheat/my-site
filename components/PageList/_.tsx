import { schemaPageListItem } from '@preprocess/getPageListItem';
import z from 'zod'
import { S, List, LinkText } from '@components/all';
import json from '@/../public/pagelist.json'

export default async function PageList(){

  const schemaPageList = z.array(schemaPageListItem)
  const list = schemaPageList.safeParse(json).data

  if(list === undefined){
    return <></>
  }

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