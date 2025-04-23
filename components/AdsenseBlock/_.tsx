import { userSpecificData } from "@/../my-site.config"
import Script from "next/script"
import style from './_.module.css'
import process from "process"

const {publisherId, slot} = userSpecificData?.adsenseURL?.banner01 ?? {}

export default function AdsenseBlock({
  id
}:{
  id:string
}){
  return publisherId ? (<dl className={style.dl}>
      <dt className={style.dt}>広告</dt>
      <dd className={style.dd}>
        {
          process.env.NODE_ENV === 'production' ?
          (<>
          <Script
            id={`adsense-script-${id}`}
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${publisherId}`}
            crossOrigin="anonymous"
            strategy="lazyOnload"
          />
          <ins className="adsbygoogle"
            style={{display:'block'}}
            data-ad-client={`${publisherId}`}
            data-ad-slot={`${slot}`}
            data-ad-format="auto"
            data-full-width-responsive="true"></ins>
          <Script
          id={`adsbygoogle-push-${id}`}
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{__html:`(adsbygoogle = window.adsbygoogle || []).push({});`}}
          />
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
  </dl>) : null
}