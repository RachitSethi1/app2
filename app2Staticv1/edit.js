const serviceContainer = document.getElementById('service-form-container');
const slotsContainer = document.getElementById('slots-table-container');
const changeServiceBtn = document.getElementById('change-service-btn');
const changeSlotBtn = document.getElementById('change-slot-btn');

changeServiceBtn.addEventListener('click', () => {
    slotsContainer.hidden = true;
    serviceContainer.hidden = !serviceContainer.hidden;
    
    if(!serviceContainer.hidden) {
        serviceContainer.innerHTML = `
            <h4 style="margin-top:0">Update Service</h4>
            <form action="/bookings/${bookingId}?_method=PATCH" method="POST">
                <input type="hidden" name="date" value="${bookingDate}">
                <input type="hidden" name="time" value="${bookingTime}">
                <div class="service-input-group">
                    <input type="text" name="service" value="${bookingService}" required autofocus>
                    <button type="submit" class="btn-primary">Update</button>
                    <button type="button" class="btn-secondary" onclick="document.getElementById('service-form-container').hidden = true">Cancel</button>
                </div>
            </form>
        `;
    }
});

changeSlotBtn.addEventListener('click', () => {
    serviceContainer.hidden = true;
    slotsContainer.hidden = !slotsContainer.hidden;
});

function openBookingModal(date, time) {
    document.getElementById('formDate').value = date;
    document.getElementById('formTime').value = time;
    document.getElementById('modalDetails').innerHTML = `Move appointment to:<br><strong>${date} at ${time}</strong>`;
    document.getElementById('bookingModal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('bookingModal').style.display = 'none';
}

window.onclick = function(event) {
    const modal = document.getElementById('bookingModal');
    if (event.target == modal) closeModal();
};
