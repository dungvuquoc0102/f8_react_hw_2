import { createContext, useEffect, useReducer } from "react";
import { Outlet } from "react-router-dom";
import { userReducer } from "../reducers/userReducer";

export const UserContext = createContext();

export const UserProvider = () => {
  const [state, dispatch] = useReducer(userReducer, {
    user: {}
  });
  useEffect(() => {
    const localUser = localStorage.getItem("user") || {};
    dispatch({ type: "SET_USER", payload: localUser });
  }, []);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <Outlet />
    </UserContext.Provider>
  );
};
