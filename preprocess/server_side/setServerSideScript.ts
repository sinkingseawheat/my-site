import fs from 'fs/promises'
import path from 'path'
import { explorerFilesRecursively } from '@preprocess/explorerFilesRecursively'

export const setServerSideScript = async ({
  $smtp_server,
  $smtp_username,
  $smtp_sendername,
  $smtp_password,
}:{
  $smtp_server: string,
  $smtp_username: string,
  $smtp_sendername: string,
  $smtp_password: string,
})=>{
  const phpSrcSecret = `<?php

// send_mail
$smtp_server = '${$smtp_server}';
$smtp_username = '${$smtp_username}';
$smtp_sendername = '${$smtp_sendername}';
$smtp_password = '${$smtp_password}';

?>`

  // 公開領域のサーバーサイドスクリプトのパスを取得
  const srcRootPublic = path.join(process.cwd(), './preprocess/server_side/public')

  const [fullPathsPublic] = await explorerFilesRecursively(
    srcRootPublic,
    [(fullPath)=>fullPath],
  )


  // 非公開領域のサーバーサイドスクリプトのパスを取得
  const srcRootPrivate = path.join(process.cwd(), './preprocess/server_side/private')

  const [fullPathsPrivate] = await explorerFilesRecursively(
    srcRootPrivate,
    [(fullPath)=>fullPath],
  )

  // 前回複製した分は削除
  try {
    await fs.rm(path.join(process.cwd(), './public/server_action'),{recursive:true})
  }catch(e){
    if(e instanceof Error && 'code' in e){
      if(e['code'] === 'ENOENT'){
        console.log(`${path.join(process.cwd(), './public/server_action')}が存在しないため、作成を試みます。`)
      }
    }
  }finally{
    await fs.mkdir(path.join(process.cwd(), './public/server_action'))
  }

  // Promiseの配列を返す
  return [
    fs.writeFile(path.join(process.cwd(), './out/server_action_private/secret.php'), phpSrcSecret),
    ...Array.from(fullPathsPublic).map(
      ([fullPath, _])=>fs.copyFile(fullPath, fullPath.replace(srcRootPublic, path.join(process.cwd(), './public')))
    ),
    ...Array.from(fullPathsPrivate).map(
      ([fullPath, _])=>fs.copyFile(fullPath, fullPath.replace(srcRootPrivate, path.join(process.cwd(), './out/server_action_private')))
    ),
  ]

}