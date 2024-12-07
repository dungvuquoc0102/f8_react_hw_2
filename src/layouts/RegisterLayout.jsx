import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import registerSchema from "../schemas/auth/registerSchema";
import authService from "../services/authService";

const RegisterLayout = () => {
  //init
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(registerSchema)
  });
  const nav = useNavigate();
  //execute
  async function handleRegister(data) {
    try {
      delete data.confirmPassword;
      const res = await authService.auth("/register", data);
      if (res.status !== 201) throw new Error("Error");
      confirm("Go to login?") && nav("/login");
      reset();
    } catch (error) {
      console.log(error);
    }
  }
  //render
  return (
    <div className="w-[500px] max-w-full mx-auto mt-10 border rounded-md p-3">
      {/* header */}
      <h1 className="text-2xl text-center">Register Account</h1>
      {/* Register form */}
      <form onSubmit={handleSubmit(handleRegister)}>
        {/* Email */}
        <div className="mt-3">
          <input
            {...register("email")}
            type="email"
            placeholder="Email"
            className="w-full border rounded-md p-2"
          />
        </div>
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
        {/* Username */}
        <div className="mt-3">
          <input
            {...register("username")}
            type="text"
            placeholder="Username"
            className="w-full border rounded-md p-2"
          />
        </div>
        {errors.username && (
          <span className="text-red-500">{errors.username.message}</span>
        )}
        {/* Password */}
        <div className="mt-3">
          <input
            {...register("password")}
            type="password"
            placeholder="Password"
            className="w-full border rounded-md p-2"
          />
        </div>
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
        {/* Confirm password */}
        <div className="mt-3">
          <input
            {...register("confirmPassword")}
            type="password"
            placeholder="Confirm password"
            className="w-full border rounded-md p-2"
          />
        </div>
        {errors.confirmPassword && (
          <span className="text-red-500">{errors.confirmPassword.message}</span>
        )}
        {/* Had account? */}
        <div className="mt-3">
          <Link to="/login" className="text-blue-500">
            Did you have an account?
          </Link>
        </div>
        {/* Submit button */}
        <div className="mt-3">
          <button className="p-2 px-4 bg-blue-400 rounded-md hover:bg-blue-500 text-white w-full">
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterLayout;
