import path from 'node:path' 
import fs from 'node:fs/promises'
import z from 'zod'
import { userSpecificData } from '@/../my-site.config'
import { explorerFilesRecursively } from './explorerFilesRecursively'
import { getSitemap, schemaSitemap } from './getSitemap'
import { getPageList, schemaPageList, schemaPageListJSON } from './getPageList'

(async ()=>{
const [sitemapResults, pageList] = await explorerFilesRecursively(
  path.join(process.cwd(),'./src/app'),
  [getSitemap, getPageList],
)?? [];

if(sitemapResults === undefined || pageList === undefined){
  console.log(`sitemapResultもしくはpageListが取得できませんでした。終了します。`)
  return;
}

// ssg-sitemap.xmlの作成
const writeSitemap = async ()=>{
  let sitemapXMLContent = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  `
  const {protocolAndFQDN} = userSpecificData
  for(const [fullPath, _result] of sitemapResults){
    const result = schemaSitemap.safeParse(_result).data
    if(result !== undefined){
      sitemapXMLContent += `  <url>
      <loc>${path.join(protocolAndFQDN, result.url).replace(/\:\/(?!\/)/,'://')}</loc>
      <lastmod>${result.lastmod}</lastmod>
      <changefreq>${result.url==='/'?'weekly':'monthly'}</changefreq>
      <priority>${result.url==='/'?'1.0':'0.5'}</priority>
    </url>
    `
    }
  }
  sitemapXMLContent += `</urlset>`
  return fs.writeFile(path.join(process.cwd(), 'public/ssg-sitemap.xml'), sitemapXMLContent)
}

// pagelist.jsonのJSONの作成
const writePageList = async ()=>{
  const {notControlledLink} = userSpecificData
  notControlledLink.forEach((elm, index)=>{
    // Next.jsで制御していないページのURLの場合はfullPathを数値のみにする
    pageList.set(index.toString(), elm)
  })
  const pageListJSON:(z.infer<typeof schemaPageListJSON>)[] = []
  for(const [fullPath,result] of pageList){
    const parsed = schemaPageList.safeParse(result).data
    if(parsed === undefined){continue}
    pageListJSON.push({
      ...parsed,
      prefetch: /^¥d+$/.test(fullPath) ? false : true
    })
  }
  return fs.writeFile(
    path.join(process.cwd(), 'public/pagelist.json'),
    JSON.stringify(pageListJSON.toSorted(({url:url1},{url:url2}) => url1.split('/').length - url2.split('/').length))
  )
}

await Promise.all([
  writeSitemap(),
  writePageList(),
])

console.log(`prebuild process completed`)
  
})()
