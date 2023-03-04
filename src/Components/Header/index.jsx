import { FormatListBulleted, GridView, ArrowBackIosNew, Delete, ModeEdit, TextFormat } from '@mui/icons-material'
import { useContext, useEffect, useState } from 'react'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Btn from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';

import { MyContext } from '../../App'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import Input from '../../UI/Input'
import Button from '../../UI/Button'
import style from './index.module.css'


const Header = ({className}) => {
   const {type, setType, setTriggerGetLocalStorage, triggerGetLocalStorage, setSelectedItem, selectedItem} = useContext(MyContext)
   const [response, _, set, del] = useLocalStorage()
   const [modalVisible, setModalVisible] = useState(false)

   const obj = {
      text: '',
      sortDate: new Date(),
      date: new Intl.DateTimeFormat("ru", {
               day: "numeric", 
               month: "long", 
               year: "numeric",
               minute: "numeric",
               hour: "numeric"
            }).format(new Date()).replace(/(\s?\г\.?)/, "")

   }

   const addNotes = () => {
      set(obj)
      setTriggerGetLocalStorage(!triggerGetLocalStorage)
   }

   const deleteNotes = () => {
      del(selectedItem.id)
      setSelectedItem(0)
      setTriggerGetLocalStorage(!triggerGetLocalStorage)
      setModalVisible(false)
   }

   useEffect(() => {
      setSelectedItem(response ? response : 0)
   },[response])

   const boxStyle = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 200,
      bgcolor: 'background.paper',
      boxShadow: 24,
      p: 4,
    };

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
               {type === 2 && <Button onClick={() => setType(1)}><ArrowBackIosNew className={style.btnIcon}/></Button>}
            </div>
            <Button disabled={!selectedItem || type === 2} onClick={() => setModalVisible(true)}><Delete className={style.btnIcon}/></Button>
         </div>
         <div className={type === 0 ? [style.separateLine, style.activeSeparateLine].join(' ') : style.separateLine}></div>
         <div className={style.headerRight}>
            <div className={style.btnGroupR}>
               <Button disabled={type === 2} onClick={addNotes}><ModeEdit fontSize='small' className={style.btnIcon}/></Button>
               <Button><TextFormat fontSize='medium' className={style.btnIcon} /></Button>
            </div>
            <Input disabled={type === 2} placeholder='Поиск' className={style.input}/>
         </div>
         <Modal
            open={modalVisible}
            onClose={() => setModalVisible(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
         >
            <Box sx={boxStyle}>
               <div className={style.warningBlock}>
                  Удалить заметку?
                  <div className={style.modalBtnGroup}>
                     <Btn variant="outlined" startIcon={<DeleteIcon />} color="error" onClick={deleteNotes}>
                        Удалить
                     </Btn>
                     <Btn variant="outlined" onClick={() => setModalVisible(false)}>
                        Нет
                     </Btn>
                  </div>
               </div>
            </Box>
         </Modal>
      </div>
   )
}

export default Header