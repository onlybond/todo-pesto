"use client";
import { toast } from "react-toastify";
import { push, get, ref, update } from "firebase/database";
import { useEffect, useState } from "react";
import {todos} from './data'
import { BiEdit, BiSave, BiTrash } from "react-icons/bi";
export default function Home() {
  const [todos, setTodos] = useState([]);
  const [filteredTodos,setFilteredTodos] = useState([]);
  const [todo, setTodo] = useState({
    id: null,
    title: "",
    description: "",
    status: "todo",
  });
  const handleDelete = (todoId) => {
    try {
      setTodos((prevTodos) => {
        return prevTodos.filter((todo) => {
          return todo.id !== todoId;
        });
      });
      toast.success("Todo deleted successfully", {
        theme: "colored",
      });
    } catch (err) {
      toast.error(err.message);
    }
  };
  const handleAddTodo = (e, todo) => {
    e.preventDefault();
    try {
      setTodos((prevTodos) => {
        return [...prevTodos, { ...todo, id: prevTodos.length + 1 }];
      });
      setTodo({ title: "", description: "", status: "todo" });
      toast.success("Todo added successfully");
    } catch (err) {
      toast.error(err.message);
    }
  };
  const handleEdit = (todoId) => {
    setTodos((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id === todoId) {
          return { ...todo, editable: !todo.editable };
        }
        return todo;
      });
    });
  };
  const handleUpdate = (e) => {
    e.preventDefault();
    try {
      const newStatus = e.target.value;
      setTodos((prevTodos) => {
        return prevTodos.map((todo) => {
          if (todo.editable) {
            return { ...todo, editable: !todo.editable, status: newStatus };
          }
          return todo;
        });
      });
      toast.success("Todo updated successfully");
    } catch (err) {
      toast.error(err.message);
    }
  };
  useEffect(() => {
    const todoRef = ref(database, "todos");
    get(todoRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const todosArray = Object.entries(snapshot.val()).map(
            ([id, data]) => ({
              id,
              ...data,
              editable: false,
            })
          );
          setTodos(todosArray);
        } else {
          console.log("no data available");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  useEffect(()=>{
    setFilteredTodos(todos)
  },[todos])
  const handleFilter = (e)=>{
    const status = e.target.innerHTML
    let filteredTodos;
    if(status==="All"){
      filteredTodos = todos
    } else{
      filteredTodos = todos.filter((todo)=> todo.status=== status)
    }
    console.log(filteredTodos)
    setFilteredTodos(filteredTodos) 
  }
  return (
    <div className="container mx-auto overflow-clip">
      <nav className="p-4">
        <span className="text-2xl font-bold">Todo-Pesto</span>
      </nav>
      <div className="p-4 flex flex-col-reverse sm:flex-col gap-4">
        <div className="border-2 shadow-[0px_-2px_10px_1px_rgba(0,0,0,0.3)] sm:shadow-[0px_0px_10px_1px_rgba(0,0,0,0.3)] rounded-md p-4 items-center flex gap-4 sticky   bg-white bottom-0">
          <form className="flex sm:flex-row items-start flex-col gap-4 sm:items-center w-full">
            <h1 className="text-xl font-bold">Add todo</h1>
            <input
              type="text"
              placeholder="Enter Title"
              name="title"
              value={todo.title}
              onChange={(e) => setTodo({ ...todo, title: e.target.value })}
              className="border-black border-1 ring-1 px-4 py-2 rounded w-full sm:w-fit"
            />
            <input
              type="text"
              placeholder="Enter Description"
              name="description"
              value={todo.description}
              onChange={(e) =>
                setTodo({ ...todo, description: e.target.value })
              }
              className="border-black border-1 ring-1 px-4 py-2 w-full rounded sm:flex-1"
            />
            <button
              type="submit"
              className="bg-black text-white px-4 py-2 w-full sm:w-fit rounded"
              onClick={(e) => handleAddTodo(e, todo)}
            >
              Add
            </button>
          </form>
        </div>
        <div className="rounded-md shadow-[0px_0px_10px_1px_rgba(0,0,0,0.4)] sm:shadow-[0px_0px_10px_1px_rgba(0,0,0,0.24)] space-y-4 p-4 sm:min-h-96 h-full overflow-x-auto">
          <h1 className="text-xl font-bold">List of Todos</h1>
          <div className="flex gap-1 overflow-hidden overflow-x-auto">
            <button className="sm:px-6 px-4 py-1 border border-black rounded-full bg-black text-white text-sm cursor-pointer" onClick={(e)=>{handleFilter(e)}}>
              All
            </button>
            <button className="sm:px-6 px-4 py-1 border border-black rounded-full text-sm cursor-pointer" onClick={(e)=>handleFilter(e)}>
              completed
            </button>
            <button className="sm:px-6 px-4 py-1 border border-black rounded-full  text-sm cursor-pointer" onClick={(e)=>handleFilter(e)}>
              inProgress
            </button>
            <button className="sm:px-6 px-4 py-1 border border-black rounded-full  text-sm cursor-pointer" onClick={(e)=>handleFilter(e)}>
              todo
            </button>
          </div>
          <div className="mt-5 flex flex-col gap-2 w-full">
            {filteredTodos.length !== 0 ? (
              filteredTodos.map((todo) => {
                return (
                  <div
                    key={todo.id}
                    className={`${
                      todo.status === "completed" &&
                      "line-through opacity-70 border-opacity-60 bg-green-300"
                    }    ${todo.status=== "inProgress" && "bg-yellow-100"}       
                    ${todo.status === "todo" && "bg-blue-200"}            
                    w-full flex gap-4 items-center justify-between overflow-x-auto border-2 line-clamp-1
                    ${
                    todo.status === "completed" && "border-green-900"
                    }
                    ${
                    todo.status === "inProgress" && "border-yellow-600"
                    }
                    ${
                    todo.status === "todo" && "border-blue-500"
                    }
                    
                    rounded-md p-2 px-6 `}
                  >
                    <div className="w-96">{todo.title}</div>
                    <div className="flex-1 truncate">{todo.description}</div>
                    {todo.editable ? (
                      <select
                        name="actions"
                        id="actions"
                        onChange={(e) => handleUpdate(e)}
                      >
                        <option value="todo">todo</option>
                        <option value="inProgress">inProgress</option>
                        <option value="completed">completed</option>
                      </select>
                    ) : (
                      <div
                        className={`border ${
                          todo.status === "completed" &&
                          "border-green-900 bg-green-100 text-green-900"
                        } 
                      ${
                        todo.status === "todo" &&
                        "border-blue-900 bg-blue-100 text-blue-900"
                      }
                      ${
                        todo.status === "inProgress" &&
                        "border-yellow-600 bg-yellow-50 text-yellow-600"
                      }  
                      px-4 rounded-full text-xs h-fit py-1 flex justify-center items-center`}
                      >
                        {todo.status}
                      </div>
                    )}
                    <div className="flex justify-center items-center">
                      <button
                        disabled={todo.status === "completed"}
                        className="hover:opacity-60 disabled:cursor-not-allowed"
                        onClick={() => handleEdit(todo.id)}
                      >
                        {todo.editable ? (
                          <BiSave className="h-5 w-5" />
                        ) : (
                          <BiEdit className="h-5 w-5" />
                        )}
                      </button>
                      <button
                        disabled={todo.status !== "completed"}
                        className="hover:opacity-60 disabled:cursor-not-allowed"
                      >
                        <BiTrash
                          className="h-5 w-5"
                          onClick={() => handleDelete(todo.id)}
                        />
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="w-full h-full flex justify-center items-center">
                no todos found
              </div>
            )}
          </div>
        </div>
      </div>
      <dialog/>
    </div>
  );
}
