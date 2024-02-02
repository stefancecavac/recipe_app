import {useEffect, useState} from 'react'
import { useUserContext } from '../hooks/useUserHook'
import { useRecipeContext } from '../hooks/useRecipeHook'

import { Link } from 'react-router-dom'
import RecipeCard from '../components/recipeCard'


const LikedRecipes = () => {

    const {recipes , dispatch} = useRecipeContext()
    const {user} = useUserContext()

    const [loading , setLoading] = useState(true)
    useEffect(() => {
       
        const fetchData = async () => {
            const response = await fetch(`http://localhost:4000/api/likes/liked-recipes`, {
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                }
            })
            const json = await response.json()
            
            if (response.ok) {
                setLoading(false)
                dispatch({ type: 'SET_RECIPES', payload: json })
            }

        }
        fetchData()
    }, [dispatch,user.token])

    return(

        <div className="home">
            <h2>Liked Recipes:</h2>
        <div className="content">
        {loading ? (
            <p>loading...</p>
        ):(

        recipes && recipes.map((recipe) => (

            <Link key={recipe._id} to={`/recipe-details/${recipe._id}`}>
                <RecipeCard recipe={recipe}></RecipeCard>
            </Link>
        ))
        )}
    </div>
    </div>
    )
}

export default LikedRecipes