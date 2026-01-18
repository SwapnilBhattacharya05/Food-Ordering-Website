import { createContext, useContext, useEffect, useReducer, useMemo, useCallback } from "react";
import reducer from "../Reducer/FilterReducer";

const FilterContext = createContext();

const initialState = {
    isLoading: false,
    allRestaurants: [],
    allDishes: [],
    filterDishes: [],
    filterRestaurants: [],
    gridView: true,
    sortingValue: "newest",
    filter: {
        text: "",
        searchBy: "Restaurants",
        cuisine: "All",
        category: "All",
        maxPrice: 0,
        minPrice: 0,
        price: 0,
    }
}

const FilterProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, initialState);
    
    const getallRestaurants = useCallback(async () => {
        dispatch({ type: "SET_LOADING" });
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/restaurant/getallRestaurants`);
            const data = await response.json();
            dispatch({ type: "SET_ALL_RESTAURANTS", payload: { restaurants: data.restaurants, rating: data.rating } });
        } catch (error) {
            console.log(error);
        }
    }, []);

    const getAllDishes = useCallback(async () => {
        dispatch({ type: "SET_LOADING" });
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/restaurant/getAllFoodItems`);
            const data = await response.json();
            dispatch({ type: "SET_ALL_DISHES", payload: data });
        } catch (error) {
            console.log(error);
        }
    }, []);

    const setGridView = useCallback(() => {
        dispatch({ type: "SET_GRID_VIEW" });
    }, []);

    const setListView = useCallback(() => {
        dispatch({ type: "SET_LIST_VIEW" });
    }, []);

    const sorting = useCallback((event) => {
        const userValue = event.target.value;
        dispatch({ type: "GET_SORTING_VALUE", payload: userValue });
    }, []);

    const updateFilterValue = useCallback((event) => {
        const name = event.target.name;
        const value = event.target.value;
        dispatch({ type: "UPDATE_FILTER_VALUE", payload: { name, value } });
    }, []);

    const clearFilter = useCallback(() => {
        dispatch({ type: "CLEAR_FILTER" });
        dispatch({ type: "SET_LOADING" })
        setTimeout(() => {
            dispatch({ type: "UNSET_LOADING" })
        }, 1000);
    }, []);

    useEffect(() => {
        dispatch({ type: "FILTER_RESTAURANTS" });
        dispatch({ type: "SORTING_RESTAURANTS" });
    }, [state.sortingValue, state.filter]);

    useEffect(() => {
        getallRestaurants();
        getAllDishes();
    }, [getallRestaurants, getAllDishes]);

    const contextValue = useMemo(() => ({
        ...state,
        setGridView,
        setListView,
        sorting,
        updateFilterValue,
        clearFilter,
        getAllDishes
    }), [state, setGridView, setListView, sorting, updateFilterValue, clearFilter, getAllDishes]);

    return <FilterContext.Provider value={contextValue}>
        {children}
    </FilterContext.Provider>
}
const useFilterContext = () => {
    return useContext(FilterContext);
};

export { useFilterContext, FilterProvider }