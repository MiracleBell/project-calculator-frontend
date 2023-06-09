import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import featuresApi from "@root/store/featureApi";

import { Box, Button, Modal, TextField } from "@mui/material";
import { min } from "lodash";

export default function FeatureCreation({ open, setOpen, projectId }) {
  const handleClose = () => setOpen(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [createFeature, { isLoading }] =
    featuresApi.endpoints.create.useMutation();

  const handleSave = async (data) => {
    console.log("save click");
    console.log(data);
    let request = {
      title: data.title,
      description: data.description,
      bestCaseEstimateInDays: data.optimistic,
      mostLikelyEstimateInDays: data.realistic,
      worstCaseEstimateInDays: data.pessimistic,
    };
    let result = await createFeature(projectId, request);

    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        textAlign={"center"}
        sx={{
          minWidth: 400,
          position: "absolute",
          margin: 5,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}
      >
        <TextField
          margin="normal"
          size="small"
          id="featureName"
          name="featureName"
          label="Feature Name"
          autoComplete="featureName"
          {...register("featureName", { required: true })}
          error={!!errors.title}
          helperText={errors.featureName ? "Required field" : ""}
          sx={{ width: 400, margin: 1 }}
        />
        <TextField
          multiline
          maxRows={5}
          margin="normal"
          size="small"
          id="description"
          name="description"
          label="Description"
          autoComplete="description"
          {...register("description", { required: true })}
          error={!!errors.description}
          helperText={errors.description ? "Required field" : ""}
          sx={{ width: 400, margin: 1 }}
        />

        <Controller
          name="optimistic"
          control={control}
          rules={{
            required: "Number is required",
            pattern: {
              value: /^[1-9]\d*$/,
              message: "Please enter a positive integer",
            },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              margin="normal"
              size="small"
              id="optimistic"
              name="optimistic"
              label="Optimistic estimation"
              error={!!errors.optimistic}
              helperText={errors.optimistic?.message}
              sx={{ minWidth: 400 }}
            />
          )}
        />

        <Controller
          name="realistic"
          control={control}
          rules={{
            required: "Number is required",
            pattern: {
              value: /^[1-9]\d*$/,
              message: "Please enter a positive integer",
            },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              margin="normal"
              size="small"
              id="realistic"
              name="realistic"
              label="Realistic estimation"
              error={!!errors.realistic}
              helperText={errors.realistic?.message}
              sx={{ minWidth: 400 }}
            />
          )}
        />

        <Controller
          name="pessimistic"
          control={control}
          rules={{
            required: "Number is required",
            pattern: {
              value: /^[1-9]\d*$/,
              message: "Please enter a positive integer",
            },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              margin="normal"
              size="small"
              id="pessimistic"
              name="pessimistic"
              label="Pessimistic estimation"
              error={!!errors.pessimistic}
              helperText={errors.pessimistic?.message}
              sx={{ minWidth: 400 }}
            />
          )}
        />
        <Box>
          <Button
            variant="contained"
            color="success"
            onClick={handleSubmit(handleSave)}
            sx={{ margin: 1 }}
          >
            Save
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleSave}
            sx={{ margin: 1 }}
          >
            Decline
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
