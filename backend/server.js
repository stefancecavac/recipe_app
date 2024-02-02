require('dotenv').config()

const express = require('express')
const app = express()

const cors = require('cors')
const mongoose = require('mongoose')

const recipeRouter = require('./routes/recipeRouter')

const userRouter = require('./routes/userRouter')

const likeRouter = require('./routes/likeRouter')

app.use(cors())
app.use(express.json())

app.use('/api/recipes',recipeRouter )
app.use('/api/user',userRouter )
app.use('/api/likes' ,likeRouter)



mongoose.connect(process.env.DB_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`db connected and server has started on port: ${process.env.PORT}`)
        })
    })
    .catch((error) => {
        console.log(error)
    })