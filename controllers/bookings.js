// /controllers/bookings.js

const Location = require('../models/locations');
const Booking = require('../models/bookings');
const User = require('../models/users');
const { calendarSlots, availableSlots, isDateModificable } = require('../utils/slots');

module.exports.renderIndexPage = async (req, res) => {
	const user = await User.findById(req.user._id).populate({ path: 'location', populate: { path: 'bookings' }});
	// for client-side validation for hasAlreadyScheduledBooking
    const hasAlreadyScheduled = user.location.bookings.find(booking => booking.date >= new Date().toISOString().split('T')[0]) ? true : false;
	res.render('bookings/index', { myBookings: user.location.bookings, hasAlreadyScheduled });
};

module.exports.createBooking = async (req, res) => {
	// save booking to db
	const { date, time, service } = req.body;
	const booking = new Booking({ date, time, service });
	booking.user = req.user._id;
	const user = await User.findById(req.user._id);
	booking.location = user.location;
	await booking.save();
	
	// update related user and location docs
	user.bookings.push(booking._id);
	await user.save();
	const location = await Location.findById(user.location);
	location.bookings.push(booking._id);
	await location.save();

	req.flash('success', 'Slot Booked Successfully');
	res.redirect('/bookings');
};

module.exports.renderCreateBookingPage = async (req, res) => {
	req.session.returnTo = req.OriginalUrl; // if middleware finds error, redirect here
	const calendarArr = calendarSlots();
    const availableSlotsArr = await availableSlots();
    res.render('bookings/create', { calendarArr, availableSlotsArr });
};

module.exports.renderShowPage = async (req, res) => {
	const { id } = req.params;
	const foundBooking = await Booking.findById(id).populate('user').populate('location');
	res.render('bookings/show', { ...foundBooking.toObject(), isModificable: isDateModificable(foundBooking.date) });
};

module.exports.modifyBooking = async (req, res) => {
	const { id } = req.params;
	const { date, time, service } = req.body;
	const foundBooking = await Booking.findById(id);
	foundBooking.date = date;
	foundBooking.time = time;
	foundBooking.service = service;
	await foundBooking.save();
	req.flash('success', 'Booking Modified Successfully');
	res.redirect(`/bookings/${id}`);
};

module.exports.deleteBooking = async (req, res) => {
	// delete booking
	const { id } = req.params;
	const deletedBooking = await Booking.findByIdAndDelete(id);
	
	// remove ref from related user
	const user = await User.findById(deletedBooking.user);
	let j = -1;
	for(let i=0; i<user.bookings.length; i++) {
		if(user.bookings[i].equals(deletedBooking._id)) {
			j = i;
			break;
		}
	}
	if(j === -1) throw new Error('booking to be deleted, not found in related user\'s bookings');
	user.bookings.splice(j, 1);
	await user.save();
	
	// remove ref from related location
	const location = await Location.findById(deletedBooking.location);
	j = -1;
	for(let i=0; i<location.bookings.length; i++) {
		if(location.bookings[i].equals(deletedBooking._id)) {
			j = i;
			break;
		}
	}
	if(j === -1) throw new Error('booking to be deleted, not found in related location\'s bookings');
	location.bookings.splice(j, 1);
	await location.save();
	
	req.flash('success', 'Booking Deleted Successfully');
	res.redirect('/bookings');
};

module.exports.renderModifyBookingPage = async (req, res) => {
	req.session.returnTo = req.OriginalUrl; // if middleware finds error, redirect here
	const { id } = req.params;
	const foundBooking = await Booking.findById(id);
	// foundBooking = { _id, date, time, service, ... }
	const calendarArr = calendarSlots();
    const availableSlotsArr = await availableSlots();
    res.render('bookings/edit', { ...foundBooking.toObject(), calendarArr, availableSlotsArr });
};
