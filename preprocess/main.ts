import path from 'node:path' 
import fs from 'node:fs/promises'
import z from 'zod'
import { userSpecificData } from '@/../my-site.config'
import { explorerFilesRecursively } from './explorerFilesRecursively'
import { getSitemap, schemaSitemap } from './getSitemap'
import { getPageListItem, schemaPageListItem } from './getPageListItem'
import { setServerSideScript } from './server_side/setServerSideScript'

(async ()=>{
const [sitemapResults, pageList] = await explorerFilesRecursively(
  path.join(process.cwd(),'./src/app'),
  [getSitemap, getPageListItem],
  (fullPath, entry) => entry.name === 'page.tsx',
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
  const _pageList = structuredClone(pageList)
  notControlledLink.forEach((elm, index)=>{
    // Next.jsで制御していないページのURLの場合はfullPathを数値のみにする
    _pageList.set(index.toString(), elm)
  })
  const pageListJSON:(z.infer<typeof schemaPageListItem>)[] = []
  for(const [fullPath,result] of _pageList){
    const parsed = schemaPageListItem.safeParse(result).data
    if(parsed === undefined){continue}
    pageListJSON.push(parsed)
  }
  return fs.writeFile(
    path.join(process.cwd(), 'public/pagelist.json'),
    JSON.stringify(pageListJSON.toSorted(({url:url1},{url:url2}) => url1.split('/').length - url2.split('/').length))
  )
}

// page.tsxを別ディレクトリにバックアップ
const storeFileIgonoredInGit = ()=>{
  const {pageBackupPath} = userSpecificData
  if(typeof pageBackupPath !== 'string'){
    console.log(`page.tsxとmy-site.config.tsのバックアップ無し`)
    return [];
  }
  const fullPathArray:string[] = []
  for(const [fullPath,] of pageList){
    fullPathArray.push(fullPath)
  }
  return [...fullPathArray.map((fullPath)=>{
    return (async ()=>{
      const destPath = path.join(
        pageBackupPath,
        fullPath.replace(process.cwd(),'')
      )
      try{
        await fs.mkdir(path.dirname(destPath), {recursive:true})
      }catch(e){
        console.log(e)
      }finally{
        await fs.copyFile(fullPath, destPath)
      }
    })()
  }), (async ()=>{
    await fs.copyFile(
      path.join(process.cwd(), './my-site.config.ts'),
      path.join(pageBackupPath, './my-site.config.ts')
    )
    return
  })()]
}

await Promise.all([
  writeSitemap(),
  writePageList(),
  ...storeFileIgonoredInGit(),
])

console.log(`prebuild process completed`)
  
})()
