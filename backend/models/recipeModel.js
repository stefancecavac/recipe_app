const mongoose = require('mongoose')
const Schema = mongoose.Schema

const recipeSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  ingredients: [
    {
      name: {
        type: String,
        required: true
      },
      quantity: {
        type: Number, 
        required: true
      },
    },
  ],
  instructions: [
    {
      step: {
        type: Number,
        required: true
      },
      description: {
        type: String,
        required: true
      },
    },
  ],

  cookingTime: {
    type: Number, 
    required: true
  },
  difficulty: {
    type:String,
    enum: ['easy' , 'medium' , 'hard'],
    required: true
  },
  mealType: {
    type: String,
    enum:['breakfast' ,"lunch" , "dinner" , "snack" , "desert"],
    required: true
  },
  

} , {timestamps : true});


module.exports = mongoose.model('Recipe' , recipeSchema)

