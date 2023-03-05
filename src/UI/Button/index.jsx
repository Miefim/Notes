import style from './index.module.css'

const Button = ({children, className, ...props}) => {
   return(
      <button 
         {...props} 
         className={[style.btn, className].join(' ')}
      >
         {children}
      </button>
   )
}

export default Button