import React, { useState, useEffect } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { PlanetaDetalhes } from "../../Types/PlanetaType";

interface PlanetDetailsProps {
  detalhes: PlanetaDetalhes;
}

const PlanetDetails: React.FC<PlanetDetailsProps> = ({ detalhes }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Abre o modal automaticamente quando o componente é renderizado
    setOpen(true);
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{detalhes.name}</DialogTitle>
        <DialogContent>
          <List style={{ border: "1px solid gray" }}>
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
            <ListItem>
              <ListItemText primary={`Densidade: ${detalhes.density} g/cm³`} />
            </ListItem>
            <ListItem>
              <ListItemText primary={`Gravidade: ${detalhes.gravity} m/s²`} />
            </ListItem>
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Fechar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PlanetDetails;
