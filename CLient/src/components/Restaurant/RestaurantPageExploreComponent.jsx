import { useEffect, useState } from 'react'
import { useFilterContext } from '../../Context/FilterContext';
import { useParams } from 'react-router-dom';
import "./RestaurantPageExploreComponent.css";
import ListCardItem from '../ListView/ListCardItem';

const RestaurantPageExploreComponent = () => {

  const { allDishes } = useFilterContext();
  const [foodItems, setFoodItems] = useState([]);

  const { restaurantId } = useParams();

  useEffect(() => {
    const fetchFoodItems = async () => {

      const allFoodItems = allDishes.filter((dish) => {
        return restaurantId === dish.restaurant._id
      });

      setFoodItems(allFoodItems);
    }
    fetchFoodItems();
    // eslint-disable-next-line
  }, [restaurantId]);

  const handleOnChange = (e) => {
    const searchResult = allDishes.filter((dish) => {
      return dish.name.toLowerCase().includes(e.target.value.toLowerCase()) && restaurantId === dish.restaurant._id
    });

    setFoodItems(searchResult);
  }

  return (
    <div className='restaurant-page-explore-container mt-3'>
      <form className='restaurant-page-explore-form'>
        <input type="text" name="text" id="search"
          placeholder="Search by name"
          onChange={handleOnChange}
        />
      </form>
      {
        !foodItems.length ? <div>
          <img
            src="/img/no-result-found.png"
            alt="no result"
            style={{ margin: "0 auto", display: "block", height: "300px", width: "300px" }}
          />
        </div> :
          foodItems.map((foodItem, index) => {
            return <ListCardItem key={index} foodItem={foodItem} />
          })
      }
    </div>
  )
}

export default RestaurantPageExploreComponent