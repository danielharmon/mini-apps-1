var express = require('express')
var App = express();

App.use(express.static('./public/index.html'))

App.listen(1111, function() {
  console.log('App is listening on port 1111')
})

