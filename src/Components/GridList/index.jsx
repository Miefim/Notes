import { useContext } from 'react'

import { MyContext } from '../../App'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import style from './index.module.css'

const GridList = ({className}) => {
   const {setSelectedItem, selectedItem, setType} = useContext(MyContext)
   const [ , items, , , get] = useLocalStorage()

   const setSelectedItemObj = (e) => {
      e.stopPropagation()
      setSelectedItem(get(Number(e.currentTarget.id)))
   }
   return(
      <div className={[style.gridList, className].join(' ')} onClick={() => setSelectedItem(0)}>
         {  localStorage.length === 0
            ?  <div className={style.info}>Заметок нет</div>
            :
               items.map(item => 
                  <div 
                     className={style.unit} 
                     id={item.id} 
                     key={item.id}
                     onClick={setSelectedItemObj}
                     onDoubleClick={() => setType(2)}
                  >
                     <div className={selectedItem.id === item.id ? [style.win, style.winActive].join(' ') : style.win}>
                        <h2 className={style.winTitle}>{item.text.split(' ')[0] ? item.text.split(' ')[0] : "Без названия"}</h2>
                        <p className={style.winText}>{item.text}</p>
                     </div>
                     <div className={style.description}>
                        <h2 className={style.title}>{item.text.split(' ')[0] ? item.text.split(' ')[0] : "Без названия"}</h2>
                        <p className={style.date}>{item.date.split(' ')[4]}</p>
                     </div>
                  </div>
               )
         } 
      </div>
   )
}

export default GridList