import { type Dirent } from 'fs'
import fs from 'fs/promises'
import path from 'path'
import { type LinkProps } from 'next/link'

export type PageProperty = {
  url:string,
  title:string,
  label:'tool'|'other'|'outside',
  prefetch?:LinkProps['prefetch'],
  lastmod:string,
}[]

const searchPage = async (dirents:Dirent[], results:PageProperty):Promise<void>=>{
  for(const dirent of dirents){
    if(dirent.isDirectory()){
      const childDirent = await fs.readdir(path.join(dirent.parentPath, dirent.name),{withFileTypes:true})
      await searchPage(childDirent, results)
    }else if(dirent.isFile() && dirent.name === 'page.tsx'){
      const absolutePath = path.join(dirent.parentPath, dirent.name)
      const {mtime} = await fs.stat(absolutePath)
      const lastmod = `${mtime.getFullYear().toString()}-${(mtime.getMonth()+1).toString().padStart(2,'0')}-${mtime.getDate().toString().padStart(2,'0')}`
      const url = absolutePath.replace(process.cwd(), '').replace(/\\/g, "/").replace(/^\/src\/app\/[^\/]+/,'').replace(/page\.tsx$/,'')
      const content = await fs.readFile(absolutePath, 'utf-8')
      const titleMatched = content.match(/title:\s*`([^`]+)`/);
      const title = titleMatched === null ? `無し` : titleMatched[1];
      const label = (()=>{
        if(/^\/tool\//.test(url)){
          return 'tool'
        }else{
          return 'other'
        }
      })();
      results.push({url,title,label,lastmod})
    }
  }
}

export async function getPageList() {
  const rootPath = path.join(process.cwd(), 'src/app')
  const dirents = await fs.readdir(rootPath, {withFileTypes:true});
  const results:PageProperty = [];
  await searchPage(dirents, results);

  // 外部サイトはこちらに追記
  results.push({url:`https://github.com/sinkingseawheat/webpage_snapshot`,title:`Webページのスナップショット保存（GitHubのページへ移動します）`,label:'outside', lastmod:''})
  results.push({url:`/blog/`,title:`緑ノ企鵝(ミドリノキガ)blog`,label:'other',prefetch:false,lastmod:''})

  const PROTOCOL_AND_FQDN = (await fs.readFile(`./.env`,{encoding:'utf-8'})).match(/NEXT_PUBLIC_PROTOCOL_AND_FQDN=(.+)/)?.[1];
  const sitemapURL = results.map(({url,lastmod})=>{
    if(lastmod === '' || PROTOCOL_AND_FQDN === undefined){return null}
    return `  <url>
    <loc>${path.join(PROTOCOL_AND_FQDN, url).replace(/\:\/(?!\/)/,'://')}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${url==='/'?'weekly':'monthly'}</changefreq>
    <priority>${url==='/'?'1.0':'0.5'}</priority>
  </url>`}
  ).filter((elm)=>elm!==null)

  await Promise.all([
    // pagelist.json作成
    fs.writeFile(path.join(process.cwd(), 'public/pagelist.json'),JSON.stringify(results.map(
      ({url,title,label,prefetch})=>{
        return {url,title,label,prefetch}
      }
    ))),
    // ssg-sitemap.xml作成
    fs.writeFile(path.join(process.cwd(), 'public/ssg-sitemap.xml'),
`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapURL.join(`\n`)}
</urlset>`),
  ])
  console.log(`prebuild process completed`)
}

getPageList(); // 値を取り出す必要はないので、awaitは不要。tsxでtop-level awaitを使用する方法が分からなかった。