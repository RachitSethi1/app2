// /routes/bookings.js

const express = require('express');
const { hasAlreadyScheduledBooking, isLoggedIn, validateBooking, isBookingOwner, isBookingModificable } = require('../middleware/bookings');
const { renderIndexPage, createBooking, renderCreateBookingPage, renderShowPage, modifyBooking, deleteBooking, renderModifyBookingPage } = require('../controllers/bookings');

const router = express.Router();

router.route('/')
    .get(isLoggedIn, renderIndexPage)
    .post(isLoggedIn, hasAlreadyScheduledBooking, validateBooking, createBooking);

router.route('/create')
    .get(isLoggedIn, hasAlreadyScheduledBooking, renderCreateBookingPage);

router.route('/:id')
	.get(isLoggedIn, isBookingOwner, renderShowPage)
	.patch(isLoggedIn, isBookingOwner, isBookingModificable, validateBooking, modifyBooking)
	.delete(isLoggedIn, isBookingOwner, isBookingModificable, deleteBooking);

router.route('/:id/edit')
	.get(isLoggedIn, isBookingOwner, isBookingModificable, renderModifyBookingPage);

module.exports = router;

//	/
//		1. Redirect to '/about'
//	/bookings
//		1. Show user and location details
//		2. List bookings summarised, Link to each booking detail page
//		3. if no 'Scheduled' booking, Link to create booking page
//	/bookings/create
//		1. Show available slots in calendar
//		2. Allow choose slot and service
//		3. Create booking
//	/bookings/:id
//		1. Show booking details all
//		2. if not in lock-period, Link to modify/delete booking page
//	/bookings/:id/edit
//		1. Show available slots in calendar
//		2. Allow choose slot and service
//		3. Allow delete booking
//		4. Modify booking
//	/about
//		1. About us page



//	slotsCalendar
//	pages style
//	login
