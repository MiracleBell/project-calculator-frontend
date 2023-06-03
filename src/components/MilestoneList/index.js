import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { logout } from "@root/store/auth";
import MilestoneCreation from "@root/components/MilestoneCreation";
import milestonesApi from "@root/store/milestoneApi";

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

export default function MilestoneList() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const dispatch = useDispatch();
  function handleLogoutClick() {
    dispatch(logout());
  }
  const milestones = milestonesApi.endpoints.milestoneList.useQuery(getId());
  console.log("!!!!!!!!!!!!!!!!!");
  console.log(milestones);
  console.log("!!!!!!!!!!!!!!!!!");
  return (
    <>
      <MilestoneCreation open={open} setOpen={setOpen} projectId={getId()} />
      <Box component="form" noValidate autoComplete="off">
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Button
              variant="contained"
              color="success"
              sx={{ mt: 1, mb: 2 }}
              onClick={handleOpen}
            >
              Add Milestone
            </Button>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Title</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Start Date</TableCell>
                    <TableCell>End Date</TableCell>
                  </TableRow>
                </TableHead>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item xs={2}>
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
