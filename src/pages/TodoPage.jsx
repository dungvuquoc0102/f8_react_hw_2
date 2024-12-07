import React, { useContext, useEffect, useState } from "react";
import { TodoContext } from "../contexts/TodoContext";
import { Link, useNavigate } from "react-router-dom";
import { todoService } from "../services/todoService";

const TodoPage = () => {
  const { state, dispatch } = useContext(TodoContext);
  async function handleDelete(id) {
    if (!confirm("Are you sure you want to delete this todo?")) return;
    try {
      const res = await todoService.delete(id);
      if (res.status !== 200) throw new Error("Error");
      dispatch({ type: "DELETE_TODO", payload: id });
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="mt-10">
      <div className="container mx-auto">
        {/* todo app */}
        <div>
          {/* todo app title */}
          <div className="flex justify-center mt-5">
            <h1 className="text-2xl">Todo List</h1>
          </div>
          {/* add todo btn */}
          <div>
            <Link
              to="/add"
              className="p-2 px-4 bg-blue-500 text-white hover:bg-blue-600 rounded-md"
            >
              Add todo
            </Link>
          </div>
          {/* todo app list */}
          <div className="mt-5 border rounded-md">
            <table className="w-full text-center">
              <thead className="border-b">
                <tr>
                  <th className="p-2">Id</th>
                  <th className="p-2">Title</th>
                  <th className="p-2">Description</th>
                  <th className="p-2">Status</th>
                  <th className="p-2">Priority</th>
                  <th className="p-2">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {console.log(state)}
                {state.todos.length === 0 ? (
                  <tr>
                    <td className="text-center p-2" colSpan="6">
                      No todos
                    </td>
                  </tr>
                ) : (
                  state.todos.map((item) => (
                    <tr key={item.id}>
                      <td className="p-2">{item.id}</td>
                      <td className="p-2">{item.title}</td>
                      <td className="p-2">{item.description}</td>
                      <td className="p-2">{item.status}</td>
                      <td className="p-2">{item.priority}</td>
                      <td className="p-2">
                        <Link
                          to={`/update/${item.id}`}
                          className="p-2 px-4 bg-yellow-400 text-white hover:bg-yellow-500 rounded-md mr-3"
                        >
                          Update
                        </Link>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-2 px-4 bg-red-500 text-white hover:bg-red-600 rounded-md mr-3"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoPage;
