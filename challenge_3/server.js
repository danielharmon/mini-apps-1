var express = require('express')
var bodyParser = require('body-parser')
var db = require('./db/index.js')
var App = express();

App.use(bodyParser.json())
App.use(express.static('public'))

App.post('/formdata', (req, res) => {
  console.log('/formdata received', req.body)
  db.save(req.body)
  .then(res.status(200).end())

})



App.listen(1111, function() {
  console.log('App is listening on port 1111')
})

