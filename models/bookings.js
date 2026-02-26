// /models/bookings.js

const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    date: String,
    slot: String,
    service: String,
    status: {
        type: String,
        enum: ['Scheduled', 'Served']
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    location: {
        type: mongoose.Types.ObjectId,
        ref: 'Location'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Booking', bookingSchema);

//  booking:
//      date
//      slot
//      service
//      status
//      user
//      location

// GET /bookings -> { index } show all bookings
// GET /bookings/create -> render create a booking page (only if no current booking) - 1. avaiable slots 2. choose slot
// POST /bookings -> { create } create a booking (only if no current booking)
// GET /bookings/:id -> { show } show booking details
// GET /bookings/:id/edit -> render edit booking page (only if 1. current booking 2. current booking within edit period) - 1) available slots 2) choose slot
// PATCH /bookings/:id -> { update } modify current booking (only if 1. current booking 2. current booking within edit period)
// DELETE /bookings/:id -> { delete } delete current booking