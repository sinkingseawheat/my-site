import style from './_.module.css'

/**
 *
 * @param idToMove スキップナビの遷移先
 * @returns
 */
export default function SkipNav({
  idToMove,
  ref,
}:{
  idToMove:string,
  ref:React.RefObject<HTMLElement | null>
}){
  return (<a
    className={style.wrap}
    href={`#${idToMove}`}
    onClick={(e)=>{
      const offsetElm = ref.current
      if(offsetElm){
        e.preventDefault()
        e.stopPropagation()
        const isTabIndexEmpty = offsetElm.getAttribute(`tabindex`) === null
        if(isTabIndexEmpty){
          offsetElm.setAttribute(`tabindex`,`-1`)
        }
        const offsetY = offsetElm.clientHeight
        window.scrollTo({
          top: -1 * offsetY,
          behavior: 'smooth',
        })
        setTimeout(()=>{
          offsetElm.focus();
          if(isTabIndexEmpty){
            offsetElm.removeAttribute(`tabindex`)
          }
        },1)
        return false
      }
      return true
    }}
  >
    コンテンツへ移動する
  </a>);
}