const express = require('express')
const router = express.Router()

const {getRecipes , postRecipe , deleteRecipe ,getSingleRecipe} = require('../controllers/recipeControllers')

router.get('/' , getRecipes)
router.get('/:id' , getSingleRecipe)

router.post('/' , postRecipe)
router.delete('/:id' , deleteRecipe)


module.exports = router