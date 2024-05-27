const reducer = (state, action) => {
    switch (action.type) {
        case "SET_LOADING":
            return {
                ...state,
                isLoading: true
            }
        case "UNSET_LOADING":
            return {
                ...state,
                isLoading: false
            }
        case "SET_ALL_ORDERS":
            return {
                ...state,
                allOrders: action.payload
            }
        case "SET_ALL_FOOD_ITEMS":
            return {
                ...state,
                allFoodItems: action.payload
            }
        case "SET_TOP_SELLING_DISHES":
            return {
                ...state,
                topSellingDishes: action.payload
            }
        case "SET_TOP_SELLING_RESTAURANTS":
            return {
                ...state,
                topSellingRestaurants: action.payload
            }
        case "SET_FOOD_ITEMS_BY_CATEGORY":
            const foodItemsByCategory = action.payload.reduce((accumulator, item) => {
                accumulator[item.category] += 1;
                return accumulator
            }, {
                "Veg": 0,
                "Non-Veg": 0,
            });
            return {
                ...state,
                foodItemsByCategory: [
                    {
                        label: "Veg",
                        value: foodItemsByCategory["Veg"]
                    },
                    {
                        label: "Non-Veg",
                        value: foodItemsByCategory["Non-Veg"]
                    }
                ]
            }
        case "SET_ALL_USERS":
            return {
                ...state,
                allUsers: action.payload
            }
        case "SET_ALL_COUPONS":
            return {
                ...state,
                allCoupons: action.payload
            }
        case "SET_ALL_RESTAURANTS":
            return {
                ...state,
                allRestaurants: action.payload
            }
        default:
            return state;
    }

}
export default reducer;