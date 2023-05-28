import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { logout } from "@root/store/auth";
import MilestoneCreation from "@root/components/MilestoneCreation";
import teamsApi from "@root/store/teamApi";
import useListTeamQuery from "@root/store/teamApi";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

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

export default function TeamList() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const dispatch = useDispatch();
  function handleLogoutClick() {
    dispatch(logout());
  }

  const comp = (
    <TableBody>
      <TableRow>
        <TableCell>Senior developer</TableCell>
        <TableCell>1</TableCell>
        <TableCell>
          <IconButton>
            <EditIcon />
          </IconButton>
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </TableCell>
      </TableRow>
    </TableBody>
  );

  return (
    <>
      <Box maxWidth={800}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Position</TableCell>
                <TableCell>Degree of involvement</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            {comp}
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}
