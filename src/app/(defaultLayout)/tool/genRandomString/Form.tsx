'use client'
import style from './Form.module.css'
import { useContext, useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { Button, S, L, F } from '@components/all'
import { PopupContext } from '@components/context';


const UPPERCASE_ALPHABET = `ABCDEFGHIJKLMNOPQRSTUVWXYZ` as const
const LOWERCASE_ALPHABET = `abcdefghijklmnopqrstuvwxyz` as const
const NUMBER = `0123456789` as const
const ALLOWED_SYMBOLS_ARRAY = ['!','&','@','#','$','%','*','(',')','+','-','=',] as const;

type SymbolFields = {
  // name属性には記号が使用できないので、数値（Arrayのindex）で処理する。
  [key in `src_symbol_${number}`]: boolean
}

const defaultSymbolFields = Object.fromEntries(new Map(ALLOWED_SYMBOLS_ARRAY.map((_, index)=>{
  return [`src_symbol_${index}` as const, true]
}))) as SymbolFields // とりあえず型アサーション

type Inputs = {
  length: string,
  count: string,
  src_A: boolean,
  src_a: boolean,
  src_0: boolean,
} & SymbolFields


export function Form(){

  const {
    register,
    handleSubmit,
    formState: {errors, isValid}
  } = useForm<Inputs>({
    defaultValues:{
      ...{
        length: '8',
        count: '10',
        src_A: true,
        src_a: true,
        src_0: true,
      },
      ...defaultSymbolFields
    } satisfies Inputs,
    mode:'onChange',
  })

  const [output, setOutput] = useState<string[]>([])
  const [length, setLength] = useState<string>(`100%`)

  const [popupMessage, setPopupMessage] = useContext(PopupContext);

  const onSubmit:SubmitHandler<Inputs> = (data)=>{
    const source = (data.src_A ? UPPERCASE_ALPHABET : '')
    + (data.src_a ? LOWERCASE_ALPHABET : '')
    + (data.src_0 ? NUMBER : '')
    + ALLOWED_SYMBOLS_ARRAY.filter((_, index)=>{
        return (
          `src_symbol_${index}` in data
          && data[`src_symbol_${index}`] === true
        )
      }).join('')
    const _all = []
    for(let _count=0; _count < parseInt(data.count); _count++){
      let _output = ``
      const sourceLength = source.length;
      for(let _length=0; _length < parseInt(data.length); _length++){
        _output += source[Math.floor(Math.random() * sourceLength)]
      }
      _all.push(_output)
    }
    setLength(`${data.length}em`)
    setOutput(_all)
  }

  return (
    <>
      <S.lv2 title={`入力`}>
        <form onSubmit={handleSubmit(onSubmit)} className={style.wrap}>
          <fieldset className={style.fieldset}>
            <legend className={style.legend}>出力形式</legend>
            <L.column minColumnWidth='100%' rowGap='.3rem' marginTop='0.4rem'>
                <F.InputText
                  elms={{
                      baseAttributes:{inputMode:'numeric'},
                      label:`文字数`,
                      registerReturn:register(`length`,{
                        valueAsNumber:true,
                        required:{
                          value:true,
                          message:`128以下の数値を半角で入力してください`,
                        },
                        validate:(v)=>(!( v!==v || parseInt(v)>128) || `128以下の数値を半角で入力してください` )
                      })
                    }
                  }
                  message={errors?.['length']?.message}
                  labelMinWidth='3em'
                />
                <F.InputText
                  elms={{
                      baseAttributes:{inputMode:'numeric'},
                      label:`個数`,
                      registerReturn:register(`count`,{
                        valueAsNumber:true,
                        required:{
                          value:true,
                          message:`20以下の数値を半角で入力してください`,
                        },
                        validate:(v)=>(!( v!==v || parseInt(v)>20) || `20以下の数値を半角で入力してください` )
                      })
                    }
                  }
                  message={errors?.['count']?.message}
                  labelMinWidth='3em'
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
          <fieldset className={style.fieldset}>
            <legend className={style.legend}>記号の使用</legend>
            <L.column minColumnWidth='100%' rowGap='.3rem' marginTop='0.4rem'>
              <F.InputCheckboxes
                elms={ALLOWED_SYMBOLS_ARRAY.map((_symbol, index)=>{
                  const registerReturn = register(`src_symbol_${index}`)
                  return {
                    label: _symbol,
                    registerReturn,
                  }
                })}
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