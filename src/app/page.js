'use client';
import { useGetTime } from '@/api/users';
import { useReducer } from 'react';
import { format } from 'date-fns';
export default function Home() {
  const { data, isFetching, isLoading } = useGetTime();
  const [show, toggle] = useReducer(d => !d, true);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  console.log('data', data?.datetime);
  const DateFormat = ({ date }) => {
    const formattedDate = format(new Date(date), 'dd-MM-yyyy');
    console.log(formattedDate);
  };

  return (
    <div className="mt-5 ml-5 w-[800px] bg-slate-100 rounded-md px-5">
      <h1 className="text-3xl from-stone-800">
        Server Time {isFetching ? '...' : ''}
      </h1>
      <h1>
        {data?.datetime.slice(0, 10)} {''}
        <DateFormat date={data?.datetime} />
        <span className="text-lg font-medium gap-10">Time</span>
        {''} {data?.datetime.slice(11, 19)}
      </h1>
      <button
        onClick={toggle}
        className="w-40 px-1 py-1 text-center border rounded-lg bg-lime-400 text-lg font-semibold text-black"
      >
        Toggle
      </button>
      <h1> {show ? 'hello' : null}</h1>
    </div>
  );
}
