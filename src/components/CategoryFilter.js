import React from 'react'

const CategoryFilter = ({
  movies,
  setSelectYear,
  selectYear,
  setSelectedMovies,
}) => {
  const YearFilterHandler = (e) => {
    const filtrtToggleYear = movies.filter((item) => item.Year === selectYear)
    setSelectedMovies(filtrtToggleYear)
    setSelectYear(e.target.value)
  }

  return (
    <div className="Category-Buttons">
      {movies.map((movie) => (
        <button
          onClick={YearFilterHandler}
          value={movie.Year}
          key={movie.imdbID}
        >
          {movie.Year}
        </button>
      ))}
    </div>
  )
}

export default CategoryFilter
