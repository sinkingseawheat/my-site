import style from './_.module.css';

type Elm = React.ReactElement | string
type Item = Elm | Elm[]
type Children = Item | Item[]


export default function List({
  children
}:{
  children: Children
}){
  return (
    !Array.isArray(children) || children.length===1 ?
    (<div className={style.list}><p className={style.item}>{
      typeof children === 'string' ?
      <span className={style.item_i}>{children}</span>
      : children
    }</p></div>)
    : children.length>0 ?
      (<ul className={style.list}>
        {children.map((elm, index)=>{
          return (
            <li className={style.item} key={index}>
              {
                typeof elm === 'string' ?
                <span className={style.item_i}>{elm}</span>
                : elm
              }
            </li>
          )
        })}
      </ul>)
      : null
  );
}