// models/users.js

const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose').default;

const userSchema = new mongoose.Schema({
	name: String,
	mobile: String,
	address: {
		type: mongoose.Types.ObjectId,
		ref: 'Location'
	}
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);

//	userSchema
//		username
//		password
//		name
//		mobile
//		address: {
//			type: mongoose.Types.ObjectId,
//			ref: 'Location'
//		}

//	locationSchema
//		society
//		tower
//		flat
//		users: [{
//			type: mongoose.Types.ObjectId,
//			ref: 'User'
//		}]
