import TodoForm from "@/components/TodoForm";
import TodoList from "@/components/TodoList";

export default function Home() {
  return (
    <div className="min-w-screen flex flex-col-reverse sm:flex-col gap-4 container justify-center  items-center">
      <TodoForm />
      <TodoList />
    </div>
  );
}
