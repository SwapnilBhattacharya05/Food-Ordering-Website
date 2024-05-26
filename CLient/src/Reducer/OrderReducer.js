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
        case "SET_ORDER_DETAILS":
            return {
                ...state,
                orderDetails: action.payload
            }
        case "UPDATE_ORDER_STATUS":
            return {
                ...state,
                orderDetails: {
                    ...state.orderDetails,
                    status: action.payload
                }
            }
        default:
            return state
    }
}

export default reducer;