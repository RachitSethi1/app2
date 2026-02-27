// /models/users.js

const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose').default;

const userSchema = new mongoose.Schema({
	name: String,
	mobile: String,
	location: {
		type: mongoose.Types.ObjectId,
		ref: 'Location'
	},
	bookings: [{
		type: mongoose.Types.ObjectId,
		ref: 'Booking'
	}]
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);
