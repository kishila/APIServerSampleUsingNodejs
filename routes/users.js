var express = require('express');
var router = express.Router();
var sqlite3    = require('sqlite3');

var db;

// データ閲覧
router.get('/show', function (req, res){
  db = new sqlite3.Database('127.0.0.1');
  db.serialize(function() {
    db.all('SELECT id,name FROM USER', function(err, rows) {
        res.render('show', {users: rows});
    });
  });
});

// データ追加ページ
router.get('/new', function(req, res) {
  res.render('new');
});

// データ追加
router.post('/create', function(req, res) {
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
  res.redirect('show');
});

// データ削除
router.delete('/destroy', function(req, res) {
  db = new sqlite3.Database('127.0.0.1');
  db.serialize(function() {
    /*
    db.run('insert or ignore into user (id, name) values ($i, $n)',
      {
        $i: req.body.id,
        $n: req.body.name
      }
    );
    */
  });
  db.close();
  res.redirect('/show');
});

// Web API
router.get('/api', function(req, res) {
  db = new sqlite3.Database('127.0.0.1');
  db.serialize(function() {
    db.all('SELECT id,name FROM USER', function(err, rows) {
        res.json(rows);
    });
  });
  db.close();
});

module.exports = router;
