var Sequelize = require('sequelize');
var connection = new Sequelize('movies','root', 'troy8troy', {
	dialect: 'mysql'
});


var Movies = connection.define('movies', {
	mid: Sequelize.TEXT,
	mame: Sequelize.STRING,
	mate: Sequelize.TEXT
});

exports.models = {
	movies: Movies
}