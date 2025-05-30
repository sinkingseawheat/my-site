'use client'
import style from './Form.module.css'
import { F, L, Loader, Section, List } from "@components/all"
import { useState, useEffect, useTransition, Fragment } from "react"
import { useForm, type SubmitHandler } from 'react-hook-form'
import z from 'zod'

type Inputs = {
  subject: string,
  reply_addr: string,
  page_url: string,
  content: string,
  images?: FileList,
  csrf_token: string, // csrf_tokenでフォーム初期化の成功/失敗の判定も行う。
}

const schemaResponse = z.object({
  isOK: z.boolean(),
  message: z.string().or(z.array(z.string())),
})

const resolverDefaultValues = (isIgnoreSessionStorage: boolean) => (async ()=>{
  let csrf_token:string = ''
  try{
    const response = await fetch('/server_action/send_mail.php',{
      method:'GET',
    })
    if(response.ok){
      const json = z.object({
        csrf_token: z.string(),
        is_enable: z.boolean(),
        limit_minutes: z.number(),
      }).safeParse(await response.json())?.data
      if(json === undefined ){
        csrf_token = `:error_undefined:formの初期化に失敗しました。JSONのデータの型が異なるためサーバー側のエラーと思われます。`
      }else if(json['is_enable'] === false){
        // formを無効化する
        const {limit_minutes} = json ?? { limit_minutes:0 }
        csrf_token = `:error_throttle:同じIPアドレスからの連続投稿は無効化しています. お手数ですが${limit_minutes ? `前回の送信から約${limit_minutes}分ほど` : 'しばらく'}お待ちいただいてから送信お願いします。`
      }else{
        csrf_token = json.csrf_token
      }
    }
  }catch(e){
    console.error(e)
    // do nothing
  }
  return {
    subject: isIgnoreSessionStorage ? '' : window.sessionStorage.getItem('subject') ?? '',
    reply_addr: isIgnoreSessionStorage ? '' : window.sessionStorage.getItem('reply_addr') ?? '',
    page_url: isIgnoreSessionStorage ? '' : window.sessionStorage.getItem('page_url') ?? '',
    content: isIgnoreSessionStorage ? '' : window.sessionStorage.getItem('content') ?? '',
    csrf_token,
  } satisfies Inputs
})

export function Form(){

  // 画面切り替え
  const [step, setStep] = useState<'input'|'confirm'|'complete'|'error'>('input')
  const [responseMessage, setResponseMessage] = useState<string|string[]>('')
  const [isChangingFormState, startTransition] = useTransition()

  // react-hook-form
  const {
    register,
    handleSubmit,
    reset,
    trigger,
    getValues,
    setValue,
    formState: {errors, isValid, isSubmitting, isLoading},
  } = useForm<Inputs>({
    defaultValues: resolverDefaultValues(false),
    mode:'onChange',
  })

  // フォームの初期値を設定した後
  useEffect(()=>{
    if(isLoading === false){
      // scrf_tokenのバリデートを行う
      trigger('csrf_token')
    }
  },[ trigger, isLoading ])

  // サブミットボタン押下時
  const onSubmit:SubmitHandler<Inputs> = async (data)=>{
    const formData = new FormData()
    for(const [n,v] of Object.entries(data)){
      if(typeof v === 'string'){
        formData.append(n, v)
      }else if(v instanceof FileList){
        for(const file of v){
          formData.append(n+'[]', file)
        }
      }else{
        console.error(`not expected data ${n}`)
      }
    }
    const response = await fetch('/server_action/send_mail.php', {
      method: 'POST',
      body: formData,
    });
    if(response.ok){
      try{
        if(/192\.168\.\d+\.\d+$/.test(location.hostname)){
          console.log(`ローカルのIPアドレス環境のため、responseはJSONパースに失敗した場合にエラーをconsoleに表示`)
          const clonedResponse = response.clone()
          console.log(await clonedResponse.text())
          // Todo:エラーメッセージはサーバーから送信されないようにする
        }
        const json = schemaResponse.safeParse(await response.json()).data ?? {isOK:false, message:'データが存在しないか、予期していないデータを受信しました'}
        console.log(json)
        const {isOK, message} = json
        if(isOK === true){
          startTransition(()=>{setStep('complete')})
          // 正常に完了したらsessionStorageは空にする
        if(!/192\.168\.\d+\.\d+$/.test(location.hostname)){
          window.sessionStorage.clear()
        }else{
          console.log(`ローカルのIPアドレス環境のためlocalstorageは未削除です。`)
        }
        }else{
          startTransition(()=>{setStep('error')})
        }
        setResponseMessage(message)
      }catch(e){
        console.error(`can't parse JSON,${e}`)
        startTransition(()=>{setStep('error')})
        setResponseMessage(`can't parse JSON`)
      }
    }else{
      startTransition(()=>{setStep('error')})
      setResponseMessage(`response is not ok. status is ${response.status}`)
    }
  }

  const isFormDisabled: boolean = (
    isLoading === true
    || isChangingFormState === true
    || isSubmitting === true
  )

  // JSX
  return (
    <form
      className={style.wrap}
      data-is-disabled={isFormDisabled}
      onSubmit={
        isFormDisabled === false ?
          handleSubmit(onSubmit)
          : undefined
      }
    >
      {isFormDisabled && <Loader />}
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
                onChange: ()=>{window.sessionStorage.setItem('subject', getValues('subject'))},
              })
            }} message={errors?.subject?.message} styleValue={{'--label-min-width':'8em'}} />)
            : (<Section type='dl' title='返信時の件名'>
              {getValues('subject')}
            </Section>)
          }
          
          {step === 'input' ?
            (<F.InputText elms={{
              label:'返信先のアドレス',
              baseAttributes:{
                autoComplete: 'email',
                inputMode: 'email',
              },
              registerReturn: register('reply_addr', {
                required: {
                  value: true,
                  message: `返信先のアドレスを入力してください`
                },
                onChange: ()=>{window.sessionStorage.setItem('reply_addr', getValues('reply_addr'))},
              })
            }} type='email' message={errors?.reply_addr?.message} styleValue={{'--label-min-width':'8em'}} />)
            : (<Section type='dl' title='送信先のアドレス'>
              {getValues('reply_addr')}
            </Section>)
          }
          {step === 'input' ? 
            (<F.InputText elms={{
              label: 'ページのURL',
              baseAttributes: {
                inputMode: 'url',
              },
              registerReturn: register('page_url', {
                required: {
                  value: true,
                  message: `確認して欲しいページのURLを記入してください`
                },
                validate: (v)=>URL.canParse(v) || `有効なURLを入力してください`,
                onChange: ()=>{window.sessionStorage.setItem('page_url', getValues('page_url'))},
              }),
            }} message={errors?.page_url?.message} styleValue={{'--label-min-width':'8em'}} />)
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
                onChange: ()=>{window.sessionStorage.setItem('content', getValues('content'))},
              })
            }} message={errors?.content?.message} />)
            : (<Section type='dl' title='確認する内容'>
              <>-----<br />{getValues('content').split('\n').map((str, index, strs)=>{
                return (
                  <Fragment key={index}>
                  {str}
                  {index < strs.length - 1 && <br />}
                </Fragment>
                )
              })}<br />-----</>
            </Section>)
          }
          <L.grid styleValue={{'--margin-top':`${step === 'input' ? '0': '2rem'}`,'--min-width':'100%'}}>
            <F.InputFileImages
              elms={{
                label:`キャプチャ等の補足画像（任意）${getValues('images')?.length || '0'}枚選択されています（最大4枚）`,
                registerReturn: register('images', {
                  validate:{
                    maxNumber: (v)=>{
                      return (v?.length ?? 0) <= 4 || `現在${v?.length}枚の画像が添付されています。4枚以下にしてください。`
                    },
                    maxSize: (v)=>{
                      if(v === undefined) { return true }
                      const filesSizeOver = Array.from(v).map<[boolean, string, string]>(
                        (file, index)=>[file.size>6*1024*1024, (index+1).toString(), file.name]
                      ).filter(
                        ([isOver])=>isOver
                      )
                      if(filesSizeOver.length === 0){
                        return true
                      }else{
                        return `${filesSizeOver.map(([, indexPlusOne, filename])=>`${indexPlusOne}枚目の「${filename}」`).join(', ')}のファイルサイズが約6MB以上あります。リサイズや圧縮を行なってください。`
                      }
                    }
                  }
                }),
              }}
              styleValue={{'--preview-min-width':'20em'}}
              getValues={getValues}
              setValue={setValue}
              trigger={trigger}
              isEditable={step === 'input'}
              message={errors?.images?.message}
            />
          </L.grid>
          {step === 'input' && <List bullet='※'>
            <span>画像はページのリロードや送信失敗で選択が解除されます。その際は改めて選択をお願いします。</span>
            <span>画像は幅600pxより大きい場合は文字や細い線を使用しないようにお願いします。幅600pxにリサイズされて私の元に送信されます。</span>
          </List>}
          <input type="hidden" autoComplete='off' {...register('csrf_token', {
            validate: {
              empty: (v)=> v !== '' || 'csrf_tokenの取得に失敗しました。システムエラーが発生したと思われます。解決までしばらくお待ちください。',
              throttle: (v)=> v.indexOf(':error_throttle:') !== 0 || v.replace(':error_throttle:', ''),
              undefinedJSON: (v)=> v.indexOf(':error_undefined:') !== 0 || v.replace(':error_undefined:', ''),
            }
          })} />
          <div aria-live='polite' role='alert'>
            {errors.csrf_token?.message !==undefined && (
              <p className={style.errorMessage}>{errors.csrf_token?.message}</p>
            )}
          </div>
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
            onClick={async ()=>{
              const response = window.confirm(`フォームの内容を空にしますか？`)
              if(response){
                reset(await (resolverDefaultValues(true))() )
              }
            }}>リセットする
          </F.Button>
          <F.Button
            type='button'
            isDisabled={!isValid}
            onClick={()=>{
              startTransition(()=>{
                setStep('confirm')
              })
            }}>
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
            onClick={()=>{
              startTransition(()=>{
                setStep('input')
              })
            }}>
              修正する
          </F.Button>
          <F.Button isDisabled={isSubmitting}>
            {isSubmitting ? '送信中...' : '送信する'}
          </F.Button>
        </L.flex>)
      : (<>
        <p>{
          step === 'complete' ?
          '送信完了しました'
          : 'エラーが発生しました。'
        }</p>
        <p>システムからのメッセージ：<>{
          [responseMessage].flat().map((str, index, strs)=>{
            // 配列は<br>で繋ぐ。
            return (
              <Fragment key={index}>
              {str}
              {index < strs.length - 1 && <br />}
            </Fragment>
            )
          })
        }</></p>
        <F.Button type='button'
          onClick={async ()=>{
            reset(await (resolverDefaultValues(false))() )
            startTransition(()=>{
              setStep('input')
            })
          }}>入力画面に戻る</F.Button>
      </>)
      }
    </form>
  )
}