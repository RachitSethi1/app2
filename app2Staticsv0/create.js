// /public/bookings/create.js

// select necessary elements
const dialog = document.getElementById('actionDialog');
const form = document.getElementById('actionForm');
const closeBtn = document.getElementById('cancelBtn');

// select input field within form to be pre filled
const dateInputField = document.getElementById('date');
const timeInputField = document.getElementById('time');

// select button to add event listeners to 
const actionBtns = document.querySelectorAll('.open-dialog-btn');

actionBtns.forEach(btn => {
	btn.addEventListener('click', event => {
		const dateValue = btn.dataset.date;
		const timeValue = btn.dataset.time;
		
		dateInputField.value = dateValue;
		timeInputField.value = timeValue;
		
		dialog.showModal();
	});
});

closeBtn.addEventListener('click', e => {
	dialog.close();
});
