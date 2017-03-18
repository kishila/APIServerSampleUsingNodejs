var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var sqlite3    = require('sqlite3')


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var port = process.env.PORT || 3000;
var router = express.Router();
var db;

// データ追加
app.post('/create', function(req, res) {
  console.log("post to create");
  console.log(req.body);
  console.log(req.body.name);
  console.log("===============");
  db = new sqlite3.Database('127.0.0.1');
  db.serialize(function() {
    db.run('insert or ignore into user (id, name) values ($i, $n)',
      {
        $i: req.body.id,
        $n: req.body.name
      }
    );
  });
  db.close();
})

app.get('/api', function(req, res) {
  db = new sqlite3.Database('127.0.0.1');
  db.serialize(function() {
    db.all('SELECT id,name FROM USER', function(err, rows) {
        res.json(rows);
    });
  });
  db.close();
});
app.listen(port);
console.log("起動");
