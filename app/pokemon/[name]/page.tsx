import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { pokemonService } from '@/lib/services/pokemon.service';

interface Props {
  params: Promise<{ name: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { name } = await params;
  try {
    const pokemon = await pokemonService.getPokemonByNameOrId(name);
    const capitalizedName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    const imageUrl = pokemon.sprites.other?.['official-artwork'].front_default || pokemon.sprites.front_default;

    return {
      title: `${capitalizedName} | Pokémon`,
      description: `Details about ${capitalizedName}, its base experience being ${pokemon.base_experience} and its primary types being ${pokemon.types.map(t => t.type.name).join(', ')}.`,
      openGraph: {
        images: [{ url: imageUrl }],
      },
    };
  } catch {
    return { title: 'Pokémon Not Found' };
  }
}

export default async function PokemonDetailPage({ params }: Props) {
  const { name } = await params;

  let pokemon;
  try {
    pokemon = await pokemonService.getPokemonByNameOrId(name);
  } catch (error) {
    console.error('Failed to fetch pokemon:', error);
    notFound();
  }

  const imageUrl = pokemon.sprites.other?.['official-artwork'].front_default || pokemon.sprites.front_default;

  return (
    <main className="detail-page">
      <Link href="/" className="back-btn">
        ← Back to Explorer
      </Link>

      <article>
        <div className="detail-header">
          <h1>{pokemon.name}</h1>
          <p className="detail-id">#{String(pokemon.id).padStart(4, '0')}</p>
        </div>

        <div className="detail-grid">
          <div className="detail-image-wrapper">
            <Image
              src={imageUrl}
              alt={pokemon.name}
              fill
              priority
              unoptimized
            />
          </div>

          <div className="detail-stats">
            <div>
              <h2>Metadata</h2>
              <ul className="meta-list">
                <li><strong>Height:</strong> {pokemon.height / 10} m</li>
                <li><strong>Weight:</strong> {pokemon.weight / 10} kg</li>
                <li><strong>Base XP:</strong> {pokemon.base_experience}</li>
              </ul>
            </div>

            <div>
              <h2>Types</h2>
              <div className="type-badges">
                {pokemon.types.map((t) => (
                  <span key={t.type.name} className="type-badge">{t.type.name}</span>
                ))}
              </div>
            </div>

            <div>
              <h2>Abilities</h2>
              <ul>
                {pokemon.abilities.map((a) => (
                  <li key={a.ability.name}>
                    {a.ability.name}{' '}
                    {a.is_hidden && <span style={{ fontSize: '0.75rem', color: '#a1a1aa' }}>(Hidden)</span>}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}
