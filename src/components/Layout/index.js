import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { isAuthenticated, logout } from "@root/store/auth";

import { Avatar, Box, Button } from "@mui/material";

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

  function handleProfileClick() {
    navigate("/user");
  }

  return (
    <>
      <Box display="flex" textAlign={"right"} justifyContent={"flex-end"}>
        <Avatar
          onClick={handleProfileClick}
          sx={{ m: 1, mr: 3, bgcolor: "green" }}
        />
        <Button
          variant="contained"
          onClick={handleLogoutClick}
          sx={{ mt: 1, mb: 1 }}
        >
          logout
        </Button>
      </Box>

      {children}
    </>
  );
}
