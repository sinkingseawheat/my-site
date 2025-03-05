import { type Dirent } from 'fs'
import fs from 'fs/promises'
import path from 'path'

export type PageListJSON = {url:string,title:string,label:'tool'|'other'|'outside'}[]

const searchPage = async (dirents:Dirent[], results:PageListJSON):Promise<void>=>{
  for(const dirent of dirents){
    if(dirent.isDirectory()){
      const childDirent = await fs.readdir(path.join(dirent.parentPath, dirent.name),{withFileTypes:true})
      await searchPage(childDirent, results)
    }else if(dirent.isFile() && dirent.name === 'page.tsx'){
      const absolutePath = path.join(dirent.parentPath, dirent.name)
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
      results.push({url,title,label})
    }
  }
}

export async function getPageList() {
  const rootPath = path.join(process.cwd(), 'src/app')
  const dirents = await fs.readdir(rootPath, {withFileTypes:true});
  const results:PageListJSON = [];
  await searchPage(dirents, results);

  // 外部サイトはこちらに追記
  results.push({url:`https://github.com/sinkingseawheat/webpage_snapshot`,title:`Webページのスナップショット保存（GitHubのページへ移動します）`,label:'outside'})

  await fs.writeFile(path.join(process.cwd(), 'public/pagelist.json'),JSON.stringify(results));
  console.log(`pagelist.json created`)
}

getPageList(); // 値を取り出す必要はないので、awaitは不要。tsxでtop-level awaitを使用する方法が分からなかった。