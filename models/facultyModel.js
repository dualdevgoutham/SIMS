const mongoose = require('mongoose');

const facultySchema = new mongoose.Schema({
	facultyId: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	name: {
		type: String,
		required: true
	},
	isApproved: {
		type: Boolean,
		default: false
	}
});

module.exports = mongoose.model('faculties', facultySchema);
