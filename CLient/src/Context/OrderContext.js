import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "../Reducer/OrderReducer";

const OrderContext = createContext();

const initialState = {
    orderDetails: {},
    totalAmount: 0,
    isLoading: false
}

const OrderProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const fetchOrder = async (id) => {
        dispatch({ type: "SET_LOADING" });
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/order/getOrder/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("token")
                }
            });

            const data = await response.json();
            dispatch({ type: "SET_ORDER_DETAILS", payload: data.orderDetails });
            setTimeout(() => {
                dispatch({ type: "UNSET_LOADING" });
            }, 2000);

        } catch (error) {
            console.log(error);
        }
    }

    const updateOrderStatus = async (id, status) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/order/updateOrderStatus/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ status })
            });
            const data = await response.json();
            if (data.success) {
                dispatch({ type: "UPDATE_ORDER_STATUS", payload: status });
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        dispatch({ type: "UPDATE_ORDER_STATUS", payload: state.orderDetails?.status });
    }, [state.orderDetails?.status]);

    return (
        <OrderContext.Provider value={{ ...state, fetchOrder, updateOrderStatus }}>
            {children}
        </OrderContext.Provider>
    )
}

const useOrderContext = () => {
    return useContext(OrderContext);
}

export { OrderProvider, useOrderContext };