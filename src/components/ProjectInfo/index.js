import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

import projectsApi from "@root/store/projectApi";
import { useForm } from "react-hook-form";

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

  return (
    <>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(handleSaveClick)}
      >
        <Grid container spacing={2}>
          <Grid item xs={8}>
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
                Time:
              </Typography>
              <Typography variant="h6" textAlign={"left"} sx={{ margin: 2 }}>
                Budjet:
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
