const User = require('../models/userModel')

User.find({}).remove(() => {
    let juan = User.create({
      username: 'juan',
      password: 'password',
      food1: 'chinese',
      food2: 'pupusas',
      food3: 'italian',
      food4: 'pizza',
      food5: 'steak',
      food6: 'indian'
    }).then(() => {
        user.save(err => console.log(err))
      })
    })
    