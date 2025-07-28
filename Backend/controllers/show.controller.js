// controllers/movieController.js
import axios from 'axios';
import { Movie } from '../Models/movie.js';
import { Show } from '../Models/Show.js';

// Replace this with your OMDb API Key (or use from .env)
const OMDB_API_KEY = process.env.OMDB_API_KEY;

// Example movie list (replace with your admin-managed now-playing list)
const nowPlayingTitles = ["Oppenheimer", "Interstellar", "Barbie", "Inception"];

export const getNowPlayingMovies = async (req, res) => {
  try {
    const movies = [];

    for (const title of nowPlayingTitles) {
      const { data } = await axios.get(`https://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=${OMDB_API_KEY}`);

      if (data.Response === "True") {
        movies.push(data);
      }
    }

    res.json({ success: true, data: movies });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: err.message });
  }
};

export const addShow = async (req, res) => {
  try {
    const { showInput, showPrice, movieId, title } = req.body;

    let movie = await Movie.findById(movieId);
    if (!movie) {
      const { data } = await axios.get(`https://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=${OMDB_API_KEY}`);
      if (data.Response !== "True") {
        return res.status(404).json({ success: false, message: "Movie not found on OMDb" });
      }

      const { imdbID, Title, Plot, Poster, Year, Genre, imdbRating, Director, Writer } = data;

      movie = await Movie.create({
        _id: imdbID,
        title: Title,
        description: Plot,
        image: Poster,
        year: Year,
        genre: Genre,
        rating: imdbRating,
        director: Director,
        writers: Writer
      });
    }

    const showToCreate = [];

    showInput.forEach(show => {
      const showDate = show.date;
      show.time.forEach(time => {
        const dateTimeString = `${showDate}T${time}`;
        showToCreate.push({
          movie: movie._id,
          showDateTime: new Date(dateTimeString),
          showPrice,
          occupiedSeats: {}
        });
      });
    });

    if (showToCreate.length > 0) {
      await Show.insertMany(showToCreate);
    }

    res.json({ success: true, message: "Show(s) added successfully", showToCreate });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getShows = async (req, res) => {
  try {
    const shows = await Show.find({ showDateTime: { $gte: new Date() } })
      .populate("movie")
      .sort({ showDateTime: 1 });

    const movieMap = new Map();
    shows.forEach(show => {
      const movieId = show.movie._id.toString();
      if (!movieMap.has(movieId)) {
        movieMap.set(movieId, show);
      }
    });

    res.json({ success: true, shows: Array.from(movieMap.values()) });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getSingleShow = async (req, res) => {
  try {
    const { movieId } = req.params;

    const shows = await Show.find({ movie: movieId, showDateTime: { $gte: new Date() } })
      .populate("movie");

    const movie = await Movie.findById(movieId);
    const dateTime = {};

    shows.forEach(show => {
      const date = show.showDateTime.toISOString().split("T")[0];
      if (!dateTime[date]) {
        dateTime[date] = [];
      }
      dateTime[date].push({
        time: show.showDateTime,
        showId: show._id
      });
    });

    res.json({ success: true, movie, dateTime });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: err.message });
  }
};
