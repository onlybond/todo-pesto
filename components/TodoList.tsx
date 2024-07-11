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
import { Edit, LoaderIcon, Trash } from "lucide-react";

interface Todo {
  id: string;
  title: string;
  desc: string;
  status: string;
  completedby?: string;
}
const TodoList = () => {
  const [open, setOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [loadingTodoId, setLoadingTodoId] = useState<string | null>(null);
  const form = useForm<z.infer<typeof TodoSchema>>({
    resolver: zodResolver(TodoSchema),
  });
  const todos = useAppSelector((state) => state.todos.todos);
  const filter = useAppSelector((state) => state.todos.filter);
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
    setLoadingTodoId(todo.id)
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
    } finally {
      setLoadingTodoId(null);
    }
  };

  const handleSave = () => {
    try {
      if (!selectedTodo) return;
      const updatedTodo = {
        ...selectedTodo,
        ...form.getValues(),
        updatedAt: new Date().toUTCString(),
        status: form.getValues().status as "todo" | "inprogress" | "completed",
        completedby:
          form.getValues().status === "completed" && new Date().toUTCString(),
      };
      fetch(`/api/todos/${selectedTodo.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTodo),
      })
        .then((response) => response.json())
        .then((data) => {
          dispatch(updateTodo(updatedTodo));
          toast.success("updated todo successfully");
        })
        .catch((err) => {
          toast.error(err.message);
        });
      setOpen(false);
      console.log(updatedTodo);
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handleDelete = (id: string) => {
    setLoadingTodoId(id);
    try {
      fetch(`/api/todos/${id}`, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((data) => {
          dispatch(deleteTodo(id));
          toast.success("deleted todo successfully");
        })
        .catch((err) => {
          toast.error(err.message);
        });
      setLoadingTodoId(null);
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoadingTodoId(null);
    }
  };
  return (
    <div className="border-2 border-black w-full p-4 rounded-md space-y-4">
      <Filter />
      {filteredTodos.length !== 0 ? (
        filteredTodos.map((todo) => (
          <div
            key={todo.id}
            className="border-2 gap-4  border-black p-2 rounded-sm flex justify-between items-center"
          >
            <h1 className="font-bold truncate">{todo.title}</h1>
            <p className="truncate opacity-50 flex-1">{todo.desc}</p>
            {todo.completedby && (
              <p className="opacity-75 text-sm truncate">
                Completed By:
                <span className="font-bold text-xs">{todo.completedby}</span>
              </p>
            )}
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
              disabled={todo.status === "completed" || loadingTodoId === todo.id}
              className="bg-blue-300 text-white disabled:cursor-not-allowed
            hover:bg-blue-200"
            >
              {loadingTodoId === todo.id ? (
                <LoaderIcon className="animate-spin"/>
              ) : (
                <>
                  <Edit className="h-4 w-4 sm:mr-2 m-0 block sm:hidden" />

                  <span className="hidden sm:inline">Update</span>
                </>
              )}
            </Button>
            <Button
              onClick={() => handleDelete(todo.id)}
              variant={"destructive"}
              disabled={loadingTodoId === todo.id}
            >
              {loadingTodoId === todo.id ?  (
                <LoaderIcon className="animate-spin" />
              ) : (
                <>
                  <Trash className="h-4 w-4 sm:mr-2 m-0 block sm:hidden" />
                  <span className="hidden sm:inline">Delete</span>
                </>
              )}
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
                              <Input
                                placeholder="Enter Description"
                                {...field}
                              />
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
                                  <SelectItem
                                    className=" hover:bg-blue-300"
                                    value="todo"
                                  >
                                    Todo
                                  </SelectItem>
                                  <SelectItem
                                    className="hover:bg-yellow-300"
                                    value="inprogress"
                                  >
                                    In Progress
                                  </SelectItem>
                                  <SelectItem
                                    className=" hover:bg-green-300"
                                    value="completed"
                                  >
                                    Completed
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <DialogFooter className="flex gap-2">
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
      ) : (
        <div className="w-full text-center">No todos Found</div>
      )}
    </div>
  );
};

export default TodoList;
