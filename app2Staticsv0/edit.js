// /public/bookings/edit.js

const container = document.getElementById('container');
const changeServiceBtn = document.getElementById('change-service-btn');
const changeSlotBtn = document.getElementById('change-slot-btn');
const slotsTableContainer = document.getElementById('slots-table-container');

changeServiceBtn.addEventListener('click', event => {
	container.innerHTML = ''; // clear container
	slotsTableContainer.hidden = true;
	
	const form = document.createElement('form');
	form.action = `/bookings/${bookingId}?_method=PATCH`;
	form.method = 'POST';
	const serviceLabel = document.createElement('label');
	serviceLabel.for = 'service';
	serviceLabel.textContent = 'Service: ';
	const serviceInput = document.createElement('input');
	serviceInput.type = 'text';
	serviceInput.id = 'service';
	serviceInput.name = 'service';
	serviceInput.value = bookingService;
	const dateInput = document.createElement('input');
	dateInput.type = 'text';
	dateInput.name = 'date';
	dateInput.value = bookingDate;
	dateInput.hidden = true;
	const timeInput = document.createElement('input');
	timeInput.type = 'text';
	timeInput.name = 'time';
	timeInput.value = bookingTime;
	timeInput.hidden = true;
	const submitBtn = document.createElement('button');
	submitBtn.type = 'submit';
	submitBtn.textContent = 'Change';
	form.appendChild(serviceLabel);
	form.appendChild(serviceInput);
	form.appendChild(dateInput);
	form.appendChild(timeInput);
	form.appendChild(submitBtn);
	container.appendChild(form);
});

changeSlotBtn.addEventListener('click', event => {
	container.innerHTML = '';
	
	slotsTableContainer.hidden = false;
});

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
