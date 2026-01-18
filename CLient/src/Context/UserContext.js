import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "../Reducer/UserReducer";
import { getAuthToken, handleAuthError } from "../Helper/authHelper";

const UserContext = createContext();

const getCartItemsFromLocalStorage = () => {
    const cartItems = localStorage.getItem("cartItems");
    return cartItems ? JSON.parse(cartItems) : [];
}

const initialState = {
    user: JSON.parse(localStorage.getItem("userData")) || null,
    cartItems: getCartItemsFromLocalStorage(),
    orderHistory: [],
    userAddress: [],
    totalCartItems: 0,
    totalCartItemPrice: 0,
    deliveryCharge: 50,
}

const UserProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, initialState);

    const setUser = (user) => {
        dispatch({ type: "SET_USER", payload: user });
    }

    const clearUser = () => {
        dispatch({ type: "CLEAR_USER" });
    }

    const addToCart = (cartItems) => {
        dispatch({ type: "UPDATE_CART_ITEMS", payload: cartItems });
    }

    const incrementQuantity = (id) => {
        dispatch({ type: "INCREMENT_CART_ITEM_QUANTITY", payload: id })
    }

    const decrementQuantity = (id) => {
        dispatch({ type: "DECREMENT_CART_ITEM_QUANTITY", payload: id })
    }

    const removeItem = (id) => {
        dispatch({ type: "REMOVE_CART_ITEM", payload: id })
    }

    const clearCartItems = () => {
        dispatch({ type: "CLEAR_CART_ITEMS" })
    }

    const updateAddress = (address) => {
        dispatch({ type: "UPDATE_ADDRESS", payload: address })
    }

    const applyDiscount = (discount) => {
        dispatch({ type: "APPLY_DISCOUNT", payload: discount })
    }

    const fetchAllOrderHistory = async () => {
        const token = getAuthToken();
        if (!token) {
            console.log("No valid token found for fetching order history");
            return;
        }
        
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/getAllOrders`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "auth-token": token,
                    },
                }
            );
            
            // Handle authentication errors
            if (handleAuthError(response)) return;
            
            const data = await response.json();
            if (data.success !== false) {
                dispatch({ type: "SET_ORDER_HISTORY", payload: data.orders });
            }
        } catch (error) {
            console.log(error);
        }
    }

    const fetchAllAddress = async () => {
        const token = getAuthToken();
        if (!token) {
            console.log("No valid token found for fetching addresses");
            return;
        }
        
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/getAllAddress`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "auth-token": token,
                    },
                }
            );
            
            // Handle authentication errors
            if (handleAuthError(response)) return;
            
            const data = await response.json();
            dispatch({ type: "SET_USER_ADDRESS", payload: data.address });
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        dispatch({ type: "CART_TOTAL_ITEM_PRICE" });
    }, [state.cartItems]);

    // useEffect(() => {
    //     localStorage.getItem("userData", JSON.stringify(state.user)) ;
    // }, [])

    useEffect(() => {
        localStorage.setItem("userData", JSON.stringify(state.user));
    }, [state.user])

    // Fetch data only once when user logs in
    useEffect(() => {
        if (state.user) {
            fetchAllOrderHistory();
            fetchAllAddress();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.user?._id]); // Only re-fetch when user ID changes (login/logout)

    return (
        <UserContext.Provider value={{ ...state, setUser, clearUser, addToCart, incrementQuantity, decrementQuantity, clearCartItems, removeItem, updateAddress, applyDiscount }}>
            {children}
        </UserContext.Provider>
    )
}

const useUserContext = () => {
    return useContext(UserContext);
}

export { UserProvider, useUserContext }