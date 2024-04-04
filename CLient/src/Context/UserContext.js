import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "../Reducer/UserReducer";

const UserContext = createContext();

const initialState = {
    user: JSON.parse(localStorage.getItem("userData")) || null
}
const UserProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, initialState);

    const setUser = (user) => {
        dispatch({ type: "SET_USER", payload: user });
    }

    const clearUser = () => {
        dispatch({ type: "CLEAR_USER" });
    }


    // useEffect(() => {
    //     localStorage.getItem("userData", JSON.stringify(state.user)) ;
    // }, [])

    useEffect(() => {
        localStorage.setItem("userData", JSON.stringify(state.user));
    }, [state.user])

    return (
        <UserContext.Provider value={{ ...state, setUser, clearUser }}>
            {children}
        </UserContext.Provider>
    )
}

const useUserContext = () => {
    return useContext(UserContext);
}

export { UserProvider, useUserContext }