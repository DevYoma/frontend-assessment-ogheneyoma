import { PokemonListResponse, PokemonDetail } from '../../types/pokemon';

const BASE_URL = 'https://pokeapi.co/api/v2';

export const pokemonService = {
  getPokemonList: async (params: { limit?: number; offset?: number } = {}): Promise<PokemonListResponse> => {
    const { limit = 20, offset = 0 } = params;
    const response = await fetch(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`, {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  },

  getPokemonByNameOrId: async (idOrName: string | number): Promise<PokemonDetail> => {
    const response = await fetch(`${BASE_URL}/pokemon/${idOrName}`, {
      cache: 'force-cache',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  },
};
