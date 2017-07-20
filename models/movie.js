var Sequelize = require('sequelize');
var connection = new Sequelize('movies','root', 'troy8troy', {
	dialect: 'mysql'
});


var Movies = connection.define('movies', {
	mname: Sequelize.STRING,
	mdate: Sequelize.TEXT,
	mdirector: Sequelize.TEXT,
	mgenre: Sequelize.TEXT,
	mcover: Sequelize.TEXT
});

exports.models = {
	movies: Movies
}