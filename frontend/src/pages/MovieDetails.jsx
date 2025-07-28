import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { dummyDateTimeData, dummyShowsData } from '../assets/assets'
import { Heart, CirclePlay, StarIcon } from 'lucide-react'
import BlurCircle from '../component/BlurCircle';
import MovieCard from '../component/MovieCart';

import timeformat from '../library/Timeformate';
import DateSelect from '../component/DateSelect';
import Loading from '../component/Loading';


// import DateSelection from './components/Details/DateSelection';

function MovieDetails() {
    const { id } = useParams();
    const [show, setShow] = useState(null);
    //const [related, setRelated] = useState([]);
    const navigate =useNavigate()

    const getShow = async () => {
        const show = dummyShowsData.find(show => show._id === id);
        if (show) {
            setShow({ movie:show ,
            dateTime: dummyDateTimeData });
            console.log("Found show:", show);
        }
    };

    // const getRelated = async () => {
    //     if (!show || !show.movie || !show.movie.genres) return;
    //     const relatedShows = dummyShowsData.filter(
    //         movie => movie.genres[0]?.id === show.movie.genres[0]?.id && movie._id !== show.movie._id
    //     );
    //     setRelated(relatedShows);
    // };

    useEffect(() => {
        getShow();
    }, [id]);

    // useEffect(() => {
    //     if (show) getRelated();
    // }, [show]);

    return show ? (
        <div className='text-white mb-2 min-h-screen md:w-3/4 mx-5 sm:mx-10 md:mx-16 lg:mx-24 xl:mx-28'>
            <div className='pt-40'>
                <div className='flex flex-col md:flex-row gap-10 mx-auto'>
                    <img src={show.movie.poster_path} className='md:w-2/5 rounded-lg object-cover' alt="" />
                    
                    <div className='md:w-4/5 p-2'>
                    
                        <p className='text-xl text-red-600'>English</p>
                        <p className='text-3xl font-semibold w-1/2'>{show.movie.title}</p>
                        <div className='flex items-center gap-2 text-gray-300 '>
                          <StarIcon className='w-5 h-5 text-primary fill-primary'/>
                          {show.movie.vote_average.toFixed(1)} User Rating
                          </div>

                        <p className='text-sm text-gray-400'>{show.movie.overview}</p>
                        <p>{timeformat(show.movie.runtime)}•{show.movie.genres.map(genre=>genre.name).join(", ") }•{ show.movie.release_date.split(" - ")[0] }</p>

                        <div className='flex items-center gap-5 mt-9'>
                            <button className='px-4 flex text-sm py-2 bg-gray-700 rounded-lg gap-2'>
                                <CirclePlay className='w-4' /> Watch Trailer
                            </button>
                            <BlurCircle  top="110px" right="110px"/>
                            <a href="#dateSelect" className='px-10 text-sm py-3 bg-primary bg-red-600 rounded-lg'>Buy Tickets</a>
                            <button className='p-2 border rounded-full bg-gray-700'>
                                <Heart className='text-white rounded-full w-6 cursor-pointer' />
                            </button>
                        </div>
                    </div>
                </div>

                <div className='mx-2 mt-16'>
                  
                    <h1 className='text-2xl'>Your Favorite Cast</h1>
                    <div className="w-full no-scrollbar overflow-x-auto pt-20">
                        <div className="flex items-center gap-5 px-4 min-w-max">
                            {
                                show.movie.casts.slice(0, 12).map((cast, idx) => (
                                    <div key={idx} className="flex flex-col items-center min-w-[6rem]">
                                        <img
                                            src={cast.profile_path}
                                            alt={cast.name}
                                            className="rounded-full w-20 h-20 object-cover"
                                        />
                                        <p className="mt-2 text-center text-sm font-medium">{cast.name}</p>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <DateSelect dateTime={show.dateTime} id={id}/>

                <h1 className='text-2xl font-semibold mt-10'>You May Also Like</h1>

                <div className='flex flex-wrap gap-8 justify-center mt-10'>
                    {

                      dummyShowsData.slice(0,3).map((movie,index)=>(
                        <MovieCard key={index} movie={movie}/>
                      ))
                        // related.map((show, idx) => (
                        //     <MovieCard key={idx} movie={show} />
                        // ))
                    }
                </div>
                <div className='flex justify-center mt-20'>
                  <button onClick={()=>{navigate('/movies');scrollTo(0,0)}} className='px-10 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-md font-medium cursor-pointer' >Show more</button>
                </div>
                
            </div>
        </div>
    ) : (
        <div className="text-white ">
          <Loading/>
          
        </div>
    );
}

export default MovieDetails;
