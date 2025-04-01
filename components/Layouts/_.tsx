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
  className,
} : {
  children: React.ReactElement | React.ReactElement[]
  className?: string
}){
  return (
    <div className={`${style.veryBack}${className ? ` ${style[className]}` : ''}`}>
      {children}
    </div>
  );
}

const aggregation = {innerBody, vb}

export default aggregation