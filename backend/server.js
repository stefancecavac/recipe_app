require('dotenv').config()

const express = require('express')
const app = express()

const cors = require('cors')
const mongoose = require('mongoose')

const recipeRouter = require('./routes/recipeRouter')

const userRouter = require('./routes/userRouter')

app.use(cors())
app.use(express.json())

app.use('/api/recipes',recipeRouter )
app.use('/api/user',userRouter )




mongoose.connect(process.env.DB_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`db connected and server has started on port: ${process.env.PORT}`)
        })
    })
    .catch((error) => {
        console.log(error)
    })