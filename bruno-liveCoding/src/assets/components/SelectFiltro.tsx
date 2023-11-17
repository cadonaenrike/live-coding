import React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Planeta } from "../../Types/PlanetaType";

interface FilterSelectProps {
  filtroTipo: string;
  onFiltroTipoChange: (value: string) => void;
  planetas: Planeta[];
}

const FilterSelect: React.FC<FilterSelectProps> = ({
  filtroTipo,
  onFiltroTipoChange,
  planetas,
}) => {
  const tiposFiltrados = planetas
    .map((planeta) => planeta.bodyType)
    .filter((value, index, self) => self.indexOf(value) === index);

  return (
    <FormControl fullWidth>
      <InputLabel>Filtrar por tipo</InputLabel>
      <Select
        value={filtroTipo}
        onChange={(e) => onFiltroTipoChange(e.target.value as string)}
      >
        <MenuItem value="">Todos</MenuItem>
        {tiposFiltrados.map((tipo) => (
          <MenuItem key={tipo} value={tipo}>
            {`${tipo}s`}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default FilterSelect;
