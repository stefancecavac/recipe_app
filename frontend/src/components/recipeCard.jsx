import { FaHeart } from "react-icons/fa6";

const RecipeCard = ({ recipe }) => {

    return (

        <div className="recipeCard">
            <div className="recipeCardImage">
                <img src="./foodStock.jpeg" alt="image"></img>
            </div>

            <div className="recipeCardDetails">
                <h3>{recipe.title}</h3>
                <p>{recipe.mealType}</p>
                <p>{recipe.difficulty}</p>
            </div>

            <div className="recipeCardLikes">
                {recipe.likes.length > 0 ? (
                    <>
                        <FaHeart /> 
                        <p>{recipe.likes.length} likes</p>
                    </>
                ) : (
                    <p>no likes yet</p>
                )}
            </div>
        </div>
    )
}



export default RecipeCard