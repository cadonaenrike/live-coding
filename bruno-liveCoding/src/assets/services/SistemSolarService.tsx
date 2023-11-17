import axios from "axios";
import { Planeta } from "../../Types/PlanetaType";
import { ContagemConhecida } from "../../Types/ContagemType";

export interface SolarSystemServiceError {
  message: string;
  status?: number;
}

const baseURL = "https://api.le-systeme-solaire.net/rest";

const solarSystemService = {
  getPlanetas: async (): Promise<Planeta[]> => {
    try {
      const response = await axios.get(
        `${baseURL}/bodies/?filter=isPlanet,true`
      );
      return response.data.bodies;
    } catch (error) {
      handleSolarSystemError(error);
    }
  },

  getAllCorposCelestes: async (): Promise<Planeta[]> => {
    try {
      const response = await axios.get(`${baseURL}/bodies/`);
      return response.data.bodies;
    } catch (error) {
      handleSolarSystemError(error);
    }
  },

  getContagensConhecidas: async (): Promise<ContagemConhecida[]> => {
    try {
      const response = await axios.get(`${baseURL}/knowncount/`);
      return response.data;
    } catch (error) {
      handleSolarSystemError(error);
    }
  },

  getBodyById: async (id: string): Promise<Planeta> => {
    try {
      const response = await axios.get(`${baseURL}/bodies/${id}`);
      return response.data;
    } catch (error) {
      handleSolarSystemError(error);
    }
  },
};

function handleSolarSystemError(error: unknown): never {
  if (error instanceof Error) {
    throw new Error(`Erro no sistema solar: ${error.message}`);
  } else {
    throw new Error("Erro desconhecido no sistema solar");
  }
}

export default solarSystemService;
