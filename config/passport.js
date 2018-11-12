const passport = require('passport')
const passportJWT = require('passport-jwt')
const ExtractJwt = passportJWT.ExtractJwt
const Strategy = passportJWT.Strategy
const config = require('./config')

const User = require('../models/userModel')

const params = {
  secretOrKey: config.jwtSecret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}

module.exports = function() {
  let strategy = new Strategy(params, (payload, callback) => {
    let user = User.findById(payload.id) || null
    if (user) {
      return callback(null, { id: user.id })
    } else {
      return callback(new Error('User not found'), null)
    }
  })

  passport.use(strategy)

  return {
    initialize: function() {
      return passport.initialize()
    },
    authenticate: function() {
      return passport.authenticate('jwt', { session: false })
    }
  }
}
// module.exports = function(passport) {
//   passport.serializeUser(function(user, callback) {
//     callback(null, user.id)
//   })

//   passport.deserializeUser(function(id, callback) {
//     User.findById(id, function(err, user) {
//       callback(err, user)
//     })
//   })

//   passport.use(
//     'local-signup',
//     new LocalStrategy(
//       {
//         usernameField: 'username',
//         passwordField: 'password',
//         passReqToCallback: true
//       },
//       function(req, username, password, callback) {
//         // check to see if this username is taken
//         User.findOne({ username: username }, function(err, user) {
//           if (err) return callback(err)
//           // if the user is already taken, send them a flash message
//           if (user) {
//             return callback(null, false)
//           }
//           // if the username is not taken, create a new user
//           else {
//             const newUser = new User()
//             newUser.username = username
//             newUser.password = newUser.encrypt(password)

//             newUser.save(function(err) {
//               if (err) throw err
//               return callback(null, newUser)
//             })
//           }
//         })
//       }
//     )
//   )

//   passport.use(
//     'local-login',
//     new LocalStrategy(
//       {
//         usernameField: 'username',
//         passwordField: 'password',
//         passReqToCallback: true
//       },
//       function(req, username, password, callback) {
//         // search for a user with this email
//         User.findOne({ username: username }, function(err, user) {
//           if (err) {
//             return callback(err)
//           }
//           // if the user does not exist in DB, return an error
//           if (!user) {
//             return callback(null, false)
//           }
//           // check password against saved password
//           if (!user.validPassword(password)) {
//             return callback(null, false)
//           }
//           // pass user into callback
//           return callback(null, user)
//         })
//       }
//     )
//   )
// }
