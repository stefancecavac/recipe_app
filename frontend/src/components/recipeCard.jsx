

const RecipeCard = ({ recipe }) => {

    return (

        <div className="recipeCard">

            <img src="./foodStock.jpeg" alt="image"></img>


            <h3>{recipe.title}</h3>
            <div className="recipeCardDetails">

                <p>{recipe.mealType}</p>
                <p>{recipe.difficulty}</p>
            </div>

        </div>
    )
}

export default RecipeCard