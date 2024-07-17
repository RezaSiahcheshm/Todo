/* eslint-disable  */
import TodoListItem from "./TodoListItem";

export default function TodoList({
  todo,
  deleteTodo,
  statusHandler,
  editTitleHandler,
}) {
  return (
    <ul className="list-reset">
      {todo.map((item, index) => (
        <TodoListItem
          key={index}
          item={item}
          deleteTodo={deleteTodo}
          statusHandler={statusHandler}
          editTitleHandler={editTitleHandler}
        />
      ))}
    </ul>
  );
}
