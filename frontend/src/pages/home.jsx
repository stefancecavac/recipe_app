import { useEffect, useState } from 'react'
import { useRecipeContext } from '../hooks/useRecipeHook'
import { Link } from 'react-router-dom'

import RecipeCard from '../components/recipeCard'
import FilterCard from '../components/filterCard'
import { useUserContext } from '../hooks/useUserHook'




const Home = () => {
    const { recipes, dispatch } = useRecipeContext()
    const { user } = useUserContext()

    const [loading , setLoading] = useState(true)

    const[mealType, setMealType] = useState('')

    useEffect(() => {
        setLoading(true)
        const fetchData = async () => {
            const response = await fetch(`http://localhost:4000/api/recipes?mealType=${mealType}`, {
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
    }, [dispatch ,mealType,user.token ,user])

    const handleMealType = (selectedCategory) => {
        setMealType(selectedCategory);
    };

    
    return (
        <div className="home">

            <div className='homeheader'>
                <h1>Welcome to Recipepe</h1>
                <input type='text' placeholder='e.g. soup'></input>
                {!user && (<Link to='/login'>login</Link>)}
            </div>
        
            
               
                
            

            <FilterCard onFilter={handleMealType}></FilterCard>
            <p>found total: {recipes ? recipes.length : 0} recipes </p>
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

export default Home