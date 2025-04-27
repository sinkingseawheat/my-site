import style from './_.module.css'

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
          {children}
        </dd>
      {/* </div> */}
    </dl>
  )
}