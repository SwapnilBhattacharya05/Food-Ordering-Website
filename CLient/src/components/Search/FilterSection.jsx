import React from 'react'
import "./FilterSection.css"
import { useFilterContext } from '../../Context/FilterContext';
import FormatPrice from '../../Helper/FormatPrice';
const FilterSection = () => {
  const { filter: { text, cuisine, maxPrice, minPrice, price, searchBy }, allRestaurants, updateFilterValue, clearFilter } = useFilterContext();

  const allCuisines = ['All', ...new Set(allRestaurants.map((item) => item.cuisine))];

  return (
    <section className="container filter-section-container">
      <form action="">
        <input type="text"
          name="text"
          id="text"
          value={text}
          placeholder="Search..."
          className="search-input"
          onChange={updateFilterValue}
        />
        <input type='button' value={"Restaurants"}
          name='searchBy'
          className={searchBy === "Restaurants" ? 'filter-btn active' : 'filter-btn'}
          onClick={updateFilterValue}
        />
        <input type='button' value={"Dishes"}
          name='searchBy'
          className={searchBy === "Dishes" ? 'filter-btn active' : 'filter-btn'}
          onClick={updateFilterValue}
        />
      </form>

      <section className='cuisine-container'>
        <h5>Cuisine</h5>
        {
          allCuisines.map((item, index) => {
            if (item === 'All') {
              return (
                <div key={index} className='form-check'>
                  <input
                    className='form-check-input'
                    type='checkbox'
                    name='cuisine'
                    onChange={updateFilterValue}
                    defaultChecked
                    id={item}
                    checked={cuisine.includes(item)}
                    value={item}
                  />
                  <label htmlFor={item} className='form-check-label'>{item}</label>
                </div>
              )
            }
            return (
              <div key={index} className='form-check'>
                <input
                  className='form-check-input'
                  type='checkbox'
                  name='cuisine'
                  id={item}
                  onChange={updateFilterValue}
                  checked={cuisine.includes(item)}
                  value={item}
                />
                <label htmlFor={item}
                  className='form-check-label'
                >{item}</label>
              </div>
            )
          })
        }
      </section>

      <section className='price-container'>
        <h5>Price</h5>
        <p><FormatPrice price={price} /></p>
        <input style={{ cursor: 'pointer' }} type='range'
          name='price' id='price' onChange={updateFilterValue}
          min={minPrice} max={maxPrice} value={price}
        />
      </section>

      <button className='clear-filter btn mt-3' onClick={clearFilter}>Clear Filter</button>
    </section>
  )
}

export default FilterSection;