function openBookingModal(date, time) {
    document.getElementById('formDate').value = date;
    document.getElementById('formTime').value = time;
    document.getElementById('modalDetails').innerHTML = `Booking for <strong>${date}</strong> at <strong>${time}</strong>`;
    document.getElementById('bookingModal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('bookingModal').style.display = 'none';
}

window.onclick = function(event) {
    const modal = document.getElementById('bookingModal');
    if (event.target == modal) closeModal();
};
