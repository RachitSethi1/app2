// /controllers/bookings.js

const Booking = require('../models/bookings');

module.exports.renderIndexPage = (req, res) => {
    // show summary of all bookings, etc

};

module.exports.createBooking = async (req, res) => {

};

module.exports.renderCreateBookingPage = async (req, res) => {
    // check if already a booking in 'Scheduled' status, if yes, flash & redirect to /bookings

    const allBookedSlots = await Booking.find({}, { date: 1, slot: 1, _id: 0 }); // all booked slots - [{ date, slot }]
    // pass allBookedSlots array to template
};