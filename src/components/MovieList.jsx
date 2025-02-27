/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react"
import { movieStore } from '../store/movieStore'
import { MovieItem } from "./MovieItem"
import { Link } from "react-router-dom"

import moment from 'moment'

import './MovieList.css'

export const MovieList = () => {
  const fetchMovies = movieStore((state) => state.fetchMovies)
  const movies = movieStore((state) => state.movies)

  useEffect(() => {
    fetchMovies()
  }, [])


  const formatReleaseDate = (fullDate) => {
    return moment(fullDate).format("MMM Do YY")
  }

  return (
    <div className="the-movie-list page-section" id="app-container">
      {movies && movies.slice(0, 20).map((movie) => (
          <Link 
            to={`/movie/${movie._id}`} 
            key={movie._id}
            className="the-movie-link"
            >
            <MovieItem
              name={movie.title}
              photo={`https://image.tmdb.org/t/p/w500${movie.posterUrl}`}
              releaseDate={formatReleaseDate(movie.releaseDate)}
            />
          </Link>
      ))}
    </div>
  )
}
