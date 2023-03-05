import { Search } from '@mui/icons-material'
import CloseIcon from '@mui/icons-material/Close';
import style from './index.module.css'

const Input = ({placeholder, className, value, setValue, ...props}) => {
   return(
      <div className={[style.root, className].join(' ')}>
         <input 
            className={style.input} 
            type="text" placeholder={placeholder} 
            onChange={(e) => setValue(e.target.value)}
            value={value}
            {...props}
         />
         <Search 
            className={style.icon} 
            fontSize='small'
         />
         {value && <CloseIcon className={style.iconClose} fontSize='small' onClick={() => setValue('')}/>}
      </div>
      
   )
}

export default Input