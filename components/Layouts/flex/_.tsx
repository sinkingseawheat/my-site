import style from './_.module.css'

import { type StyleValue } from '@components/utility'

type Children = React.ReactNode & {
  props: {
    keyId?:string,
  } & React.ReactElement['props']
};

export default function Flex({
  children,
  styleValue,
}:{
  children: Children | Children[],
} & {styleValue?: StyleValue<'--column-gap'|'--row-gap'|'--margin-top'>})
{
  const items = Array.isArray(children) ? children : [children];
  return (
    <div className={style.wrap} style={styleValue}>
      {items.map((item,index)=>{
        return (
        <div className={style.item} key={item.props.keyId ?? index}>
          {item}
        </div>
        )
      })}
    </div>
  )
}