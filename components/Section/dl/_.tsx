import style from './_.module.css'
import { L } from '@components/all'

export function Dl({
  children,
  title,
}:{
  children: React.ReactNode,
  title: React.ReactNode,
}){
  return (
    <dl className={style.wrap}>
      {/* <div className={style.item}> */}
        <dt className={style.hdng}>
          {
            typeof title === 'string' ?
            (<span className={style.hdng_i}>{title}</span>)
            : title
          }
        </dt>
        <dd className={style.cnt}>
          <L.grid styleValue={{'--margin-top':'0','--row-gap':'1em','--min-width':'100%'}}>
            {children}
          </L.grid>
        </dd>
      {/* </div> */}
    </dl>
  )
}