import { FormatListBulleted, GridView, ArrowBackIosNew, Delete, ModeEdit, TextFormat } from '@mui/icons-material'
import { useState } from 'react'

import Input from '../../UI/Input'
import Button from '../../UI/Button'
import style from './index.module.css'


const Header = ({className}) => {
   const [type, setType] = useState(0)

   const addNotes = () => {
      localStorage.setItem(`${Math.floor(Math.random() * (99999 - 10000) + 10000)}`, '')
   }

   return (
      <div className={[style.header, className].join(' ')}>
         <div className={style.headerLeft}>
            <div className={style.btnGroupL}>
               <Button 
                  className={type === 0 && style.activeButtonType}
                  onClick={() => setType(0)}
               >
                  <FormatListBulleted className={style.btnIcon}/>
               </Button>
               <Button
                  className={type === 1 && style.activeButtonType}
                  onClick={() => setType(1)}
               >
                  <GridView className={style.btnIcon} />
               </Button>
               <Button><ArrowBackIosNew className={style.btnIcon} /></Button>
            </div>
            <Button><Delete className={style.btnIcon}/></Button>
         </div>
         <div className={type === 0 ? [style.separateLine, style.activeSeparateLine].join(' ') : style.separateLine}></div>
         <div className={style.headerRight}>
            <div className={style.btnGroupR}>
               <Button onClick={addNotes}><ModeEdit fontSize='small' className={style.btnIcon}/></Button>
               <Button><TextFormat fontSize='medium' className={style.btnIcon} /></Button>
            </div>
            <Input placeholder='Поиск' className={style.input}/>
         </div>
      </div>
   )
}

export default Header