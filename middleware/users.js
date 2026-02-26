// /middleware/users.js

const { userSchema, locationSchema } = require('./validationSchemas');
const User = require('../models/users');

module.exports.validateRegisterForm = async (req, res, next) => {
	const { username, password, name, mobile, society, tower, flat } = req.body;
	const userDetails = { username, password, name, mobile };
	const locationDetails = { society, tower, flat };
	
	const { error: error1 } = userSchema.validate(userDetails);
	if(error1) {
		req.flash('error', error1.message);
		return res.redirect('/register');
	}
	const { error: error2 } = locationSchema.validate(locationDetails);
	if(error2) {
		req.flash('error', error2.message);
		return res.redirect('/register');
	}
	
	const foundUser = await User.findOne({ username });
	if(foundUser) {
		req.flash('error', 'Username Already Taken');
		return res.redirect('/register');
	}
	
	next();
};