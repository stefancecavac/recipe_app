const express = require('express')
const router = express.Router()

const {getRecipes , postRecipe , deleteRecipe ,getSingleRecipe} = require('../controllers/recipeControllers')
const authenticate = require('../middleware/authentication')


router.get('/' , getRecipes)
router.get('/:id' , getSingleRecipe)



router.use(authenticate)
router.post('/' , postRecipe)
router.delete('/:id' , deleteRecipe)


module.exports = router