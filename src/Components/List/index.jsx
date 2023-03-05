import { useContext, useEffect, useState } from 'react'

import { MyContext } from '../../App'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import style from './index.module.css'

const List = ({className}) => {
   const {setSelectedItem, selectedItem, filterItems} = useContext(MyContext)
   const [ , items, , , get] = useLocalStorage()

   const arr = filterItems ? filterItems : items

   const setSelectedItemObj = (e) => {
      e.stopPropagation()
      setSelectedItem(get(Number(e.currentTarget.id)))
   }

   return (
      <div 
         className={[style.list, className].join(' ')} 
         onClick={() => setSelectedItem(0)}
      >
         <div className={style.date}>Сегодня</div>
         {filterItems?.length === 0 && <div className={style.info}>Заметок не найдено</div>}
         {  
            localStorage.length === 0 
            ?  <div className={style.info}>Заметок нет</div> 
            :  arr.map((item) =>
                  <div 
                     className={item.id === selectedItem.id ? [style.item, style.itemActive].join(' ') : style.item} 
                     key={item.id} 
                     id={item.id} 
                     onClick={setSelectedItemObj}
                  >
                     <h2 className={style.itemTitle}>
                        {item.text.split(' ')[0] ? item.text.split(' ')[0] : "Без названия"}
                     </h2>
                     <div className={style.itemText}>
                        <p className={style.time}>{item.date.split(' ')[4]}</p> 
                        {item.text ? item.text : 'Нет дополнительного текста'}
                     </div>
                  </div>
               )
         } 
      </div>
   )
}

export default List