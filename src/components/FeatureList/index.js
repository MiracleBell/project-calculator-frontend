import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { logout } from "@root/store/auth";
import featuresApi from "@root/store/featureApi";
import { getFeaturez } from "@root/store/featureApi";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { getFeatures } from "@root/store/featureApi";
import DropdownCell from "@root/components/DropdownCell";

import {
  Box,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import FeatureCreation from "../FeatureCreation";

export default function FeatureList() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [selectedValue, setSelectedValue] = useState("");
  const options = [
    { value: "option1", label: "start test" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];
  const handleValueChange = (value) => {
    setSelectedValue(value);
  };

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
          <TableRow key={feature.id} sx={{ border: 2 }}>
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
            <DropdownCell
              options={options}
              value={selectedValue}
              onChange={handleValueChange}
            />
            <TableCell sx={{ background: "#98A9A7" }}>
              {feature.estimateInDays}
            </TableCell>
            <TableCell sx={{ background: "#98A9A7" }}>
              {feature.priceInRubles}
            </TableCell>
            <TableCell>
              <IconButton>
                <EditIcon />
              </IconButton>
              <IconButton>
                <DeleteIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    );

  return (
    <>
      <FeatureCreation open={open} setOpen={setOpen} />
      <Box maxWidth={1050}>
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
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            {comp}
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}
