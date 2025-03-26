'use client'
import style from './Form.module.css'
import { useContext, useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { Button, S, L, F } from '@components/all'
import { PopupContext } from '@components/context';

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

  const [popupMessage, setPopupMessage] = useContext(PopupContext);

  const onSubmit:SubmitHandler<Inputs> = (data)=>{
    const UPPERCASE_ALPHABET = `ABCDEFGHIJKLMNOPQRSTUVWXYZ`
    const LOWERCASE_ALPHABET = `abcdefghijklmnopqrstuvwxyz`
    const NUMBER = `0123456789`
    const source = (data.src_A ? UPPERCASE_ALPHABET : '')
    + (data.src_a ? LOWERCASE_ALPHABET : '')
    + (data.src_0 ? NUMBER : '')
    const _all = [];
    for(let _count=0; _count < parseInt(data.count); _count++){
      let _output = ``;
      const sourceLength = source.length;
      for(let _length=0; _length < parseInt(data.length); _length++){
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
            <L.column minColumnWidth='100%' rowGap='.3rem' marginTop='0.4rem'>
                <F.InputText
                  inputHTMLAttribute={{inputMode:'numeric'}}
                  label={`文字数`}
                  message={errors?.['length']?.message}
                  labelMinWidth='3em'
                  registerReturn={register(`length`,{
                    valueAsNumber:true,
                    required:{
                      value:true,
                      message:`128以下の数値を半角で入力してください`,
                    },
                    validate:(v)=>(!( v!==v || parseInt(v)>128) || `128以下の数値を半角で入力してください` )
                  })}
                />
                <F.InputText
                  inputHTMLAttribute={{inputMode:'numeric'}}
                  label={`個数`}
                  message={errors?.['count']?.message}
                  labelMinWidth='3em'
                  registerReturn={register(`count`,{
                    valueAsNumber:true,
                    required:{
                      value:true,
                      message:`20以下の数値を半角で入力してください`,
                    },
                    validate:(v)=>(!( v!==v || parseInt(v)>20) || `20以下の数値を半角で入力してください` )
                  })}
                />
            </L.column>
          </fieldset>
          <fieldset className={style.fieldset}>
            <legend className={style.legend}>英数字の使用</legend>
            <L.column minColumnWidth='100%' rowGap='.3rem' marginTop='0.4rem'>
            <F.InputCheckboxes
              elms={[{
                label:`大文字アルファベット`,
                registerReturn:register(`src_A`,{
                  validate:(v,d)=>d.src_A || d.src_a || d.src_0 || `最低でも1つにチェックをつけてください`
                })
              },{
                label:`小文字アルファベット`,
                registerReturn:register(`src_a`,{
                  deps:[`src_A`]
                })
              },{
                label:`数字`,
                registerReturn:register(`src_0`,{
                  deps:[`src_A`]
                })
              }]}
              message={errors?.src_A?.message}
            />
            </L.column>
          </fieldset>
          <div>
            <Button type='button' isSubmit={true} isDisabled={!isValid}>{isValid ? '実行' : '実行できません'}</Button>
          </div>
        </form>
      </S.lv2>
      <S.lv2 title={`出力`}>
        {/* Button押下の度にFormごと書き換えられるが、一旦そのままにする */}
        {output.length === 0 ? <>まだ1回も実行されていません</> : (<><p>クリックorタッチでコピーされます</p><L.column minColumnWidth={length} columnGap='1em'>
          {output.map((randomString)=><Button type='button' className={style.outputItem} key={randomString} onClick={()=>{
            navigator.clipboard.writeText(randomString).then(()=>{
              if(popupMessage!==undefined && setPopupMessage!==undefined){
                setPopupMessage(`${randomString}がコピーされました`)
              }
            })
          }}>{randomString}</Button>)}
        </L.column></>)}
      </S.lv2>
    </>
  )
}