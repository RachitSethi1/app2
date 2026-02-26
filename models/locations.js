// /models/location.js

const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
	society: {
		type: String,
		enum: ['CHD', 'JMD']
	},
	tower: String,
	flat: String,
	users: [{
		type: mongoose.Types.ObjectId,
		ref: 'User'
	}],
	bookings: [{
		type: mongoose.Types.ObjectId,
		ref: 'Booking'
	}]
});

module.exports = mongoose.model('Location', locationSchema);