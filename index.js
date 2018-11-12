const express = require('express')
const parser = require('body-parser')
const app = express()
// require('dotenv').config()
const cors = require('cors')
const UsersRoutes = require('./routes/Users')
const passport = require('./config/passport')()

app.set('port', process.env.PORT || 3001)
app.use(parser.json())
app.use(cors())

//PASSPORT STUFF
require('./config/passport')(passport)
app.use(passport.initialize())

app.use(function(req, res, next) {
  res.locals.currentUser = req.user
  next()
})

app.use('/users', UsersRoutes)

app.listen(app.get('port'), () => {
  console.log('Server listening on port ' + app.get('port'))
})
