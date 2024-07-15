document.addEventListener("DOMContentLoaded", function() {
    // Event listener for sign up form submission
    document.getElementById("signup-form").addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent default form submission
        signup(); // Call signup function to handle form data
    });

    // Event listener for login form submission
    document.getElementById("login-form").addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent default form submission
        login(); // Call login function to handle form data
    });

    // Event listener for logout button
    document.getElementById("logout-btn").addEventListener("click", logout);
});

const users = [
    { name: "Regular User", email: "user@example.com", password: "password", isAdmin: false },
    { name: "Admin User", email: "admin@admin.com", password: "adminpassword", isAdmin: true }
];

// Function to handle sign up form submission
function signup() {
    const name = document.getElementById("signup-name").value.trim();
    const email = document.getElementById("signup-email").value.trim();
    const password = document.getElementById("signup-password").value;

    // Simple email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    if (name && email && password) {
        users.push({ name, email, password, isAdmin: false }); // New signups are regular users
        alert("Sign up successful!");
        document.getElementById("signup-form").reset(); // Clear form fields
        showSection('login'); // Show login section after successful signup
    } else {
        alert("Please fill out all fields.");
    }
}

// Function to handle login form submission
function login() {
    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value;

    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
        document.getElementById("user-name").innerText = user.isAdmin ? `${user.name} (Admin)` : user.name;
        showSection('dashboard'); // Display user dashboard
    } else {
        alert("Invalid email or password.");
    }
}

// Function to handle logout
function logout() {
    showSection('home'); // Show home section after logout
}

// Function to dynamically show/hide sections
function showSection(sectionId) {
    const sections = document.querySelectorAll("main > section");
    sections.forEach(section => {
        section.style.display = section.id === sectionId ? 'block' : 'none';
    });
}
