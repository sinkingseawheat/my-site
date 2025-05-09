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

  const srcRoot = path.join(process.cwd(), './preprocess/server_side/public')
  console.log(srcRoot)

  const [result] = await explorerFilesRecursively(
    srcRoot,
    [(fullPath)=>fullPath],
  )

  return [
    fs.writeFile(path.join(process.cwd(), './out/server_action_private/secret.php'), phpSrcSecret),
    ...Array.from(result).map(([fullPath, _])=>fs.copyFile(fullPath, fullPath.replace(srcRoot, path.join(process.cwd(), './public')))),
  ]

}