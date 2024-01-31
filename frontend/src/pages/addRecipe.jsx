import { useState } from 'react';
import { useRecipeContext } from '../hooks/useRecipeHook';
import { useUserContext } from '../hooks/useUserHook';



const AddRecipe = () => {
    const { dispatch } = useRecipeContext()
    const { user } = useUserContext()



    const [error, setError] = useState(null);
    const [ok, setOk] = useState(null)

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



    return (
        <div className="addRecipe">
            <form onSubmit={postRecipe}>
                <div className="recipeinfo">
                    <h1>New recipe:</h1>
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
                </div>

                <div className="recipecontent">



                    <div className='midingridients'>
                        <p>Ingredients:</p>
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
                        <p>Instructions:</p>
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



                <div className="recipestatistics">

                    <label>Cooking Time:</label>
                    <input
                        type="number"
                        onChange={(e) => setCookingTime(e.target.value)}
                        value={cookingTime}
                    ></input>

                    <select
                        value={difficulty}
                        onChange={(e) => setDifficulty(e.target.value)}
                    >
                        <option value=''>select dish difficulty:</option>
                        {['easy', 'medium', 'hard'].map((difficulty) => (

                            <option key={difficulty} value={difficulty}>{difficulty}</option>
                        )
                        )}
                    </select>


                    <select
                        value={mealType}
                        onChange={(e) => setMealType(e.target.value)}
                    >
                        <option value=''>select Meal Type:</option>
                        {['snack', 'breakfast', 'lunch', 'dinner', 'desert'].map((mealType) => (

                            <option key={mealType} value={mealType}>{mealType}</option>
                        )
                        )}
                    </select>

                    <button type="submit">
                        Submit
                    </button>
                    {error && <div className='error'>{error}</div>}
                    {ok && <div className='ok'>{ok}</div>}
                </div>

            </form>


        </div>

    )
}

export default AddRecipe
