import { H1 } from './h1/_'
import { H2 } from './h2/_'
import { H3 } from './h3/_'
import { Dl } from './dl/_'

type Arags = {
  type: '1',
  title: React.ReactNode,
  children?: React.ReactNode,
  isSROnly: boolean,
} | {
  type: '2'|'3'|'dl',
  title: React.ReactNode,
  children: React.ReactNode,
}

export default function Section(args:Arags){
  if(args.type === '1'){
    const {children, title, isSROnly} = args
    return (
      <H1 title={title} isSROnly={isSROnly}>
        {children}
      </H1>
    )
  }else{
    const {type, children, title} = args
    switch (type) {
      // returnしているのでbreakは不要
      case '2' :
        return (<H2 title={title}>{children}</H2>)
      case '3' :
        return (<H3 title={title}>{children}</H3>)
      case 'dl' :
        return (<Dl title={title}>{children}</Dl>)
      default:
        return (<></>)
    }
  }
}
