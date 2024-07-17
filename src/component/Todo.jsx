import { useState } from "react";
import TodoList from "./TodoList";
import { v4 as uuid } from "uuid";

export default function Todo() {
  const [todo, setTodo] = useState([
    {
      id: uuid(),
      title: "Tailwind CSS To DO App List 1",
      status: true,
    },
    {
      id: uuid(),
      title: "Tailwind CSS To DO App List 2",
      status: false,
    },
    {
      id: uuid(),
      title: "Tailwind CSS To DO App List 3",
      status: false,
    },
  ]);
  const addNewTodoHandler = (event) => {
    if (event.key === "Enter" && event.target.value !== "") {
      setTodo([
        ...todo,
        {
          id: uuid(),
          title: event.target.value,
          status: false,
        },
      ]);
      event.target.value = "";
    }
  };
  const deleteTodoItem = (id) => {
    setTodo(
      todo.filter((item) => {
        return item.id !== id;
      })
    );
  };
  const toggleTodoStatusHandler = (id) => {
    setTodo(
      todo.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            status: !item.status,
          };
        }
        return item;
      })
    );
  };
  const editTodoItemTitle = (id, title) => {
    setTodo(
      todo.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            title,
          };
        }
        return item;
      })
    );
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full px-4 py-8 mx-auto shadow lg:w-1/3  bg-white">
        <div className="flex items-center mb-6">
          <h1 className="mr-6 text-4xl font-bold text-purple-600">
            {" "}
            TO DO APP
          </h1>
        </div>
        <div className="relative">
          <input
            type="text"
            onKeyDown={addNewTodoHandler}
            placeholder="What needs to be done today?"
            className="w-full px-2 py-3 border rounded outline-none border-grey-600"
          />
        </div>
        <TodoList
          todo={todo}
          deleteTodo={deleteTodoItem}
          statusHandler={toggleTodoStatusHandler}
          editTitleHandler={editTodoItemTitle}
        />
      </div>
    </div>
  );
}
