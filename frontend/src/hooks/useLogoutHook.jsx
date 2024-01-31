import { useUserContext } from "./useUserHook"


export const UseLogout = () => {
    const {dispatch} = useUserContext()
    

    const logout = async() => {
        localStorage.removeItem('user')

        dispatch({type:'LOGOUT'})
      
        
    }

    return{logout}
}