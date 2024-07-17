import { useState } from "react";
import { v4 as uuid } from "uuid";
import TodoListItem from "./TodoItem";

export default function TodoApp() {
  const [todos, setTodos] = useState([
    { id: uuid(), title: "Tailwind CSS To Do App List 1", status: true },
    { id: uuid(), title: "Tailwind CSS To Do App List 2", status: false },
    { id: uuid(), title: "Tailwind CSS To Do App List 3", status: false },
  ]);

  const addNewTodo = (event) => {
    if (event.key === "Enter" && event.target.value.trim() !== "") {
      setTodos((prevTodos) => [
        ...prevTodos,
        {
          id: uuid(),
          title: event.target.value,
          status: false,
        },
      ]);
      event.target.value = "";
    }
  };

  const deleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const toggleTodoStatus = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, status: !todo.status } : todo
      )
    );
  };

  const editTodoTitle = (id, title) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, title } : todo
      )
    );
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full px-4 py-8 mx-auto shadow lg:w-1/3 bg-white">
        <div className="flex items-center mb-6">
          <h1 className="mr-6 text-4xl font-bold text-purple-600">
            TO DO APP
          </h1>
        </div>
        <div className="relative">
          <input
            type="text"
            onKeyDown={addNewTodo}
            placeholder="What needs to be done today?"
            className="w-full px-2 py-3 border rounded outline-none border-grey-600"
          />
        </div>
        <ul className="list-reset">
          {todos.map((todo) => (
            <TodoListItem
              key={todo.id}
              item={todo}
              deleteTodo={deleteTodo}
              toggleStatus={toggleTodoStatus}
              editTitle={editTodoTitle}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
