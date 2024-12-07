import { createContext, useEffect, useReducer } from "react";
import { Outlet } from "react-router-dom";
import { userReducer } from "../reducers/userReducer";

export const UserContext = createContext();

export const UserProvider = () => {
  const [state, dispatch] = useReducer(userReducer, {
    user: {}
  });
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user")) || {};
    if (!user) return;
    dispatch({ type: "SET_USER", payload: user });
  }, []);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <Outlet />
    </UserContext.Provider>
  );
};
