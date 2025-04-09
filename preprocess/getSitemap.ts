import { type Survey } from "./explorerFilesRecursively" 
import z from 'zod'

export const schemaSitemap = z.object({
  url: z.string(),
  lastmod: z.string()
})

export const getSitemap:Survey = (fullPath,stat,url,content)=>{
  const {mtime} = stat
  const lastmod = `${
    mtime.getFullYear().toString()
    }-${
    (mtime.getMonth()+1).toString().padStart(2,'0')
    }-${
    mtime.getDate().toString().padStart(2,'0')
    }`
  return {
    url,
    lastmod,
  }
}