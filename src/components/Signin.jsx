import React, { useState } from "react";
import { Input, Button, errMsg } from "../Index/index";
import { useForm } from "react-hook-form";
import auth from "../../appwrite/auth";
import { useDispatch } from "react-redux";
import { login } from "../Store/authSlice";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

function Signin() {
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
      const userdata = await auth.login({
        email: data.username,
        password: data.password,
      });
      dispatch(login(userdata));
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
    setLoader(false);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-[300px] bg-white px-3 py-5 rounded shadow flex flex-col justify-center items-center min-h-[calc(90vh-236px)]">
        <div className=" pb-7 text-center">
          <p className="font-semibold">login then see all posts !!</p>
          <h2 className="font-bold text-2xl">Signin </h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Username input box */}
          <Input
            type="email"
            id="123"
            placeholder="username"
            {...register("username", {
              required: errMsg.username.required,
              pattern: (value) =>
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                errMsg.username.vailid,
            })}
          />
          {errors.username && (
            <p className="text-red-500">{errors.username.message}</p>
          )}

          {/* Password input box */}
          <Input
            type="password"
            id="456"
            placeholder="password"
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
            <Button label={loader ? "signing..." : "Signin"} type="submit" />
            <NavLink to={"/signup"}>
              <p className=" text-blue-600 hover:underline cursor-pointer">
                create a new account..
              </p>
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signin;
