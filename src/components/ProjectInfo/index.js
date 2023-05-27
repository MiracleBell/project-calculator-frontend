import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

import projectsApi from "@root/store/projectApi";
import { useNavigate } from "react-router-dom";

function getId() {
  const currentURL = window.location.href;
  let id = currentURL.substring(
    currentURL.lastIndexOf("/projects") + 10,
    currentURL.length
  );
  return id;
}

const getProjectById = async (id) => {
  const projects = await projectsApi.endpoints.list.useQuery(
    JSON.parse(localStorage.getItem("user"))
  );
  const result = await projects.data.find((project) => project.id == id);
  return result;
};

export default function ProjectInfo() {
  const navigate = useNavigate();
  function handleDeclineClick() {
    navigate("/projects");
  }

  return (
    <>
      <Box noValidate autoComplete="off">
        <Typography>Project Name</Typography>
        <TextField
          margin="normal"
          size="small"
          id="title"
          name="title"
          sx={{ width: 500 }}
        ></TextField>

        <Typography>Client</Typography>
        <TextField
          margin="normal"
          size="small"
          id="client"
          name="client"
          sx={{ width: 500 }}
        ></TextField>

        <Typography>Description</Typography>
        <TextField
          multiline
          margin="normal"
          size="small"
          id="description"
          name="description"
          sx={{ width: 500 }}
        ></TextField>

        <Typography>Communication coefficient</Typography>
        <TextField
          margin="normal"
          size="small"
          id="commu"
          name="description"
          sx={{ width: 500 }}
        ></TextField>

        <Typography>Risk coefficient</Typography>
        <TextField
          margin="normal"
          size="small"
          id="description"
          name="description"
          sx={{ width: 500 }}
        ></TextField>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
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
    </>
  );
}
