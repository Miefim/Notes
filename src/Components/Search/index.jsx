import { useContext, useEffect, useState } from 'react'

import { MyContext } from '../../App'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import Input from '../../UI/Input'

const Search = ({className, ...props}) => {
   const {setFilterItems, setSelectedItem} = useContext(MyContext)
   const [searchValue, setSearchValue] = useState('')
   const [, items] = useLocalStorage()

   const filter = items.filter(el => el.text.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1)

   useEffect(() => {
      if(searchValue){
         setFilterItems(filter)
         setSelectedItem(0)
      }
      else{
         setFilterItems(null)  
      }
   },[searchValue])

   return (
      <div className={className}>
         <Input 
            {...props} 
            value={searchValue} 
            setValue={setSearchValue}
         />
      </div>
   )
}

export default Search