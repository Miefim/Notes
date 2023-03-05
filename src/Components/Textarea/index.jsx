import { useContext, useEffect, useState } from 'react'

import { useLocalStorage } from '../../hooks/useLocalStorage'
import { MyContext } from '../../App'
import style from './index.module.css'

const Textarea = ({className}) => {
   const {selectedItem, setTriggerGetLocalStorage, triggerGetLocalStorage} = useContext(MyContext)
   const [, , , , , change] = useLocalStorage()
   const [text, setText] = useState('')
   const [innerHTML, setInnerHTML] = useState('')

   useEffect(() => {
      if(selectedItem){
         setText(selectedItem.text)
         setInnerHTML(selectedItem.innerHTML)
      }
      else{
         setText('')
         setInnerHTML('')
      }
   },[selectedItem])
    
   useEffect(() => {
      if(selectedItem){
         change(selectedItem.id, {...selectedItem, text: text, innerHTML})
         setTriggerGetLocalStorage(!triggerGetLocalStorage)
      }
   },[text, innerHTML]) 

   const setValues = (e) => {
      setText(e.currentTarget.textContent)
      setInnerHTML(e.currentTarget.innerHTML)
   }

   return(
      <div className={[style.root, className].join(' ')}>
         {selectedItem === 0 && <img className={style.textareaDisabledIcon} src="/images/EditIcon.svg" alt="" />}
         {selectedItem ? <p className={style.date}>{selectedItem.date}</p> : ''}
         <div 
            className={style.textarea} 
            contentEditable={selectedItem !== 0} 
            suppressContentEditableWarning={true}
            onInput={setValues}
            dangerouslySetInnerHTML={{__html: selectedItem.innerHTML}}
         >
         </div>
         {/* <textarea className={style.textarea} 
            name="" 
            id="" 
            cols="30" 
            rows="10"
            disabled={!selectedItem}
            value={value}
            onChange={e => setValue(e.target.value)}
         /> */}
      </div>
      
   )
}

export default Textarea