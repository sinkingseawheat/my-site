export const getTextDataFromReactNode:(elm:React.ReactNode)=>string = (elm)=>{
  if(
    typeof elm === 'string'
    || typeof elm === 'number'
    || typeof elm === 'boolean'
  ){
    return elm.toString()
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
    && 'children' in elm['props']
  ){
    console.log('React.Element')
    // Todo altデータを取得
    return getTextDataFromReactNode(elm)
  }else{
    return ''
  }
}