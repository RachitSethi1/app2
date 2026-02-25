// /routes/users.js

const express = require('express');
const passport = require('passport');
const { validateRegisterForm } = require('../middleware/users');
const { renderRegisterForm, registerUser, renderLoginForm, postLoginUser, logoutUser } = require('../controllers/users');

const router = express.Router();

router.route('/register')
	.get(renderRegisterForm)
	.post(validateRegisterForm, registerUser);

router.route('/login')
	.get(renderLoginForm)
	.post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login', keepSessionInfo: true }), postLoginUser);

router.route('/logout')
	.get(logoutUser);

module.exports = router;
