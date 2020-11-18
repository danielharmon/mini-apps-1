const express = require('express')
const app = express();
const port = 8080
const path = require('path')
const multer = require('multer')
var upload = multer()



var CSVReportGenerator = function(Obj) {
  var headers = [];
  var values = [];
  var recurser = function (object) {
    var line = []
    Object.keys(object).forEach(key => {

      if (key != 'children') {
        if (!headers.includes(key)) {
          headers.push(key);
        }
        line.push(object[key]);
      } else if (key === 'children') {
        values.push(line)
        object.children.forEach(child => {
          recurser(child);
        });
      }
    })
  }
  recurser(Obj);
  return headers.join(',') + '\n' + values.join('\n');
}
app.set('view engine', 'ejs');
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", '*')
  next()
})
app.get('/', (req, res) => {
  res.render('index')
})
app.post('/uploads', upload.single('JSON'), (req, res) => {
  console.log('💾', req.file)
  res.send(CSVReportGenerator(JSON.parse(req.file.buffer.toString())));
})
app.listen(port, () => {
  console.log(`CSV Generator is listening on port ${port}`)
})


