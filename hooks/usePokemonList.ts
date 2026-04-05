import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { pokemonService } from '@/lib/services/pokemon.service';
import { pokemonKeys } from '@/lib/query-keys';
import { PokemonListResponse } from '@/types/pokemon';

const LIMIT = 20;

interface UsePokemonListOptions {
  page: number;
  initialData?: PokemonListResponse;
}

export function usePokemonList({ page, initialData }: UsePokemonListOptions) {
  const offset = (page - 1) * LIMIT;

  return useQuery({
    queryKey: pokemonKeys.list({ limit: LIMIT, offset }),
    queryFn: () => pokemonService.getPokemonList({ limit: LIMIT, offset }),
    initialData: offset === 0 ? initialData : undefined,
    placeholderData: keepPreviousData,
  });
}

export { LIMIT };
