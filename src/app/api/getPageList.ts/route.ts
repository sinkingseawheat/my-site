import { type Dirent } from 'fs'
import fs from 'fs/promises'
import path from 'path'

export type Results = {url:string,title:string,label:'tool'|'other'}[]

const searchPage = async (dirents:Dirent[], results:Results):Promise<void>=>{
  for(const dirent of dirents){
    if(dirent.isDirectory()){
      const childDirent = await fs.readdir(path.join(dirent.parentPath, dirent.name),{withFileTypes:true})
      await searchPage(childDirent, results)
    }else if(dirent.isFile() && dirent.name === 'page.tsx'){
      const absolutePath = path.join(dirent.parentPath, dirent.name)
      const url = absolutePath.replace(process.cwd(), '').replace(/\\/g, "/").replace(/^\/src\/app\/[^\/]+/,'').replace(/page\.tsx$/,'')
      const content = await fs.readFile(absolutePath, 'utf-8')
      const titleMatched = content.match(/title:`([^`]+)`/);
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

export async function GET() {
  const rootPath = path.join(process.cwd(), 'src/app')
  const dirents = await fs.readdir(rootPath, {withFileTypes:true});
  const results:Results = [];
  await searchPage(dirents, results);
  console.log(results)
  return Response.json(results)
}