document.getElementById('event-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting normally

    const eventName = document.getElementById('event-name').value;
    const eventTime = document.getElementById('event-time').value;

    // Send the event data to the server
    fetch('/add_event', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ event_name: eventName, time: eventTime }),
    })
    .then(response => response.json())
    .then(data => {
        // Update the schedule display
        updateSchedule(data.schedule);
        // Clear input fields
        document.getElementById('event-name').value = '';
        document.getElementById('event-time').value = '';
    })
    .catch(error => console.error('Error:', error));
});

// Function to update the schedule display
function updateSchedule(schedule) {
    const scheduleList = document.getElementById('schedule-list');
    scheduleList.innerHTML = ''; // Clear the list
    for (const [event, time] of Object.entries(schedule)) {
        const li = document.createElement('li');
        li.textContent = `${event} at ${time}`;
        scheduleList.appendChild(li);
    }
}
