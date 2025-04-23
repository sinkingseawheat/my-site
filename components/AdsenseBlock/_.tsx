'use client'
import { userSpecificData } from "@/../my-site.config"
import Script from "next/script"
import style from './_.module.css'
import process from "process"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

const {publisherId, slot} = userSpecificData?.adsenseURL?.banner01 ?? {}

export default function AdsenseBlock({
  id
}:{
  id:string
}){
  const pathname = usePathname()
  const isDisplay = !(
    pathname === '/accessibility/'
    || pathname === '/privacypolicy/'
  )

  const [isLoadedAdsbyGoogle, setIsLoadedAdsbyGoogle] = useState<boolean>(false)

  useEffect(()=>{
    if(
      process.env.NODE_ENV === 'production'
      && isDisplay
      && isLoadedAdsbyGoogle
      && 'adsbygoogle' in window
      ){
      // window.adsbygoogleが存在すれば、実行可能と判断する
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ((window.adsbygoogle || []) as any).push({})
    }
  },[pathname, isLoadedAdsbyGoogle, isDisplay])

  if(!publisherId){
    return <></>
  }

  return (<>
    <Script
      id={`adsense-script-${id}`}
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${publisherId}`}
      crossOrigin="anonymous"
      strategy="lazyOnload"
      onLoad={()=>{
        setIsLoadedAdsbyGoogle(true)
      }}
    />
    {isDisplay && <dl className={style.dl}>
      <dt className={style.dt}>広告</dt>
      <dd className={style.dd}>
        {
          process.env.NODE_ENV === 'production' ?
          (<>
          <div key={`${pathname}-${isLoadedAdsbyGoogle}`}>
            <ins className="adsbygoogle"
              style={{display:'block'}}
              data-ad-client={`${publisherId}`}
              data-ad-slot={`${slot}`}
              data-ad-format="auto"
              data-full-width-responsive="true"></ins>
          </div>
          </>)
          : <div style={{
              width:'100%',
              height:'5rem',
              display:'flex',
              justifyContent:'center',
              alignItems:'center',
              backgroundColor:'rgb(var(--color-fg) / 0.3)'
            }}>広告エリア</div>
          }
      </dd>
    </dl>}
    </>)
}