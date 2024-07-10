import dbConnect from "@/lib/mongodb";
import db from "@/lib/mongodb";
import mongoose from "mongoose";
import { NextApiHandler } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  //get todos from mongodb
  await dbConnect;
  try {
    const db = mongoose.connection;
    const collection = db.collection("todos");
    const cursor = await collection.find();
    const todos = await cursor.toArray();
    return NextResponse.json(todos);
  } catch (err) {
    console.log(err);
  }
}

export async function POST(req: NextRequest) {
  return NextResponse.json({ name: "John Doe" });
}
