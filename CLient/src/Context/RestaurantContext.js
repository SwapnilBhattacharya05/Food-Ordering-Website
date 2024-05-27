import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "../Reducer/RestaurantReducer";

const RestaurantContext = createContext();

const initialState = {
    allOrders: [],
    allFoodItems: [],
    allRestaurants: [],
    isLoading: false,
    topSellingDishes: [],
    topSellingRestaurants: [],
    foodItemsByCategory: [
        {
            label: "Veg",
            value: 0
        },
        {
            label: "Non-Veg",
            value: 0
        }
    ],
    allCoupons: [],
    allUsers: [],
};

const RestaurantProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const fetchAllOrders = async () => {
        dispatch({ type: "SET_LOADING" });
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/order/getAllOrders`);
            const data = await response.json();
            if (data.orders.length) {
                dispatch({ type: "SET_ALL_ORDERS", payload: data.orders });
            }
        } catch (error) {
            console.log(error);
        } finally {
            dispatch({ type: "UNSET_LOADING" });
        }
    };

    const fetchAllFoodItems = async () => {
        dispatch({ type: "SET_LOADING" });
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/restaurant/getAllFoodItems`);
            const data = await response.json();
            if (data.foodItems.length) {
                dispatch({ type: "SET_ALL_FOOD_ITEMS", payload: data.foodItems });
            }
        } catch (error) {
            console.log(error);
        } finally {
            dispatch({ type: "UNSET_LOADING" });
        }
    };

    const fetchTopSellingDishes = async (id) => {
        dispatch({ type: "SET_LOADING" });
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/order//topSellingDishes/${id}`);
            const data = await response.json();
            if (data.topSellingDishesByRestaurant.length) {
                dispatch({ type: "SET_TOP_SELLING_DISHES", payload: data.topSellingDishesByRestaurant });
            }
        } catch (error) {
            console.log(error);
        } finally {
            dispatch({ type: "UNSET_LOADING" });
        }
    };

    const fetchTopSellingRestaurants = async () => {
        dispatch({ type: "SET_LOADING" });
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/restaurant/topSellingRestaurants`);
            const data = await response.json();
            if (data.restaurants.length) {
                dispatch({ type: "SET_TOP_SELLING_RESTAURANTS", payload: data.restaurants });
            }
        } catch (error) {
            console.log(error);
        } finally {
            dispatch({ type: "UNSET_LOADING" });
        }
    };

    const fetchFoodItemsByCategory = async () => {
        dispatch({ type: "SET_LOADING" });
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/restaurant/getAllFoodItems`);
            const data = await response.json();
            if (data.foodItems.length) {
                dispatch({ type: "SET_FOOD_ITEMS_BY_CATEGORY", payload: data.foodItems });
            }
        } catch (error) {
            console.log(error);
        } finally {
            dispatch({ type: "UNSET_LOADING" });
        }
    };

    const fetchAllUsers = async () => {
        dispatch({ type: "SET_LOADING" });
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/getAllUsers`);
            const data = await response.json();
            if (data.users.length) {
                dispatch({ type: "SET_ALL_USERS", payload: data.users });
            }
        } catch (error) {
            console.log(error);
        } finally {
            dispatch({ type: "UNSET_LOADING" });
        }
    }

    const fetchAllCoupons = async () => {
        dispatch({ type: "SET_LOADING" });
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/getAllCoupons`);
            const data = await response.json();
            if (data.coupons.coupon.length) {
                dispatch({ type: "SET_ALL_COUPONS", payload: data.coupons.coupon });
            }
        } catch (error) {
            console.log(error);
        } finally {
            dispatch({ type: "UNSET_LOADING" });
        }
    }

    const fetchAllRestaurants = async () => {
        dispatch({ type: "SET_LOADING" });
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/restaurant/getallRestaurants`);
            const data = await response.json();
            if (data.restaurants.length) {
                dispatch({ type: "SET_ALL_RESTAURANTS", payload: data.restaurants });
            }
        } catch (error) {
            console.log(error);
        } finally {
            dispatch({ type: "UNSET_LOADING" });
        }
    }

    // useEffect(() => {
    //     fetchAllOrders();
    //     fetchAllFoodItems();
    //     fetchTopSellingDishes();
    //     fetchTopSellingRestaurants();
    //     fetchFoodItemsByCategory();
    // }, [restaurantId]);

    return (
        <RestaurantContext.Provider
            value={{
                ...state, fetchAllOrders, fetchAllFoodItems, fetchTopSellingDishes,
                fetchTopSellingRestaurants, fetchFoodItemsByCategory, fetchAllUsers,
                fetchAllCoupons, fetchAllRestaurants
            }}>
            {children}
        </RestaurantContext.Provider>
    );
};

const useRestaurantContext = () => {
    return useContext(RestaurantContext);
};

export { useRestaurantContext, RestaurantProvider };
