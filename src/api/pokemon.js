import axios, { CancelToken } from 'axios';
import { useQuery } from 'react-query';

const getPokemons = async () => {
  const { data } = await axios.get('https://pokeapi.co/api/v2/pokemon');
  return data.results;
};

export const useGetPokemons = () => {
  return useQuery('pokemons', getPokemons);
};

const getPokemon = pokemeon => {
  const source = CancelToken.source();
  const promise = new Promise(res => setTimeout(res, 1500))
    .then(() => {
      return axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemeon}`, {
        cancelToken: source.token
      });
    })
    .then(res => res.data);
  promise.cancel = () => {
    source.cancel('Query was cancelled');
  };
  return promise;
};

export const useGetPokemon = pokemeon => {
  console.log(pokemeon);
  return useQuery(['pokemons', pokemeon], () => getPokemon(pokemeon));
};
