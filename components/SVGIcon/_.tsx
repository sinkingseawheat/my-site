import { StyleValue } from "@components/utility"

const hiddenData= ()=>{
    return (
    <div style={{ display: 'none' }}>
      <svg id="svgFormCheckmark" width="21" height="16" viewBox="0 0 21 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.30559 14.7197C6.88308 15.2629 7.78358 15.2629 8.36108 14.7197L19.5682 4.17769C20.1979 3.58539 20.1979 2.58483 19.5682 1.99252L18.8111 1.2803C18.2336 0.737084 17.3331 0.737084 16.7556 1.2803L7.67591 9.8211C7.48342 10.0022 7.18325 10.0022 6.99075 9.82109L4.24441 7.23775C3.66692 6.69453 2.76642 6.69453 2.18893 7.23775L1.43177 7.94997C0.802091 8.54227 0.802092 9.54284 1.43177 10.1351L6.30559 14.7197Z" fill="rgb(var(--color-bg,#fff))" stroke="rgb(var(--color-fg,#000))" />
      </svg>
      <svg id="svgCopy" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
        <polyline points="14.11 34.27 2.5 34.32 2.5 2.5 29.61 2.5 29.61 9.21" fill="none" stroke="rgb(var(--color-svgIcon, var(--color-fg,#000)))" strokeLinejoin="round" strokeWidth="5"/>
        <rect x="18.69" y="13.68" width="28.81" height="33.82" fill="none" stroke="rgb(var(--color-svgIcon, var(--color-fg,#000)))" strokeLinecap="round" strokeLinejoin="round" strokeWidth="5"/>
      </svg>
    </div>
  )
  }

const copy = ({
  styleVariable
  }:{
    styleVariable: StyleValue<'--color-svg'|'--color-fg'>
})=>(
  <svg width="1.5em" height="1.5em" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg" style={styleVariable}>
    <use href='#svgCopy' />
  </svg>
)

const SVGIcon = {
  hiddenData,
  copy
}

export default SVGIcon