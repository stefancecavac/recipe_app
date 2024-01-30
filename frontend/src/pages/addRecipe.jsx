import { useState } from 'react';
import { useRecipeContext } from '../hooks/useRecipeHook';
import { useUserContext } from '../hooks/useUserHook';



const AddRecipe = () => {
    const { dispatch } = useRecipeContext()
    const { user } = useUserContext()



    const [error, setError] = useState(null);
    const [ok, setOk] = useState(null)

    const [currentPage, setCurrentPage] = useState(1);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const [cookingTime, setCookingTime] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [mealType, setMealType] = useState('');
    const [ingredients, setIngredients] = useState([{ name: '', quantity: '' }]);
    const [instructions, setInstructions] = useState([{ step: 1, description: '' }]);



    const postRecipe = async (e) => {
        e.preventDefault()
        const response = await fetch('http://localhost:4000/api/recipes', {
            method: 'POST',
            body: JSON.stringify({ title, description, cookingTime, difficulty, mealType, ingredients, instructions }),
            headers: {
                'Authorization': `Bearer ${user.token}`,
                'Content-Type': 'application/json',
            },
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({ type: 'POST_RECIPE', payload: json })
            setOk('succesfully added')


        }
        else {
            setError(json.message);
            console.log(json.error)
        }

    }


    const handleIngredientChange = (index, property, value) => {
        const updatedIngredients = [...ingredients];
        updatedIngredients[index][property] = value;
        setIngredients(updatedIngredients);
    };

    const deleteIngredient = (index) => {
        const updatedIngredients = [...ingredients];
        updatedIngredients.splice(index, 1);
        setIngredients(updatedIngredients);
    }

    const handleInstructionChange = (index, property, value) => {
        const updatedInstructions = [...instructions];
        updatedInstructions[index][property] = value;
        setInstructions(updatedInstructions);
    };
    const deleteInstruction = (index) => {
        const updatedInstructions = [...instructions];
        updatedInstructions.splice(index, 1)
        setInstructions(updatedInstructions);
    }

    const addIngredient = () => {
        setIngredients([...ingredients, { name: '', quantity: '' }]);
    };

    const addInstruction = () => {
        setInstructions([...instructions, { step: instructions.length + 1, description: '' }]);
    };


    const nextPage = () => {
        setCurrentPage(currentPage + 1)
    }

    const prevPage = () => {
        setCurrentPage(currentPage - 1)
    }



    return (
        <div className="addRecipe">
            <form onSubmit={postRecipe}>
                {currentPage === 1 && (
                    <div className="recipeinfo">
                        <h1>New recipe - Page 1:</h1>
                        <label>Dish name:</label>
                        <input
                            type="text"
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                        ></input>

                        <label>Description:</label>
                        <textarea
                            type='text'
                            onChange={(e) => setDescription(e.target.value)}
                            value={description}
                        ></textarea>

                        <button type="button" onClick={nextPage}>
                            Next
                        </button>
                    </div>
                )}

                {currentPage === 2 && (
                    <div className="recipecontent">
                        <h1>New recipe - Page 2:</h1>

                        <div className='mid'>

                            <div className='midingridients'>
                                <h2>Ingredients:</h2>
                                <button type="button" onClick={addIngredient}>
                                    New Ingredient
                                </button>
                                {ingredients.map((ingredient, index) => (
                                    <div key={index}>
                                        <button type="button" onClick={() => deleteIngredient(index)}>
                                            -
                                        </button>

                                        <input
                                            type="text"
                                            placeholder="Name"
                                            value={ingredient.name}
                                            onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
                                        />
                                        <input
                                            type="number"
                                            placeholder="Quantity"
                                            value={ingredient.quantity}
                                            onChange={(e) => handleIngredientChange(index, 'quantity', e.target.value)}
                                        />
                                    </div>
                                ))}

                            </div>


                            <div className='midinstructions'>
                                <h2>Instructions:</h2>
                                <button type="button" onClick={addInstruction}>
                                    Add Instruction
                                </button>
                                {instructions.map((instruction, index) => (
                                    <div key={index}>
                                        <button type="button" onClick={() => deleteInstruction(index)}>
                                            -
                                        </button>
                                        <input
                                            type="text"
                                            placeholder={`Step ${instruction.step}`}
                                            value={instruction.description}
                                            onChange={(e) => handleInstructionChange(index, 'description', e.target.value)}
                                        />
                                    </div>
                                ))}


                            </div>
                        </div>

                        <div className='buttons'>

                            <button type="button" onClick={prevPage}>
                                Previous
                            </button>
                            <button type="button" onClick={nextPage}>
                                Next
                            </button>
                        </div>
                    </div>
                )}

                {currentPage === 3 && (
                    <div className="recipestatistics">
                        <h1>New recipe - Page 3:</h1>
                        <label>Cooking Time:</label>
                        <input
                            type="number"
                            onChange={(e) => setCookingTime(e.target.value)}
                            value={cookingTime}
                        ></input>

                        <label>Difficulty:</label>
                        <input
                            type="text"
                            onChange={(e) => setDifficulty(e.target.value)}
                            value={difficulty}
                        ></input>

                        <label>Meal Type:</label>
                        <input
                            type="text"
                            onChange={(e) => setMealType(e.target.value)}
                            value={mealType}
                        ></input>

                        <div className='buttons'>

                            <button type="button" onClick={prevPage}>
                                Previous
                            </button>
                            <button type="submit">
                                Submit
                            </button>

                        </div>
                    </div>
                )}
                {error && <div className='error'>{error}</div>}
                {ok && <div className='ok'>{ok}</div>}
            </form>


        </div>

    )
}

export default AddRecipe
