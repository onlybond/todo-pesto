import { TodoSchema } from './../../../components/TodoForm';
import connectDB from "@/lib/mongodb/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import Todo from '@/lib/mongodb/models/Todo'
import mongoose from 'mongoose';

let dbConnected = false;

async function connectToDB() {
  if (!dbConnected) {
    await connectDB();
    dbConnected = true;
  }
}
export async function GET(req: NextRequest) {
  try {
    await connectToDB();
    const todos = await Todo.find();
    return NextResponse.json({ message: todos});
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req:NextRequest) {
  try {
    await connectToDB();
    const todosData = await req.json()
    const todoDataWithDefaults = {
      ...todosData,
      _id: todosData.id  || new mongoose.Types.ObjectId().toString(),
      createdAt: todosData.createdAt || new Date().toUTCString(),
      updatedAt: todosData.updatedAt || new Date().toUTCString(),
    };
    const todo = await Todo.create(todoDataWithDefaults)
    return NextResponse.json({todo})
  } catch (err:any) {
    console.log(err.message)
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
