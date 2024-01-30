import { useUserContext } from "./useUserHook"
import {useRecipeContext} from './useRecipeHook'

export const UseLogout = () => {
    const {dispatch} = useUserContext()
    const {dispatch: recipeDispatch} = useRecipeContext()

    const logout = async() => {
        localStorage.removeItem('user')

        dispatch({type:'LOGOUT'})
        recipeDispatch({type: 'SET_RECIPES' , payload: null})
        
    }

    return{logout}
}