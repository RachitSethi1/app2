// /routes/bookings.js

const {} = require('../middleware/bookings');
const { renderIndexPage, createBooking, renderCreateBookingPage, renderShowPage, modifyBooking, deleteBooking, renderModifyBookingPage } = require('../controllers/bookings');

const express = require('express');
const router = express.Router();

router.route('/')
    .get(renderIndexPage)
    .post(createBooking);

router.route('/create')
    .get(renderCreateBookingPage);

router.route('/:id')
    .get(renderShowPage)
    .patch(modifyBooking)
    .delete(deleteBooking);

router.route('/:id/edit')
    .get(renderModifyBookingPage);

module.exports = router;