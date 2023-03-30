import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';
const url = 'https://jsonplaceholder.typicode.com/users';
const getUsers = async () => {
  const { data } = await axios.get(url);
  return data;
};
const getUser = async id => {
  const { data } = await axios.get(
    `https://jsonplaceholder.typicode.com/users/${id}`
  );
  return data;
};

const addUser = async () => {
  const { data } = await axios.post('http://localhost:3001/users');
  return data;
};

export const useAddUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addUser,
    onSuccess: queryClient.invalidateQueries('addUser')
  });
};

export const useGetUsers = () => {
  return useQuery('getusers', getUsers);
};

export const useGetUser = id => {
  return useQuery('getuser', () => getUser(id));
};
