import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "../Reducer/OrderReducer";
import { getAuthToken } from "../Helper/authHelper";

const OrderContext = createContext();

const initialState = {
    orderDetails: [],
    totalAmount: 0,
    isLoading: false,
    eventSource: null
}

const OrderProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const fetchOrder = async (id) => {
        dispatch({ type: "SET_LOADING" });
        const token = getAuthToken();
        if (!token) {
            console.log("No valid token found for fetching order");
            dispatch({ type: "UNSET_LOADING" });
            return;
        }
        
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/order/getOrder/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": token
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
        console.log(id, status);
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

    // Connect to SSE for real-time order status updates
    const connectToOrderStatusStream = (orderId) => {

        // Close existing connection if any
        if (state.eventSource) {
            state.eventSource.close();
        }

        const eventSource = new EventSource(`${process.env.REACT_APP_BACKEND_URL}/api/order/streamOrderStatus/${orderId}`);

        eventSource.onopen = () => {
            console.log('SSE connection established');
        };

        eventSource.onmessage = (event) => {
            console.log('SSE message received:', event.data);
            try {
                const data = JSON.parse(event.data);
                console.log('Parsed SSE data:', data);
                if (data.status) {
                    console.log('Updating order status to:', data.status);
                    dispatch({ type: "UPDATE_ORDER_STATUS", payload: data.status });
                }
            } catch (error) {
                console.error("Error parsing SSE data:", error);
            }
        };

        eventSource.onerror = (error) => {
            console.error("SSE connection error:", error);
            console.error("EventSource readyState:", eventSource.readyState);
            if (eventSource.readyState === EventSource.CLOSED) {
                console.log('SSE connection closed');
            }
        };

        dispatch({ type: "SET_EVENT_SOURCE", payload: eventSource });

        return eventSource;
    }

    // Disconnect from SSE stream
    const disconnectFromOrderStatusStream = () => {
        if (state.eventSource) {
            state.eventSource.close();
            dispatch({ type: "SET_EVENT_SOURCE", payload: null });
        }
    }

    useEffect(() => {
        dispatch({ type: "UPDATE_ORDER_STATUS", payload: state.orderDetails?.status });
    }, [state.orderDetails?.status]);

    return (
        <OrderContext.Provider value={{ ...state, fetchOrder, updateOrderStatus, connectToOrderStatusStream, disconnectFromOrderStatusStream }}>
            {children}
        </OrderContext.Provider>
    )
}

const useOrderContext = () => {
    return useContext(OrderContext);
}

export { OrderProvider, useOrderContext };