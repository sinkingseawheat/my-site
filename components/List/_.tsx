import style from './_.module.css';

const UnorderedItem = ({
  children,
  bullet
}:Pick<Parameters<typeof List>[0], 'children'|'bullet'>
)=>{
  return (
    [children].flat().map((elm, index)=>{
      return (
        <li className={style.uItem} key={index}>
          {
            bullet!=='' && (<span className={style.uBullet} role='presentation'>{bullet}</span>)
          }
          <div className={style.uItem_i}>{elm}</div>
        </li>
      )
    })
  )
}



type Unordered = {
  children: React.ReactNode,
  bullet:'※'|'・'|'',
}

export default function List({
  children,
  bullet,
}:Unordered){
  if(
    children === null
    || children === undefined
  ){
    return <></>
  }else{
    return(
      <div className={style.wrap}>
        <ul className={style.uList}>
          <UnorderedItem {...{children, bullet}} />
        </ul>
      </div>
    )
  }
}