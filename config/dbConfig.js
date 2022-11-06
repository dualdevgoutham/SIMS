const mongoose = require('mongoose');

mongoose.connect(process.env.mongo_url);

const connection = mongoose.connection;

connection.on('connected', () => {
	console.log('Mongo DB cnnection sucessfull');
});

connection.on('error', () => {
	console.log('Mongo DB connection failed');
});

module.exports = mongoose;
