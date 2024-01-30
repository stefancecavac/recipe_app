const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
    return jwt.sign({ _id: _id }, process.env.SECRET, { expiresIn: '3d' })
}

const loginUser = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.Login(email, password)
        const token = createToken(user._id)
        res.status(200).json({...user.toObject(), token})
    } catch (error) {
        
        res.status(500).json({error: error.message})
    }
}

const registerUser = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.Register(email, password)
        const token = createToken(user._id)
        res.status(200).json({ user ,token})
    } catch (error) {
        
        res.status(500).json({error: error.message})
    }
}

module.exports = { loginUser, registerUser };
