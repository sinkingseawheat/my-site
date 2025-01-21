'use client'
import style from './_.module.css';
import { type SetStateAction } from 'react';

export default function ToggleHeaderFooter({
  isHFExpanded,
  setIsHFExpanded,
}:{
  isHFExpanded:boolean,
  setIsHFExpanded:React.Dispatch<SetStateAction<boolean>>,
}){
  return (
    <button
      type='button'
      className={style.c_toggleHeaderFooterVisible}
      aria-expanded={isHFExpanded}
      aria-controls='aria-header aria-footer'
      data-text={isHFExpanded ? `ヘッダーとフッターを隠す` : 'ヘッダーとフッターを表示する'}
      onClick={(e)=>{
        e.preventDefault()
        e.stopPropagation()
        setIsHFExpanded( isHFExpanded => !isHFExpanded )
      }}
    >
      {isHFExpanded ? <SVG2Shrink /> : <SVG2Expand /> }
    </button>
  );
}

const SVG2Shrink = ()=>{
  return (<svg className={`${style.c_svgToggleHFVisible} ${style['-to_shrink']}`} viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg">
    <g className="c_svgToggleHFVisible__bg">
    <circle cx="22" cy="22" r="22" strokeWidth="2"></circle>
    </g>
    <g className="c_svgToggleHFVisible__fg">
    <line x1="33.5" y1="40" x2="33.5" y2="37" strokeDasharray="2 2"></line>
    <line x1="34" y1="37.5" x2="10" y2="37.5" strokeDasharray="2 2"></line>
    <line x1="10.5" y1="37" x2="10.5" y2="40" strokeDasharray="2 2"></line>
    <line x1="33.5" y1="35" x2="33.5" y2="27"></line>
    <line x1="34" y1="27.5" x2="10" y2="27.5"></line>
    <line x1="10.5" y1="27" x2="10.5" y2="35"></line>
    <path d="M21.6464 35.8536C21.8417 36.0488 22.1583 36.0488 22.3536 35.8536L25.5355 32.6716C25.7308 32.4763 25.7308 32.1597 25.5355 31.9645C25.3403 31.7692 25.0237 31.7692 24.8284 31.9645L22 34.7929L19.1716 31.9645C18.9763 31.7692 18.6597 31.7692 18.4645 31.9645C18.2692 32.1597 18.2692 32.4763 18.4645 32.6716L21.6464 35.8536ZM21.5 29V35.5H22.5V29H21.5Z" strokeWidth="0"></path>
    <line x1="10.5" y1="4" x2="10.5" y2="7" strokeDasharray="2 2"></line>
    <line x1="10" y1="6.5" x2="34" y2="6.5" strokeDasharray="2 2"></line>
    <line x1="33.5" y1="7" x2="33.5" y2="4" strokeDasharray="2 2"></line>
    <line x1="10.5" y1="9" x2="10.5" y2="17"></line>
    <line x1="10" y1="16.5" x2="34" y2="16.5"></line>
    <line x1="33.5" y1="17" x2="33.5" y2="9"></line>
    <path d="M22.3536 8.64645C22.1583 8.45118 21.8417 8.45118 21.6464 8.64645L18.4645 11.8284C18.2692 12.0237 18.2692 12.3403 18.4645 12.5355C18.6597 12.7308 18.9763 12.7308 19.1716 12.5355L22 9.70711L24.8284 12.5355C25.0237 12.7308 25.3403 12.7308 25.5355 12.5355C25.7308 12.3403 25.7308 12.0237 25.5355 11.8284L22.3536 8.64645ZM22.5 15.5V9H21.5V15.5H22.5Z" strokeWidth="0"></path>
    </g>
    </svg>);
}

const SVG2Expand = ()=>{
  return (<svg id="c_svgToExpandHF" className={`${style.c_svgToggleHFVisible} ${style['-to_expand']}`} viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg">
    <g className="c_svgToggleHFVisible__bg">
    <circle cx="22" cy="22" r="22" strokeWidth="2"></circle>
    </g>
    <g className="c_svgToggleHFVisible__fg">
    <line x1="33.5" y1="40" x2="33.5" y2="37"></line>
    <line x1="34" y1="37.5" x2="10" y2="37.5"></line>
    <line x1="10.5" y1="37" x2="10.5" y2="40"></line>
    <line x1="33.5" y1="35" x2="33.5" y2="27" strokeDasharray="2 2"></line>
    <line x1="34" y1="27.5" x2="10" y2="27.5" strokeDasharray="2 2"></line>
    <line x1="10.5" y1="27" x2="10.5" y2="35" strokeDasharray="2 2"></line>
    <path d="M21.8536 29.1464C21.6583 28.9512 21.3417 28.9512 21.1464 29.1464L17.9645 32.3284C17.7692 32.5237 17.7692 32.8403 17.9645 33.0355C18.1597 33.2308 18.4763 33.2308 18.6716 33.0355L21.5 30.2071L24.3284 33.0355C24.5237 33.2308 24.8403 33.2308 25.0355 33.0355C25.2308 32.8403 25.2308 32.5237 25.0355 32.3284L21.8536 29.1464ZM22 36V29.5H21V36H22Z" strokeWidth="0"></path>
    <line x1="10.5" y1="4" x2="10.5" y2="7"></line>
    <line x1="10" y1="6.5" x2="34" y2="6.5"></line>
    <line x1="33.5" y1="7" x2="33.5" y2="4"></line>
    <line x1="10.5" y1="9" x2="10.5" y2="17" strokeDasharray="2 2"></line>
    <line x1="10" y1="16.5" x2="34" y2="16.5" strokeDasharray="2 2"></line>
    <line x1="33.5" y1="17" x2="33.5" y2="9" strokeDasharray="2 2"></line>
    <path d="M22.1464 14.8536C22.3417 15.0488 22.6583 15.0488 22.8536 14.8536L26.0355 11.6716C26.2308 11.4763 26.2308 11.1597 26.0355 10.9645C25.8403 10.7692 25.5237 10.7692 25.3284 10.9645L22.5 13.7929L19.6716 10.9645C19.4763 10.7692 19.1597 10.7692 18.9645 10.9645C18.7692 11.1597 18.7692 11.4763 18.9645 11.6716L22.1464 14.8536ZM22 8V14.5H23V8H22Z" strokeWidth="0"></path>
    </g>
    </svg>);
}