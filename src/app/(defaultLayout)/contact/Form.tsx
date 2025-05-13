'use client'
import style from './Form.module.css'
import { F, L, Section } from "@components/all"
import { useEffect, useState } from "react"
import { useForm, type SubmitHandler } from 'react-hook-form'
import z from 'zod'

type Inputs = {
  subject: string,
  reply_addr: string,
  page_url: string,
  content: string,
  csrf_token: string|undefined|null,
}

const schemaResponse = z.object({
  isOK: z.boolean(),
  message: z.string(),
})

export function Form(){

  // 画面切り替え
  const [step, setStep] = useState<'input'|'confirm'|'complete'>('input')

  // react-hook-form
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    getValues,
    formState,
  } = useForm<Inputs>({
    defaultValues:{
      subject: '',
      reply_addr: '',
      page_url: '',
      content: '',
      csrf_token: undefined,
    } satisfies Inputs,
    mode:'onChange',
  })

  // サブミットボタン押下時
  const onSubmit:SubmitHandler<Inputs> = async (data)=>{
    const formData = new FormData()
    for(const [n,v] of Object.entries(data)){
      formData.append(n, (v ?? ''))
    }
    const response = await fetch('/server_action/send_mail.php', {
      method: 'POST',
      body: formData,
    });
    if(response.ok){
      try{
        const json = schemaResponse.safeParse(await response.json()).data ?? {isOK:false, message:''}
        const {isOK, message} = json
        console.log(isOK)
        console.log(message)
      }catch(e){
        console.error(`can't parse JSON,${e}`)
        console.log(await response.text())
      }
    }else{
      console.log('NG')
    }
  }

  // csrfトークンの取得
  useEffect(()=>{
    (async ()=>{
      const response = await fetch('/server_action/get_csrf_token.php')
      if(response.ok){
        const json = await response.json();
        if('csrf_token' in json && typeof json.csrf_token === 'string'){
          setValue('csrf_token', json.csrf_token)
          return
        }
      }
    })()
  }, [])

  const {errors, isValid, isSubmitting} = formState

  // JSX
  return (
    <form className={style.wrap} onSubmit={handleSubmit(onSubmit)}>
      <fieldset className={style.fieldset}>
        <L.grid styleValue={{
          '--min-width':'100%',
          '--margin-top': '0'
        }}>
          {step === 'input' ? 
            (<F.InputText elms={{
              label:'返信時の件名',
              registerReturn: register('subject',{
                required: {
                  value: true,
                  message: `メールの件名を入力してください`
                },
              })
            }} message={errors?.subject?.message} />)
            : (<Section type='dl' title='返信時の件名'>
              {getValues('subject')}
            </Section>)
          }
          
          {step === 'input' ?
            (<F.InputText elms={{
              label:'返信先のアドレス',
              baseAttributes:{
                autoComplete: 'email'
              },
              registerReturn: register('reply_addr', {
                required: {
                  value: true,
                  message: `返信先のアドレスを入力してください`
                }
              })
            }} message={errors?.reply_addr?.message} />)
            : (<Section type='dl' title='送信先のアドレス'>
              {getValues('reply_addr')}
            </Section>)
          }
          {step === 'input' ? 
            (<F.InputText elms={{
              label: 'ページのURL',
              registerReturn: register('page_url', {
                required: {
                  value: true,
                  message: `確認して欲しいページのURLを記入してください`
                },
                validate: (v)=>URL.canParse(v) || `有効なURLを入力してください`
              }),
            }} message={errors?.page_url?.message} />)
            : (<Section type='dl' title='ページのURL'>
              {getValues('page_url')}
            </Section>)
          }
          {step === 'input' ?
            (<F.Textarea elms={{
              label:'確認する内容',
              registerReturn: register('content', {
                required: {
                  value: true,
                  message: `確認する内容を記入してください`
                },
              })
            }} message={errors?.content?.message} />)
            : (<Section type='dl' title='確認する内容'>
              {getValues('content')}
            </Section>)
          }
          <input type="hidden" {...register('csrf_token', {
            required: true,
            validate: (v)=>typeof v === 'string' || `csfr_tokenの取得に失敗しました`
          })} />
        </L.grid>
      </fieldset>
        {step === 'input' ?
          (<L.flex>
            <F.Button
              type='button'
              styleValue={{
                '--color-button-fg':'var(--color-fixed-black)',
                '--color-button-bg':'var(--color-fixed-white)',
                '--color-button-bdr':'var(--color-fg)',
              }}
              onClick={()=>{
                const response = window.confirm(`フォームの内容を空にしますか？`)
                if(response)reset()
              }}>リセットする
            </F.Button>
            <F.Button type='button' isDisabled={!isValid || isSubmitting} onClick={()=>{setStep('confirm')}}>
              {!isValid ?
              '確認画面に進めません'
              : '確認する'}
            </F.Button>
          </L.flex>)
        : step === 'confirm' ?
          (<L.flex>
            <F.Button
              type='button'
              styleValue={{
                '--color-button-fg':'var(--color-fixed-black)',
                '--color-button-bg':'var(--color-fixed-white)',
                '--color-button-bdr':'var(--color-fg)',
              }}
              onClick={()=>{setStep('input')}}>
                修正する
            </F.Button>
            <F.Button isDisabled={isSubmitting}>
            {isSubmitting ? '送信中...' : '送信する'}
            </F.Button>
          </L.flex>)
        : <></>
        }
    </form>
  )
}