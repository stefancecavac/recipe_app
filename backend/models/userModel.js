const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
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

userSchema.statics.Register = async function (email, password) {
  if (!email || !password) {
    throw Error('Please fill out all fields')
  }
  if (!validator.isEmail(email)) {
    throw  Error('Not a valid email')
  }
  if (!validator.isStrongPassword(password)) {
    throw  Error('Not a strong password')
  }

  const exist = await this.findOne({ email })
  if (exist) {
    throw new Error('Email already exists')
  }

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)

  const user = await this.create({ email, password: hash })

  return user;
};

userSchema.statics.Login = async function (email, password) {
  if (!email || !password) {
    throw  Error('Please fill out all fields')
  }

  const user = await this.findOne({ email })
  if (!user) {
    throw  Error('Incorrect email')
  }

  const compare = await bcrypt.compare(password, user.password)

  if (!compare) {
    throw  Error('Incorrect password')
  }

  return user;
};

module.exports = mongoose.model('User', userSchema)
