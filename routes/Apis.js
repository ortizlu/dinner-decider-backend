const express = require('express')
const router = express.Router()
const axios = require('axios')

// router.post('/yelp', (req,res) => {
//   axios.get(`https://api.yelp.com/v3/businesses/search?term=${req.body.foodChoice}${req.body.extension}`, {
//     headers: {
//       "Authorization": "Bearer UF9X78Hx3MO2nRpV1PwxRqI4SycN4GeruXlSfJAaPU_cFq-TEnQ1JbvV752RTn7eOP1HUYs6tm7Gm1thgJ1fGJz7TXkAgNdEQcM_xHsoYmTFGuMMt2sQhaDt1ODmW3Yx"
//     }
//   }).then(response => {
//     res.json(response.data)
//   })
// })

router.get('/yelp', (req,res) => {
  console.log(process.env.YELP_KEY)
  console.log(req.headers.foodchoice)
  console.log(req.headers.extension)
  axios.get(`https://api.yelp.com/v3/businesses/search?term=${req.headers.foodchoice}${req.headers.extension}`, {
    headers: {
      "Authorization": `Bearer ${process.env.YELP_KEY}`
    }
  }).then(response => {
    res.json(response.data)
  })
})

module.exports = router
