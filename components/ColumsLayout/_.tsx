import style from './_.module.css'

type VariableCSSProperties = React.CSSProperties & {
  [key:`--${string}`]:string,
}

const setVariable = (minColumnWidth:string|undefined, columnGap:string|undefined, ):VariableCSSProperties => {
  return   {
    "--min-width": minColumnWidth ?? '',
    "--column-gap": columnGap ?? '',
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
}:{
  children: Children | Children[],
  minColumnWidth?:string,
  columnGap?:string,
}){
  const items = Array.isArray(children) ? children : [children];
  return (
    <div className={style.wrap} style={setVariable(minColumnWidth,columnGap)}>
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