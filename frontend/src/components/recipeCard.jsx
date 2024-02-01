

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

            {recipe.rating ? (<p>{recipe.rating}</p>) : (<p>no rating yet</p>)}

        </div>
    )
}



export default RecipeCard