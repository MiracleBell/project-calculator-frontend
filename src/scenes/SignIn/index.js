import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { Box, Button, Container, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import LoginForm from "@root/components/LoginForm";
import HorizontalLine from "@root/components/HorizontalLine";
import { isAuthenticated, realyAuth } from "@root/store/auth";

const theme = createTheme();

export default function SignIn() {
  const isAuth = useSelector(isAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) {
      navigate("/projects");
    }
  }, [isAuth]);

  function handleSignUpClick() {
    navigate("/signup");
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            paddingTop: 2,
            maxWidth: 500,
            alignItems: "left",
            border: 1,
          }}
        >
          <Typography
            component="h2"
            variant="h5"
            sx={{ paddingLeft: 3, textAlign: "center" }}
          >
            Sign In
          </Typography>

          <HorizontalLine />
          <LoginForm />
          <HorizontalLine />

          <Typography component="h5" variant="h7" sx={{ ml: 3 }}>
            New User:
          </Typography>
          <Button
            size="small"
            variant="contained"
            sx={{ mt: 1, mb: 2, ml: 4 }}
            onClick={handleSignUpClick}
            style={{ backgroundColor: "#33AAFF" }}
          >
            Sign Up
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
