import { FormatListBulleted, GridView, ArrowBackIosNew, Delete, ModeEdit, TextFormat, FormatBold, FormatItalic, FormatListNumbered, FormatSize } from '@mui/icons-material'
import { useContext, useEffect, useState } from 'react'
import { Modal, Box } from '@mui/material';
import Btn from '@mui/material/Button';

import { MyContext } from '../../App'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import Search from '../Search';
import Button from '../../UI/Button'
import style from './index.module.css'


const Header = ({className}) => {
   const {type, setType, setTriggerGetLocalStorage, triggerGetLocalStorage, setSelectedItem, selectedItem} = useContext(MyContext)
   const [response, _, set, del] = useLocalStorage()
   const [modalVisible, setModalVisible] = useState(false)
   const [activeFormatTextBtn, setActiveFormatTextBtn] = useState(false)

   useEffect(() => {
      if(selectedItem === 0 || type === 1){
         setActiveFormatTextBtn(false)
      }
   },[selectedItem, type])

   const obj = {
      text: '',
      innerHTML: '',
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
               {type === 2 && <Button onClick={() => setType(1)}><ArrowBackIosNew className={style.btnIcon}/></Button>}
            </div>
            <Button 
               disabled={!selectedItem || type === 2} 
               onClick={() => setModalVisible(true)}
            >
               <Delete className={style.btnIcon}/>
            </Button>
         </div>
         <div className={type === 0 ? [style.separateLine, style.activeSeparateLine].join(' ') : style.separateLine}></div>
         <div className={style.headerRight}>
            <div className={style.btnGroupR}>
               <Button 
                  disabled={type === 2} 
                  onClick={addNotes}
               >
                  <ModeEdit fontSize='small' className={style.btnIcon}/>
               </Button>
               <Button 
                  className={activeFormatTextBtn ? [style.textFormatBtn, style.activeButtonType].join(' ') : style.textFormatBtn} 
                  disabled={selectedItem === 0 || type === 1}
                  onClick={() => setActiveFormatTextBtn(!activeFormatTextBtn)}
               >
                  <TextFormat 
                     fontSize='medium' 
                     className={style.btnIcon}
                  />
               </Button>
               <div className={style.formatBtnGroupWin}>
                  <div className={`${style.textFormatBtnGroup} ${activeFormatTextBtn && style.textFormatBtnGroupActive}`}>
                     <div className={style.fontSizeBtn}>
                        <Button>
                           <FormatSize 
                              fontSize='medium' 
                              className={style.btnIcon}
                           />
                        </Button>
                        <div className={style.fontSizeBtnPopap}>
                           <Button className={style.popapBtn} onClick={() => document.execCommand('fontSize', false, '1')}>1</Button>
                           <Button className={style.popapBtn} onClick={() => document.execCommand('fontSize', false, '2')}>2</Button>
                           <Button className={style.popapBtn} onClick={() => document.execCommand('fontSize', false, '3')}>3</Button>
                           <Button className={style.popapBtn} onClick={() => document.execCommand('fontSize', false, '4')}>4</Button>
                           <Button className={style.popapBtn} onClick={() => document.execCommand('fontSize', false, '5')}>5</Button>
                           <Button className={style.popapBtn} onClick={() => document.execCommand('fontSize', false, '6')}>6</Button>
                           <Button className={style.popapBtn} onClick={() => document.execCommand('fontSize', false, '7')}>7</Button>
                        </div>
                     </div>
                     <div style={{display:'flex'}}>
                        <Button onClick={() => document.execCommand('bold')}>
                           <FormatBold 
                              fontSize='medium' 
                              className={style.btnIcon}
                           />
                        </Button>
                        <Button onClick={() => document.execCommand('italic')}>
                           <FormatItalic 
                              fontSize='medium' 
                              className={style.btnIcon}
                           />
                        </Button>
                        <Button onClick={() => document.execCommand('underline')}>
                           <TextFormat 
                              fontSize='medium' 
                              className={style.btnIcon}
                           />
                        </Button>
                     </div>
                     <div style={{display:'flex'}}>
                        <Button onClick={() => document.execCommand('insertOrderedList')}>
                           <FormatListNumbered 
                              fontSize='medium' 
                              className={style.btnIcon}
                           />
                        </Button>
                        <Button onClick={() => document.execCommand('insertUnorderedList')}>
                           <FormatListBulleted 
                              fontSize='medium' 
                              className={style.btnIcon}
                           />
                        </Button>
                     </div>
                  </div>
               </div>
            </div>
            <Search 
               disabled={type === 2 || localStorage.length === 0} 
               placeholder='Поиск' 
               className={type === 2 || localStorage.length === 0 ? [style.input, style.inputDisabled].join(' ') : style.input}
            />
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
                     <Btn 
                        variant="outlined" 
                        startIcon={<Delete/>} 
                        color="error" 
                        onClick={deleteNotes}
                     >
                        Удалить
                     </Btn>
                     <Btn 
                        variant="outlined" 
                        onClick={() => setModalVisible(false)}
                     >
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