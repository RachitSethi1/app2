// /utils/slots.js

// retruns [{ date, time }] for bookedSlots, allSlots, availableSlots

const Booking = require('../models/bookings');

const bookedSlots = async () => { // returns [{ date, time }] of all booked slots
		const allBookings = await Booking.find({}, { date: 1, time: 1, _id: 0 });
		return allBookings;
};

const allSlots = () => { // returns [{ date, time }] of all slots - date: '2026-03-01' to '2026-07-31' | time: in ['10 am', '12 pm', '2 pm', '4 pm']
	let all = [];
	let i = 0;
	let m = 3;
	let d = 1;
	for(;;) {
		if((m%2 === 0 && d === 31) || (m%2 === 1 && d === 32)) {
			m++;
			d=1;
		}
		if(m === 8 && d === 1) break;
		for(const slot of ['10 am', '12 pm', '2 pm', '4 pm']) {
			if(d<=9) all[i] = { date: `2026-0${m}-0${d}`, time: `${slot}` };
			else all[i] = { date: `2026-0${m}-${d}`, time: `${slot}` };
			i++;
		}
		d++;
	}
	return all;
};

const availableSlots = async () => {
	const A = allSlots().filter(item => { // allSlots sundays removed
		const dateObj = new Date(item.date + 'T00:00:00');
		return dateObj.getDay() !== 0;
	});
	const B = await bookedSlots();
	const C = []; // allSlots(sundays removed)-bookedSlots
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
	return C;
};

module.exports = { bookedSlots, allSlots, availableSlots };
