'use client';
import { useGetPokemon, useGetPokemons } from '@/api/pokemon';
import Link from 'next/link';
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
        <div className="w-[800px] mt-2 rounded-md bg-slate-100">
          <table className=" min-w-full divide-y divide-black">
            <thead className="h-14">
              <tr>
                <th>S.No</th>
                <th>PokemanName</th>
                <th>Url</th>
              </tr>
            </thead>
            <tbody className="divide-y bg-white divide-slate-400">
              {data?.map((item, index) => (
                <tr key={index}>
                  <td className="pl-16">{index + 1}</td>
                  <td className="pl-32 pt-5">
                    {item.name[0].toUpperCase() + item.name.slice(1)}
                  </td>
                  <td className="text-blue-600  hover:text-blue-400">
                    <Link
                      target="_blank"
                      className="visited:text-red-500"
                      href={item.url}
                    >
                      {item.url}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pl-10"></div>
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
  const { data, isLoading, isError } = useGetPokemon(pokemeon);
  return (
    <div>
      {isLoading ? (
        <h1 className="flex items-center justify-center animate-pulse">
          Loading...
        </h1>
      ) : (
        ''
      )}
      {isError ? 'Somenthing Went Wrong!' : ''}
      {data?.sprites?.front_default ? (
        <img src={data?.sprites?.front_default} alt="Pokemon" />
      ) : (
        'Pokemeon Not Found'
      )}
    </div>
  );
};

export default Page;
