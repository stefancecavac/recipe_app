const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
  username: {
    type:String,
    required:true,
    unique:true
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.statics.Register = async function (username ,email, password ) {
  if (!email || !password || !username) {
    throw Error('Please fill out all fields')
  }
  if (!validator.isEmail(email)) {
    throw  Error('Not a valid email')
  }
  if (!validator.isStrongPassword(password)) {
    throw  Error('Not a strong password')
  }

  const existEmail = await this.findOne({ email })
  if (existEmail) {
    throw  Error('Email already exists')
  }

  const existUsername = await this.findOne({ username })
  if (existUsername) {
    throw  Error('username already exists')
  }

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)

  const user = await this.create({username, email, password: hash })

  return user;
};

userSchema.statics.Login = async function (email, password) {
  if (!email || !password) {
    throw Error('Please fill out all fields')
  }

  const user = await this.findOne({ email })
  if (!user) {
    throw Error('Incorrect email')
  }

  const compare = await bcrypt.compare(password, user.password)

  if (!compare) {
    throw Error('Incorrect password')
  }

  return user;
};

module.exports = mongoose.model('User', userSchema)
