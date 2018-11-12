const express = require('express')
const router = express.Router()
const jwt = require('jwt-simple')
const passport = require('../config/passport')
const config = require('../config/config')
const User = require('../models/userModel.js')
const bcrypt = require('bcrypt-nodejs')
const jwtDecode = require('jwt-decode')

//FINDING ALL USERS
router.get('/', (req, res) => {
  User.find()
    .then(users => {
      res.json(users)
    })
    .catch(err => {
      console.log(err)
    })
})

// //USER SIGNUP
router.post('/signup', (req, res) => {
  if (req.body.username && req.body.password) {
    let newUser = {
      username: req.body.username,
      password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8), null),
      food1: req.body.food1,
      food2: req.body.food2,
      food3: req.body.food3,
      food4: req.body.food4,
      food5: req.body.food5,
      food6: req.body.food6,
    }
    User.findOne({ username: req.body.username }).then(user => {
      if (!user) {
        User.create(newUser).then(user => {
          if (user) {
            let payload = {
              id: user.id,
              username: user.username,
              food1: user.food1,
              food2: user.food2,
              food3: user.food3,
              food4: user.food4,
              food5: user.food5,
              food6: user.food6,
            }
            let token = jwt.encode(payload, config.jwtSecret)
            res.json({
              token: token
            })
          } else {
            res.sendStatus(401)
          }
        })
      } else {
        res.sendStatus(401)
      }
    })
  } else {
    res.sendStatus(401)
  }
})

//USER LOGIN
router.post('/login', (req, res) => {
  if (req.body.username && req.body.password) {
    User.findOne({ username: req.body.username }).then(user => {
      if (user) {
        if (user.validPassword(req.body.password)) {
          var payload = {
            id: user.id,
            username: user.username,
            food1: user.food1,
            food2: user.food2,
            food3: user.food3,
            food4: user.food4,
            food5: user.food5,
            food6: user.food6,
          }
          var token = jwt.encode(payload, config.jwtSecret)
          res.json({
            token: token
          })
        } else {
          res.sendStatus(401)
        }
      } else {
        res.sendStatus(401)
      }
    })
  } else {
    res.sendStatus(401)
  }
})

//GETTING ONE USER AND DISPLAYING IT
router.get('/:id', (req, res) => {
  if (jwtDecode(req.headers.authorization).id === req.params.id) {
    User.findOne({ _id: req.params.id })
      .then(foundUser => {
        res.json(foundUser)
      })
      .catch(err => {
        console.log(err)
      })
  } else {
    res.sendStatus(401)
  }
})

//GETTING ONE USER AND UPDATING IT
router.put('/:id', (req, res) => {
  if (jwtDecode(req.headers.authorization).id === req.params.id) {
    User.findOneAndUpdate(
      { _id: req.params.id },
      {
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8)),
        food1: user.food1,
        food2: user.food2,
        food3: user.food3,
        food4: user.food4,
        food5: user.food5,
        food6: user.food6,
      }
    )
      .then(updatedUser => {
        res.json(updatedUser)
      })
      .catch(err => {
        console.log(err)
      })
  } else {
    res.sendStatus(401)
  }
})

//GETTING ONE USER AND DELETING IT
router.delete('/:id', (req, res) => {
  if (jwtDecode(req.headers.authorization).id === req.params.id) {
    savedLocations
      .find({ author: req.params.id })
      .remove()
      .then(_ => {
        User.findOneAndDelete({ _id: req.params.id })
          .then(deletedUser => {
            res.json(deletedUser)
          })
          .catch(err => {
            console.log(err)
          })
      })
  } else {
    res.sendStatus(401)
  }
})

module.exports = router
