import style from './_.module.css'

import { type SetCSSVariable } from '@components/utility'

const setCSSVariable:SetCSSVariable<[
  "--min-width",
  "--column-gap",
  "--row-gap",
  "--margin-top"
]> = ({minColumnWidth,columnGap,rowGap,marginTop}) => {
  return   {
    "--min-width": minColumnWidth ?? '',
    "--column-gap": columnGap ?? '',
    "--row-gap": rowGap ?? '',
    "--margin-top": marginTop ?? '',
  }
}

type Children = React.ReactElement & {
  props: {
    keyId?:string,
  } & React.ReactElement['props']
};

export default function ColumnLayout({
  children,
  minColumnWidth,
  columnGap,
  rowGap,
  marginTop,
}:{
  children: Children | Children[],
} & {[key in 'minColumnWidth'|'columnGap'|'rowGap'|'marginTop']?:string})
{
  const items = Array.isArray(children) ? children : [children];
  return (
    <div className={style.wrap} style={setCSSVariable({minColumnWidth, columnGap, rowGap, marginTop})}>
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