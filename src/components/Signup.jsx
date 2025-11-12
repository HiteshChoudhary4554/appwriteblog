import React, { useState } from "react";
import { Input, Button, errMsg } from "../Index/index";
import { useForm } from "react-hook-form";
import auth from "../../appwrite/auth";
import { useDispatch } from "react-redux";
import { login } from "../Store/authSlice";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState();
  const [loader, setLoader] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoader(true);
    try {
      const userData = await auth.createAccount({
        email: data.email,
        password: data.password,
        name : data.name,
      });
      dispatch(login(userData));
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
    setLoader(false);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-[420px] bg-white px-3 py-5 rounded shadow flex flex-col justify-center items-center min-h-[calc(90vh-236px)]">
        <div className=" pb-7 text-center">
          <h2 className="font-bold ">Signup</h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Name"
            type="text"
            id="321"
            placeholder="Hitesh Kumar"
            {...register("name", {
              required: errMsg.name,
            })}
          />

          {errors.username && (
            <p className="text-red-500">{errors.name.message}</p>
          )}

          <Input
            label="Email"
            type="email"
            id="654"
            placeholder="username@gmail.com"
            {...register("email", {
              required: errMsg.email.required,
              pattern: (value) =>
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                errMsg.email.valid,
            })}
          />
          {errors.username && (
            <p className="text-red-500">{errors.email.message}</p>
          )}

          {/* Password input box */}
          <Input
            label="Password"
            type="password"
            id="987"
            {...register("password", {
              required: errMsg.password.required,
              maxLength: {
                value: 10,
                message: errMsg.password.maxLength,
              },
              minLength: {
                value: 6,
                message: errMsg.password.minLength,
              },
            })}
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}

          {error && <p className="text-red-500">{error}</p>}

          <div className="flex justify-between px-4 mt-3">
            <Button label={loader ? "signuping.." : "Signup"} type="submit" />
            <NavLink to={"/signin"}>
              <p className=" text-blue-600 hover:underline cursor-pointer">
                already have a account..
              </p>
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
