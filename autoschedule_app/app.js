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

    // Event listener for logout button (assumed to be in the dashboard)
    document.getElementById("logout-btn").addEventListener("click", function() {
        logout(); // Call logout function to handle logout
    });
});

let users = [
    { name: "Regular User", email: "user@example.com", password: "password", isAdmin: false },
    { name: "Admin User", email: "admin@example.com", password: "adminpassword", isAdmin: true }
];

// Function to handle sign up form submission
function signup() {
    const name = document.getElementById("signup-name").value;
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;

    // Simple validation and user creation (in-memory, not persistent)
    if (name && email && password) {
        users.push({ name, email, password, isAdmin: false }); // Assuming new signups are regular users
        alert("Sign up successful!");
        showSection('login'); // Show login section after successful signup
    } else {
        alert("Please fill out all fields.");
    }
}

// Function to handle login form submission
function login() {
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
        if (user.isAdmin) {
            // Admin login
            document.getElementById("user-name").innerText = user.name + " (Admin)";
            showSection('dashboard'); // Display admin dashboard
        } else {
            // Regular user login
            document.getElementById("user-name").innerText = user.name;
            showSection('dashboard'); // Display regular user dashboard
        }
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
