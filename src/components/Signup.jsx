import React, { useId, useState } from "react";
import { useForm } from "react-hook-form";
import { Input, Button, ErrorMessage } from "./index";
import service from "../appwrite/Auth";
import { login } from "../Store/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [error, setError] = useState("");
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const fnId = useId();
  const eid = useId();
  const pid = useId();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setError("");
    setLoading(true);
    try {
      const userData = await service.createAccount(data);
      if (userData) {
        dispatch(login(userData));
        navigate("/")
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div>
        <h2>Signup</h2>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="FullName"
          type="text"
          placeholder="Hitesh Kumar"
          id={fnId}
          {...register("fullname", {
            required: ErrorMessage.fullname.required,
            maxLength: {
              value: 20,
              message: ErrorMessage.fullname.maxLength,
            },
          })}
        />
        {errors.fullname && (
          <p className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4">
            {errors.fullname.message}
          </p>
        )}

        <Input
          label="Email"
          type="email"
          placeholder="hk2310@gmail.com"
          id={eid}
          {...register("email", {
            required: ErrorMessage.email.required,
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: ErrorMessage.email.pattern,
            },
          })}
        />
        {errors.email && (
          <p className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4">
            {errors.email.message}
          </p>
        )}

        <Input
          label="Password"
          type="password"
          placeholder="*******"
          id={pid}
          {...register("password", {
            required: ErrorMessage.password.required,
            minLength: {
              value: 8,
              message: ErrorMessage.password.minLength,
            },
            maxLength: { 
              value: 12,
              message: ErrorMessage.password.maxLength,
            },
          })}
        />
        {errors.password && (
          <p className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4">
            {errors.password.message}
          </p>
        )}

        {error && (
          <p className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4">
            {error}
          </p>
        )}

        <Button type="submit">{loading ? "Signuping..." : "Signup"}</Button>
      </form>
    </div>
  );
}

export default Signup;
