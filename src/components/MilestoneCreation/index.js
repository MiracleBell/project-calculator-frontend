import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import milestonesApi from "@root/store/projectApi";

import { Box, Button, Modal, TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function MilestoneCreation({ open, setOpen, projectId }) {
  const handleClose = () => setOpen(false);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [createMilestone, { isLoading }] =
    milestonesApi.endpoints.create.useMutation();

  const handleSave = async (data) => {
    localStorage.setItem("id", projectId);
    console.log("save click");
    console.log(startDate);
    let request = {
      title: data.title,
      description: data.description,
      startDate: "2023-06-15T12:34:56", //startDate.$y + "-" + startDate.$M + "-" + startDate.$D,
      endDate: "2020-07-10T11:22:33", //endDate.$y + "-" + endDate.$M++ + "-" + endDate.$D,
    };
    let result = await createMilestone(projectId, request);

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
          autoFocus
          margin="normal"
          size="small"
          id="title"
          name="title"
          label="Title"
          autoComplete="title"
          {...register("title", { required: true })}
          error={!!errors.title}
          helperText={errors.title ? "Обязательное поле" : ""}
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
          helperText={errors.description ? "Обязательное поле" : ""}
          sx={{ width: 400, margin: 1 }}
        />

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            size="small"
            id="startDate"
            name="startDate"
            label="Start date"
            value={startDate}
            onChange={(date) => setStartDate(date)}
            renderInput={(params) => <TextField {...params} />}
            sx={{ width: 400, margin: 1 }}
          />
        </LocalizationProvider>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            size="small"
            id="endDate"
            name="endDate"
            label="End date"
            value={endDate}
            onChange={(date) => setEndDate(date)}
            renderInput={(params) => <TextField {...params} />}
            sx={{ width: 400, margin: 1 }}
          />
        </LocalizationProvider>

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
