'use client';
import { useGetUsers } from '@/api/users';
import Link from 'next/link';
const Page = () => {
  const { data, isLoading } = useGetUsers();
  if (isLoading) {
    return (
      <h1 className="animate-pulse text-center mt-72 text-3xl ">
        Loading....!
      </h1>
    );
  }
  return (
    <div className=" mt-5 flex flex-row flex-wrap gap-6 ">
      {data.map(item => (
        <Link key={item.id} href={`/users/${item.id}`}>
          <div className="w-[340px] bg-slate-100 h-48 rounded-md border border-black hover:bg-slate-200 hover:border-indigo-500">
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
