import { createContext, useEffect, useReducer } from "react";
import { todoReducer } from "../reducers/todoReducer";
import { todoService } from "../services/todoService";
import { Outlet } from "react-router-dom";

export const TodoContext = createContext();

export const TodoProvider = () => {
  const [state, dispatch] = useReducer(todoReducer, {
    todos: []
  });
  useEffect(() => {
    (async () => {
      const user = JSON.parse(localStorage.getItem("user")) || {};
      if (!user.id) return;
      try {
        const res = await todoService.getByUserId(user.id);
        if (res.status !== 200) throw new Error("Error");
        dispatch({ type: "SET_TODOS", payload: res.data });
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      <Outlet />
    </TodoContext.Provider>
  );
};
