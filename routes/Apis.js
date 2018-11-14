const express = require('express')
const router = express.Router()
const jwt = require('jwt-simple')
const passport = require('../config/passport')
const config = require('../config/config')
const User = require('../models/userModel.js')
const bcrypt = require('bcrypt-nodejs')
const jwtDecode = require('jwt-decode')
const axios = require('axios')

router.get('/yelp', (req,res) => {
  axios.get(`https://api.yelp.com/v3/businesses/search?term=chicken&latitude=38.855067&longitude=-77.10720859999999`, {
    headers: {
      "Authorization": "Bearer " + process.env.YELP_KEY
    }
  }).then(response => {
    res.json(response.data)
  })
})

module.exports = router
