const Recipe = require('../models/recipeModel')
const mongoose = require('mongoose')

const getRecipes = async(req , res) => {

    try{
        
        const recipe = await Recipe.find({})
        res.status(200).json(recipe)
    }
    catch(error){
        res.status(500).json({error: error.message})
    }
}

const getSingleRecipe = async(req , res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error: 'not a valid id'})
    }
    try{
        const recipe = await Recipe.findOne({_id : id}).populate('userid' , 'username')
        if(!recipe){
            return res.status(400).json({error: 'no such recipe'}) 
        }
        res.status(200).json(recipe)
    }
    catch(error){
        res.status(500).json({error: error.message})
    }
}

const getFilteredRecipe = async(req , res) => {
    const {mealType ,difficulty} = req.query

    const filter = {}

    if(mealType){
        filter.mealType = mealType
    }
    if(difficulty){
        filter.difficulty = difficulty
    }

    try{
        const recipe = await Recipe.find(filter)
        res.status(200).json(recipe)
    }
    catch(error){
        res.status(500).json({error: error.message})
    }
}

const postRecipe = async(req, res) => {
        const {title ,description ,ingredients ,instructions ,cookingTime ,difficulty ,mealType ,rating} = req.body

        if(!title || !description ||!ingredients ||!instructions ||!cookingTime ||!difficulty ||!mealType ){
            return res.status(400).json({message: 'please fill out all fields'})
        }
        try{
            const userid = req.user._id
            const recipe = await Recipe.create({
                title ,
                description ,
                ingredients ,
                instructions ,
                cookingTime ,
                difficulty ,
                mealType,
                rating,
                userid
            })
            
            res.status(201).json(recipe)

        }
        catch(error){
            res.status(500).json({error: error.message})
        }
}


const deleteRecipe = async(req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error: 'not a valid id'})
    }
    
    try{
        const recipe = await Recipe.findOneAndDelete({_id : id})

        if(!recipe){
            return res.status(400).json({error: 'recipe doesnt exist'})
        }
        res.status(201).json(recipe)
    }
    catch(error){
        res.status(500).json({error: error.message})
    }
} 

const likeRecipe = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Not a valid id' });
    }
    try {
        const userid = req.user._id;
        const query = { _id: id };
        const update = {};
        
        const recipe = await Recipe.findOne(query);

        if (!recipe) {
            return res.status(400).json({ error: 'No such recipe' });
        }

        if (recipe.likes.includes(userid)) {

            update.$pull = { likes: userid };
        } else {

            update.$addToSet = { likes: userid };
        }

        const options = { new: true }; 

        const updatedRecipe = await Recipe.findOneAndUpdate(query, update, options);

        res.status(200).json(updatedRecipe);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const getLikedRecipes = async (req, res) => {
    const userid = req.user._id;
    try {
     
        if (!mongoose.Types.ObjectId.isValid(userid)) {
            return res.status(400).json({ error: 'Invalid user id' });
        }

        const recipe = await Recipe.find({ likes: userid });

        res.status(200).json(recipe);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = {getRecipes ,postRecipe ,deleteRecipe ,getSingleRecipe ,getFilteredRecipe,likeRecipe ,getLikedRecipes}