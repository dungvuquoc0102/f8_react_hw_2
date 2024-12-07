import { zodResolver } from "@hookform/resolvers/zod";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import todoSchema from "../schemas/todoSchema";
import { useForm } from "react-hook-form";
import { todoService } from "../services/todoService";
import { TodoContext } from "../contexts/TodoContext";
import { UserContext } from "../contexts/UserContext";

const TodoForm = () => {
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(todoSchema)
  });
  const { dispatch } = useContext(TodoContext);
  const todoState = useContext(TodoContext).state;
  const { state } = useContext(UserContext);
  const nav = useNavigate();
  useEffect(() => {
    id &&
      (async () => {
        try {
          const res = await todoService.getById(id);
          if (res.status === 200) {
            reset(res.data);
          } else {
            throw new Error("Error");
          }
        } catch (error) {
          console.log(error);
        }
      })();
  }, []);
  async function handleForm(data) {
    console.log("hello form");
    if (id) {
      console.log("hello id");

      try {
        const res = await todoService.updateById(id, data);
        if (res.status !== 200) throw new Error("Error");
        const resAll = await todoService.getAll();
        if (resAll.status !== 200) throw new Error("Error");
        dispatch({ type: "SET_TODOS", payload: resAll.data });
        nav("/");
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        if (
          todoState.todos.filter((todo) => todo.title === data.title).length > 0
        ) {
          alert("Todo already exists");
          return;
        }
        console.log("hello");
        const res = await todoService.create(data);
        if (res.status !== 201) throw new Error("Error");
        dispatch({ type: "ADD_TODO", payload: res.data });
        nav("/");
      } catch (error) {
        console.log(error);
      }
    }
  }
  return (
    <div className="container mx-auto">
      {/* Wrapper */}
      <div className="max-w-[500px] mx-auto border rounded-md p-3 mt-5">
        {/* Title form */}
        <h1 className="text-2xl font-bold">
          {id ? "Update" : "Add"} todo {id ? `with id: ${id}` : ""}
        </h1>
        {/* Content form */}
        <div>
          <form onSubmit={handleSubmit(handleForm)}>
            {/* Title */}
            <div className="flex flex-col gap-1 mt-3">
              <label htmlFor="title">Title</label>
              <input
                className="border rounded-md p-1 px-2"
                type="text"
                name="title"
                id="title"
                placeholder="Title"
                {...register("title")}
              />
              {errors.title && (
                <span className="text-red-500">{errors.title.message}</span>
              )}
            </div>
            {/* Description */}
            <div className="flex flex-col gap-1 mt-3">
              <label htmlFor="description">Description</label>
              <input
                className="border rounded-md p-1 px-2"
                type="text"
                name="description"
                id="description"
                placeholder="Description"
                {...register("description")}
              />
              {errors.description && (
                <span className="text-red-500">
                  {errors.description.message}
                </span>
              )}
            </div>
            {/* Status */}
            <div className="flex flex-col gap-1 mt-3">
              <label htmlFor="status">Status</label>
              <select
                className="border rounded-md p-1 px-2"
                name="status"
                id="status"
                {...register("status")}
              >
                <option value="doing">Doing</option>
                <option value="done">Done</option>
              </select>
              {errors.status && (
                <span className="text-red-500">{errors.status.message}</span>
              )}
            </div>
            {/* Priority */}
            <div className="flex flex-col gap-1 mt-3">
              <label htmlFor="priority">Priority</label>
              <select
                className="border rounded-md p-1 px-2"
                name="priority"
                id="priority"
                {...register("priority")}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
              {errors.priority && (
                <span className="text-red-500">{errors.priority.message}</span>
              )}
            </div>
            {/* User id */}
            <div>
              <input
                className="border rounded-md p-1 px-2 mt-3"
                type="text"
                name="userId"
                id="userId"
                placeholder="UserId"
                value={
                  typeof state.user === "string"
                    ? JSON.parse(state.user)?.id
                    : state.user?.id
                    ? state.user.id
                    : ""
                }
                {...register("userId", { valueAsNumber: true })}
                hidden
              />
            </div>
            {/* Submit button */}
            <div className="mt-3">
              <button className="p-2 px-4 bg-blue-500 text-white hover:bg-blue-600 rounded-md w-full">
                {id ? "Update" : "Add"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TodoForm;
