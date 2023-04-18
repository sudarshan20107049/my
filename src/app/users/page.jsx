'use client';
import { getUser, useGetTodos, useGetUsers } from '@/api/users';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useReducer, useState } from 'react';
import { useQueryClient } from 'react-query';
const Page = () => {
  const [page, setPage] = useState(0);
  const { data, isLoading, isPreviousData } = useGetTodos(page);
  const [show, toggle] = useReducer(d => !d, false);
  return (
    <div>
      <button
        onClick={toggle}
        className="px-5 py-2 bg-black text-white  rounded-md font-medium text-lg"
      >
        Show
      </button>
      {show ? <Users /> : ''}
      {isLoading ? (
        'loading...'
      ) : (
        <div>
          <ul>
            {data?.map(item => (
              <h3 key={item.id}>{item.title}</h3>
            ))}
            <div className="gap-5">
              <button
                className="w-20 px-1 py-2 disabled:bg-orange-500 disabled:opacity-40  disabled:cursor-not-allowed rounded-md bg-orange-900 text-orange-200"
                disabled={page === 0}
                onClick={() => setPage(old => old - 1)}
              >
                Previous
              </button>
              <button
                className="w-20 disabled:bg-orange-300 disabled:cursor-wait px-1 py-2 rounded-md bg-orange-900 text-orange-200"
                onClick={() => setPage(old => old + 1)}
                disabled={isPreviousData || data?.hasMore}
              >
                Next
              </button>
              <h1>Current Page:{page + 1}</h1>
            </div>
          </ul>
        </div>
      )}
    </div>
  );
};

const Users = () => {
  const { data, isLoading } = useGetUsers();
  const queryClient = useQueryClient();
  const router = useRouter();
  if (isLoading) {
    return (
      <h1 className="animate-pulse text-center mt-72 text-3xl ">
        Loading....!
      </h1>
    );
  }
  return (
    <div className=" mt-5 flex flex-row flex-wrap gap-6 ">
      <div>
        <button
          className="px-2 py-2 bg-black rounded-md text-white text-base"
          onClick={() => router.push('/users/add')}
        >
          ADD Users
        </button>
      </div>
      {data?.map(item => (
        <Link key={item.id} href={`/users/${item.id}`}>
          <div
            onMouseEnter={() =>
              queryClient.prefetchQuery(['getUser', item.id], () =>
                getUser(item.id)
              )
            }
            className="w-[340px] bg-slate-100 h-48 rounded-md border border-black hover:bg-slate-200 hover:border-indigo-500"
          >
            <div className="flex-col ml-5 ">
              <div className="mt-4 flex gap-20 ">
                <p className="font-semibold">NAME</p>
                <p className="text-sm font-sans">{item.name}</p>
              </div>
              <div className="mt-4 flex gap-[70px]">
                <p className="font-semibold">MOBILE</p>
                <p className="text-sm font-sans">{item.phone}</p>
              </div>
              <div className="mt-4 flex gap-[50px]">
                <p className="font-semibold">COMPANY</p>
                <p className="text-sm font-sans">{item.company.name}</p>
              </div>
              <div className="mt-4 flex gap-[73px]">
                <p className="font-semibold">E-MAIL</p>
                <p className="text-sm font-sans">{item.email}</p>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Page;
