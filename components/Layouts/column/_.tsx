import style from './_.module.css'

type VariableCSSProperties = React.CSSProperties & {
  [key:`--${string}`]:string,
}

const setVariable = ({minColumnWidth,columnGap,rowGap,marginTop}
  :{
    minColumnWidth?:string,
    columnGap?:string,
    rowGap?:string,
    marginTop?:string,
  }):VariableCSSProperties => {
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
} & Parameters<typeof setVariable>[0])
{
  const items = Array.isArray(children) ? children : [children];
  return (
    <div className={style.wrap} style={setVariable({minColumnWidth,columnGap,rowGap,marginTop})}>
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