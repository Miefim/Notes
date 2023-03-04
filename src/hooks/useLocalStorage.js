import { useState, useEffect, useContext } from "react"

import { MyContext } from "../App"

export const useLocalStorage = () => {

   const [response, setResponse] = useState(null)
   const [localStore, setLocalStore] = useState([])
   const {triggerGetLocalStorage} = useContext(MyContext)

   localStore.sort((a, b) => a.sortDate > b.sortDate ? -1 : 1)

   useEffect(() => {
      setLocalStore([])
      for(let key in localStorage){
         if(localStorage.hasOwnProperty(key)){
            setLocalStore(el => [...el, JSON.parse(localStorage[key])])
         } 
      } 
   },[triggerGetLocalStorage])

   const set = (obj) => {
      const key = Math.floor(Math.random() * (99999 - 10000) + 10000)
      obj = {...obj, id: key}
      localStorage.setItem(key, JSON.stringify(obj))
      setResponse(JSON.parse(localStorage.getItem(key))) 
   }

   const change = (keyName, obj) => {
      localStorage.setItem(keyName, JSON.stringify(obj))
   }

   const del = (keyName) => {
      localStorage.removeItem(keyName)
   }

   const get = (keyName) => {
      return JSON.parse(localStorage.getItem(keyName))
   }
   
   return [response, localStore, set, del, get, change]
}

