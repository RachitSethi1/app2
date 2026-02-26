// /routes/bookings.js

const { checkAlreadyScheduledBooking } = require('../middleware/bookings');
const { renderIndexPage, createBooking, renderCreateBookingPage } = require('../controllers/bookings');

// , renderShowPage, modifyBooking, deleteBooking, renderModifyBookingPage

const express = require('express');
const router = express.Router();

router.route('/')
    .get(renderIndexPage)
    .post(checkAlreadyScheduledBooking, createBooking);

router.route('/create')
    .get(checkAlreadyScheduledBooking, renderCreateBookingPage);

//router.route('/:id')
//	.get(renderShowPage)
//	.patch(modifyBooking)
//	.delete(deleteBooking);

//router.route('/:id/edit')
//	.get(renderModifyBookingPage);

module.exports = router;
