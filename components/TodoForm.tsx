"use client";
import React from "react";
import { Input } from "./ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Button } from "./ui/button";
export const TodoSchema = z.object({
  title: z.string().min(2),
  desc: z.string().min(10),
  status: z.enum(["todo", "inprogress", "completed"]),
});
const TodoForm = () => {
  const form = useForm<z.infer<typeof TodoSchema>>({
    resolver: zodResolver(TodoSchema),
    defaultValues: {
      title: "",
      desc: "",
      status: "todo",
    },
  });
  const onSubmit = (values: z.infer<typeof TodoSchema>) => {
    console.log(values);
    form.reset();
  };
  return (
    <div className="border-black border-2 p-4 w-full rounded-md">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full">
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
              <FormItem className="w-full">
                <FormControl>
                  <Input placeholder="Enter Description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <select
                id="status"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm h-fit py-3"
                {...field}
              >
                <option value="todo">Todo</option>
                <option value="inprogress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            )}
          />
          <Button type="submit">Add Todo</Button>
        </form>
      </Form>
    </div>
  );
};

export default TodoForm;
