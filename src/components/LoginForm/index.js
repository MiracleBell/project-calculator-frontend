import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

import { Box, TextField, Button, Typography } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";

import { login, isAuth, loginUser } from "@root/store/auth";

const MIN_LOGIN_LENGTH = 4;
const MIN_PASSWORD_LENGTH = 6;

export default function LoginForm() {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const auth = "Basic " + btoa(`${data.login}:${data.password}`);
    const result = await loginUser(auth);
    if (result === undefined) {
      dispatch(login(auth));
    } else {
      setErrorMessage(result);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      sx={{ ml: 3, textAlign: "left" }}
    >
      <TextField
        margin="normal"
        size="small"
        id="login"
        name="login"
        placeholder="login"
        autoComplete="login"
        {...register("login", { required: true, minLength: MIN_LOGIN_LENGTH })}
        error={!!errors.login}
        helperText={errors.login && "Login is required. Min login length 4"}
        autoFocus
      />

      <TextField
        margin="normal"
        size="small"
        id="password"
        name="password"
        placeholder="password"
        type={showPassword ? "text" : "password"}
        {...register("password", {
          required: true,
          minLength: MIN_PASSWORD_LENGTH,
        })}
        error={!!errors.password}
        helperText={
          errors.password && "Password is required. Min password length 6"
        }
      />

      <IconButton
        aria-label="toggle password visibility"
        onClick={handleClickShowPassword}
        onMouseDown={handleMouseDownPassword}
        edge="end"
        sx={{ mt: 2 }}
      >
        {showPassword ? <VisibilityOff /> : <Visibility />}
      </IconButton>

      <Typography value={errorMessage} sx={{ color: "#FF2323", mb: 1 }}>
        {errorMessage}
      </Typography>

      <Box sx={{ mb: 3, ml: 1 }}>
        <Button
          type="submit"
          size="small"
          variant="contained"
          style={{ backgroundColor: "#33AAFF" }}
        >
          Sign In
        </Button>
      </Box>
    </Box>
  );
}
