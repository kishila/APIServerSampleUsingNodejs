var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3');

var db;

// データ閲覧
router.get('/index', function (req, res){
  db = new sqlite3.Database('127.0.0.1');
  db.serialize(function() {
    db.all('SELECT id,name FROM USER', function(err, rows) {
        res.render('index_user', {users: rows});
    });
  });
});

// データ追加ページ
router.get('/new', function(req, res) {
  res.render('new_user');
});

// データ追加
router.post('/create', function(req, res) {
  db = new sqlite3.Database('127.0.0.1');
  db.serialize(function() {
    db.run('insert or ignore into user (name, age) values ($n, $a)',
      {
        $n: req.body.name,
        $a: req.body.age
      }
    );
  });
  db.close();
  res.redirect('index');
});

// 編集ページ
router.get('/edit/:id', function(req, res) {
  db = new sqlite3.Database('127.0.0.1');
  db.serialize(function() {
    db.each('select * from user where id = $i',
      {
        $i: req.params.id
      },
      function(err, rows) {
        res.render('edit_user', {user: rows});
      }
    );
  });
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
  res.redirect('/index_user');
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
