import { useEffect } from 'react'
import { useRecipeContext } from '../hooks/useRecipeHook'
import {Link} from 'react-router-dom'

import RecipeCard from '../components/recipeCard'
import FilterCard from '../components/filterCard'


const Home = () => {
    const { recipes, dispatch } = useRecipeContext()


    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://localhost:4000/api/recipes')
            const json = await response.json()

            if (response.ok) {
                dispatch({ type: 'SET_RECIPES', payload: json })
            }

        }
        fetchData()
    }, [dispatch])
   
    return (
        <div className="home">
            <FilterCard></FilterCard>
            <div className="content">
                {recipes && recipes.map((recipe) => (
                    
                    <Link key={recipe._id} to={`/recipe-details/${recipe._id}`}>
                    <RecipeCard recipe={recipe}></RecipeCard>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Home