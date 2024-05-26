import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "../Reducer/UserReducer";

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
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/getAllOrders`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "auth-token": localStorage.getItem("token"),
                    },
                }
            );
            const data = await response.json();
            dispatch({ type: "SET_ORDER_HISTORY", payload: data.orders });
        } catch (error) {
            console.log(error);
        }
    }

    const fetchAllAddress = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/getAllAddress`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "auth-token": localStorage.getItem("token"),
                    },
                }
            );
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

    useEffect(() => {
        fetchAllOrderHistory();
    }, [state.orderHistory]);

    useEffect(() => {
        fetchAllAddress();
    }, [state.userAddress]);

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