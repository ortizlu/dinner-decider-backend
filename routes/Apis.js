const express = require('express')
const router = express.Router()
const axios = require('axios')

router.post('/yelp', (req,res) => {
  axios.get(`https://api.yelp.com/v3/businesses/search?term=${req.body.foodChoice}&latitude=${req.body.latitude}&longitude=${req.body.longitude}`, {
    headers: {
      "Authorization": "Bearer " + process.env.YELP_KEY
    }
  }).then(response => {
    res.json(response.data)
  })
})

module.exports = router
