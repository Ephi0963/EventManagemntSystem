document.getElementById('eventForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('eventName').value;
    const date = document.getElementById('eventDate').value;
    const time = document.getElementById('eventTime').value;
    const location = document.getElementById('eventLocation').value;
    const description = document.getElementById('eventDescription').value;

    // Create event object
    const newEvent = {
        id: Date.now(), // Using timestamp as a unique ID for insuring unique ids
        name,
        date,
        time,
        location,
        description
    };

    // Get existing events from localStorage or initialize an empty array
    let events = JSON.parse(localStorage.getItem('events')) || [];
    events.push(newEvent); // Add the new event to the array

    // Save the updated events array back to localStorage
    localStorage.setItem('events', JSON.stringify(events));

    // Display the created event
    displayCreatedEvent(newEvent);

    // Reset the form after submission
    document.getElementById('eventForm').reset();
});

// Function to display the newly created event at the bottom
function displayCreatedEvent(event) {
    const eventOutput = document.getElementById('eventOutput');

    const eventDiv = document.createElement('div');
    eventDiv.innerHTML = `
        <h3>${event.name}</h3>
        <p><strong>Date:</strong> ${event.date} <strong>Time:</strong> ${event.time} <strong>Location:</strong> ${event.location}</p>
        <p>${event.description}</p>
    `;
    eventOutput.appendChild(eventDiv);
}

function createEvent(event) {
    event.preventDefault();
    
    const events = JSON.parse(localStorage.getItem('events')) || [];
    const newEvent = {
        id: events.length ? Math.max(events.map(ev => ev.id)) + 1 : 1, // Incremental ID, gives unique id for the events
        name: document.getElementById('eventName').value,
        date: document.getElementById('eventDate').value,
        time: document.getElementById('eventTime').value,
        location: document.getElementById('eventLocation').value,
        description: document.getElementById('eventDescription').value,
    };

    events.push(newEvent);
    localStorage.setItem('events', JSON.stringify(events));
    fetchEvents(); // Refresh the event list
}

// Function to fetch and display events
function fetchEvents() {
    const events = JSON.parse(localStorage.getItem('events')) || [];
    const eventList = document.getElementById('eventList');
    eventList.innerHTML = ''; // Clear existing list
    
    events.forEach(event => {
        const eventItem = document.createElement('div');
        eventItem.innerHTML = `
            <h3>${event.name}</h3>
            <p><strong>Date:</strong> ${event.date} <strong>Time:</strong> ${event.time} <strong>Location:</strong> ${event.location}</p>
            <p>${event.description}</p>
            <button onclick="openEditModal(${event.id})">Edit</button>
            <button onclick="deleteEvent(${event.id})">Delete</button>
        `;
        eventList.appendChild(eventItem);
    });
}

// Open the edit modal with existing event data
function openEditModal(eventId) {
    const events = JSON.parse(localStorage.getItem('events')) || [];
    const eventToEdit = events.find(event => event.id === eventId);
    
    if (eventToEdit) { // Check if the event was found
        document.getElementById('editEventId').value = eventToEdit.id;
        document.getElementById('editEventName').value = eventToEdit.name;
        document.getElementById('editEventDate').value = eventToEdit.date;
        document.getElementById('editEventTime').value = eventToEdit.time;
        document.getElementById('editEventLocation').value = eventToEdit.location;
        document.getElementById('editEventDescription').value = eventToEdit.description;

        document.getElementById('editEventModal').style.display = "block"; // Show the modal
    } else {
        console.error('Event not found for ID:', eventId);
    }
}

// Close the edit modal
function closeEditModal() {
    document.getElementById('editEventModal').style.display = "none";
    document.getElementById('editEventForm').reset();
}

// Update a specific event
function updateEvent(event) {
    event.preventDefault();

    const eventId = document.getElementById('editEventId').value;
    const events = JSON.parse(localStorage.getItem('events')) || [];

    const updatedEvent = {
        id: Number(eventId),
        name: document.getElementById('editEventName').value,
        date: document.getElementById('editEventDate').value,
        time: document.getElementById('editEventTime').value,
        location: document.getElementById('editEventLocation').value,
        description: document.getElementById('editEventDescription').value,
    };

    const updatedEvents = events.map(event => event.id === Number(eventId) ? updatedEvent : event);
    localStorage.setItem('events', JSON.stringify(updatedEvents));

    closeEditModal();
    fetchEvents(); // Refresh the event list
}

// Delete a specific event
function deleteEvent(eventId) {
    if (confirm('Are you sure you want to delete this event?')) {
        const events = JSON.parse(localStorage.getItem('events')) || [];
        const updatedEvents = events.filter(event => event.id !== eventId);
        localStorage.setItem('events', JSON.stringify(updatedEvents));
        fetchEvents(); // Refresh the event list
    }
}

// Initial fetch for events when the page loads
window.onload = function() {
    fetchEvents();
};