// /middleware/bookings.js

const User = require('../models/users');
const Booking = require('../models/bookings');
const { bookingSchema } = require('./validationSchemas');
const { availableSlots, isDateModificable } = require('../utils/slots');

module.exports.hasAlreadyScheduledBooking = async (req, res, next) => {
    const user = await User.findById(req.user._id).populate({ path: 'location', populate: { path: 'bookings' }});
    const foundBooking = user.location.bookings.find(booking => booking.date >= new Date().toISOString().split('T')[0]);
	if(foundBooking) {
		req.flash('error', 'A booking is already scheduled');
		return res.redirect('/bookings');
	}
	next();
};

module.exports.isLoggedIn = (req, res, next) => {
	if(!req.user) {
		req.session.returnTo = req.originalUrl;
		req.flash('error', 'You need to be logged in');
		return res.redirect('/login');
	}
	next();
};

module.exports.validateBooking = async (req, res, next) => {
	const redirectUrl = req.session.returnTo || '/bookings'
	delete req.session.returnTo;

	// validate booking schema
	const { date, time, service } = req.body;
	const bookingInputData = { date, time, service };
	const { error } = bookingSchema.validate(bookingInputData);
	if(error) {
		req.flash('error', error.message);
		return res.redirect(redirectUrl);
	}
	
	// if modify booking request does not change date & time
	const { id } = req.params;
	if(id) {
		const foundBooking = await Booking.findById(id);
		if(foundBooking.date === date && foundBooking.time === time) return next();
	}
	
	// check if slot available
	const availableSlotsArr = await availableSlots();
	const foundSlot = availableSlotsArr.find(slot => slot.date === date && slot.time === time);
	if(!foundSlot) {
		req.flash('error', 'Slot not available to book');
		return res.redirect(redirectUrl);
	}
	
	next();
};

module.exports.isBookingOwner = async (req, res, next) => {
	const { id } = req.params;
	const foundBooking = await Booking.findById(id).populate('location');
	const matchedUser = foundBooking.location.users.find(userId => userId.equals(req.user._id))
	if(!matchedUser) {
		req.flash('error', 'You are not the owner of this booking');
		return res.redirect(`/bookings/${id}`);
	}
	next();
};

module.exports.isBookingModificable = async (req, res, next) => {
	const { id } = req.params;
	const foundBooking = await Booking.findById(id);
	if(!isDateModificable(foundBooking.date)) {
		req.flash('error', 'Booking can no more be modified');
		return res.redirect(`/bookings/${id}`);
	}
	next();
};
