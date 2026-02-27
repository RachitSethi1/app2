// /utils/slots.js

//	bookedSlots() -> booked slots from: today to: last-day-of-booking-window
//	calenderSlots() -> calender slots from: today to: last-day-of-booking-window
//	availableSlots() -> available slots from: today to: last-day-of-booking-window
//	isDateModificable(date) -> return boolean, is date >= first-day-after-lock-period-from-today

const Booking = require('../models/bookings');

const seasonDates = { start: '2026-03-01', end: '2026-07-31' }; // bounds
const lockPeriod = 2;
const bookingWindow = 2; // in months
const today = new Date().toISOString().split('T')[0]; // today
const firstDayAfterLockPeriodFromToday = new Date(new Date().setDate(new Date().getDate() + lockPeriod)).toISOString().split('T')[0]; // today + lock-period
const lastDateInBookingWindowFromToday = new Date(new Date().setMonth(new Date().getMonth() + bookingWindow)).toISOString().split('T')[0]; // today + booking-window

const bookedSlots = async (from = today, to = lastDateInBookingWindowFromToday) => {
		const allBookings = await Booking.find({ date: {$gte: from, $lte: to } }, { date: 1, time: 1, _id: 0 });
		return allBookings;
};

const calendarSlots = (from = today, to = lastDateInBookingWindowFromToday) => {
  const result = [];
  const times = ['10 am', '12 pm', '2 pm', '4 pm'];
  
  let currentDate = new Date(from);
  const endDate = new Date(to);

  while (currentDate <= endDate) {
    const dateString = currentDate.toISOString().split('T')[0];
	times.forEach(time => {
      result.push({
        date: dateString,
        time: time
      });
    });
	currentDate.setDate(currentDate.getDate() + 1);
  }
  return result;
};

const availableSlots = async (from = today , to = lastDateInBookingWindowFromToday) => {
	// remove sundays from calendar slots
	const A = calendarSlots(from, to).filter(item => {
		const dateObj = new Date(item.date + 'T00:00:00');
		return dateObj.getDay() !== 0;
	});
	
	// remove booked slots
	const B = await bookedSlots(from, to);
	const C = [];
	let k=0;
	for(let i=0; i<A.length; i++) {
		let found = false;
		for(let j=0; j<B.length; j++) {
			if(A[i].date === B[j].date && A[i].time === B[j].time) {
				found = true;
				break;
			}
		}
		if(found) continue;
		C[k] = A[i];
		k++;
	}
	
	// remove lock-period slots
	const D = [];
	let j = 0;
	for(let i=0; i<C.length; i++) {
		if(C[i].date >= firstDayAfterLockPeriodFromToday) {
			D[j] = C[i];
			j++;
		}
	}
	
	return D;
};

const isDateModificable = (date) => {
	if(!date) throw new Error('no date provided!');
	
	return date >= firstDayAfterLockPeriodFromToday
};

module.exports = { bookedSlots, calendarSlots, availableSlots, isDateModificable };
