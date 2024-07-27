export default function TodoReducer(todos, action) {
  switch (action?.type) {
    case "ADD_TODO":
      return [...todos, action.payload];
    case "DELETE_TODO":
      return todos.filter((todo) => todo.id !== action.payload);
    case "MODIFY_TODO":
      return todos.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, text: action.payload.text }
          : todo
      );
    case "TOGGLE_COMPLETED":
      return todos.map((todo) =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      );
    case "GET_TODOS":
      return action.payload;
    default:
      return todos;
  }
}
