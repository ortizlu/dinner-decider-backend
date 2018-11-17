const express = require('express')
const router = express.Router()
const axios = require('axios')

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

router.post('/yelp', (req,res, next) => {
  axios.get(`https://api.yelp.com/v3/businesses/search?term=${req.body.foodChoice}${req.body.extension}`, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Authorization": "Bearer " + process.env.YELP_KEY
    }
  }).then(response => {
    res.json(response.data)
  })
})

module.exports = router
