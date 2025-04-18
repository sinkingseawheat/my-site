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
      const targetElm = document.getElementById(`${idToMove}`)
      if(targetElm && targetElm.tagName==='MAIN'){
        e.preventDefault()
        e.stopPropagation()
        const isTabIndexEmpty = targetElm.getAttribute(`tabindex`) === null
        if(isTabIndexEmpty){
          targetElm.setAttribute(`tabindex`,`-1`)
        }
        if(offsetElm){
          const offsetY = offsetElm.clientHeight
          window.scrollTo({
            top: -1 * offsetY,
            behavior: 'smooth',
          })
        }
        setTimeout(()=>{
          targetElm.focus();
          // フォーカス位置が飛ぶのでtabindexは残す
          /* if(isTabIndexEmpty){
            targetElm.removeAttribute(`tabindex`)
          } */
        },1)
        return false
      }
      return true
    }}
  >
    コンテンツへ移動する
  </a>);
}