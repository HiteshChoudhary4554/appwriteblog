import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login, logout } from "../Store/authSlice";
import service from "../appwrite/Auth";

export default function Protected({ children, authentication = true }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const authStatus = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const user = await service.getAccount()
        dispatch(login(user)); 
      } catch (err) {
        console.log(err.message);
        dispatch(logout());
      }
    };
    checkSession();
  }, [dispatch]);

  useEffect(() => {
    if (authentication && authStatus !== authentication) {
      navigate("/signin");
    } else if (!authentication && authStatus !== authentication) {
      navigate("/");
    }
    setLoader(false);
  }, [authStatus, navigate, authentication]);

  return loader ? <h1>Loading...</h1> : <>{children}</>;
}
