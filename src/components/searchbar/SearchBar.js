import React from 'react'
import classes from './SearchBar.module.css'

const SearchBar = (props) => {
  const resetInputField = () => {
    props.setSearchValue('')
  }
  return (
    <div className={classes.searchBar}>
      <i className="fas fa-search"></i>
      <input
        type="text"
        placeholder={props.placeholder}
        className={classes['search-input']}
        value={props.searchValue}
        onChange={(e) => props.setSearchValue(e.target.value)}
      />
      <i className="fas fa-times-circle" onClick={resetInputField}></i>
    </div>
  )
}

export default SearchBar
