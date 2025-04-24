'use client'
import style from './_.module.css'
import { LinkText } from '@components/all';

/**
 *
 * @param idToMove スキップナビの遷移先
 * @returns
 */
export default function SkipNav({
  idToMove,
}:{
  idToMove:string,
}){
  return (<div className={style.wrap}>
    <LinkText
      href={`#${idToMove}`}
      isOpenAnotherTab={false}
    >
      コンテンツへ移動する
    </LinkText>
  </div>);
}