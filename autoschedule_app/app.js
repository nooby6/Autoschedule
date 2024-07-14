document.addEventListener("DOMContentLoaded", function() {
    // Handle sign up form submission
    document.getElementById("signup-form").addEventListener("submit", function(event) {
        event.preventDefault();
        signup();
    });

    // Handle login form submission
    document.getElementById("login-form").addEventListener("submit", function(event) {
        event.preventDefault();
        login();
    });

    // Handle add shift form submission
    document.getElementById("add-shift-form").addEventListener("submit", function(event) {
        event.preventDefault();
        addShift();
    });

    // Handle profile form submission
    document.getElementById("profile-form").addEventListener("submit", function(event) {
        event.preventDefault();
        saveProfile();
    });
});

let users = [];

function signup() {
    const name = document.getElementById("signup-name").value;
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;

    // Simple validation and user creation (in-memory, not persistent)
    if (name && email && password) {
        users.push({ name, email, password });
        alert("Sign up successful!");
        showSection('login');
    } else {
        alert("Please fill out all fields.");
    }
}

function login() {
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
        // Simulate user login and show dashboard
        document.getElementById("user-name").innerText = user.name;
        showSection('dashboard');
    } else {
        alert("Invalid email or password.");
    }
}

function logout() {
    showSection('home');
}

function showSection(sectionId) {
    const sections = document.querySelectorAll("main > section");
    sections.forEach(section => {
        section.style.display = section.id === sectionId ? 'block' : 'none';
    });
}

function addShift() {
    // Add shift logic
    alert("Shift added!");
    showSection('schedule');
}

function saveProfile() {
    // Save profile logic
    alert("Profile updated!");
    showSection('dashboard');
}
