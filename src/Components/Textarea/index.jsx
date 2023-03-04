import { useContext, useEffect, useState } from 'react'

import { useLocalStorage } from '../../hooks/useLocalStorage'
import { MyContext } from '../../App'
import style from './index.module.css'

const Textarea = ({className}) => {
   const {selectedItem, setTriggerGetLocalStorage, triggerGetLocalStorage} = useContext(MyContext)
   const [response, localStore, set, del, get, change] = useLocalStorage()
   const [value, setValue] = useState('')

   useEffect(() => {
      if(selectedItem){
         setValue(selectedItem.text)
      }
      else{
         setValue('')
      }
   },[selectedItem])
    
   useEffect(() => {
      if(selectedItem){
         change(selectedItem.id, {...selectedItem, text: value})
         setTriggerGetLocalStorage(!triggerGetLocalStorage)
      }
   },[value]) 

   return(
      <div className={[style.root, className].join(' ')}>
         {selectedItem ? <p className={style.date}>{selectedItem.date}</p> : ''}
         <textarea className={style.textarea} 
            name="" 
            id="" 
            cols="30" 
            rows="10"
            disabled={!selectedItem}
            value={value}
            onChange={e => setValue(e.target.value)}
         />
      </div>
      
   )
}

export default Textarea