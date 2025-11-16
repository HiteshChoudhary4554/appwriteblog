import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, logout } from "../Store/authSlice";
import authService from "../../appwrite/auth";

function AuthLayout({ children, authentication = true }) {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const authStatus = useSelector((state) => state.auth.authStatus);
  const dispatch = useDispatch();
  
  useEffect(() => {
    setLoader(true)
    const checkUser = async () => {
      try {
        const user = await authService.getAccount();
        if (user) {
          dispatch(login(user));
        } else {
          dispatch(logout());
        }
      } catch (error) {
        dispatch(logout());
        console.log("Auth check error:", error.message);
      }
    };
    checkUser();
    setLoader(false)
  }, [dispatch,authStatus]);

  useEffect(() => {
    setLoader(true)
    if (authentication && !authStatus) {
      navigate("/signin");
    } else if (!authentication && authStatus) {
      navigate("/");
    }
    setLoader(false);
  }, [authentication, authStatus, navigate]);

  return loader ? <h2>Loading...</h2> : <div>{children}</div>;
}

export default AuthLayout;
