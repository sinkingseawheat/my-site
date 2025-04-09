import fs from 'fs/promises'
import path from 'path'
import { type Stats } from 'fs'

export type Survey = (
    fullPath:string,
    stat:Stats,
    url:string,
    content:string,
)  => Promise<unknown> | unknown

/**
 * Resultを絶対パスをキーにしてまとめた情報
 */
type Results = Map<string, unknown>

/**
 * 指定されたディレクトリ以下のファイルを再帰的に探索し、条件に合致するファイルを処理します。
 * params.surveyの返却結果はunknownとしていますので、zodなどでスキーマバリデーションを行ってください。
 *
 * @param {object} params - パラメータオブジェクト
 * @param {string} params.dirPath - 探索を開始するディレクトリのパス。
 * @param {Survey[]} params.surveys - 探索するファイルに対する調査内容の配列。
 * @param {Results[]} [params._results=[]] - 内部で使用するparams.surveyの返却結果の配列。外部から渡す必要はありません。
 * @returns {Promise<unknown | null>} - 条件に合致したファイルの情報を含む結果の配列をPromiseで返します。
 * 探索中にエラーが発生した場合や、条件に合致するファイルが一つもなかった場合は `null` を返します。
 *
 * @async
 */
export async function explorerFilesRecursively(
  dirPath: string,
  surveys: Survey[],
  _results?: Results[]
): Promise<Results[]|null> {
  // 絶対パスのみを受け入れる
  if(!path.isAbsolute(dirPath)) return null
  const results:Exclude<Results, undefined>[] = _results === undefined ? surveys.map(()=>new Map()) : _results
  try {
    const entries = await fs.readdir(dirPath, { withFileTypes: true })
    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry.name)
      if (entry.isDirectory()) {
        await explorerFilesRecursively(fullPath, surveys, results)
      } else if (entry.isFile() && entry.name === 'page.tsx') {
        try {
          const url = fullPath.replace(process.cwd(), '').replace(/\\/g, "/").replace(/^\/src\/app\/[^\/]+/,'').replace(/page\.tsx$/,'')
          const [content, stat] = await Promise.all([
            fs.readFile(fullPath, 'utf-8'),
            fs.stat(fullPath),
          ])
          await Promise.all(
            surveys.map(async (survey, index)=>{
              const result = await survey(fullPath, stat, url, content)
              results[index].set(fullPath, result)
            })
          )
        } catch (error) {
          console.error(`Error processing file: ${fullPath}`, error)
          return null
        }
      }
    }
    return results
  } catch (error) {
    console.error(`Error reading directory: ${dirPath}`, error)
    return null
  }
}