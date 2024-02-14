import { useEffect } from 'react'
import { useRecipeContext } from '../hooks/useRecipeHook'

import { useParams } from 'react-router-dom'

import { IoTimeOutline } from "react-icons/io5";
import { IoRestaurantOutline } from "react-icons/io5";

import { useUserContext } from '../hooks/useUserHook';

import { FaHeart } from "react-icons/fa6";


const RecipeDetail = () => {


    const { singleRecipe, dispatch } = useRecipeContext()
    const { recipeId } = useParams()
    const { user } = useUserContext()



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

                dispatch({ type: 'UPDATE_RECIPE', payload: json })

            } else {
                console.error('Failed to like the recipe');
            }
        } catch (error) {
            console.error('Error liking the recipe:', error);
        }
    };

    return (
        <div className="recipeDetail">

            {singleRecipe && (
                <>

                    <div className='details'>

                        <div className='titleDetails'>
                            <div className='title'>
                                <h2>{singleRecipe.title}</h2>
                            </div>
                            <div className='titleDetailsMisc'>
                                <p>Like recipe:</p>
                                {user && <span className='like' onClick={handleLike} style={{ color: singleRecipe.likes.includes(user._id) ? 'red' : 'white' }}><FaHeart></FaHeart></span>}

                                <div className='mealType'><IoRestaurantOutline></IoRestaurantOutline>  <p>{singleRecipe.mealType}</p></div>
                                <div className='cookingTime'><IoTimeOutline></IoTimeOutline>  <p>{singleRecipe.cookingTime} min</p></div>
                                <div className='difficulty'><p>difficulty:  {singleRecipe.difficulty}</p></div>
                            </div>



                        </div>

                        <div className='image'>
                            <img src="../foodStock.jpeg" alt="image"></img>
                            <p>{singleRecipe.description}</p>
                        </div>
                    </div>


                    <div className='mainContent'>

                        <div className='ingridients'>
                            <h2>Ingridients:</h2>
                            {singleRecipe.ingredients.map((ingredient) => (
                                <div key={ingredient._id}>
                                    <p>name: {ingredient.name}</p>
                                    <p>qt: {ingredient.quantity}</p>
                                </div>
                            ))}
                        </div>

                        <div className='instructions'>
                            <h2>Instructions:</h2>
                            {singleRecipe.instructions.map((instruction) => (
                                <div key={instruction._id}>
                                    <p>step: {instruction.step}</p>
                                    <p>description: {instruction.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                </>
            )}
        </div>
    )
}

export default RecipeDetail