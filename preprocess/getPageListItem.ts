import z from 'zod'

import { type Survey } from "./explorerFilesRecursively"

export const schemaPageListItem = z.object({
  url: z.string(),
  title: z.string(),
  label: z.enum(['tool','other','outside']),
})

export const getPageListItem:Survey = (fullPath,stat,url,content)=>{
  type Label = z.infer<typeof schemaPageListItem>['label']
  const titleMatched = content.match(/title:\s*`([^`]+)`/);
  const title = titleMatched === null ? `無し` : titleMatched[1];
  const label:Label = (()=>{
    if(/^\/tool\//.test(url)){
      return 'tool'
    }else{
      return 'other'
    }
  })();
  return {
    url,
    title,
    label,
  }
}