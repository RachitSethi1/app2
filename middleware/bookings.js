// /middleware/bookings.js

const User = require('../models/users');

module.exports.checkAlreadyScheduledBooking = async (req, res, next) => {
    const user = await User.findById(req.user._id).populate({ path: 'location', populate: { path: 'bookings' }});
    let isAnyScheduled = false;
    for(let i=0; i<user.location.bookings.length; i++) {
		if(user.location.bookings[i].status === 'Scheduled') {
			isAnyScheduled = true;
			break;
		}
	}
    if(isAnyScheduled) {
		req.flash('error', 'A booking for your flat already exists');
		return res.redirect('/bookings');
	}
	
	next();
};

