import { StyleValue } from "@components/utility"
import { JSX } from "react"

type SVGIcon<TProperty extends `--${string}`> = (props:Partial<{styleValue:StyleValue<TProperty>}>)=>JSX.Element

const hiddenData= ()=>{
    return (
    <svg style={{ display: 'none' }} xmlns="http://www.w3.org/2000/svg">
      <symbol id="svgCopy" viewBox="0 0 50 50">
        <polyline points="14.11 34.27 2.5 34.32 2.5 2.5 29.61 2.5 29.61 9.21" fill="none" stroke="rgb(var(--color-stroke)" strokeLinejoin="round" strokeWidth="5"/>
        <rect x="18.69" y="13.68" width="28.81" height="33.82" fill="none" stroke="rgb(var(--color-stroke)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="5"/>
      </symbol>
      <symbol id="svgLink" viewBox="0 0 209 209" fillRule="evenodd" clipRule="evenodd" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="1.5">
        <title>このタブでページを開く</title>
        <path stroke='rgb(var(--color-stroke))' d="M198.398,47.899l-0,112.799c-0,20.688 -16.796,37.483 -37.483,37.483l-112.448,0c-20.688,0 -37.483,-16.795 -37.483,-37.483l-0,-112.799c-0,-20.687 16.795,-37.482 37.483,-37.482l112.448,-0c20.687,-0 37.483,16.795 37.483,37.482Z" fill="none" strokeWidth="20.83px"/>
        <path stroke='rgb(var(--color-stroke))' d="M123.18,141.002l41.397,-36.705" fill="none" strokeWidth="20.83px"/>
        <path stroke='rgb(var(--color-stroke))' d="M123.059,67.332l41.495,36.79" fill="none" strokeWidth="20.83px"/>
        <path stroke='rgb(var(--color-stroke))' d="M164.295,104.268l-119.36,-0" fill="none" strokeWidth="20.83px"/>
      </symbol>
      <symbol id="svgLinkAnotherTab" viewBox="0 0 209 209" fillRule="evenodd" clipRule="evenodd" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="1.5">
        <title>別タブでページを開く</title>
          <path stroke='rgb(var(--color-stroke))' d="M197.831,115.533l-0,45.165c-0,20.688 -16.796,37.483 -37.483,37.483l-112.449,0c-20.687,0 -37.482,-16.795 -37.482,-37.483l-0,-112.799c-0,-20.687 16.795,-37.482 37.482,-37.482l99.439,-0" fill="none" strokeWidth="20.83px"/>
          <path stroke='rgb(var(--color-stroke))' d="M162.318,102.915l35.666,-31.623" fill="none" strokeWidth="20.83px"/>
          <path stroke='rgb(var(--color-stroke))' d="M161.935,39.197l36.029,31.944" fill="none" strokeWidth="20.83px"/>
          <path stroke='rgb(var(--color-stroke))' d="M174.77,71.303c-49.514,0 -93.642,31.234 -110.104,77.931c16.462,-46.697 60.59,-77.931 110.104,-77.931Z" fill="none" strokeWidth="20.83px"/>
          <path stroke='rgb(var(--color-stroke))' d="M117.191,147.334l53.242,0" fill="none" strokeWidth="10.83px"/>
          <path stroke='rgb(var(--color-stroke))' d="M143.812,120.713l-0,53.242" fill="none" strokeWidth="10.73px"/>
      </symbol>
      <symbol id="svgFormCheckbox" width="21" height="16" viewBox="0 0 21 16" fill="none">
        <path d="M6.30559 14.7197C6.88308 15.2629 7.78358 15.2629 8.36108 14.7197L19.5682 4.17769C20.1979 3.58539 20.1979 2.58483 19.5682 1.99252L18.8111 1.2803C18.2336 0.737084 17.3331 0.737084 16.7556 1.2803L7.67591 9.8211C7.48342 10.0022 7.18325 10.0022 6.99075 9.82109L4.24441 7.23775C3.66692 6.69453 2.76642 6.69453 2.18893 7.23775L1.43177 7.94997C0.802091 8.54227 0.802092 9.54284 1.43177 10.1351L6.30559 14.7197Z" fill="rgb(var(--color-fill))" stroke="rgb(var(--color-stroke)" />
      </symbol>
      <symbol id="svgHamburgerMenu" viewBox="0 0 44 44">
        <circle fill='rgb(var(--color-fg-svg))' stroke='rgb(var(--color-fg-svg))' cx="22" cy="22" r="21"/>
        <circle fill='rgb(var(--color-bg-svg))' stroke='rgb(var(--color-bg-svg))' cx="22" cy="22" r="19"/>
        <line stroke='rgb(var(--color-fg-svg))' x1="11" y1="15" x2="33" y2="15" strokeLinecap="round" strokeWidth="2"/>
        <line stroke='rgb(var(--color-fg-svg))' x1="11" y1="22" x2="33" y2="22" strokeLinecap="round" strokeWidth="2"/>
        <line stroke='rgb(var(--color-fg-svg))' x1="11" y1="29" x2="33" y2="29" strokeLinecap="round" strokeWidth="2"/>
      </symbol>
      <symbol id="svgCloseBtn" viewBox="0 0 44 44">
        <circle fill='rgb(var(--color-fg-svg))' stroke='rgb(var(--color-fg-svg))' cx="22" cy="22" r="21"/>
        <circle fill='rgb(var(--color-bg-svg))' stroke='rgb(var(--color-bg-svg))' cx="22" cy="22" r="19"/>
        <line fill='rgb(var(--color-fg-svg))' stroke='rgb(var(--color-fg-svg))' x1="14" y1="14" x2="29.4" y2="29.4" strokeLinecap="round" strokeWidth="2"/>
        <line fill='rgb(var(--color-fg-svg))' stroke='rgb(var(--color-fg-svg))' x1="14.2" y1="29.8" x2="29.8" y2="14.2" strokeLinecap="round" strokeWidth="2"/>
      </symbol>
      <symbol id="svgHFToggleToShrink" viewBox="0 0 44 44">
        <g fill='rgb(var(--color-bg-svg))' stroke='rgb(var(--color-fg-svg))'>
          <circle cx="22" cy="22" r="22" strokeWidth="2"></circle>
        </g>
        <g fill='rgb(var(--color-fg-svg))' stroke='rgb(var(--color-fg-svg))'>
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
      </symbol>
      <symbol id="svgHFToggleToExpanded" viewBox="0 0 44 44">
        <g fill='rgb(var(--color-bg-svg))' stroke='rgb(var(--color-fg-svg))'>
          <circle cx="22" cy="22" r="22" strokeWidth="2"></circle>
        </g>
        <g fill='rgb(var(--color-fg-svg))' stroke='rgb(var(--color-fg-svg))'>
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
      </symbol>
    </svg>
  )
  }

const copy:SVGIcon<'--color-stroke'> = ({styleValue})=>(
  <svg width="1.5em" height="1.5em" xmlns="http://www.w3.org/2000/svg" style={styleValue}>
    <use href='#svgCopy' />
  </svg>
)

const link:SVGIcon<'--color-stroke'> = ({styleValue})=>(
  <svg width="1em" height="1em" xmlns="http://www.w3.org/2000/svg" style={styleValue}>
    <use href='#svgLink' />
  </svg>
)

const linkAnotherTab:SVGIcon<'--color-stroke'> = ({styleValue})=>(
  <svg width="1em" height="1em" xmlns="http://www.w3.org/2000/svg" style={styleValue}>
    <use href='#svgLinkAnotherTab' />
  </svg>
)

const checkbox:SVGIcon<'--color-stroke'|'--color-fill'> = ({styleValue})=>(
  <svg width="1.3125em" height="1em" xmlns="http://www.w3.org/2000/svg" style={styleValue}>
    <use href='#svgFormCheckbox' />
  </svg>
)

const  hamburgerMenu:SVGIcon<'--color-fg-svg'|'--color-bg-svg'> = ({styleValue})=>(
  <svg width="3em" height="3em" xmlns="http://www.w3.org/2000/svg" style={styleValue}>
    <use href='#svgHamburgerMenu' />
  </svg>
)

const  btnClose:SVGIcon<'--color-fg-svg'|'--color-bg-svg'> = ({styleValue})=>(
  <svg width="3em" height="3em" xmlns="http://www.w3.org/2000/svg" style={styleValue}>
    <use href='#svgCloseBtn' />
  </svg>
)

const  toggleHFtoShrink:SVGIcon<'--color-fg-svg'|'--color-bg-svg'> = ({styleValue})=>(
  <svg width="3em" height="3em" xmlns="http://www.w3.org/2000/svg" style={styleValue}>
    <use href='#svgHFToggleToShrink' />
  </svg>
)

const  toggleHFtoExpanded:SVGIcon<'--color-fg-svg'|'--color-bg-svg'> = ({styleValue})=>(
  <svg width="3em" height="3em" xmlns="http://www.w3.org/2000/svg" style={styleValue}>
    <use href='#svgHFToggleToExpanded' />
  </svg>
)

const SVGIcon = {
  hiddenData,
  copy,
  link,
  linkAnotherTab,
  checkbox,
  hamburgerMenu,
  btnClose,
  toggleHFtoShrink,
  toggleHFtoExpanded,
}

export default SVGIcon