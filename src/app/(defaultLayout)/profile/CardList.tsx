import style from './CardList.module.css'
import Link from 'next/link'

export function CardList({ listElms }: {
  listElms: ({
    href: string
    isOpenAnotherTab: boolean
    ariaLabel: string
    img?: {
      class: string
      src: string
      alt: string
      width: number
      height: number
    }
    textName: string
    textAccount: string
    noteElm?: string[]
  })[]
}) {
  return (
    <ul className={style.card}>
      {listElms.map(({
        href,
        isOpenAnotherTab,
        ariaLabel,
        img,
        textName,
        textAccount,
        noteElm,
      }, index) => {
        return (
          <li className={style.card__item} key={index}>
            <Link
              href={href}
              className={style.link}
              target={isOpenAnotherTab ? '_blank' : '_self'}
              aria-label={ariaLabel}
            >
              <span
                className={`${style.link_i} ${
                  img?.class ? style[img.class] : style['-empty']
                }`}
              >
                {img === undefined ? '' : (
                  <img
                    className={style.icon}
                    width={img.width}
                    height={img.height}
                    src={img.src}
                    alt={img.alt}
                  />
                )}
              </span>
              <span className={style.link_i}>
                <span className={style.text}>{textName}</span>
                <span className={style.text}>
                  {textAccount}
                </span>
              </span>
              <span className={style.link_i}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 209 209" fillRule="evenodd" clipRule="evenodd" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="1.5">
          <title>別タブでページを開く</title>
            <path className={style.strokeCurrentColor} d="M197.831,115.533l-0,45.165c-0,20.688 -16.796,37.483 -37.483,37.483l-112.449,0c-20.687,0 -37.482,-16.795 -37.482,-37.483l-0,-112.799c-0,-20.687 16.795,-37.482 37.482,-37.482l99.439,-0" fill="none" strokeWidth="20.83px"/>
            <path className={style.strokeCurrentColor} d="M162.318,102.915l35.666,-31.623" fill="none" strokeWidth="20.83px"/>
            <path className={style.strokeCurrentColor} d="M161.935,39.197l36.029,31.944" fill="none" strokeWidth="20.83px"/>
            <path className={style.strokeCurrentColor} d="M174.77,71.303c-49.514,0 -93.642,31.234 -110.104,77.931c16.462,-46.697 60.59,-77.931 110.104,-77.931Z" fill="none" strokeWidth="20.83px"/>
            <path className={style.strokeCurrentColor} d="M117.191,147.334l53.242,0" fill="none" strokeWidth="10.83px"/>
            <path className={style.strokeCurrentColor} d="M143.812,120.713l-0,53.242" fill="none" strokeWidth="10.73px"/>
          </svg>
              </span>
            </Link>
            {
              noteElm &&
                noteElm.map((text, index)=>{
                  return (<p className={`${style.note} u_mt_4 u_ml_4`} key={index}>
                    <span className={style.note__bullet}>
                      ※
                    </span>
                    <span className={style.note__text}>
                      {text}
                    </span>
                  </p>)
                })
            }
          </li>
        )
      })}
    </ul>
  )
}
