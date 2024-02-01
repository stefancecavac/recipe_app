

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

        <p>{recipe.likes.length}</p>
        </div>
    )
}



export default RecipeCard