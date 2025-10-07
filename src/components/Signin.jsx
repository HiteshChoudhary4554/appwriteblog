import React, { useId, useState } from "react";
import { useForm } from "react-hook-form";
import { login } from "../Store/authSlice";
import { Input, Button, ErrorMessage } from "./index";
import service from "../appwrite/Auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function Signin() {
  const navigate = useNavigate()
  const eid = useId();
  const pid = useId();
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  const onSubmit = async (data) => {
    setError("");
    setLoading(true)
    try {
      await service.login(data);
      dispatch(login(data));
      navigate("/")
    } catch (error) {
      setError(error.message);
    }finally{
        setLoading(false)
    }
  };

  return (
    <div>
      <div>
        <h3>Signin</h3>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
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

        <Button type="submit">{loading ? "Signining..." : "Signin"}</Button>
      </form>
    </div>
  );
}

export default Signin;
