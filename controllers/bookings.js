// /controllers/bookings.js

const Booking = require('../models/bookings');
const User = require('../models/users');
const { allSlots, availableSlots } = require('../utils/slots');

module.exports.renderIndexPage = async (req, res) => {
	const user = await User.findById(req.user._id).populate({ path: 'location', populate: { path: 'bookings' }});
	res.render('bookings/index', { myBookings: user.location.bookings });
};

module.exports.createBooking = (req, res) => {
	const { date, time, service } = req.body;
	const foundBooking = await Booking.find({ date, time });
	if(foundBooking) {
		req.flash('error', 'Slot Already Taken');
		return res.redirect('/bookings/create');
	}
	// save complete booking doc to db
	const booking = { date, time, service, status: 'Scheduled' };
	booking.user = req.user._id;
	const user = await User.findById(req.user._id).populate('location');
	booking.location = user.location._id;
	await booking.save();
	
	// update related user and location docs
	user.bookings.push(booking._id);
	const location = await Location.findById(user.location._id);
	location.bookings.push(booking._id);

	// flash and redirect
	req.flash('success', 'Slot Booked Successfully');
	res.redirect('/bookings');
};

module.exports.renderCreateBookingPage = async (req, res) => {
	const all = allSlots();
    const free = await availableSlots();
    res.render('bookings/create', { all, free });
};
