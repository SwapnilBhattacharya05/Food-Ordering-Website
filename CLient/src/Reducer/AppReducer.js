const AppReducer = (state, action) => {
    switch (action.type) {
        case "TOGGLE_MODE":
            return {
                ...state,
                mode: state.mode === "light-mode" ? "dark-mode" : "light-mode"
            };

        case "SET_LOADING_BAR":
            return {
                ...state,
                loadingProgress: 100
            };

        case "HIDE_LOADING_BAR":
            return {
                ...state,
                loadingProgress: 0
            };
        default:
            return state;
    }
};

export default AppReducer;