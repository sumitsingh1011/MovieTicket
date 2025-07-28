import { useNavigate } from 'react-router-dom'
import { ArrowRight, StarIcon } from 'lucide-react'
import timeformat from '../library/Timeformate'

const MovieCard = ({ movie }) => {
  const navigate = useNavigate()

  if (!movie) return null // Avoid rendering if movie is undefined

  return (
    <div>
      <div className="flex flex-col justify-between p-3 bg-gray-300 rounded-2xl hover:-translate-y-1 transition duration-300 w-66">
        <img
          className="rounded-md max-h-60 w-full cursor-pointer p-1 object-cover"
          src={movie?.backdrop_path}
          alt="movieImage"
          onClick={() => {
            navigate(`/movies/${movie?._id}`)
            window.scrollTo(0, 0)
          }}
        />

        <p className="truncate text-white text-xl font-semibold mt-2">
          {movie?.title}
        </p>

        <p className="text-sm text-gray-400 mt-2">
          {movie?.release_date && new Date(movie.release_date).getFullYear()} •{' '}
          {movie?.genres?.slice(0, 2).map((genre) => genre?.name).join(' | ')} •{' '}
          {timeformat(movie?.runtime)}
        </p>

        <div className="justify-between flex mt-5 items-center pb-3">
          <button
            className="bg-red-500 text-white px-4 py-1 rounded-full cursor-pointer"
            onClick={() => {
              navigate(`/movies/${movie._id}`)
              window.scrollTo(0, 0)
            }}
          >
            Buy Tickets
          </button>

          <p className="flex justify-center items-center gap-1 text-gray-400 mt-1 pr-1">
            <StarIcon className="w-4 h-4 text-primary fill-primary" />
            {movie?.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}
          </p>
        </div>
      </div>
    </div>
  )
}

export default MovieCard
