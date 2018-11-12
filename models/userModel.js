const mongoose = require('../db/connection.js')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')

const User = new mongoose.Schema({
  username: String,
  password: String,
  food1: String,
  food2: String,
  food3: String,
  food4: String,
  food5: String,
  food6: String
})

User.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password)
}

module.exports = mongoose.model('User', User)
