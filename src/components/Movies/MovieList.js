import React, { useState } from 'react'
import classes from './MovieList.module.css'

const MovieList = (props) => {
  const [model, setModel] = useState(false)
  const [tempPoster, setTemPoster] = useState('')
  const getImg = (Poster) => {
    setTemPoster(Poster)
    setModel(true)
  }
  return (
    <>
      <div className={model ? 'model open' : 'model'}>
        <img src={tempPoster} />
        <i className="fas fa-times-circle" onClick={() => setModel(false)}></i>
      </div>
      <div className={classes.MovieGallery}>
        {props.selectedMovies.map((movie) => (
          <div key={movie.imdbID}>
            <img
              src={movie.Poster}
              alt="movie"
              className={classes['movie-poster']}
              onClick={() => getImg(movie.Poster)}
            />
          </div>
        ))}
      </div>
    </>
  )
}

export default MovieList
