import { NextRequest, NextResponse } from "next/server";
import { database } from "@/app/firebaseConfig";
import { get, push, ref, set, update } from "firebase/database";
export async function GET(req:NextRequest){
  const todosRef = ref(database,"todos")
  const todos = await get(todosRef)
  return NextResponse.json({todos})
}

export async function POST(req: NextRequest) {
  const { title, description, status } = await req.json()
  try {
    const todosRef = ref(database, "todos")
    const todos = await get(todosRef)
    const newTodo = {
      title,
      description,
      status
    }
    console.log(todos.val())
    let newTodoId = 0
    if (todos.val() !== null) {
      newTodoId = Object.keys(todos.val()).length
    }
    await update(todosRef, { [newTodoId]: newTodo })
    return NextResponse.json({ message: "added todo", todo: newTodo }, { status: 201 })
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 })
  }
}