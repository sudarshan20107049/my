import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';
const url = 'https://jsonplaceholder.typicode.com/users';
const getUsers = async () => {
  const { data } = await axios.get(url);
  return data;
};
export const getUser = async id => {
  const { data } = await axios.get(
    `https://jsonplaceholder.typicode.com/users/${id}`
  );
  return data;
};
export const useGetUser = id => {
  const queryClient = useQueryClient();
  return useQuery('getUser', () => getUser(id), {
    initialData: () =>
      queryClient.getQueryData('getUsers')?.find(get => get.id === id)
  });
};
export const useGetUsers = () => {
  const queryClient = useQueryClient();
  return useQuery('getUsers', getUsers);
};

const addUser = async addUser => {
  const { data } = await axios.post('http://localhost:3005/post', addUser);
  return data;
};

export const useAddUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addUser,
    onSuccess: () => {
      queryClient.setQueriesData('DbUsers');
      queryClient.invalidateQueries('DbUsers');
    }
  });
};

const addDrop = async addDrop => {
  const { data } = await axios.post('http://localhost:3005/drop', addDrop);
  return data;
};

export const useAddDrop = () => {
  return useMutation({
    mutationFn: addDrop,
    onSuccess: () => alert('sucessfully Posted')
  });
};

const getDbUsers = async () => {
  const { data } = await axios.get('http://localhost:3005/users');
  return data;
};

export const useGetDbUsers = () => useQuery('DbUsers', getDbUsers);

const deleteDbUser = async id => {
  const { data } = await axios.delete(`http://localhost:3005/users/${id}`);
  return data;
};
export const useDeleteDbUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteDbUser,
    onSuccess: () => queryClient.invalidateQueries('DbUsers')
  });
};

const getTime = async () => {
  const { data } = await axios.get(
    'http://worldtimeapi.org/api/timezone/Asia/Kolkata'
  );
  return data;
};

export const useGetTime = () => useQuery('time', getTime);

const getTodos = async page => {
  const { data } = await axios.get(
    `https://jsonplaceholder.typicode.com/todos?_limit=10&_start=${page}`
  );
  return data;
};

export const useGetTodos = page => {
  return useQuery(['todos', page], () => getTodos(page), {
    keepPreviousData: true
  });
};
