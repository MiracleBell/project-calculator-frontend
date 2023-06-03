import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { logout } from "@root/store/auth";
import MilestoneCreation from "@root/components/MilestoneCreation";
import teamsApi from "@root/store/teamApi";
import useListTeamQuery from "@root/store/teamApi";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { featuresApi } from "@root/store/featureApi";

import {
  Box,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";

function getId() {
  const currentURL = window.location.href;
  let id = currentURL.substring(
    currentURL.lastIndexOf("/projects") + 10,
    currentURL.length
  );
  return id;
}

export default function FeatureList() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const dispatch = useDispatch();
  function handleLogoutClick() {
    dispatch(logout());
  }

  const [features, setFeatures] = useState(null);

  const comp =
    features == null ? (
      <CircularProgress />
    ) : (
      <TableBody>
        {features.map((feature) => (
          <TableRow key={feature.id}>
            <TableCell sx={{ background: "#CCEA8A" }}></TableCell>
            <TableCell sx={{ background: "#CCEA8A" }}></TableCell>
            <TableCell sx={{ background: "#CCEA8A" }}></TableCell>
            <TableCell sx={{ background: "#CCEA8A" }}></TableCell>
            <TableCell sx={{ background: "#98A9A7" }}>
              <IconButton>
                <EditIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    );

  return (
    <>
      <Box maxWidth={800}>
        <Button
          variant="contained"
          color="success"
          sx={{ mt: 1, mb: 2 }}
          onClick={handleOpen}
        >
          Add Feature
        </Button>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Feature Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell sx={{ background: "#CCEA8A" }}>Optimistic</TableCell>
                <TableCell sx={{ background: "#CCEA8A" }}>Realistic</TableCell>
                <TableCell sx={{ background: "#CCEA8A" }}>
                  Pessimistic
                </TableCell>
                <TableCell sx={{ background: "#CCEA8A" }}>Milestone</TableCell>
                <TableCell sx={{ background: "#98A9A7" }}>Estimation</TableCell>
              </TableRow>
            </TableHead>
            {comp}
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}
