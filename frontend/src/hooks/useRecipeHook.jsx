import { useContext } from "react"
import { RecipeContext } from '../context/recipeContext'


export const useRecipeContext = () => {
    const context = useContext(RecipeContext)

    if(!context){
        throw Error('useRecipeContext must be used inside a recipeContextProvider')
    }
    return context
}
