'use client';

import { Suspense } from 'react';
import { useQueryState, parseAsInteger, parseAsString } from 'nuqs';
import { usePokemonList } from '@/hooks/usePokemonList';
import { usePokemonSearch } from '@/hooks/usePokemonSearch';
import PaginationControls from './pagination-controls';
import PokemonSearchInput from './pokemon-search-input';
import PokemonCard from './pokemon-card';
import EmptyState from '@/components/ui/empty-state';
import { PokemonListResponse } from '@/types/pokemon';

interface PokemonListProps {
  initialData: PokemonListResponse;
}

export default function PokemonList({ initialData }: PokemonListProps) {
  const [page, setPage] = useQueryState(
    'page',
    parseAsInteger.withDefault(1).withOptions({ shallow: false, history: 'push' })
  );

  const [search] = useQueryState(
    'search',
    parseAsString.withDefault('').withOptions({ shallow: false })
  );

  const { data: listData, isFetching: isListFetching } = usePokemonList({
    page,
    initialData,
  });

  const { 
    data: searchData, 
    isLoading: isSearchLoading, 
    isError: isSearchError 
  } = usePokemonSearch(search);

  const hasNextPage = Boolean(listData?.next);
  const isSearchActive = !!search;

  return (
    <section>
      <PokemonSearchInput />

      {!isSearchActive && (
        <PaginationControls
          page={page}
          hasNextPage={hasNextPage}
          isFetching={isListFetching}
          onPrevious={() => setPage(page - 1)}
          onNext={() => setPage(page + 1)}
        />
      )}

      <div className="pokemon-grid p-4">
        {isSearchActive ? (
          isSearchLoading ? (
            <div className="col-span-full py-12 text-center animate-pulse text-zinc-400">
              Searching for &quot;{search}&quot;...
            </div>
          ) : isSearchError ? (
            <div className="col-span-full">
              <EmptyState 
                message={`No Pokémon found matching "${search}"`}
                suggestion="Try searching for a full name or a valid ID (e.g., 'pikachu' or '25')."
              />
            </div>
          ) : searchData ? (
            <PokemonCard
              name={searchData.name}
              id={searchData.id}
              priority={true}
              imageUrl={
                searchData.sprites.other?.['official-artwork'].front_default ||
                searchData.sprites.front_default
              }
            />
          ) : null
        ) : (
          listData?.results.map((pokemon, index) => {
            const id = pokemon.url.split('/').filter(Boolean).pop() || '';
            const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
            return (
              <PokemonCard
                key={pokemon.name}
                name={pokemon.name}
                id={id}
                imageUrl={imageUrl}
                url={pokemon.url}
                priority={index < 4}
              />
            );
          })
        )}
      </div>

      {!isSearchActive && (
        <PaginationControls
          page={page}
          hasNextPage={hasNextPage}
          isFetching={isListFetching}
          onPrevious={() => setPage(page - 1)}
          onNext={() => setPage(page + 1)}
        />
      )}
    </section>
  );
}
