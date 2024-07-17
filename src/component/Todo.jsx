import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import TodoItem from "./TodoItem";

export default function TodoApp() {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    if (todo.key === "Enter" && todo.target.value.trim() !== "") {
      console.log("Add Todo", todo);
      setTodos((pervTodos) => {
        return [
          ...pervTodos,
          {
            id: uuid(),
            text: todo.target.value,
            status: false,
          },
        ];
      });
    }
  };
  const destroyTodo = (id) => {
    console.log("Delete Todo id:", id);
    setTodos((pervTodos) => {
      return pervTodos.filter((todo) => todo.id !== id);
    });
  };
  const modifyTodo = (id, text) => {
    console.log("Modify Todo id:", id);
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === id ? { ...todo, text } : todo))
    );
  };
  const toggleStatus = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        console.log("todo id:", id, "change status to:", !todo.status);
        return todo.id === id ? { ...todo, status: !todo.status } : todo;
      })
    );
  };

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos"));
    if (storedTodos) {
      setTodos(storedTodos);
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

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
        <ul className="list-reset">
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              destroyTodo={destroyTodo}
              modifyTodo={modifyTodo}
              toggleStatus={toggleStatus}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
