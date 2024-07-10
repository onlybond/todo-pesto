import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface todosState{
  todos: {
    id: number;
    title: string;
    desc:string;
    status: string
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
    addTodo: (state, action: PayloadAction<{id: number, title: string,desc:string, status:string}>) => {
      state.todos.push(action.payload)
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload)
    },
    updateTodo: (state, action: PayloadAction<{id: number, title: string,desc:string,status:string}>) => {
      state.todos = state.todos.map((todo) => {
        if(todo.id === action.payload.id){
          return action.payload
        }
        return todo
      })
    },
    updateFilter: (state,action)=>{
      state.filter = action.payload
    }
  }
})


export const  {addTodo,deleteTodo,updateTodo,updateFilter} = todosSlice.actions

export default todosSlice.reducer