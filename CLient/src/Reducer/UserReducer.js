const reducer = (state, action) => {
    switch (action.type) {
        case "SET_USER":
            return {
                ...state,
                user: action.payload
            }

        case "CLEAR_USER":
            return {
                ...state,
                user: null
            }
        case "UPDATE_CART_ITEMS":
            let { _id, image, name, price, restaurant } = action.payload;

            let newCartItems = state.cartItems;
            const differentRestaurant = state.cartItems.find(item => item.restaurant._id !== restaurant._id);
            if (newCartItems.length === 0) {
                newCartItems = [{
                    _id,
                    image,
                    name,
                    price,
                    quantity: 1,
                    restaurant,
                }]
            } else if (differentRestaurant) {
                newCartItems = [{
                    _id,
                    image,
                    name,
                    price,
                    quantity: 1,
                    restaurant,
                }]
            } else {
                let isItemAvailable = false;
                newCartItems = newCartItems.map(item => {
                    if (item._id === _id) {
                        isItemAvailable = true;
                        return {
                            ...item,
                            quantity: item.quantity + 1,
                        }
                    } else {
                        return item
                    }
                });
                if (!isItemAvailable) {
                    newCartItems = [...newCartItems, {
                        _id,
                        image,
                        name,
                        price,
                        quantity: 1,
                        restaurant,
                    }]
                }
            }
            return {
                ...state,
                cartItems: [...newCartItems],
            }
        case "CART_TOTAL_ITEM_PRICE":
            const { totalCartItems, totalCartItemPrice } = state.cartItems.reduce((accumulator, item) => {
                accumulator.totalCartItems += item.quantity
                accumulator.totalCartItemPrice += item.quantity * item.price
                return accumulator
            }, {
                totalCartItems: 0,
                totalCartItemPrice: 0
            })

            return {
                ...state,
                totalCartItems,
                totalCartItemPrice
            }
        case "INCREMENT_CART_ITEM_QUANTITY":
            const incrementedCart = state.cartItems.map(item => {
                if (item._id === action.payload) {
                    return {
                        ...item,
                        quantity: item.quantity + 1
                    }
                } else {
                    return item
                }
            })

            return {
                ...state,
                cartItems: incrementedCart
            }

        case "DECREMENT_CART_ITEM_QUANTITY":
            const decrementedCart = state.cartItems.map(item => {
                if (item._id === action.payload) {
                    return {
                        ...item,
                        quantity: item.quantity === 1 ? 1 : item.quantity - 1
                    }
                } else {
                    return item
                }
            })

            return {
                ...state,
                cartItems: decrementedCart
            }

        case "REMOVE_CART_ITEM":
            const filteredCart = state.cartItems.filter(item => item._id !== action.payload);

            return {
                ...state,
                cartItems: filteredCart
            }

        case "CLEAR_CART_ITEMS":
            return {
                ...state,
                cartItems: []
            }

        case "SET_ORDER_HISTORY":
            return {
                ...state,
                orderHistory: action.payload
            }
        case "SET_USER_ADDRESS":
            return {
                ...state,
                userAddress: action.payload
            }

        default:
            return state
    }
}

export default reducer;