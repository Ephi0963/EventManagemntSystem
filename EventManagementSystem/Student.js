// Function to handle student login
function login(event) {
    event.preventDefault();

    



    // Store student info in localStorage
    const studentInfo = { name: studentName, id: studentId };
    localStorage.setItem('studentInfo', JSON.stringify(studentInfo));

    document.getElementById('loginSection').style.display = 'none';
    document.getElementById('eventSection').style.display = 'block';

    // Fill registrant name if exists
    document.getElementById('registrantName').value = studentName;

    // Fetch and display events
    fetchEvents();
}

// Function to display events
function displayEvents(filteredEvents) {
    const eventList = document.getElementById('eventList');
    eventList.innerHTML = '';

    filteredEvents.forEach(event => {
        const eventItem = document.createElement('div');
        eventItem.className = 'event-item';
        eventItem.innerHTML = `
            <h3>${event.name}</h3>
            <p><strong>Date:</strong> ${event.date} <strong>Time:</strong> ${event.time} <strong>Location:</strong> ${event.location}</p>
            <p>${event.description}</p>
            <button onclick="openModal(${event.id})">Register</button>
        `;
        eventList.appendChild(eventItem);
    });
}

// Function to fetch events from localStorage
function fetchEvents() {
    const events = JSON.parse(localStorage.getItem('events')) || [];
    displayEvents(events);
}

// Function to search events
function searchEvents() {
    const searchValue = document.getElementById('searchInput').value.toLowerCase();
    const events = JSON.parse(localStorage.getItem('events')) || [];
    const filteredEvents = events.filter(event => 
        event.name.toLowerCase().includes(searchValue)
    );
    displayEvents(filteredEvents);
}

// Function to open the registration modal
function openModal(eventId) {
    document.getElementById('selectedEventId').value = eventId;
    document.getElementById('registrationModal').style.display = "block";
}

// Function to close the modal
function closeModal() {
    document.getElementById('registrationModal').style.display = "none";
    document.getElementById('registrationForm').reset();
}

// Function to register for the event
function registerEvent(event) {
    event.preventDefault();

    const registrantName = document.getElementById('registrantName').value;
    const eventId = document.getElementById('selectedEventId').value;
    const events = JSON.parse(localStorage.getItem('events')) || [];
    const eventDetails = events.find(e => e.id == eventId);

    // Assuming registration is successful
    document.getElementById('registrationMessage').innerText = 
        `Successfully registered ${registrantName} for "${eventDetails.name}"!`;

    closeModal();
}

/*Check if student is already logged in
if (localStorage.getItem('studentInfo')) {
    const studentInfo = JSON.parse(localStorage.getItem('studentInfo'));
    document.getElementById('studentName').value = studentInfo.name;
    document.getElementById('studentId').value = studentInfo.id;

    // Display events section
    document.getElementById('loginSection').style.display = 'none';
    document.getElementById('eventSection').style.display = 'block';
    fetchEvents();
}
    */

// Function to register for the event
function registerEvent(event) {
    event.preventDefault();

    const registrantName = document.getElementById('registrantName').value;
    const eventId = document.getElementById('selectedEventId').value;
    const events = JSON.parse(localStorage.getItem('events')) || [];
    const eventDetails = events.find(e => e.id == eventId);

    // Fetch existing registrations from localStorage
    const registrations = JSON.parse(localStorage.getItem('registrations')) || [];
    
    // Create a new registration object
    const newRegistration = {
        id: registrations.length, // Simply using the length as an ID; you may want to use a better ID strategy
        name: registrantName,
        eventId: eventId,
        eventName: eventDetails.name,
        date: eventDetails.date,
        time: eventDetails.time,
    };

    // Push the new registration into the registrations array
    registrations.push(newRegistration);
    
    // Save back to localStorage
    localStorage.setItem('registrations', JSON.stringify(registrations));

    // Notify the user about successful registration
    document.getElementById('registrationMessage').innerText = 
        `Successfully registered ${registrantName} for "${eventDetails.name}"!`;
    
    closeModal();
    fetchRegistrations();  // Optionally refresh the list of registered events
}

// Function to fetch registrations and display to the user (if needed)
function fetchRegistrations() {
    const registrations = JSON.parse(localStorage.getItem('registrations')) || [];
    const registrationMessage = document.getElementById('registrationMessage');

    // Create a display of registrations (optional)
    if (registrations.length > 0) {
        const registrationList = registrations.map(reg => 
            `${reg.name} registered for "${reg.eventName}" on ${reg.date} at ${reg.time}`
        ).join('<br>');

        registrationMessage.innerHTML += `<br><strong>Your Registrations:</strong><br>${registrationList}`;
    } else {
        registrationMessage.innerHTML = "You have no registrations.";
    }
}