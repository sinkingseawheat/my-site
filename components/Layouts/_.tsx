import style from './_.module.css'

function innerBody({
  children
} : {
  children: React.ReactElement | React.ReactElement[]
}){
  return (
    <div className={style.wrapper}>
      {children}
    </div>
  );
};

function vb({
  children,
  classNameOption,
} : {
  children: React.ReactElement | React.ReactElement[]
  classNameOption?: string
}){
  return (
    <div className={`${style.veryBack}${classNameOption ? ` ${style[classNameOption]}` : ''}`}>
      {children}
    </div>
  );
}

export default {innerBody, vb}