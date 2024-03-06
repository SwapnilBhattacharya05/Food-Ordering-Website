import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "../Reducer/AppReducer.js";
import { useLocation } from "react-router-dom";

const AppContext = createContext();

const getModeFromLocalStorage = () => {
    const mode = localStorage.getItem("mode");
    return mode ? mode : "light-mode";
}

const initialState = {
    mode: getModeFromLocalStorage(),
    loading: false,
    loadingProgress: 10,
};

const AppProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, initialState);
    const location = useLocation();

    const toggleMode = () => {
        dispatch({ type: "TOGGLE_MODE" });
    }

    const showLoadingBar = () => {
        dispatch({ type: "SET_LOADING_BAR" });
    }

    //toggle top=loading bar
    useEffect(() => {
        showLoadingBar();
        return () => {
            setTimeout(() => {
                dispatch({ type: "HIDE_LOADING_BAR" });
            }, 2000);
        }

    }, [location.pathname])

    //change mode
    useEffect(() => {
        document.body.className = state.mode;
        localStorage.setItem("mode", state.mode);
    }, [state.mode]);

    return <AppContext.Provider value={{ ...state, toggleMode }}>
        {children}
    </AppContext.Provider>

}

const useAppContext = () => {
    return useContext(AppContext);
}

export { AppProvider, useAppContext };