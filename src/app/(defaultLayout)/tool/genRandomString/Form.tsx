'use client'
import style from './Form.module.css'
import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { Button, S, ColumsLayout } from '@components/all'

type Inputs = {
  length: string,
  count: string,
  src_A: boolean,
  src_a: boolean,
  src_0: boolean,
}

export function Form(){

  const {
    register,
    handleSubmit,
    formState: {errors, isValid}
  } = useForm<Inputs>({
    defaultValues:{
      length: '8',
      count: '10',
      src_A: true,
      src_a: true,
      src_0: true,
    },
    mode:'onChange',
  })

  const [output, setOutput] = useState<string[]>([])
  const [length, setLength] = useState<string>(`100%`)

  const onSubmit:SubmitHandler<Inputs> = (data)=>{
    const UPPERCASE_ALPHABET = `ABCDEFGHIJKLMNOPQRSTUVWXYZ`
    const LOWERCASE_ALPHABET = `abcdefghijklmnopqrstuvwxyz`
    const NUMBER = `0123456789`
    const source = (data.src_A ? UPPERCASE_ALPHABET : '')
    + (data.src_a ? LOWERCASE_ALPHABET : '')
    + (data.src_0 ? NUMBER : '')
    const _all = [];
    for(let _count=0;_count<parseInt(data.count);_count++){
      let _output = ``;
      const sourceLength = source.length;
      for(let _length=0;_length<parseInt(data.length);_length++){
        _output += source[Math.floor(Math.random() * sourceLength)];
      }
      _all.push(_output)
    }
    setLength(`${data.length}em`)
    setOutput(_all);
  }

  return (
    <>
      <S.lv2 title={`入力`}>
        <form onSubmit={handleSubmit(onSubmit)} className={style.wrap}>
          <fieldset className={style.fieldset}>
            <legend className={style.legend}>出力形式</legend>
            <div className={style.column1}>
              <div className={style.column1Item}>
                <label className={style.labelTextfield}><span>文字数</span><input type='text' {...register(`length`,{
                  valueAsNumber:true,
                  required:{
                    value:true,
                    message:`128以下の数値を半角で入力してください`,
                  },
                  validate:(v)=>(!( v!==v || parseInt(v)>128) || `128以下の数値を半角で入力してください` )
                })}/></label>
                {errors.length && <p className={style.errorMessage}>{errors.length.message}</p> }
              </div>
              <div className={style.column1Item}>
                <label className={style.labelTextfield}><span>個数</span><input type='text' {...register(`count`,{
                  valueAsNumber:true,
                  required:{
                    value:true,
                    message:`20以下の数値を半角で入力してください`,
                  },
                  validate:(v)=>(!( v!==v || parseInt(v)>20) || `20以下の数値を半角で入力してください` )
                })}/></label>
                {errors.count && <p className={style.errorMessage}>{errors.count.message}</p> }
              </div>
            </div>
          </fieldset>
          <fieldset className={style.fieldset}>
            <legend className={style.legend}>英数字の使用</legend>
            <label className={style.labelCheckbox}>
              <input
                type='checkbox'
                {
                  ...register(`src_A`,{
                    validate:(v,d)=>d.src_A || d.src_a || d.src_0 || `最低でも1つにチェックをつけてください`
                  })}/>
                <span>大文字アルファベット</span>
            </label>
            <label className={style.labelCheckbox}>
              <input
                type='checkbox'
                {
                  ...register(`src_a`,{
                    deps:[`src_A`]
                  })}/>
              <span>小文字アルファベット</span>
            </label>
            <label className={style.labelCheckbox}>
              <input
                type='checkbox'
                {
                  ...register(`src_0`,{
                    deps:[`src_A`]
                  })}/>
              <span>数字</span>
            </label>
            {errors.src_A && <p className={style.errorMessage}>{errors.src_A.message}</p> }
          </fieldset>
          <div>
            <Button type='button' isSubmit={true} isDisabled={!isValid}>{isValid ? '実行' : '実行できません'}</Button>
          </div>
        </form>
      </S.lv2>
      <S.lv2 title={`出力`}>
        {/* Button押下の度にFormごと書き換えられるが、一旦そのままにする */}
        {output.length === 0 ? <>まだ1回も実行されていません</> : (<ColumsLayout minColumnWidth={length} columnGap='1em'>
          {output.map((randomString)=><p className={style.outputItem} key={randomString}>{randomString}</p>)}
        </ColumsLayout>)}
      </S.lv2>
    </>
  )
}