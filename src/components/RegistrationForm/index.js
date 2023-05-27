import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";

import { Box, Button, TextField, Typography } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";

import { registrationUser } from "@root/store/userApi";

const MIN_LOGIN_LENGTH = 4;
const MIN_PASSWORD_LENGTH = 6;

export default function RegistrationForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    let payload = {
      login: data.login,
      password: data.password,
      email: data.email,
    };

    let result = await registrationUser(payload);
    if (result.errors === undefined) {
      alert("Registration was successful");
      dispatch(navigate("/login"));
    }
    setErrorMessage(result.errors[0].errorMessage);
  };

  function handleCancelClick() {
    navigate("/login");
  }

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
        placeholder="Enter user name"
        autoComplete="login"
        {...register("login", { required: true, minLength: MIN_LOGIN_LENGTH })}
        error={!!errors.login}
        helperText={
          errors.login &&
          "This field is required. Min length ".concat(MIN_LOGIN_LENGTH)
        }
        autoFocus
      />

      <TextField
        margin="normal"
        size="small"
        id="password"
        name="password"
        placeholder="Enter password"
        type={showPassword ? "text" : "password"}
        {...register("password", {
          required: true,
          minLength: MIN_PASSWORD_LENGTH,
        })}
        error={!!errors.password}
        helperText={
          errors.password &&
          "This field is required. Min length ".concat(MIN_PASSWORD_LENGTH)
        }
        autoFocus
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

      <TextField
        margin="normal"
        size="small"
        id="confirmPassword"
        name="confirmPassword"
        placeholder="Confirm password"
        type={showPassword ? "text" : "password"}
        {...register("confirmPassword", {
          required: true,
          validate: (value) => value === getValues("password"),
        })}
        error={!!errors.confirmPassword}
        helperText={errors.confirmPassword && "Passwords does not equals"}
        autoFocus
      />

      <TextField
        margin="normal"
        size="small"
        id="email"
        name="email"
        placeholder="Email"
        {...register("email", {
          required: true,
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Invalid email address",
          },
        })}
        error={!!errors.email}
        helperText={errors.email && "Enter correct email address"}
        autoFocus
      />
      <Typography value={errorMessage} sx={{ color: "#EE6A6A" }}>
        {errorMessage}
      </Typography>
      <Box>
        <Button
          type="submit"
          size="small"
          variant="contained"
          style={{ backgroundColor: "#23A982" }}
          sx={{ margin: 2 }}
        >
          Submit
        </Button>
        <Button
          size="small"
          variant="contained"
          onClick={handleCancelClick}
          style={{ backgroundColor: "#BB3344" }}
          sx={{ margin: 2 }}
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
}
