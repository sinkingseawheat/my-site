'use client'
import { EOL } from "os"
import { getTextDataFromReactNode } from "./getTextDataFromReactNode"

export const copyTextData = async (
  data:React.ReactNode[][],
) => {
  const textData = data.toSpliced(0,1).map(
    (rows) => rows.toSpliced(0,1).map(
      (cell) => getTextDataFromReactNode(cell)
    ).join(`\t`)).join(EOL)
  await navigator.clipboard.writeText(textData)
}