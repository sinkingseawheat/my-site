import style from './_.module.css'

export default function Picture({
  caption,
  src,
  alt,
  width,
  height,
  srcset,
  sizes
}:
  Pick<HTMLImageElement,'src'|'alt'|'width'|'height'>
  & Partial<Pick<HTMLImageElement,'srcset'|'sizes'>>
  & {
    caption?: React.ReactNode
}) {
  const Img = ()=><img className={style.img} {...{src, alt, width, height, srcSet:srcset, sizes}} loading='lazy'/>
  return (
    caption ?
    (<figure>
      <Img/>
      <figcaption className={style.caption}>{caption}</figcaption>
    </figure>)
    : <Img/>
  )
}