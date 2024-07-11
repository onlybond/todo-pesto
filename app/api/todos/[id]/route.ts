import { NextRequest, NextResponse } from "next/server";

import connectDB from "@/lib/mongodb/dbConnect";
import Todo from "@/lib/mongodb/models/Todo";
import mongoose from "mongoose";

let dbConnected = false;

async function connectToDB() {
  if (!dbConnected) {
    await connectDB();
    dbConnected = true;
  }
}

export async function PATCH(req: NextRequest) {
  const id = req.url.split("/todos/")[1];
  try {
    await connectToDB();
    const reqBody = await req.json()
    if (
      !mongoose.Types.ObjectId.isValid(id) ||
      typeof id !== "string"
    ) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }
    const todo = await Todo.findByIdAndUpdate(id, reqBody, {
      function (err:any, docs:any) { 
        if (err){ 
            console.log(err) 
        } 
        else{ 
            console.log("Updated User : ", docs); 
        } 
    }
    });
    console.log(todo)
    return NextResponse.json({message: todo });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const id = req.url.split("/todos/")[1];
  try {
    await connectToDB();
    if (
      !mongoose.Types.ObjectId.isValid(id) ||
      typeof id !== "string"
    ){
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }
    const todo = await Todo.findByIdAndDelete(id);
    return NextResponse.json({message: todo });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
