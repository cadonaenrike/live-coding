import React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

interface SortSelectProps {
  ordem: string;
  onOrdemChange: (value: string) => void;
}

const SortSelect: React.FC<SortSelectProps> = ({ ordem, onOrdemChange }) => (
  <FormControl fullWidth>
    <InputLabel>Ordenar por</InputLabel>
    <Select
      value={ordem}
      onChange={(e) => onOrdemChange(e.target.value as string)}
    >
      <MenuItem value="asc">A-Z</MenuItem>
      <MenuItem value="desc">Z-A</MenuItem>
    </Select>
  </FormControl>
);

export default SortSelect;
