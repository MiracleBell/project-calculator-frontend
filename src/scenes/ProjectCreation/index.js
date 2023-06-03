import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Box, Button, TextField, Typography } from "@mui/material";

import { useForm } from "react-hook-form";

import HorizontalLine from "@root/components/HorizontalLine";

import projectsApi from "@root/store/projectApi";

export default function ProjectCreation() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [createProject, { isLoading, isCreating }] =
    projectsApi.endpoints.create.useMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleSaveClick = async (data) => {
    console.log("save click");
    let result = await createProject(data);
    if (result.errors == undefined) {
      navigate("/projects");
    }
  };

  function handleDeclineClick() {
    navigate("/projects");
  }

  return (
    <>
      <Typography variant="h2" sx={{ ml: 3 }}>
        Project Calculator
      </Typography>
      <HorizontalLine />
      <Typography variant="h4" textAlign={"center"} sx={{ margin: 2 }}>
        Create New Project
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit(handleSaveClick)}
        noValidate
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <TextField
          autoFocus
          margin="normal"
          size="small"
          id="title"
          name="title"
          placeholder="Project Name"
          autoComplete="title"
          {...register("title", { required: true })}
          error={!!errors.title}
          helperText={errors.title ? "Обязательное поле" : ""}
          sx={{ width: 600 }}
        />
        <TextField
          margin="normal"
          size="small"
          id="client"
          name="client"
          placeholder="Client"
          autoComplete="client"
          {...register("client", { required: true })}
          error={!!errors.client}
          helperText={errors.client ? "Обязательное поле" : ""}
          sx={{ width: 600 }}
        />
        <TextField
          multiline
          maxRows={40}
          margin="normal"
          size="small"
          id="description"
          name="description"
          placeholder="Description"
          autoComplete="description"
          {...register("description", { required: true })}
          error={!!errors.description}
          helperText={errors.description ? "Обязательное поле" : ""}
          sx={{ width: 600 }}
        />
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
