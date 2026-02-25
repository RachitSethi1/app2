// /controllers/users.js

const User = require('../models/users');
const Location = require('../models/locations');

module.exports.renderRegisterForm = (req, res) => {
	res.render('users/register');
};

module.exports.registerUser = async (req, res, next) => {
	const { username, password, name, mobile, society, tower, flat } = req.body;
	const newUser = new User({ username, name, mobile });
	
	let location = await Location.findOne({ society, tower, flat });
	if(!location) {
		location = new Location({ society, tower, flat });
	}
	location.users.push(newUser._id);
	await location.save();
	
	newUser.address = location._id;
	const registeredUser = await User.register(newUser, password);
	
	req.login(registeredUser, err => {
		if(err) return next(err);
		req.flash('success', 'Registered Successfully');
		res.redirect('/');
	});
};

module.exports.renderLoginForm = (req, res) => {
	res.render('users/login');
};

module.exports.postLoginUser = (req, res) => {
	req.flash('success', 'Logged In Successfully');
	res.redirect('/');
};

module.exports.logoutUser = (req, res, next) => {
	req.logout(err => {
		if(err) return next(err);
		req.flash('success', 'Logged Out Successfully');
		res.redirect('/');
	});
};
