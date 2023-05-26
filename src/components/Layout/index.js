import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { isAuthenticated, logout } from "@root/store/auth";

import { Box, Button } from "@mui/material";

export default function Layout({ children }) {
  const isAuth = useSelector(isAuthenticated);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, [isAuth]);

  function handleLogoutClick() {
    dispatch(logout());
  }

  return (
    <>
      <Box textAlign={"right"}>
        <Button variant="contained" onClick={handleLogoutClick}>
          logout
        </Button>
      </Box>

      {children}
    </>
  );
}
