import style from './_.module.css';

function lv1({
  isSrOnly,
  h1Elm,
  children,
}:{
  isSrOnly: boolean,
  h1Elm: React.ReactElement | React.ReactElement[] | string,
  children?: React.ReactElement | React.ReactElement[],
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
  title: React.ReactElement | string
  children: React.ReactElement | React.ReactElement[] | null
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
  title: React.ReactElement | string
  children: React.ReactElement | React.ReactElement[] | null
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

const aggregation = {lv1, lv2, lv3}

export default aggregation