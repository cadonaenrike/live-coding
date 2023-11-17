import React, { useState, useEffect } from "react";
import { Container, Typography, Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import SearchBar from "./assets/components/Campbusca";
import FilterSelect from "./assets/components/SelectFiltro";
import SortSelect from "./assets/components/Randomico";
import PlanetList from "./assets/components/ListPlanet";
import solarSystemService, {
  SolarSystemServiceError,
} from "./assets/services/SistemSolarService";
import { Planeta, PlanetaDetalhes } from "./Types/PlanetaType";
import { ContagemConhecida } from "./Types/ContagemType";

const App: React.FC = () => {
  const [planetas, setPlanetas] = useState<Planeta[]>([]);
  const [termoBusca, setTermoBusca] = useState<string>("");
  const [filtroTipo, setFiltroTipo] = useState<string>("");
  const [ordem, setOrdem] = useState<string>("asc");
  const [contagensConhecidas, setContagensConhecidas] = useState<
    ContagemConhecida[]
  >([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [planetaSelecionado, setPlanetaSelecionado] =
    useState<PlanetaDetalhes | null>(null);

  const fetchData = async () => {
    try {
      const planetasData = await solarSystemService.getPlanetas();
      const contagensData = await solarSystemService.getContagensConhecidas();
      const contagensArray = Array.isArray(contagensData) ? contagensData : [];

      setPlanetas(planetasData);
      setContagensConhecidas(contagensArray);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
      handleSolarSystemError(error as SolarSystemServiceError);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleBodyClick = async (id: string): Promise<PlanetaDetalhes> => {
    try {
      const bodyData = await solarSystemService.getBodyById(id);

      if (bodyData.isPlanet) {
        console.log(planetaSelecionado);
        const detalhesConvertidos: PlanetaDetalhes = {
          id: bodyData.id,
          name: bodyData.name,
          isPlanet: bodyData.isPlanet,
          moons: bodyData.moons?.map((moon) => moon.moon) || null,
          semimajorAxis: bodyData.semimajorAxis || 0,
          perihelion: bodyData.perihelion || 0,
          aphelion: bodyData.aphelion || 0,
          eccentricity: bodyData.eccentricity || 0,
          inclination: bodyData.inclination || 0,
          mass: {
            massValue: bodyData.mass?.massValue || 0,
            massExponent: bodyData.mass?.massExponent || 0,
          },
          vol: {
            volValue: bodyData.vol?.volValue || 0,
            volExponent: bodyData.vol?.volExponent || 0,
          },
          density: bodyData.density || 0,
          gravity: bodyData.gravity || 0,
          escape: bodyData.escape || 0,
          meanRadius: bodyData.meanRadius || 0,
          equaRadius: bodyData.equaRadius || 0,
          polarRadius: bodyData.polarRadius || 0,
          flattening: bodyData.flattening || 0,
          dimension: bodyData.dimension || "",
          sideralOrbit: bodyData.sideralOrbit || 0,
          sideralRotation: bodyData.sideralRotation || 0,
          aroundPlanet: bodyData.aroundPlanet || null,
          discoveredBy: bodyData.discoveredBy || "",
          discoveryDate: bodyData.discoveryDate || "",
          alternativeName: bodyData.alternativeName || "",
          axialTilt: bodyData.axialTilt || 0,
          avgTemp: bodyData.avgTemp || 0,
          mainAnomaly: bodyData.mainAnomaly || 0,
          argPeriapsis: bodyData.argPeriapsis || 0,
          longAscNode: bodyData.longAscNode || 0,
          bodyType: bodyData.bodyType || "",
          rel: bodyData.rel || "",
        };

        setPlanetaSelecionado(detalhesConvertidos || null);
        return detalhesConvertidos;
      } else {
        console.error("Corpo não é um planeta.");
        setSnackbarMessage("Você só pode obter detalhes de planetas.");
        setSnackbarOpen(true);
        return Promise.reject("Corpo não é um planeta.");
      }
    } catch (error) {
      console.error("Erro ao obter dados do corpo:", error);
      handleSolarSystemError(error as SolarSystemServiceError);
      return Promise.reject(error);
    }
  };

  const handleSolarSystemError = (error: SolarSystemServiceError) => {
    console.error(`Erro no sistema solar: ${error.message}`);
    setSnackbarMessage(`Erro no sistema solar: ${error.message}`);
    setSnackbarOpen(true);
  };

  const planetasFiltrados = planetas
    .filter((planeta) =>
      planeta.name.toLowerCase().includes(termoBusca.toLowerCase())
    )
    .filter((planeta) => !filtroTipo || planeta.bodyType === filtroTipo)
    .sort((a, b) =>
      ordem === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );

  return (
    <Container>
      <Typography variant="h1" gutterBottom>
        Sistema Solar
      </Typography>
      <SearchBar termoBusca={termoBusca} onSearchChange={setTermoBusca} />
      <FilterSelect
        filtroTipo={filtroTipo}
        onFiltroTipoChange={setFiltroTipo}
        planetas={planetas}
      />
      <SortSelect ordem={ordem} onOrdemChange={setOrdem} />

      <PlanetList planetas={planetasFiltrados} onBodyClick={handleBodyClick} />

      <ul>
        {contagensConhecidas.map((contagem) => (
          <li key={contagem.id}>{`${contagem.id}: ${contagem.count}`}</li>
        ))}
      </ul>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleSnackbarClose}
          severity="error"
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </Container>
  );
};

export default App;
