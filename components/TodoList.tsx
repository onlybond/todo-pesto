"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { deleteTodo, updateTodo } from "@/lib/store/features/todos/todosSlice";
import { useAppSelector, useAppDispatch } from "@/lib/store/hooks";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "./ui/select";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { TodoSchema } from "./TodoForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogDescription } from "@radix-ui/react-dialog";
import { toast } from "sonner";
import { Filter } from "./FilterDropDown";

interface Todo {
  id: number;
  title: string;
  desc: string;
  status: string;
}
const TodoList = () => {
  const [open, setOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const form = useForm<z.infer<typeof TodoSchema>>({
    resolver: zodResolver(TodoSchema),
  });

  const todos = useAppSelector((state) => state.todos.todos);
  const filter = useAppSelector((state) => state.todos.filter);
  console.log(filter);
  const dispatch = useAppDispatch();

  const filteredTodos = (() => {
    switch (filter) {
      case "todo":
        return todos.filter((todo) => todo.status === "todo");

      case "inprogress":
        return todos.filter((todo) => todo.status === "inprogress");

      case "completed":
        return todos.filter((todo) => todo.status === "completed");

      default:
        return todos;
    }
  })();
  const handleUpdate = (todo: Todo) => {
    try {
      setSelectedTodo(todo);
      form.reset({
        title: todo.title,
        desc: todo.desc,
        status: todo.status as "todo" | "inprogress" | "completed",
      });
      setOpen(true);
    } catch (err: any) {
      console.log(err.message);
    }
  };

  const handleSave = () => {
    try {
      if (!selectedTodo) return;
      const updatedTodo = {
        ...selectedTodo,
        ...form.getValues(),
        updatedDate: new Date().toISOString(),
        status: form.getValues().status as "todo" | "inprogress" | "completed",
      };
      dispatch(updateTodo(updatedTodo));
      toast.success("updated todo successfully");
      setOpen(false);
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handleDelete = (id: number) => {
    try {
      dispatch(deleteTodo(id));
      toast.success("deleted todo successfully");
    } catch (err: any) {
      toast.error(err.message);
    }
  };
  return (
    <div className="border-2 border-black w-full p-4 rounded-md space-y-4">
      <Filter />
      {filteredTodos.length !== 0 ?
      filteredTodos.map((todo) => (
        <div
          key={todo.id}
          className="border-2 gap-4  border-black p-2 rounded-sm flex justify-between items-center"
        >
          <h1 className="font-bold">{todo.title}</h1>
          <p className="truncate opacity-50 flex-1">{todo.desc}</p>

          <div
            className={`py-1 px-4 rounded-full text-xs font-bold  border-2 uppercase cursor-pointer ${
              todo.status === "todo"
                ? "border-blue-900 bg-blue-200 text-blue-900"
                : todo.status === "inprogress"
                ? "border-yellow-900 bg-yellow-200 text-yellow-900"
                : "border-green-900 bg-green-200 text-green-900"
            } `}
          >
            {todo.status}
          </div>
          <Button
            onClick={() => handleUpdate(todo)}
            variant={"secondary"}
            className="bg-blue-300 text-white hover:bg-blue-200"
          >
            Update
          </Button>
          <Button onClick={() => handleDelete(todo.id)} variant={"destructive"}>
            Delete
          </Button>
          {open && selectedTodo === todo ? (
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Update Todo</DialogTitle>
                  <DialogDescription>
                    Update the details of the todo
                  </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(handleSave)}
                    className="flex flex-col gap-4 w-full"
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
                        <FormItem className="w-full">
                          <FormControl>
                            <Select {...field} onValueChange={field.onChange}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select Status" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="todo">Todo</SelectItem>
                                <SelectItem value="inprogress">
                                  In Progress
                                </SelectItem>
                                <SelectItem value="completed">
                                  Completed
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <DialogFooter>
                      <Button type="submit">Save</Button>
                      <Button
                        variant={"outline"}
                        onClick={() => setOpen(false)}
                      >
                        Cancel
                      </Button>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          ) : null}
        </div>
      ))
    :
  (
    <div className="w-full text-center">No todos Found</div>
  )
    }
    </div>
  );
};

export default TodoList;
