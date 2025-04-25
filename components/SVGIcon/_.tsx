import { StyleValue } from "@components/utility"

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
    </svg>
  )
  }

const copy = ({
  styleVariable
  }:{
    styleVariable?: StyleValue<'--color-stroke'>
})=>(
  <svg width="1.5em" height="1.5em" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg" style={styleVariable}>
    <use href='#svgCopy' />
  </svg>
)

const link = ({
  styleVariable
  }:{
    styleVariable?: StyleValue<'--color-stroke'>
})=>(
  <svg width="1em" height="1em" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg" style={styleVariable}>
    <use href='#svgLink' />
  </svg>
)

const linkAnotherTab = ({
  styleVariable
  }:{
    styleVariable?: StyleValue<'--color-stroke'>
})=>(
  <svg width="1em" height="1em" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg" style={styleVariable}>
    <use href='#svgLinkAnotherTab' />
  </svg>
)

const checkbox = ({
  styleVariable
  }:{
    styleVariable?: StyleValue<'--color-stroke'|'--color-fill'>
})=>(
  <svg width="1.3125em" height="1em" viewBox="0 0 21 16" xmlns="http://www.w3.org/2000/svg" style={styleVariable}>
    <use href='#svgFormCheckbox' />
  </svg>
)

const  hamburgerMenu:SVGIcon<'--color-fg-svg'|'--color-bg-svg'> = ({styleValue})=>(
  <svg width="3em" height="3em" viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg" style={styleValue}>
    <use href='#svgHamburgerMenu' />
  </svg>
)

const  btnClose:SVGIcon<'--color-fg-svg'|'--color-bg-svg'> = ({styleValue})=>(
  <svg width="3em" height="3em" viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg" style={styleValue}>
    <use href='#svgCloseBtn' />
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
}

export default SVGIcon