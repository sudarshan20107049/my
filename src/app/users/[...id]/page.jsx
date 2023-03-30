'use client';
import { useGetUser } from '@/api/users';
const Page = ({ params }) => {
  const [id] = params.id;
  const { data, isLoading } = useGetUser(id);
  console.log(data);
  if (isLoading) {
    return (
      <h1 className="animate-pulse text-center mt-72 text-3xl ">
        Loading....!
      </h1>
    );
  }
  const images = [
    'https://e7.pngegg.com/pngimages/851/718/png-clipart-running-shin-chan-with-904-body-tag-illustration-shinnosuke-nohara-crayon-shin-chan-kasukabe-manga-animation-crayon-shin-chan-child-hand-thumbnail.png',
    'https://e7.pngegg.com/pngimages/944/385/png-clipart-shin-chan-with-costume-shinnosuke-nohara-crayon-shin-chan-kasukabe-action-kamen-others-miscellaneous-sticker-thumbnail.png',
    'https://e7.pngegg.com/pngimages/768/766/png-clipart-shin-chan-illustration-crayon-shin-chan-drawing-shinnosuke-nohara-desktop-kasukabe-shinchan-love-child-thumbnail.png',
    'https://e7.pngegg.com/pngimages/841/476/png-clipart-shin-chan-illustration-crayon-shin-chan-drawing-crayon-small-hit-glass-glass-television-thumbnail.png',
    'https://e7.pngegg.com/pngimages/96/298/png-clipart-shin-chan-illustration-crayon-shin-chan-shinnosuke-nohara-drawing-donald-duck-animated-film-donald-duck-comics-child-thumbnail.png',
    'https://e7.pngegg.com/pngimages/334/603/png-clipart-shin-chan-crayon-shin-chan-cartoon-humour-television-animation-crayon-television-child-thumbnail.png',
    'https://e7.pngegg.com/pngimages/364/571/png-clipart-shinnosuke-nohara-crayon-shin-chan-film-comedy-shinchan-child-face-thumbnail.png',
    'https://e7.pngegg.com/pngimages/990/588/png-clipart-crayon-shin-chan-beside-white-dog-art-crayon-shin-chan-drawing-shinnosuke-nohara-cartoon-manga-manga-fictional-character-thumbnail.png',
    'https://e7.pngegg.com/pngimages/655/964/png-clipart-shin-chan-illustration-crayon-shin-chan-shinnosuke-nohara-kasukabe-action-kamen-youtube-youtube-child-hand-thumbnail.png',
    'https://e7.pngegg.com/pngimages/502/941/png-clipart-crayon-shin-chan-shinnosuke-nohara-action-kamen-cartoon-anime-anime-comics-manga-thumbnail.png'
  ];

  const shinchan = images[Math.floor(Math.random() * images.length)];
  return (
    <div className="mt-5 ml-10 border border-black h-[350px] w-[450px] bg-slate-100 rounded-md">
      <div className="h-14 bg-slate-50 box-content flex flex-1 justify-center items-center ">
        <img
          src="https://img.icons8.com/clouds/512/google-earth.png"
          alt="Website pic"
          className="w-10 h-10 "
        />
        <h1 className="text-lg font-medium">{data?.company.name}</h1>
        <h5 className=" cursor-pointer text-sm underline text-blue-400 relative left-10 top-4 hover:text-red-400 ">
          {data.email}
        </h5>
      </div>
      <div>
        <img src={shinchan} alt="profilpic" className="w-24 h-24 ml-10 mt-4" />
        <p className="text-lg font-semibold text-amber-900 pl-5 ">
          {data?.name}
        </p>
        <div className="pl-5 text-base font-extralight">
          <h2 className="font-bold text-indigo-400">{data?.username}</h2>
          <h2>{data?.phone}</h2>
        </div>
        <div className="flex flex-col justify-end items-end pr-3">
          <address>{data?.address.suite},</address>
          <address>{data?.address.city},</address>
          <address>{data?.address.zipcode}</address>
        </div>
        <em className="flex justify-center text-blue-400">
          Copy Right @ <span className="font-extrabold">{data?.website}</span>{' '}
        </em>
      </div>
    </div>
  );
};
export default Page;
