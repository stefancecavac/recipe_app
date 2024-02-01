import { useEffect } from 'react'
import { useRecipeContext } from '../hooks/useRecipeHook'

import { useParams } from 'react-router-dom'

import { IoTimeOutline } from "react-icons/io5";
import { IoRestaurantOutline } from "react-icons/io5";
import { FaThumbsUp } from "react-icons/fa";
import { useUserContext } from '../hooks/useUserHook';

const RecipeDetail = () => {


    const { singleRecipe, dispatch } = useRecipeContext()
    const { recipeId } = useParams()
    const{user} = useUserContext()



    useEffect(() => {


        const fetchRecipe = async () => {
            const response = await fetch(`http://localhost:4000/api/recipes/${recipeId}`)
            const json = await response.json()

            if (response.ok) {
                dispatch({ type: 'SET_SINGLE_RECIPE', payload: json })

            }

        }

        
        fetchRecipe()
    }, [dispatch, recipeId,])

    const handleLike = async () => {
        try {
            const response = await fetch(`http://localhost:4000/api/recipes/${recipeId}/like`, { 
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                    'Content-Type': 'application/json',
                }
             });
             const json = await response.json()
            if (response.ok) {
               dispatch({type:'UPDATE_RECIPE' , payload:json})
               
            } else {
                console.error('Failed to like the recipe');
            }
        } catch (error) {
            console.error('Error liking the recipe:', error);
        }
    };

    return (
        <div className="recipeDetail">
             <button onClick={handleLike}><FaThumbsUp /> Like</button>
            {singleRecipe && singleRecipe.userid && (
                <div>{singleRecipe.userid.username}</div>
            )}
            {singleRecipe && (
                <>

                    <img src="../foodStock.jpeg" alt="image"></img>
                    <div className='details'>


                        <h2>{singleRecipe.title}</h2>

                        <span className='mealType'><IoRestaurantOutline></IoRestaurantOutline> {singleRecipe.mealType}</span>

                        <span className='cookingTime'><IoTimeOutline></IoTimeOutline> {singleRecipe.cookingTime} min</span>
                        <span className='difficulty'><p>difficulty:  {singleRecipe.difficulty}</p></span>
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