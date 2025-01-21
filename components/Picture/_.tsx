'use client'
import { Fragment, useEffect, useState } from "react"

const EXT_PATTERN = '\\w+'

/**
 * 画像パスから必要なピクセル密度の画像パスの配列を作成する。
 * @param _src 画像のパス。ピクセル密度の指定がある場合は最大値を指定（例えば、等倍・2倍・3倍画像の場合は[filename]@3x.[ext]を指定する）
 * @returns 画像パスの配列
 */
const getSrcSetArray = (_src:string)=>{
  const src = _src.trim()
  const [,path,densy,ext,searchParam] = src.match(
    new RegExp(`^(.+)@(\\d)x\\.(${EXT_PATTERN})(\\?.*)?$`)
  ) || []
  if(densy === undefined || !/\d/.test(densy))
    return [src]
  const densyNumber = parseInt(densy);
  if(densyNumber !== densyNumber)
    throw new Error(`${densy}は1桁の数字ですがNaNに変換されました`)
  const srcset:string[] = []
  for(
    let i=1;
    i < densyNumber + 1 && i < 10;
    i++){
      srcset.push(`${path}${i===1 ? '' : `@${i}x`}.${ext}${searchParam ?? ''}`);
    }
  return srcset
}

/** 拡張子をavifに変換したsrcSetArrayを取得 */
const getAVIFSrcSetArray = (srcSetArray:string[])=>srcSetArray.map((src)=>src.replace(new RegExp(`\\.${EXT_PATTERN}(\\?.*)?$`),'.avif$1'));

/** <source />のpropsに代入可能な形でsrcSetとmedia属性を取得 */
const getSrcSetAttribute = (srcSetArray:string[], mediaQuery?:string)=>{
  const srcSet = srcSetArray.map((src,index)=>`${src}${index===0 ? '' : ` ${index+1}x`}`).join(', ')
  const media = mediaQuery
  return {
    srcSet,
    media
  }
}

export default function Picture({
  className, imgSrc, width, height, alt, artDirection,
}: {
  className?: string
  imgSrc: string
  width: number
  height: number
  alt: string
  artDirection?: {
    src: string
    mediaQuery: string
  }[]
}) {

  const [loaded, setLoaded] = useState<boolean>(false)

  useEffect(()=>{
    setLoaded(true)
  },[])

  const imgSrcSet = getSrcSetArray(imgSrc)
  const imgSrcSetAVIF = getAVIFSrcSetArray(imgSrcSet)

  return (
    <picture>
      {
        artDirection !== undefined &&
          artDirection.map(({ src, mediaQuery }, index) => {
            const srcSet = getSrcSetArray(src)
            const srcSetAVIF = getAVIFSrcSetArray(srcSet)
            return (
              <Fragment key={index}>
                <source {...getSrcSetAttribute(srcSetAVIF, mediaQuery)} type='image/avif'/>
                <source {...getSrcSetAttribute(srcSet, mediaQuery)} />
              </Fragment>
            )
          })
      }
      <source {...getSrcSetAttribute(imgSrcSetAVIF)} type='image/avif'/>
      <img
        className={className}
        src={loaded ? imgSrcSet[0] : undefined}
        srcSet={getSrcSetAttribute(imgSrcSet)['srcSet']}
        alt={alt}
        width={width}
        height={height}
      />
    </picture>
  )
}