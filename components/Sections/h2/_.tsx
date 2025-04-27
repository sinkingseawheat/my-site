import style from './_.module.css'

export function H2({
  children,
  title,
}:{
  children: React.ReactNode,
  title: React.ReactNode,
}){
  return (
    <div className={style.wrap}>
      <h2 className={style.hdng}>
        {
          typeof title === 'string' ?
          (<span className={style.hdng_i}>{title}</span>)
          : title
        }
      </h2>
      <div className={style.cnt}>
        {children}
      </div>
    </div>
  )
}