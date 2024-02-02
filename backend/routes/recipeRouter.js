const express = require('express')
const router = express.Router()

const {getRecipes , postRecipe , deleteRecipe ,getSingleRecipe ,getFilteredRecipe ,likeRecipe} = require('../controllers/recipeControllers')
const authenticate = require('../middleware/authentication')


router.get('/' , (req, res, next) => {
    const {mealType} = req.query

    if(mealType){
        getFilteredRecipe(req, res,next)
    }else{
        getRecipes(req,res,next)
    }
})


router.get('/:id' , getSingleRecipe)


router.use(authenticate)

router.post('/' , postRecipe)
router.delete('/:id' , deleteRecipe)
router.patch('/:id/like',likeRecipe)

module.exports = router