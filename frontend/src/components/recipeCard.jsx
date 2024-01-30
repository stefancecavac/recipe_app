

const RecipeCard = ({ recipe }) => {

    return (

        <div className="recipeCard">
            <div className="recipeCardImage">

            <img src="./foodStock.jpeg" alt="image"></img>
            </div>


            <h3>{recipe.title}</h3>
            <div className="recipeCardDetails">

                <p>{recipe.mealType}</p>
                <p>{recipe.difficulty}</p>
            </div>

        </div>
    )
}

export default RecipeCard