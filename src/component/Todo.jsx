import { useEffect, useReducer } from "react";
import TodoItem from "./TodoItem";
import { toast } from "react-toastify";
import TodoReducer from "../reducer/TodoReducer";
import { TodosContext } from "../context/TodosContext";

export default function TodoApp() {
  const [todos, todosDispatcher] = useReducer(TodoReducer, []);

  const addTodo = async (event) => {
    if (event.key === "Enter" && event.target.value.trim() !== "") {
      try {
        const res = await fetch(
          "https://669bc6cc276e45187d366d73.mockapi.io/todos",
          {
            method: "POST",
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
            body: JSON.stringify({
              text: event.target.value,
              completed: false,
            }),
          }
        );
        if (res.ok) {
          let data = await res.json();
          event.target.value = "";
          todosDispatcher({
            type: "ADD_TODO",
            payload: data,
          });
          toast.success("Todo added successfully");
        }
      } catch (error) {
        console.log("Error", error);
        toast.error('Failed to add todo');
      }
    }
  };

  const getTodosFromApi = async () => {
    try {
      const res = await fetch(
        "https://669bc6cc276e45187d366d73.mockapi.io/todos"
      );
      if (res.ok) {
        const data = await res.json();
        todosDispatcher({
          type: "GET_TODOS",
          payload: data,
        });
      }
    } catch (error) {
      console.log("Error", error);
      toast.error('Failed to fetch todos');
    }
  };

  useEffect(() => {
    getTodosFromApi();
  }, []);

  // Uncomment this useEffect if you want to persist todos to local storage
  // useEffect(() => {
  //   localStorage.setItem("todos", JSON.stringify(todos));
  // }, [todos]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full px-4 py-8 mx-auto shadow lg:w-1/3  bg-white">
        <div className="flex items-center mb-6">
          <h1 className="mr-6 text-4xl font-bold text-purple-600">TO DO APP</h1>
        </div>
        <div className="relative">
          <input
            onKeyDown={addTodo}
            type="text"
            placeholder="What needs to be done today?"
            className="w-full px-2 py-3 border rounded outline-none border-grey-600"
          />
        </div>
        <TodosContext.Provider value={{ todosDispatcher }}>
          <ul className="list-reset">
            {todos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </ul>
        </TodosContext.Provider>
      </div>
    </div>
  );
}
