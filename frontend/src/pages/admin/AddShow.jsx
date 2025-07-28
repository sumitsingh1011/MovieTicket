import React, { useEffect, useState } from 'react';
import Loading from '../../component/Loading';
import Title from '../../component/admin/Title';
import { dummyShowsData } from '../../assets/assets';
import { CheckIcon, DeleteIcon, StarIcon, XIcon } from 'lucide-react';
import { converter } from '../../library/converter';


const AddShow = () => {
  const currency = import.meta.env.VITE_CURRENCY || '₹';
  const [loading, setloading] = useState(true);
  const [nowPlaying, setnowPlaying] = useState([]);
  const [Selectmovie, setSelectmovie] = useState(null);
  const [dateSelect, setdateSelect] = useState({});
  const [dateTimeInput, setdateTimeInput] = useState('');
  const [ShowPrice, setShowPrice] = useState('');

  const fetchPlayingMovie = async () => {
    setnowPlaying(dummyShowsData);
    setloading(false);
  };

  const AddDateTime = () => {
    if (!dateTimeInput) return;
    const [date, time] = dateTimeInput.split("T");
    if (!date || !time) return;

    setdateSelect((prev) => {
      const existingTimes = prev[date] || [];
      if (!existingTimes.includes(time)) {
        return { ...prev, [date]: [...existingTimes, time] };
      }
      return prev;
    });
  };

  const handleRemoveTime = (date, time) => {
    setdateSelect((prev) => {
      const filteredTimes = prev[date].filter((t) => t !== time);
      if (filteredTimes.length === 0) {
        const { [date]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [date]: filteredTimes };
    });
  };

  useEffect(() => {
    fetchPlayingMovie();
  }, []);

  return !loading && nowPlaying.length > 0 ? (
    <>
      <Title text1="Add" text2="Shows" />
      <p className="mt-10 text-lg font-medium">Now Playing Movie</p>
      <div className="overflow-x-auto p-4">
        <div className="group flex flex-wrap gap-4 mt-4 w-max">
          {nowPlaying.map((movie) => (
            <div
              key={movie.id}
              className="relative max-w-40 cursor-pointer group-hover:not-hover:opacity-40 hover:translate-y-1 transition duration-300"
              onClick={() => setSelectmovie(movie.id)}
            >
              <div className="relative rounded-lg overflow-hidden">
                <img
                  src={movie.poster_path}
                  alt={movie.title}
                  className="w-auto-30 h-40 object-cover"
                />
                <div className="text-sm flex items-center justify-between p-2 bg-black/70 w-full absolute bottom-0 left-0">
                  <p className="flex items-center gap-1 text-gray-400">
                    <StarIcon className="w-4 h-4 text-primary fill-primary" />
                    {movie.vote_average.toFixed(1)}
                  </p>
                  <p className='text-sm text-gray-300'>{converter(movie.vote_count)} Votes</p>
                </div>
              </div>
              {Selectmovie === movie.id && (
                <div className='absolute top-2 right-2 flex items-center justify-center bg-primary h-4 w-4 text-white'>
                  <CheckIcon className='h-4 w-4 text-white' strokeWidth={2.5} />
                </div>
              )}
              <p className='font-medium truncate'>{movie.title}</p>
              <p className='text-gray-400 tx-sm'>{movie.release_date}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Show Price */}
      <div className='mt-8'>
        <label className="block text-sm font-medium mb-2">Show Price</label>
        <div className='inline-flex items-center gap-2 border border-gray-600 px-3 py-2 rounded-md'>
          <p className='text-gray-400 text-sm'>{currency}</p>
          <input
            min={0}
            type="number"
            value={ShowPrice}
            onChange={(e) => setShowPrice(e.target.value)}
            placeholder='Enter show price'
            className='outline-none bg-transparent text-white'
          />
        </div>
      </div>

      {/* Date and Time */}
      <div className='mt-8'>
        <label className="block text-sm font-medium mb-2">Select Date & Time</label>
        <div className='inline-flex gap-2 border border-gray-600 p-1 pl-3 rounded-lg'>
          <input
            type="datetime-local"
            value={dateTimeInput}
            onChange={(e) => setdateTimeInput(e.target.value)}
            className='bg-gray-900 text-white border border-gray-600 px-3 py-2 rounded-md'
          />
          <button
            onClick={AddDateTime}
            className='bg-primary/80 text-white px-3 py-2 text-sm rounded-lg hover:bg-primary cursor-pointer'
          >
            Add Time
          </button>
        </div>
      </div>

      {/* Render Selected DateTimes */}
      {Object.keys(dateSelect).length > 0 && (
        <div className='mt-6'>
          <p className='text-sm font-medium mb-2'>Selected Date & Times:</p>
          <div className='flex flex-col gap-2'>
            {Object.entries(dateSelect).map(([date, times]) => (
              <div key={date}>
                <p className='text-gray-300 text-sm mb-1'>{date}</p>
                <div className='flex flex-wrap gap-2'>
                  {times.map((time) => (
                    <div key={time} className='bg-gray-800 text-white px-3 py-1 rounded-full flex items-center gap-1'>
                      <span className='text-sm'>{time}</span>
                      <XIcon className='h-4 w-4 cursor-pointer' onClick={() => handleRemoveTime(date, time)} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* display selecting time */}
        {Object.keys(dateSelect).length>0 && (
          <div className='mt-6'>
             <h2 className='mb-2'>Selected Date_time</h2>
             <ul className='space-y-3'>
              {Object.entries(dateSelect).map(([date, times]) => (
  <li key={date}>
    <div className='font-medium'>{date}</div>
    <div className='flex flex-wrap gap-2 mt-1 text-sm'>
      {times.map((time) => (
        <div
          key={time}
          className='border border-primary px-2 py-1 flex items-center rounded'
        >
          <span>{time}</span>
          <DeleteIcon
            onClick={() => handleRemoveTime(date, time)}
            width={15}
            className='ml-2 text-red-500 hover:text-red-800 cursor-pointer'
          />
        </div>
      ))}
    </div>
  </li>
))}

             </ul>
          </div>
        )} 
       <button className='bg-primary text-white px-8 py-2 mt-6 rounded hover:bg-primary/90 transition-all cursor-pointer'>Add Show</button>
    </>
  ) : (
    <Loading />
  );
};

export default AddShow;
