import style from './_.module.css'
import { L } from '@components/all'

export function H2({
  children,
  title,
}:{
  children: React.ReactNode,
  title: React.ReactNode,
}){
  return ( children === undefined ? <></> :
    <div className={style.wrap}>
      <h2 className={style.hdng}>
        {
          typeof title === 'string' ?
          (<span className={style.hdng_i}>{title}</span>)
          : title
        }
      </h2>
      <div className={style.cnt}>
        <L.grid styleValue={{'--margin-top':'2em','--row-gap':'.8em','--min-width':'100%'}}>
          {children}
        </L.grid>
      </div>
    </div>
  )
}