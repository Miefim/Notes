import { useState } from 'react'

import { Search } from '@mui/icons-material'
import style from './index.module.css'

const Input = ({placeholder, className, value, setValue}) => {
   return(
      <div className={style.root}>
         <input 
            className={[style.input, className].join(' ')} 
            type="text" placeholder={placeholder} 
            onChange={setValue}
            value={value}
         />
         <Search className={style.icon} fontSize='small'/>
      </div>
      
   )
}

export default Input