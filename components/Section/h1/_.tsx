import style from './_.module.css'
import { L } from '@components/all'

export function H1({
  children,
  isSROnly,
  title,
}:{
  children?: React.ReactNode,
  isSROnly: boolean,
  title: React.ReactNode,
}){
  return (
    <div className={style.wrap}>
      <h1 className={`${style.hdng}${isSROnly ? ' u_sr_only' : ''}`} data-sr-only={isSROnly}>
        {
          typeof title === 'string' ?
          (<span className={style.hdng_i}>{title}</span>)
          : title
        }
      </h1>
      {children !== undefined && <div className={style.cnt}>
        <L.grid styleValue={{'--row-gap':'1em','--min-width':'100%'}}>
          {children}
        </L.grid>
      </div>}
    </div>
  )
}