const express = require('express')
const app = express();
const port = 8080
const path = require('path')



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
app.use(express.urlencoded({ extended: true }));
app.get('/', (req, res) => {
  res.render('index')
})
app.post('/', (req, res) => {
  var values = JSON.parse(req.body["JSON"])
  res.render('index', {data: CSVReportGenerator(values)})

})

app.listen(port, () => {
  console.log(`CSV Generator is listening on port ${port}`)
})


