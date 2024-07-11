"use client";
import React, { useState } from "react";
import { Input } from "./ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Button } from "./ui/button";
import { useAppDispatch } from "@/lib/store/hooks";
import { addTodo } from "@/lib/store/features/todos/todosSlice";
import { toast } from "sonner";
import mongoose from "mongoose";
import { LoaderIcon } from "lucide-react";
export const TodoSchema = z.object({
  title: z.string().min(2),
  desc: z.string().min(10),
  status: z.enum(["todo", "inprogress", "completed"]),
});
const TodoForm = () => {
  const [isLoading,setIsLoading] = useState<boolean | undefined>(false)
  const dispatch = useAppDispatch();
  const form = useForm<z.infer<typeof TodoSchema>>({
    resolver: zodResolver(TodoSchema),
    defaultValues: {
      title: "",
      desc: "",
      status: "todo",
    },
  });
  const onSubmit = async (values: z.infer<typeof TodoSchema>) => {
    try {
      setIsLoading(true)
      const todo = {
        id: new  mongoose.Types.ObjectId().toString(),
        ...values,
        createdAt: new Date().toUTCString(),
      };
      console.log(todo)
      await fetch("/api/todos", {
        method: "POST",
        body: JSON.stringify(todo),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          dispatch(addTodo(todo));
          console.log(data);
          toast.success("Added Todo");
          form.reset();
        })
        .catch((error) => {
          toast.error(error.message);
        });
      setIsLoading(false)
    } catch (err: any) {
      toast.error(err.message);
      setIsLoading(false)
    }
  };
  return (
    <div className="border-black border-2 p-4 w-full flex-col sm:flex-row flex  sm:items-center rounded-md">
      <div className="text-xl font-bold w-48">Add Todo</div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex gap-4 w-full flex-col sm:flex-row sm:items-center"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full sm:w-fit">
                <FormControl>
                  <Input placeholder="Enter Title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="desc"
            render={({ field }) => (
              <FormItem className="sm:flex-1 w-full">
                <FormControl>
                  <Input placeholder="Enter Description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ?
            <LoaderIcon className="animate-spin"/>:
            `Add Todo`
            }
            </Button>
        </form>
      </Form>
    </div>
  );
};

export default TodoForm;
