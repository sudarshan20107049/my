'use client';
import { useGetPokemon, useGetPokemons } from '@/api/pokemon';
import { useState } from 'react';

const Page = () => {
  const { data, isLoading, isError } = useGetPokemons();
  const [pokemon, setPokemon] = useState('');

  if (isLoading) {
    return (
      <h1 className="mt-80 ml-96 text-xl font-medium animate-pulse">
        Loading...
      </h1>
    );
  }
  if (isError) {
    return <h1>Something went Wrong</h1>;
  }

  return (
    <div className="mt-5 ml-5 ">
      <h1 className="text-5xl font-semibold text-orange-500 ">Pokeman</h1>
      <div className="flex flex-row">
        <div className="w-[500px] mt-2 rounded-md bg-slate-100">
          <div className="pl-10">
            {data?.map((item, index) => {
              return (
                <h3 key={index} className="pt-5">
                  {item.name[0].toUpperCase() + item.name.slice(1)}
                </h3>
              );
            })}
          </div>
        </div>
        <div className="w-[500px] mt-2 rounded-sm bg-slate-50">
          <input
            type="text"
            value={pokemon}
            onChange={e => setPokemon(e.target.value)}
            className="bg-slate-600 pl-3 text-white mt-5 ml-5 rounded-sm"
          />
          <Pokemon pokemeon={pokemon} />
        </div>
      </div>
    </div>
  );
};

const Pokemon = ({ pokemeon }) => {
  const { data, isLoading } = useGetPokemon(pokemeon);
  console.log(data);
  return (
    <div>
      {isLoading ? (
        <h1 className="flex items-center justify-center animate-pulse">
          Loading...
        </h1>
      ) : (
        ''
      )}
      {data?.sprites?.front_default ? (
        <img src={data?.sprites?.front_default} alt="Pokemon" />
      ) : (
        'Pokemeon Not Found'
      )}
    </div>
  );
};

export default Page;
