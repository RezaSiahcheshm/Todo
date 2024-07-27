import { useEffect, useReducer } from "react";
import TodoItem from "./TodoItem";
import { toast } from "react-toastify";
import TodoReducer from "../reducer/TodoReducer";

export default function TodoApp() {
  const [todos, todosDispatcher] = useReducer(TodoReducer, []);

  const addTodo = async (todo) => {
    if (todo.key === "Enter" && todo.target.value.trim() !== "") {
      try {
        const res = await fetch(
          "https://669bc6cc276e45187d366d73.mockapi.io/todos",
          {
            method: "POST",
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
            body: JSON.stringify({
              text: todo.target.value,
              completed: false,
            }),
          }
        );
        if (res.ok) {
          let data = await res.json();
          todo.target.value = "";
          todosDispatcher({
            type: "ADD_TODO",
            payload: data,
          });
          toast.success("Todo added successfully");
        }
      } catch (e) {
        console.log("Error", e);
      }
    }
  };

  const destroyTodo = async (id) => {
    try {
      const res = await fetch(
        `https://669bc6cc276e45187d366d73.mockapi.io/todos/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );
      if (res.ok) {
        todosDispatcher({
          type: "DELETE_TODO",
          payload: id,
        });
        toast.success(`Delete Todo id: ${id}`);
      }
      toast.error(await res.json());
    } catch (e) {
      console.log("Error", e);
    }
  };

  const modifyTodo = async (id, text) => {
    try {
      const res = await fetch(
        `https://669bc6cc276e45187d366d73.mockapi.io/todos/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
          body: JSON.stringify({ text }),
        }
      );
      if (res.ok) {
        todosDispatcher({
          type: "MODIFY_TODO",
          payload: { id, text },
        });
        toast.success(`Modify Todo id: ${id}`);
      }
      toast.error(await res.json());
    } catch (e) {
      console.log("Error", e);
    }
  };

  const toggleCompleted = async (todo) => {
    try {
      const res = await fetch(
        `https://669bc6cc276e45187d366d73.mockapi.io/todos/${todo.id}`,
        {
          method: "PUT",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
          body: JSON.stringify({
            completed: !todo.completed,
          }),
        }
      );
      if (res.ok) {
        todosDispatcher({
          type: "TOGGLE_COMPLETED",
          payload: todo.id,
        });
        toast.success(
          `todo id ${todo.id} change to  ${
            todo.completed ? "completed" : "uncompleted"
          }`
        );
      }
      toast.error(await res.json());
    } catch (e) {
      console.log("Error", e);
    }
  };

  const getTodosFromApi = async () => {
    try {
      const res = await fetch(
        "https://669bc6cc276e45187d366d73.mockapi.io/todos"
      );
      let data = await res.json();
      if (res.ok) {
        todosDispatcher({
          type: "GET_TODOS",
          payload: data,
        });
      }
    } catch (e) {
      console.log("Error", e);
    }
  };

  useEffect(() => {
    getTodosFromApi();
  }, []);

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
        <ul className="list-reset">
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              destroyTodo={destroyTodo}
              modifyTodo={modifyTodo}
              toggleCompleted={toggleCompleted}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
