import React, { createContext,useState } from 'react'

const MyContext = createContext()

const ContextProvider = (props) => {
   const [offset,setOffset]=useState(1)
   const [offsetAnalytics,setOffsetAnalytics]=useState(1)
  return (
    <MyContext.Provider value={{offset,setOffset,offsetAnalytics,setOffsetAnalytics}}>
      {props.children}
    </MyContext.Provider>
  )
}

export default ContextProvider
export {MyContext}
