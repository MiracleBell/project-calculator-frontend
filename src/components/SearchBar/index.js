import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { Box, Button, TextField, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchBar({ value, onChange }) {
  return (
    <Box sx={{ mb: 3, ml: 1 }}>
      <TextField
        size="small"
        placeholder="Search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{ border: 0, color: "white", backgroundColor: "white" }}
      ></TextField>
      <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Box>
  );
}
