import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "@root/store/auth";
import { useSelector } from "react-redux";

export default function Layout({ children }) {
  const isAuth = useSelector(isAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, [isAuth]);

  return <>{children}</>;
}
