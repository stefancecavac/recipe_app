const express = require('express')
const router = express.Router()

const {getRecipes , postRecipe , deleteRecipe} = require('../controllers/recipeControllers')

router.get('/' , getRecipes)
router.post('/' , postRecipe)
router.delete('/:id' , deleteRecipe)


module.exports = router