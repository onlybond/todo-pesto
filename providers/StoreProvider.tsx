"use client"

import { AppStore, makeStore} from '@/lib/store/store'
import React, { useRef } from 'react'
import { Provider } from 'react-redux'
import initialTodos from '../lib/store/features/todos/todosSlice'
const StoreProvider = ({children}:{children:React.ReactNode}) => {
  const storeRef = useRef<AppStore>()
  if(!storeRef.current){
    storeRef.current = makeStore()
  }
  return (
    <Provider store={storeRef.current}>
      {children}
    </Provider>
  )
}

export default StoreProvider