import { createContext, useReducer } from "react";
import { useEffect } from "react";

export const UserContext = createContext()

export const UserReducer = (state, action) => {
    switch(action.type){
        case 'LOGIN':
            return { ...state, user: action.payload }
        case 'LOGOUT':
            return { user: null }
       
        default:
            return state
    }
}

export const UserContextProvider = ({children}) => {
    const [state , dispatch] = useReducer(UserReducer, {
        user:null
    })
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'))

        if (user) {
            dispatch({ type: 'LOGIN', payload: user })
        }

    }, [])
  
    return(
        <UserContext.Provider value={{...state , dispatch}}>
            {children}
        </UserContext.Provider>
    )
}