import React, { useState, useEffect, useCallback } from 'react'
import SearchBar from './components/searchbar/SearchBar'
import Slider from './components/slider/Slider'
import Timer from './components/timer/Timer'
import CategoryFilter from './components/CategoryFilter'
import MovieList from './components/movies/MovieList'
import BackToTopButton from './components/BackToTopButton'

function App() {
  const [movies, setMovies] = useState([])
  const [searchValue, setSearchValue] = useState(null)
  const [selectYear, setSelectYear] = useState([])
  const [selectedMovies, setSelectedMovies] = useState([])

  const getMovieRequest = useCallback(async (searchValue) => {
    const url = `http://www.omdbapi.com/?page=1&s=${searchValue}&apikey=be74bdc8&`
    const url2 = `http://www.omdbapi.com/?page=2&s=${searchValue}&apikey=be74bdc8&y`

    const response = await fetch(url)
    const responsePage2 = await fetch(url2)

    const data = await response.json()
    const dataPage2 = await responsePage2.json()

    if (data.Search && dataPage2.Search) {
      const AllData = data.Search.concat(dataPage2.Search)
      setMovies(AllData)
      setSelectedMovies(AllData)
      setSelectedMovies(AllData)
    }
  }, [])

  useEffect(() => {
    getMovieRequest(searchValue)
  }, [getMovieRequest, searchValue])

  let inputEmpty

  if (searchValue === '') {
    inputEmpty = true
  } else {
    inputEmpty = false
  }

  if (searchValue === null) {
    setSearchValue('harry')
  }
  return (
    <>
      <div className="container">
        <SearchBar
          placeholder="  Search"
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
        <Slider />
        <Timer />
        <div className="Gallery-Category-container">
          <CategoryFilter
            movies={movies}
            setSelectYear={setSelectYear}
            selectYear={selectYear}
            setSelectedMovies={setSelectedMovies}
          />

          {!inputEmpty ? (
            <MovieList
              selectYear={selectYear}
              selectedMovies={selectedMovies}
            />
          ) : (
            <div className="Movie-nofound">請輸入想看的電影</div>
          )}
        </div>
      </div>
      <BackToTopButton />
    </>
  )
}

export default App
