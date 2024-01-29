import { useEffect } from 'react'
import { useRecipeContext } from '../hooks/useRecipeHook'
import { useParams } from 'react-router-dom'



const RecipeDetail = () => {
    const { singleRecipe, dispatch } = useRecipeContext()
    const { recipeId } = useParams()

    useEffect(() => {

        const fetchRecipe = async () => {
            const response = await fetch(`http://localhost:4000/api/recipes/${recipeId}`)
            const json = await response.json()

            if (response.ok) {
                dispatch({ type: 'SET_SINGLE_RECIPE', payload: json })

            }

        }
        fetchRecipe()
    }, [dispatch, singleRecipe, recipeId])


    return (
        <div className="recipeDetail">
            {singleRecipe && (
                <>
                    <img src="../foodStock.jpeg" alt="image"></img>
                    <div className='details'>

                    
                        <h2>{singleRecipe.title}</h2>

                        <p>{singleRecipe.mealType}</p>
                        <p>cooking time: {singleRecipe.cookingTime}</p>
                        <p>difficulty: {singleRecipe.difficulty}</p>
                    </div>

                    <div className='description'>Description:
                        <p>{singleRecipe.description}</p>
                    </div>

                    <div className='ingridients'>
                        ingridients:
                        {singleRecipe.ingredients.map((ingredient) => (
                            <div key={ingredient._id}>
                                <p>name:  &#x2022;{ingredient.name}</p>
                                <p>qt: {ingredient.quantity}</p>
                            </div>
                        ))}
                    </div>

                    <div className='instructions'>
                        instructions:
                        {singleRecipe.instructions.map((instruction) => (
                            <div key={instruction._id}>
                                <p>step: {instruction.step}</p>
                                <p>description: {instruction.description}</p>
                            </div>
                        ))}
                    </div>



                </>
            )}
        </div>
    )
}

export default RecipeDetail