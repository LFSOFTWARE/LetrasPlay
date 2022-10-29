import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Error, Loader, SongCard } from '../components';
import { genres } from '../assets/constants';

import { useGetTopChartsQuery } from '../redux/services/shazamCore';

const Discover = () => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetTopChartsQuery();

  const genreTitle = 'Pop';
  if (isFetching) {
    return <Loader title="Loading songs..." />;
  }
  if (error) {
    return <Error />;
  }
  const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjY2Nzk0MTc3LCJpYXQiOjE2NjY3OTM4NzcsImp0aSI6ImY2YjJjODA2NWVlOTRlMDI4NDBiZWZkMWFiMTlkMGY4IiwidXNlcl9pZCI6MX0.C7xnSGPjTtypOIvG8RQiWKsksad4EHfPE9iCwwKl_kA';
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Access-Control-Allow-Origin': '*',
    },
  };
  axios.get('http://20.185.227.118/api/dge/petal-ranking', config).then((res) => {
    console.log(res);
  }).catch((err) => {
    console.log(err);
  });
  return (
    <div className="flex flex-col">
      <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
        <h2 className="font-bold text-3xl text-white">Discover {genreTitle}</h2>
        <select
          onChange={() => { }}
          value=""
          className="bg-black text-gray-300 p-3 text-sm rounded-lg outline-none sm: mt-0 mt-5"
        >
          {genres.map((genre) => (
            <option key={genre.value} value={genre.value}>{genre.title}</option>
          ))}
        </select>
      </div>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data?.map((song, i) => (
          <SongCard
            key={song.key}
            song={song}
            activeSong={activeSong}
            isPlaying={isPlaying}
            data={data}
            i={i}
          />
        ))}
      </div>
    </div>
  );
};

export default Discover;
