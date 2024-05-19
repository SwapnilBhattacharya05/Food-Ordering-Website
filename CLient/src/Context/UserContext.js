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
    totalCartItems: 0,
    totalCartItemPrice: 0
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

    const clearCartItems = () => {
        dispatch({ type: "CLEAR_CART_ITEMS" })
    }

    useEffect(() => {
        dispatch({ type: "CART_TOTAL_ITEM_PRICE" });
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    }, [state.cartItems]);

    // useEffect(() => {
    //     localStorage.getItem("userData", JSON.stringify(state.user)) ;
    // }, [])

    useEffect(() => {
        localStorage.setItem("userData", JSON.stringify(state.user));
    }, [state.user])

    return (
        <UserContext.Provider value={{ ...state, setUser, clearUser, addToCart, incrementQuantity, decrementQuantity, clearCartItems }}>
            {children}
        </UserContext.Provider>
    )
}

const useUserContext = () => {
    return useContext(UserContext);
}

export { UserProvider, useUserContext }