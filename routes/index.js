var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var mysql = require('mysql');
var Sequelize = require('sequelize');
var Movies = require('../models/movie');
var connection = new Sequelize('movies','root', 'troy8troy', {
	dialect: 'mysql'
});
var connectionpull = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'troy8troy',
	database: 'movies'
});

var csrfProtection = csrf();
router.use(csrfProtection);


/* GET home page. */
router.get('/', function (req, res) {
	res.render('index', {title: "Title", message: "Hello World"});

});

router.get('/add', function (req, res, next) {
	res.render('main/add', {csrfToken: req.csrfToken()});
});

router.post('/add', function (req, res, next) {
	var Movies = connection.define('movies', {
	mname: Sequelize.STRING,
	mdate: Sequelize.TEXT,
	mdirector: Sequelize.TEXT,
	mgenre: Sequelize.TEXT,
	mcover: Sequelize.TEXT
	});

	connection.sync().then(function() {
		Movies.create({
			mname: req.body.mname,
			mdate: req.body.mdate,
			mdirector: req.body.mdirector,
			mgenre: req.body.mgenre,
			mcover: req.body.mcover



		});
	});

	res.redirect('back');

});


router.get('/movies', function(req, res, next) {
	var id = '0';
	connectionpull.query('select * from movies where id >' + id, function(err, result) {
	var allmovies = result;
	console.log(allmovies);

	res.render('main/movies',{allmovies:allmovies});
	});
});

router.get('/movie/:id', function(req, res, next) {
	var id = req.params.id;
	connectionpull.query('select * from movies where id =' + id, function(err, result) {
	var allmovies = result;
	console.log(allmovies);

	res.render('main/movie',{allmovies:allmovies});
	});
});


router.get('/blacklist', function(req, res, next) {
  res.render('main/blacklist', { title: 'Express' });
});

router.get('/directors', function(req, res, next) {
  res.render('main/directors', { title: 'Express' });
});

router.get('/Genre', function(req, res, next) {
  res.render('main/Genre', { title: 'Express' });
});


router.get('/signup', function(req, res, next) {
  res.render('main/signup', { title: 'Express' });
});

router.get('/signin', function(req, res, next) {
  res.render('main/signin', { title: 'Express' });
});


module.exports = router;
