// Constants and Variables
const users = [
    { name: "Regular User", email: "user@example.com", password: "password", isAdmin: false },
    { name: "Admin User", email: "admin@example.com", password: "adminpassword", isAdmin: true }
  ];
  
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  // DOM Elements
  const signupForm = document.getElementById("signup-form");
  const loginForm = document.getElementById("login-form");
  const logoutBtn = document.getElementById("logout-btn");
  const calendarEl = document.getElementById("calendar");
  const messageElement = document.getElementById("message");
  
  // Event Listeners
  document.addEventListener("DOMContentLoaded", () => {
    if (signupForm) {
      signupForm.addEventListener("submit", handleSignup);
    }
    if (loginForm) {
      loginForm.addEventListener("submit", handleLogin);
    }
    if (logoutBtn) {
      logoutBtn.addEventListener("click", logout);
    }
    if (calendarEl) {
      initializeCalendar();
    }
    initializeNavigation();
  });
  
  // Functions
  function handleSignup(event) {
    event.preventDefault();
    const name = document.getElementById("signup-name").value.trim();
    const email = document.getElementById("signup-email").value.trim();
    const password = document.getElementById("signup-password").value;
  
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
      setTimeout(() => {
        window.location.href = "dashboard.html";
      }, 1000);
    } else {
      showMessage("Please fill out all fields.");
    }
  }
  
  function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value;
  
    const user = users.find(user => user.email === email && user.password === password);
    if (user) {
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      setTimeout(() => {
        window.location.href = "/autoschedule_app/templates/dashboard.html";
      }, 100);
    } else {
      showMessage("Invalid email or password.");
    }
  }
  
  function showMessage(message) {
    messageElement.innerText = message;
    messageElement.style.display = 'block';
  }
  
  function logout() {
    localStorage.removeItem("loggedInUser");
    window.location.href = "/autoschedule_app/templates/index.html";
  }
  
  function showSection(sectionId) {
    const sections = document.querySelectorAll("main > section");
    sections.forEach(section => {
      section.style.display = section.id === sectionId ? 'block' : 'none';
    });
  }
  
  async function fetchEvents() {
    try {
      const response = await fetch('/api/events');
      return await response.json();
    } catch (error) {
      console.error("Error fetching events:", error);
      return [];
    }
  }
  
  async function initializeCalendar() {
    const calendar = new FullCalendar.Calendar(calendarEl, {
      headerToolbar: {
        left: 'prev,next,today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      events: await fetchEvents()
    });
    calendar.render();
  }
  
  function initializeNavigation() {
    const navItems = document.querySelectorAll(".nav-item");
    navItems.forEach((navItem) => {
      navItem.addEventListener("click", () => {
        navItems.forEach((item) => {
          item.classList.remove("active");
        });
        navItem.classList.add("active");
      });
    });
  }