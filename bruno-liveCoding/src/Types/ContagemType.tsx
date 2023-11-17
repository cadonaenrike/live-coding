export interface ContagemConhecida {
  id: string;
  count: number;
  dataAtualizacao: string;
}
import { Dispatch, SetStateAction } from "react"; // Certifique-se de importar Dispatch e SetStateAction
import { Planeta } from "./PlanetaType";

export interface FilterSelectProps {
  filtroTipo: string;
  onFiltroTipoChange: Dispatch<SetStateAction<string>>;
  planetas: Planeta[];
}
