export const todoReducer = (state, action) => {
  switch (action.type) {
    case "SET_TODOS":
      return {
        todos: action.payload
      };
    case "ADD_TODO":
      return {
        todos: [...state.todos, action.payload]
      };
    case "DELETE_TODO":
      const newTodos = state.todos.filter((item) => item.id !== action.payload);
      return {
        todos: newTodos
      };
  }
};
