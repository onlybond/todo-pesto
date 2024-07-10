"use client";
import React from "react";
import { Input } from "./ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Button } from "./ui/button";
import { useAppSelector, useAppDispatch } from "@/lib/store/hooks";
import { addTodo } from "@/lib/store/features/todos/todosSlice";
import { toast } from "sonner";
export const TodoSchema = z.object({
  title: z.string().min(2),
  desc: z.string().min(10),
  status: z.enum(["todo", "inprogress", "completed"]),
});
const TodoForm = () => {
  const todos = useAppSelector((state) => state.todos.todos);
  const dispatch = useAppDispatch();
  const form = useForm<z.infer<typeof TodoSchema>>({
    resolver: zodResolver(TodoSchema),
    defaultValues: {
      title: "",
      desc: "",
      status: "todo",
    },
  });
  const onSubmit = (values: z.infer<typeof TodoSchema>) => {
    try{

      const todo = {
        id: todos.length,
        ...values,
        creationDate: new Date().toISOString(),
      };
      dispatch(addTodo(todo));
      toast.success("Added Todo");
      form.reset();
    }
    catch(err:any){
      toast.error(err.message);
    }
  };
  return (
    <div className="border-black border-2 p-4 w-full flex  items-center rounded-md">
      <div className="text-xl font-bold w-48">Add Todo</div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex gap-4 w-full items-center"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="">
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
              <FormItem className="flex-1">
                <FormControl>
                  <Input placeholder="Enter Description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Add Todo</Button>
        </form>
      </Form>
    </div>
  );
};

export default TodoForm;
