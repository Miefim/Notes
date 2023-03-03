import Header from './Components/Header'
import List from './Components/List'
import Textarea from './Components/Textarea'
import GridList from './Components/GridList'
import './App.css'

function App() {


  return (
    <div className="App">
      <Header className='header'/>
      <div className='content'>
        <List/>
        <Textarea/>
        {/* <GridList/> */}
      </div>
    </div>
  )
}

export default App
