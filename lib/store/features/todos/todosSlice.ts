import {} from "@reduxjs/toolkit/query"
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {v4 as uuidv4} from 'uuid'
export interface todosState{
  todos: {
    id: string;
    title: string;
    desc:string;
    status: string
    completedby?: string

  }[]
  filter:string
}
const initialTodos:todosState = {
  todos: [],
  filter:"All"
}

export const todosSlice = createSlice({
  name: "todos",
  initialState:initialTodos,
  reducers: {
    getTodos: (state,action)=>{
      state.todos = action.payload
    },
    addTodo: (state, action: PayloadAction<{title: string,desc:string, status:string}>) => {
      const newTodo = {
        id: uuidv4(),
        ...action.payload
      }
      state.todos.push(newTodo)
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload)
    },
    updateTodo: (state, action: PayloadAction<{id: string, title: string,desc:string,status:string}>) => {
      const index = state.todos.findIndex((todo) => todo.id === action.payload.id)
      if (index === -1) return
      state.todos[index] = {...state.todos[index],...action.payload}
    },
    updateFilter: (state,action)=>{
      state.filter = action.payload
    }
  }
})


export const  {addTodo,deleteTodo,updateTodo,updateFilter} = todosSlice.actions

export default todosSlice.reducer