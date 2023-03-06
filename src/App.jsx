import { useState, createContext } from 'react'

import Header from './Components/Header'
import List from './Components/List'
import Textarea from './Components/Textarea'
import GridList from './Components/GridList'
import './App.css'

export const MyContext = createContext()

function App() {
  const [type, setType] = useState(0)
  const [triggerGetLocalStorage, setTriggerGetLocalStorage] = useState(false)
  const [selectedItem, setSelectedItem] = useState(0)
  const [filterItems, setFilterItems] = useState(null)

  return (
    <div className="App">
      <MyContext.Provider value={{type, setType, triggerGetLocalStorage, setTriggerGetLocalStorage, selectedItem, setSelectedItem, setFilterItems, filterItems}}>
        <Header className='header'/>
        <div style={type === 1 || type === 2 ? {width: '100%'} : {}} className={`content ${type === 3 && 'collapseList'}`}>
          <List className={type === 0 || type === 3 ? 'active' : ''}/>
          <Textarea className={type === 1 ? 'noActive' : type === 2 ? 'textareaBig' : ''}/>
          <GridList className={type === 1 && 'active'}/>
        </div>
      </MyContext.Provider>
    </div>
  )
}

export default App
