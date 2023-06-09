import React, { useState } from "react";
import { TableCell, Select, MenuItem } from "@mui/material";

const DropdownCell = ({ options, value, onChange }) => {
  const handleChange = (event) => {
    const selectedValue = event.target.value;
    onChange(selectedValue);
  };

  return (
    <TableCell sx={{ background: "#CCEA8A" }}>
      <Select value={value} onChange={handleChange} size="small">
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </TableCell>
  );
};

export default DropdownCell;
