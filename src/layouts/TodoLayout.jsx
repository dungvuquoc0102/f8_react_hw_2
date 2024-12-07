import React, { useEffect } from "react";
import Header from "../components/Header";
import { Outlet, useNavigate } from "react-router-dom";

const TodoLayout = () => {
  const nav = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user")) || {};
    if (!user.id) {
      nav("/login");
    }
  });

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default TodoLayout;
