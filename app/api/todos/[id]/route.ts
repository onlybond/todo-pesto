import { database } from "@/app/firebaseConfig"
import { get, ref, remove, update } from "firebase/database"
import { NextApiRequest } from "next"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextApiRequest) {
  const id = req.url?.split("/todos/")[1]
  if (!id) {
    return NextResponse.json({ message: "Id not found" }, { status: 404 })
  }
  try {
    const todosRef = ref(database, "todos")
    const gettodos = await get(todosRef)
    const todos = gettodos.val()[id]
    if (!todos) {
      return NextResponse.json({ message: "Todo not found" }, { status: 404 })
    }
    return NextResponse.json({ todos }, { status: 200 })
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest) {
  const id = req.url?.split("/todos/")[1]
  if (!id) {
    return NextResponse.json({ message: "Id not found" }, { status: 404 })
  }
  try {
    const prevTodo = await req.json()
    console.log(prevTodo)
    if (!prevTodo || !prevTodo.title || !prevTodo.description || !prevTodo.status) {
      return NextResponse.json({ message: "Invalid todo" }, { status: 400 })
    }
    const todosRef = ref(database, "todos")
    const todo = {
      title: prevTodo.title,
      description: prevTodo.description,
      status: prevTodo.status
    }
    await update(todosRef, { [id]: todo })
    return NextResponse.json({ todo }, { status: 200 })
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 })
  }
}

export async function DELETE(req: NextApiRequest) {
  const id = req.url?.split("/todos/")[1]
  if (!id) {
    return NextResponse.json({ message: "Error" }, { status: 404 })
  }
  try {
    const todosRef = ref(database, "todos")
    const gettodos = await get(todosRef)
    const todo_to_delete = gettodos.val()[id]
    await remove(todo_to_delete)
    return NextResponse.json({}, { status: 200 })
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 })
  }
}