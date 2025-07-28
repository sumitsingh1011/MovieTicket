import React from 'react'
import { dummyShowsData } from '../assets/assets'
import MovieCard from '../component/MovieCart'
import BlurCircle from '../component/BlurCircle'

const Favorite = () => {
  return dummyShowsData.length>0 ?(
    <div className="relative my-40 mb-60 px-60 md:px-16 lg:px-40 xl:px-44 overflow-hidden min-h-[80vh]">

      <BlurCircle top="150px" left="0px"/>
      <BlurCircle bottom="50px" right="50px"/>
      <h1 className='my-4 text-lg font-medium'>Your favorite movies</h1>
      <div className='flex flex-wrap gap-8 max-sm:justify-center'>{dummyShowsData.map((movie)=>(
        <MovieCard movie={movie} key={movie._id}/>
      ))}

      </div>
    </div>
  ) : (
    <div className="mt-[100px]">
      <h1>NO MOVIES AVAILABLE</h1>
    </div>
  )
}

export default Favorite
