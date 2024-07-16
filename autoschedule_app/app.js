document.addEventListener("DOMContentLoaded", function() {
    // Event listeners for forms and logout
    document.getElementById("signup-form").addEventListener("submit", handleSignup);
    document.getElementById("login-form").addEventListener("submit", handleLogin);
    document.getElementById("logout-btn").addEventListener("click", logout);
});

// Mock user data (replace with a real database in production)
const users = [
    { name: "Regular User", email: "user@example.com", password: "password", isAdmin: false },
    { name: "Admin User", email: "admin@example.com", password: "adminpassword", isAdmin: true }
];

// Handle sign up
function handleSignup(event) {
    event.preventDefault();
    const name = document.getElementById("signup-name").value.trim();
    const email = document.getElementById("signup-email").value.trim();
    const password = document.getElementById("signup-password").value;

    // Email validation pattern
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        showMessage("Please enter a valid email address.");
        return;
    }

    // Check for existing user
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
        showMessage("Email is already registered.");
        return;
    }

    if (name && email && password) {
        // Add new user to mock data
        users.push({ name, email, password, isAdmin: false });
        showMessage("Sign up successful!");
        document.getElementById("signup-form").reset();
        showSection('login'); // Redirect to login section
    } else {
        showMessage("Please fill out all fields.");
    }
}

// Handle login
function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value;

    // Validate user credentials
    const user = users.find(user => user.email === email && user.password === password);
    if (user) {
        document.getElementById("user-name").innerText = user.isAdmin ? `${user.name} (Admin)` : user.name;
        showSection('dashboard'); // Show dashboard section on successful login
    } else {
        showMessage("Invalid email or password.");
    }
}

// Show messages to users
function showMessage(message) {
    const messageElement = document.getElementById("message"); // Ensure you have an element for messages
    messageElement.innerText = message;
    messageElement.style.display = 'block'; // Display the message
}

// Logout function
function logout() {
    showSection('home'); // Show home section on logout
}

// Show/hide sections
function showSection(sectionId) {
    const sections = document.querySelectorAll("main > section");
    sections.forEach(section => {
        section.style.display = section.id === sectionId ? 'block' : 'none';
    });
}

// Fetch events from API (placeholder example)
async function fetchEvents() {
    try {
        const response = await fetch('/api/events'); // Adjust the endpoint as needed
        return await response.json();
    } catch (error) {
        console.error("Error fetching events:", error);
        return []; // Return an empty array on error
    }
}

// Initialize the calendar
document.addEventListener('DOMContentLoaded', async function () {
    const calendarEl = document.getElementById('calendar');
    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        events: await fetchEvents() // Fetch and set events
    });
    
    calendar.render(); // Render the calendar
});