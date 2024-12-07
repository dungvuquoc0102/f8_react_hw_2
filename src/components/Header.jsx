import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { TodoContext } from "../contexts/TodoContext";

const Header = () => {
  const nav = useNavigate();
  const { state, dispatch } = useContext(UserContext);
  const todoDispatch = useContext(TodoContext).dispatch;
  useEffect(() => {
    const localUser = localStorage.getItem("user") || {};
    dispatch({ type: "SET_USER", payload: localUser });
  }, []);
  function handleLogout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    dispatch({
      type: "DELETE_USER",
      payload: {}
    });
    todoDispatch({ type: "SET_TODOS", payload: [] });
    nav("/");
  }
  return (
    <header className="border-b">
      {/* Container */}
      <div className="container mx-auto">
        {/* Wrapper */}
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div>
            <Link className="flex gap-2 items-center py-3" to="/">
              <img className="w-10" src="/logo.png" alt="Logo" />
              <span>Todo App</span>
            </Link>
          </div>
          {/* Function */}
          <div className="flex gap-3 items-center">
            {state?.user?.id ||
            (typeof state?.user === "string" && JSON.parse(state?.user).id) ? (
              <div className="flex gap-3 items-center">
                <div>
                  Hello,
                  {state.user.username ||
                    (typeof state.user === "string" &&
                      JSON.parse(state.user).username)}
                </div>
                <div>
                  <button
                    onClick={handleLogout}
                    className="p-2 px-4 bg-gray-400 text-white hover:bg-gray-500 rounded-md"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex gap-3 items-center">
                <div>
                  <Link to="/register">Register</Link>
                </div>
                <div>
                  <Link
                    className="p-2 px-4 bg-green-500 text-white hover:bg-green-600 rounded-md"
                    to="/login"
                  >
                    Login
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
