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

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        showMessage("Please enter a valid email address.");
        return;
    }

    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
        showMessage("Email is already registered.");
        return;
    }

    if (name && email && password) {
        users.push({ name, email, password, isAdmin: false });
        showMessage("Sign up successful!");
        document.getElementById("signup-form").reset();
        showSection('login');
    } else {
        showMessage("Please fill out all fields.");
    }
}

// Handle login
function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value;

    const user = users.find(user => user.email === email && user.password === password);
    if (user) {
        document.getElementById("user-name").innerText = user.isAdmin ? `${user.name} (Admin)` : user.name;
        showSection('dashboard');
    } else {
        showMessage("Invalid email or password.");
    }
}

// Show messages to users
function showMessage(message) {
    const messageElement = document.getElementById("message"); // Assume you have a message element
    messageElement.innerText = message;
    messageElement.style.display = 'block';
}

// Logout function
function logout() {
    showSection('home');
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
        const response = await fetch('/api/events');
        return await response.json();
    } catch (error) {
        console.error("Error fetching events:", error);
        return [];
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
        events: await fetchEvents()
    });
    
    calendar.render();
});
