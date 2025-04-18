export const getTextDataFromReactNode:(elm:React.ReactNode)=>string = (elm)=>{
  if(
    typeof elm === 'string'
    || typeof elm === 'number'
    || typeof elm === 'boolean'
  ){
    return elm.toString().trim()
  }else if(
    elm instanceof Object
    && Symbol.iterator in elm
    && typeof elm[Symbol.iterator] === 'function'
  ){
    return Array.from(elm).map((child)=>getTextDataFromReactNode(child)).join('')
  }else if(
    elm instanceof Object
        && 'props' in elm
        && elm['props'] instanceof Object
        && 'type' in elm
        && 'key' in elm
  ){
    if(elm['type'] === 'img'){
      return getTextDataFromReactNode( ((elm as any)?.props?.alt ?? '') as string )
    }
    if(elm.props instanceof Object && 'children' in elm.props){
      return getTextDataFromReactNode(elm.props.children as React.ReactNode) // 一旦ReactNodeでアサート
    }
    return ''
  }else{
    return ''
  }
}