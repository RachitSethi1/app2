const serviceContainer = document.getElementById('service-form-container');
const slotsContainer = document.getElementById('slots-table-container');
const changeServiceBtn = document.getElementById('change-service-btn');
const changeSlotBtn = document.getElementById('change-slot-btn');

changeServiceBtn.addEventListener('click', () => {
    slotsContainer.hidden = true;
    serviceContainer.hidden = false;
    serviceContainer.innerHTML = `
        <h3>Update Service Details</h3>
        <form action="/bookings/${bookingId}?_method=PATCH" method="POST" style="margin-top:20px;">
            <input type="hidden" name="date" value="${bookingDate}">
            <input type="hidden" name="time" value="${bookingTime}">
            <div class="form-group" style="display:flex; gap:10px; align-items:center;">
                <input type="text" name="service" value="${bookingService}" required style="flex:1; margin-bottom:0;">
                <button type="submit" class="btn btn-primary">Save Change</button>
                <button type="button" class="btn btn-secondary" onclick="document.getElementById('service-form-container').hidden = true">Cancel</button>
            </div>
        </form>
    `;
});

changeSlotBtn.addEventListener('click', () => {
    serviceContainer.hidden = true;
    slotsContainer.hidden = !slotsContainer.hidden;
});

function openBookingModal(date, time) {
    document.getElementById('formDate').value = date;
    document.getElementById('formTime').value = time;
    document.getElementById('modalDetails').innerHTML = `Moving appointment to <strong>${date}</strong> at <strong>${time}</strong>`;
    document.getElementById('bookingModal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('bookingModal').style.display = 'none';
}

window.onclick = function(event) {
    const modal = document.getElementById('bookingModal');
    if (event.target == modal) closeModal();
};
