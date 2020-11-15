const express = require('express')
const app = express();
const port = 8080
const bodyParser = require('body-parser')

app.use(express.urlencoded({ extended: true }))
app.get('/', (req, res) => {
  console.log('Get request received')
  console.log(req.body["JSON"])
  res.send('Hello World!')
})
app.post('/', (req, res) => {
  console.log('Post Request Received', req.body["JSON"])
  //Convert to CSV and send back
  res.send('Success')
})

app.listen(port, () => {
  console.log(`CSV Generator is listening on port ${port}`)
})


