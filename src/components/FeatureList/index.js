import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { logout } from "@root/store/auth";
import featuresApi from "@root/store/featureApi";
import { getFeaturez } from "@root/store/featureApi";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { getFeatures } from "@root/store/featureApi";

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

export default function FeatureList() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const dispatch = useDispatch();
  function handleLogoutClick() {
    dispatch(logout());
  }
  const [features, setFeatures] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getFeatures(localStorage.getItem("projectId"));
      setFeatures(result);
    };
    fetchData();
  }, []);

  const comp =
    features == null || features.isLoading || features.isError ? (
      <CircularProgress />
    ) : (
      <TableBody>
        {features.map((feature) => (
          <TableRow key={feature.id}>
            <TableCell>{feature.title}</TableCell>
            <TableCell>{feature.description}</TableCell>
            <TableCell sx={{ background: "#CCEA8A" }}>
              {feature.bestCaseEstimateInDays}
            </TableCell>
            <TableCell sx={{ background: "#CCEA8A" }}>
              {feature.mostLikelyEstimateInDays}
            </TableCell>
            <TableCell sx={{ background: "#CCEA8A" }}>
              {feature.worstCaseEstimateInDays}
            </TableCell>
            <TableCell sx={{ background: "#CCEA8A" }}>
              {feature.milestoneId}
            </TableCell>
            <TableCell sx={{ background: "#98A9A7" }}>
              {feature.estimateInDays}
            </TableCell>
            <TableCell sx={{ background: "#98A9A7" }}>
              {feature.priceInRubles}
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
              <TableRow sx={{ border: 2 }}>
                <TableCell>Feature Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell sx={{ background: "#CCEA8A" }}>Optimistic</TableCell>
                <TableCell sx={{ background: "#CCEA8A" }}>Realistic</TableCell>
                <TableCell sx={{ background: "#CCEA8A" }}>
                  Pessimistic
                </TableCell>
                <TableCell sx={{ background: "#CCEA8A" }}>Milestone</TableCell>
                <TableCell sx={{ background: "#98A9A7" }}>Estimation</TableCell>
                <TableCell sx={{ background: "#98A9A7" }}>Price</TableCell>
              </TableRow>
            </TableHead>
            {comp}
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}
