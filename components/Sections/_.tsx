import style from './_.module.css';

function lv1({
  isSrOnly,
  h1Elm,
  children,
}:{
  isSrOnly: boolean,
  h1Elm: React.ReactNode | React.ReactNode[],
  children?: React.ReactNode | React.ReactNode[],
}){
  const headingElm = typeof h1Elm === 'string' ?
    (<h1 className={`${style.c_headLv1}${isSrOnly ? ` u_sr_only` : ` ${style['-mb']}`}`}><span className={style.c_headLv1_i}>{h1Elm}</span></h1>)
    : h1Elm
  return (<div className={`${style.wrap_h1}${(!isSrOnly || children) ? ` ${style['-mb']}` : ''}`}>
    {headingElm}
    {children}
  </div>);
}

function lv2({
  title,
  children,
}: {
  title: React.ReactNode
  children: React.ReactNode | React.ReactNode[] | null
}) {
  return children!==null ? (
    <section className={style.l_secLv2}>
      <h2 className={style.c_headLv2}>
        {typeof title === 'string'
          ? <span className={style.c_headLv2_i}>{title}</span>
          : title}
      </h2>
      <div className={style.c_headLv2__cnt}>
        {children}
      </div>
    </section>
  ) : null
}

function lv3({
  title,
  children,
}: {
  title: React.ReactNode
  children: React.ReactNode | React.ReactNode[] | null
}) {
  return children !== null ? (
    <section className={style.l_secLv3}>
      <h3 className={style.c_headLv3}>
        {typeof title === 'string'
          ? <span className={style.c_headLv3_i}>{title}</span>
          : title}
      </h3>
      <div className={style.c_headLv3__cnt}>
        {children}
      </div>
    </section>
  ) : null
}

function dl(props: {
  title: React.ReactNode
  children: React.ReactNode | React.ReactNode[] | null
} | {
  title: React.ReactNode
  children: React.ReactNode | React.ReactNode[] | null
}[]) {
  const array = [props].flat()
  // 小要素がすべてない場合はdlを作らない
  if(array.every(({children})=>children===null)){
    return <></>
  }
  return (
    <dl className={style.dl}>
      {
        array.map(({title, children}, index)=>{
          return children !== null ? (
            <div className={style.dlInner} key={index}>
              <dt className={style.dt}>
                {typeof title === 'string'
                  ? <span className={style.dt_i}>{title}</span>
                  : title}
              </dt>
              <dd className={style.dd}>
                {children}
              </dd>
            </div>
          ) : null
        }).filter(item=>item!==null)
      }
    </dl>
  )
}

const aggregation = {lv1, lv2, lv3, dl}

export default aggregation