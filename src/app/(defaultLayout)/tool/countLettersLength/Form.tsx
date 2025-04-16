'use client'
import style from './Form.module.css'
import z from 'zod'
import { useState, useDeferredValue } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, S, L, F, Loader } from '@components/all'

const schemaInput = z.object({
  writing: z.string().refine(
    (v)=>!/^[\s\r\n]*$/.test(v)
  ,{
    message:`テキストが入っていません`
  }).nullable()
})

type Inputs = z.infer<typeof schemaInput>

const schemaOutput = z.object({
  lettersLength: z.number(),
  lineLength: z.number(),
})

export function Form(){
  const {
    register,
    handleSubmit,
    formState: {errors, isValid}
  } = useForm<Inputs>({
    resolver: zodResolver(schemaInput),
    mode: 'onChange',
  })
  const [output, setOutput] = useState<z.infer<typeof schemaOutput>|null>(null)
  const deferredOutput = useDeferredValue(output, null)

  const onSubmit:SubmitHandler<Inputs> = (data)=>{
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
      <S.lv2 title={`入力`}>
        <form onSubmit={handleSubmit(onSubmit)} className={style.wrap}>
          <fieldset className={style.fieldset}>
            <legend className={style.legend}>出力形式</legend>
            <L.column minColumnWidth='100%' rowGap='.3rem' marginTop='0.4rem'>
                <F.Textarea
                  elms={{
                    label:`調べるテキスト`,
                    registerReturn:register(`writing`),
                  }}
                  message={errors?.['writing']?.message}
                />
            </L.column>
          </fieldset>
          <div>
            <Button type='button' isSubmit={true} isDisabled={!isValid}>{isValid ? '実行' : '実行できません'}</Button>
          </div>
        </form>
      </S.lv2>
      <S.lv2 title={`出力`}>
        <div className={style.outputLoading} aria-busy={output !== deferredOutput}>
          {output !== deferredOutput && <Loader/>}
          {
            deferredOutput === null ?
            <>まだ1回も実行されてません、もしくは入力が無効です。</>
            : <div>{Array.from(Object.entries(deferredOutput)).map(([p,v],index)=>(<span key={index}>{`${p}:${v}`}<br/></span>))}</div>
          }
        </div>
      </S.lv2>
    </>
  )
}