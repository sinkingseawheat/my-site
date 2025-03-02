import Script from 'next/script';

export default function GoogleAnalytics(){
  if(process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID === undefined){
    return (<></>)
  }else{
    return (<>
      <Script strategy="beforeInteractive" async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}`} />
      <Script strategy="beforeInteractive" id="gtagInitialize">{`window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}');`}</Script>
    </>)
  }
}