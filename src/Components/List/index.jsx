import { useEffect, useState } from 'react'
import style from './index.module.css'

const List = () => {
   const [items, setItems] = useState([])

   useEffect(() => {
      for(let key in localStorage){
         if(localStorage.hasOwnProperty(key)){
            setItems(items => [...items, localStorage[key]])
         } 
      }
   },[localStorage])
   
   return (
      <div className={style.list}>
         <div className={style.date}>
            Сегодня
         </div>
         {
            items.map((item, i) => 
               <div className={style.item} key={i}>
                  <h2 className={style.itemTitle}>Title</h2>
                  <div className={style.itemText}>
                     <p className={style.time}>17:50</p> 
                     Нет дополнительного текста
                  </div>
               </div>
            )
         }
         
      </div>
   )
}

export default List