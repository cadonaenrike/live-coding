import React, { useState } from "react";
import {
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { Planeta, PlanetaDetalhes } from "../../Types/PlanetaType";
import PlanetDetails from "./PlanetDetails";

interface PlanetListProps {
  planetas: Planeta[];
  onBodyClick?: (id: string) => Promise<PlanetaDetalhes>;
}

const PlanetList: React.FC<PlanetListProps> = ({ planetas, onBodyClick }) => {
  const [planetaSelecionado, setPlanetaSelecionado] =
    useState<PlanetaDetalhes | null>(null);

  const handleNameClick = async (id: string) => {
    try {
      const detalhes = await onBodyClick?.(id);
      const detalhesConvertidos: PlanetaDetalhes = {
        id: detalhes?.id || "",
        name: detalhes?.name || "",
        isPlanet: detalhes?.isPlanet || false,
        moons: detalhes?.moons || null,
        semimajorAxis: detalhes?.semimajorAxis || 0,
        perihelion: detalhes?.perihelion || 0,
        aphelion: detalhes?.aphelion || 0,
        eccentricity: detalhes?.eccentricity || 0,
        inclination: detalhes?.inclination || 0,
        mass: {
          massValue: detalhes?.mass?.massValue || 0,
          massExponent: detalhes?.mass?.massExponent || 0,
        },
        vol: {
          volValue: detalhes?.vol?.volValue || 0,
          volExponent: detalhes?.vol?.volExponent || 0,
        },
        density: detalhes?.density || 0,
        gravity: detalhes?.gravity || 0,
        escape: detalhes?.escape || 0,
        meanRadius: detalhes?.meanRadius || 0,
        equaRadius: detalhes?.equaRadius || 0,
        polarRadius: detalhes?.polarRadius || 0,
        flattening: detalhes?.flattening || 0,
        dimension: detalhes?.dimension || "",
        sideralOrbit: detalhes?.sideralOrbit || 0,
        sideralRotation: detalhes?.sideralRotation || 0,
        aroundPlanet: detalhes?.aroundPlanet || null,
        discoveredBy: detalhes?.discoveredBy || "",
        discoveryDate: detalhes?.discoveryDate || "",
        alternativeName: detalhes?.alternativeName || "",
        axialTilt: detalhes?.axialTilt || 0,
        avgTemp: detalhes?.avgTemp || 0,
        mainAnomaly: detalhes?.mainAnomaly || 0,
        argPeriapsis: detalhes?.argPeriapsis || 0,
        longAscNode: detalhes?.longAscNode || 0,
        bodyType: detalhes?.bodyType || "",
        rel: detalhes?.rel || "",
      };

      setPlanetaSelecionado(detalhesConvertidos || null);
    } catch (error) {
      console.error("Erro ao obter detalhes do planeta:", error);
    }
  };

  return (
    <Card
      sx={{ width: "100%" }}
      elevation={3}
      style={{ maxHeight: 400, overflowY: "auto" }}
    >
      <CardContent>
        {planetas.length === 0 ? (
          <Typography variant="body2">
            Nenhum planeta corresponde aos filtros selecionados.
          </Typography>
        ) : (
          <List>
            {planetas.map((planeta) => (
              <div key={planeta.id}>
                <ListItem button onClick={() => handleNameClick(planeta.id)}>
                  <ListItemText primary={planeta.name} />
                </ListItem>
                {planetaSelecionado?.id === planeta.id && (
                  <PlanetDetails detalhes={planetaSelecionado} />
                )}
              </div>
            ))}
          </List>
        )}
      </CardContent>
    </Card>
  );
};

export default PlanetList;
