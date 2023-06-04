import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";

import projectsApi from "@root/store/projectApi";

import {
  Box,
  Button,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

function getId() {
  const currentURL = window.location.href;
  let id = currentURL.substring(
    currentURL.lastIndexOf("/projects") + 10,
    currentURL.length
  );
  localStorage.setItem("projectId", id);
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
  const [project, setProject] = useState(null);
  getProjectById(getId()).then((result) => {
    setProject(result);
    console.log(result);
  });

  const [updateProject, { isLoading, isCreating }] =
    projectsApi.endpoints.update.useMutation();
  const {
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleSaveClick = async (data) => {
    console.log("update click");
    let result = await updateProject(getId(), data);
    if (result.errors == undefined) {
      navigate("/projects");
    }
  };

  function handleDeclineClick() {
    navigate("/projects");
  }

  const comp =
    project == null ? (
      <CircularProgress />
    ) : (
      <>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <TextField
              margin="normal"
              size="small"
              id="title"
              name="title"
              label="Project name"
              defaultValue={project.title}
              sx={{ width: 500 }}
            ></TextField>

            <TextField
              margin="normal"
              size="small"
              id="client"
              name="client"
              label="Client"
              defaultValue={project.client}
              sx={{ width: 500 }}
            ></TextField>

            <TextField
              multiline
              margin="normal"
              size="small"
              id="description"
              name="description"
              label="Description"
              defaultValue={project.description}
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
          </Grid>
          <Grid>
            <Box
              textAlign={"center"}
              minWidth={300}
              minHeight={200}
              sx={{
                backgroundColor: "#0085FC",
                color: "white",
                borderRadius: 2,
                border: "1px solid #0081F6",
              }}
            >
              <Typography variant="h5" sx={{ margin: 2 }}>
                Estimation
              </Typography>
              <Typography variant="h6" textAlign={"left"} sx={{ margin: 2 }}>
                Time: {Math.ceil(project.estimateInDays / 5)} weeks
              </Typography>
              <Typography variant="h6" textAlign={"left"} sx={{ margin: 2 }}>
                Budjet: {project.priceInRubles / 5} rubles
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </>
    );

  return (
    <>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(handleSaveClick)}
      ></Box>
      {comp}
    </>
  );
}
