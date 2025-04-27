'use client'
import style from './Form.module.css'
import z from 'zod'
import { useState, useDeferredValue } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import { Section, L, F, Loader, Table } from '@components/all'

const schemaInput = z.object({
  writing: z.string().refine(
    (v)=>!/^[\s\r\n]*$/.test(v)
  ,{
    message:`有効なテキストが入っていません`
  }).nullable()
})

type Input = z.infer<typeof schemaInput>
type Output = {
  lettersLength:number,
  lineLength:number
}

export function Form(){
  const {
    register,
    handleSubmit,
    formState: {errors, isValid}
  } = useForm<Input>({
    resolver: zodResolver(schemaInput),
    mode: 'onChange',
  })
  const [output, setOutput] = useState<Output|null>(null)
  const deferredOutput = useDeferredValue(output, null)

  const onSubmit:SubmitHandler<Input> = (data)=>{
    const { writing } = data
    if(writing === null){
      setOutput(null)
    }else{
      const trimmedWriting = writing.trim()
      let lettersLength = 0
      for(const letter of trimmedWriting){
        // teaxtareaの改行コードは\nに統一されるので、無視するのはそれだけで問題ないはず
        if(letter !== '\n'){
          lettersLength++
        }
      }
      const lineLength = trimmedWriting.split('\n').length
      setOutput({
        lettersLength,
        lineLength
      })
    }
  }

  return (
<>
      <Section type='2' title={`入力`}>
        <form onSubmit={handleSubmit(onSubmit)} className={style.wrap}>
          <fieldset className={style.fieldset}>
            <legend className={style.legend}>出力形式</legend>
            <L.grid styleValue={{'--min-width':'100%','--row-gap':'.3em','--margin-top':'.4em'}}>
                <F.Textarea
                  elms={{
                    label:`調べるテキスト`,
                    registerReturn:register(`writing`),
                  }}
                  message={errors?.['writing']?.message}
                />
            </L.grid>
          </fieldset>
          <div>
            <F.Button isDisabled={!isValid}>{isValid ? '実行' : '実行できません'}</F.Button>
          </div>
        </form>
      </Section>
      <Section type='2' title={`出力`}>
        <L.grid styleValue={{'--min-width':'10em'}}>
          <div className={style.outputLoading} aria-busy={output !== deferredOutput}>
            {output !== deferredOutput && <Loader/>}
            {
              deferredOutput === null ?
              <>まだ1回も実行されてません、もしくは入力が無効です。</>
              : (<Table<[React.ReactNode, React.ReactNode]> // 推論で要素数の定まったReact.ReactNode[]を期待するが、仕様上narrowingされるようので、それを防ぐために直接指定する。
                  caption={`調べるテキストの解析結果`}
                  theadElement={['プロパティ','結果']}
                  styleValueArray={{'--min-column-width':['6em','5em']}}
                >
                  {Array.from(Object.entries(deferredOutput)).map(([n,v])=>{
                    const displayingValue:{[key in keyof Output]:string} = {
                      'lettersLength': '文字数',
                      'lineLength': '行数（空行を除く）',
                    }
                    return [displayingValue[n as keyof Output], v] // TypescriptにおけるObject.entriesの仕様上、アサーションする
                  })}
                </Table>)
            }
          </div>
        </L.grid>
      </Section>
    </>
  )
}