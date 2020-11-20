const express = require('express')
const App = express()

App.use(express.static('public'))
const port = 4568
App.listen(port, function(){
  console.log(`Server is listening on port ${port}`)
})