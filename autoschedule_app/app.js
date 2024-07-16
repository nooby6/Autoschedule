document.addEventListener("DOMContentLoaded", function() {
    if (document.getElementById("signup-form")) {
        document.getElementById("signup-form").addEventListener("submit", handleSignup);
        document.getElementById("login-form").addEventListener("submit", handleLogin);
    }
    if (document.getElementById("logout-btn")) {
        document.getElementById("logout-btn").addEventListener("click", logout);
    }
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
        localStorage.setItem("loggedInUser", JSON.stringify(user));
        window.location.href = "dashboard.html"; // Redirect to dashboard
    } else {
        showMessage("Invalid email or password.");
    }
}

// Show messages to users
function showMessage(message) {
    const messageElement = document.getElementById("message");
    if (messageElement) {
        messageElement.innerText = message;
        messageElement.style.display = 'block';
    }
}

// Logout function
function logout() {
    localStorage.removeItem("loggedInUser");
    window.location.href = "index.html"; // Redirect to home page
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
    if (calendarEl) {
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
    }

    // Set user name if logged in
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser) {
        document.getElementById("user-name").innerText = loggedInUser.isAdmin ? `${loggedInUser.name} (Admin)` : loggedInUser.name;
    } else {
        // Redirect to home if not logged in
        if (window.location.pathname.endsWith("dashboard.html")) {
            window.location.href = "index.html";
        }
    }
});

document.addEventListener('DOMContentLoaded', function () {
    function showSection(sectionId) {
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            section.style.display = section.id === sectionId ? 'block' : 'none';
        });
    }

    document.getElementById('nav-home').addEventListener('click', function (e) {
        e.preventDefault();
        showSection('home');
    });

    document.getElementById('nav-signup').addEventListener('click', function (e) {
        e.preventDefault();
        showSection('signup');
    });

    document.getElementById('nav-login').addEventListener('click', function (e) {
        e.preventDefault();
        showSection('login');
    });

    document.getElementById('nav-dashboard').addEventListener('click', function (e) {
        e.preventDefault();
        showSection('dashboard');
    });

    document.getElementById('logout-btn').addEventListener('click', function() {
        alert('Logged out');
        window.location.href = '/index.html';
    });

    showSection('home');
});
