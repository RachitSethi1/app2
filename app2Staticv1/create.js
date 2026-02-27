function openBookingModal(date, time) {
    // 1. Populate the hidden inputs in the form
    document.getElementById('formDate').value = date;
    document.getElementById('formTime').value = time;
    
    // 2. Update the text in the modal so the user knows what they clicked
    document.getElementById('modalDetails').innerText = `Booking for ${date} at ${time}`;
    
    // 3. Show the modal by changing display to flex
    const modal = document.getElementById('bookingModal');
    modal.style.display = 'flex';
}

function closeModal() {
    // Hide the modal
    document.getElementById('bookingModal').style.display = 'none';
}

// Close modal if user clicks anywhere outside of the white modal box
window.onclick = function(event) {
    const modal = document.getElementById('bookingModal');
    if (event.target == modal) {
        closeModal();
    }
};
