const express = require('express')
const router = express.Router()

const {getRecipes , postRecipe , deleteRecipe ,getSingleRecipe ,getFilteredRecipe ,likeRecipe ,getLikedRecipes} = require('../controllers/recipeControllers')
const authenticate = require('../middleware/authentication')

router.get('/' , (req, res, next) => {
    const {mealType ,difficulty} = req.query

    if(mealType || difficulty){
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