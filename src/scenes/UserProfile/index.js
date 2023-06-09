import { Avatar, Box, Button, TextField, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@root/components/Layout";
import { updateUser } from "@root/store/userApi";

export default function UserProfile() {
  const navigate = useNavigate();
  let user = { login: "123" };

  const handleSaveClick = async (data) => {
    console.log("update click");
    let result = updateUser();
    if (result.errors == undefined) {
      navigate("/projects");
    }
  };

  function handleDeclineClick() {
    navigate("/projects");
  }

  return (
    <Layout>
      <Box sx={{ ml: 25 }}>
        <Avatar sx={{ width: 80, height: 80 }} />
        <Typography variant="h4" sx={{ mb: 5 }}>
          Profile
        </Typography>
        <Box display={"flex"} sx={{ mb: 2 }}>
          <Typography variant="h6" sx={{ ml: -10 }}>
            Login: {user.login}
          </Typography>
        </Box>
        <Box sx={{ ml: -10, mb: 2 }}>
          <Typography variant="h6">E-mail:</Typography>
          <TextField size="small" label="New email"></TextField>
        </Box>
        <Box sx={{ ml: -10, mb: 2 }}>
          <Typography variant="h6">Password:</Typography>
          <TextField
            size="small"
            label="New password"
            type="password"
          ></TextField>
        </Box>

        <Box
          sx={{
            display: "flex",
            ml: -10,
          }}
        >
          <Button
            type="submit"
            variant="contained"
            color="success"
            sx={{ margin: 2 }}
          >
            Save
          </Button>
          <Button
            variant="contained"
            color="error"
            sx={{ margin: 2 }}
            onClick={handleDeclineClick}
          >
            Decline
          </Button>
        </Box>
      </Box>
    </Layout>
  );
}
