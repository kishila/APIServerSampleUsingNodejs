var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');

var usersRoutes = require('./routes/users');

// POSTのためのミドルウェア
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ルーティングのミドルウェア
app.use('/users', usersRoutes);

// View Engine
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');

var port = process.env.PORT || 3000;
var router = express.Router();

// フロントページ
app.get('/', function (req, res){
  res.render('index', {title: 'Express Sample Page'});
});

app.listen(port);

console.log("起動:" + port);
