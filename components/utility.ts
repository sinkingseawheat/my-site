export type VariableCSSProperties<TKeys extends `--${string}`[]> = React.CSSProperties & {
  [key in TKeys[number]]:string
}

export type SetCSSVariable<TKeys extends `--${string}`[]> = (styleValue:Partial<Record<string,string>>)=>VariableCSSProperties<TKeys>