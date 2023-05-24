import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Box, Button, Container, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { userApi } from "@root/store/userApi";

import HorizontalLine from "@root/components/HorizontalLine";
import RegistrationForm from "@root/components/RegistrationForm";
import { useNavigate } from "react-router-dom";

const theme = createTheme();

export default function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" sx={{ border: 1 }}>
        <Typography
          component="h2"
          variant="h7"
          sx={{ padding: 2, textAlign: "center" }}
        >
          SignUp
        </Typography>
        <HorizontalLine />
        <RegistrationForm />
      </Container>
    </ThemeProvider>
  );
}
