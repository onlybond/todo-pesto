import { FilterDropDown } from "@/components/FilterDropDown";
import Nav from "@/components/Nav";
import TodoForm from "@/components/TodoForm";
import TodoList from "@/components/TodoList";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-w-screen flex flex-col gap-4 container justify-center items-center">
      <TodoForm/>
      <TodoList/>
    </div>
  );
}
