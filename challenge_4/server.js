var express = require('express')
var App = express()
var bodyParser = require('body-parser')

App.use(bodyParser.json())
App.use(express.static("public"))

App.listen(8080, ()=> {
  console.log('App is listening on port 8080')
})
