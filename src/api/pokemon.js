import axios from 'axios';
import { useQuery } from 'react-query';

const getPokemons = async () => {
  const { data } = await axios.get('https://pokeapi.co/api/v2/pokemon');
  return data.results;
};

export const useGetPokemons = () => {
  return useQuery('pokemons', getPokemons);
};

const getPokemon = async pokemeon => {
  const { data } = await axios.get(
    `https://pokeapi.co/api/v2/pokemon/${pokemeon}`
  );
  return data;
};

export const useGetPokemon = pokemeon => {
  return useQuery(['pokemons', pokemeon], () => getPokemon(pokemeon), {
    cacheTime: 3000
  });
};
