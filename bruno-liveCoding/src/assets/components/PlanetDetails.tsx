import React from "react";
import { Typography, List, ListItem, ListItemText } from "@mui/material";
import { PlanetaDetalhes } from "../../Types/PlanetaType";

interface PlanetDetailsProps {
  detalhes: PlanetaDetalhes;
}

const PlanetDetails: React.FC<PlanetDetailsProps> = ({ detalhes }) => (
  <div>
    <Typography variant="h3">{detalhes.name}</Typography>
    <List style={{ border: "3px solid black" }}>
      <ListItem>
        <ListItemText
          primary={`Massa: ${detalhes.mass.massValue} x 10^${detalhes.mass.massExponent} kg`}
        />
      </ListItem>
      <ListItem>
        <ListItemText
          primary={`Volume: ${detalhes.vol.volValue} x 10^${detalhes.vol.volExponent} km³`}
        />
      </ListItem>
    </List>
  </div>
);

export default PlanetDetails;
