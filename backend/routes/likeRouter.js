const express = require('express')
const router = express.Router()

const {getLikedRecipes} = require('../controllers/recipeControllers')
const authenticate = require('../middleware/authentication')

router.use(authenticate)
router.get('/liked-recipes',getLikedRecipes)

module.exports = router