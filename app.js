var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var sqlite3    = require('sqlite3')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var port = process.env.PORT || 3000;
var router = express.Router();

app.get('/', function(req, res) {
  var db = new sqlite3.Database('sample.db');
  db.serialize(function() {
    db.all('SELECT id,name FROM USER', function(err, rows) {
        res.json(rows);
    });
  });
  db.close();
});
app.listen(port);
console.log("起動");
