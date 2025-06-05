import { LinkElm } from "@components/all"
import style from './_.module.css';
export function Banner__contact(){
  return (
    <dl className={style.dl}>
      <dt className={style.dt}>ウェブについての相談フォームを開設しました</dt>
      <dd className={style.dd}>
        <span className={style.dd_i}>お困りのことがありましたら、とりあえず相談してみませんか？<br />解決の指針が見えてくるかもしれません。<br /></span>
        <span className={style.dd_i}><LinkElm href='/contact/' isOpenAnotherTab={false}>緑ノ企鵝ウェブ相談所　相談フォーム</LinkElm></span>
      </dd>
    </dl>)
}