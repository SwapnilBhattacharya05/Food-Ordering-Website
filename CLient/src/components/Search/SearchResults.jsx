import React from 'react'
import './SearchResults.css'
import { useFilterContext } from '../../Context/FilterContext'
import ListView from '../ListView/ListView'
import GridView from '../GridView/GridView'
import GridSkeleton from '../GridView/GridSkeleton'
import ListSkeleton from '../ListView/ListSkeleton'
const SearchResults = () => {
  const { filterRestaurants, filterDishes, isLoading, gridView, filter: { searchBy } } = useFilterContext();
  if (isLoading && filterRestaurants.length === 0) {
    return (
      <div className='container search-results-container'>
        {
          gridView ? <GridSkeleton /> : <ListSkeleton />
        }
      </div>
    )
  }
  if (filterRestaurants.length === 0) {
    return (
      <div className='container search-results-container'>
        <img style={{ display: 'block', margin: '1rem auto 0 auto', height: "300px", width: "300px" }}
          src="img/no-result-found.png"
          alt="no result" />
      </div>
    )
  }

  if (gridView) {
    return (
      <GridView data={searchBy === "Restaurants" ? filterRestaurants : filterDishes} />
    )
  } else {
    return (
      <ListView data={searchBy === "Restaurants" ? filterRestaurants : filterDishes} />
    )
  }
}

export default SearchResults