import { useContext, useEffect, useState } from 'react'

import { useLocalStorage } from '../../hooks/useLocalStorage'
import { MyContext } from '../../App'
import style from './index.module.css'

const Textarea = ({className}) => {
   const {selectedItem, setTriggerGetLocalStorage, triggerGetLocalStorage, type, setType} = useContext(MyContext)
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

   const handleTouchTextarea = () => {
      if(window.screen.availWidth < 1000 && type === 0 && selectedItem !== 0){
         setType(3)
      }
   }

   return(
      <div className={[style.root, className].join(' ')} onTouchStart={handleTouchTextarea}>
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
      </div>
      
   )
}

export default Textarea