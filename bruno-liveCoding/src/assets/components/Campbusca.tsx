import React from "react";
import TextField from "@mui/material/TextField";

interface SearchBarProps {
  termoBusca: string;
  onSearchChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  termoBusca,
  onSearchChange,
}) => (
  <TextField
    fullWidth
    type="text"
    label="Buscar por nome"
    value={termoBusca}
    onChange={(e) => onSearchChange(e.target.value)}
  />
);

export default SearchBar;
