document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("add-shift-form").addEventListener("submit", function(event) {
        event.preventDefault();
        addShift();
    });

    document.getElementById("profile-form").addEventListener("submit", function(event) {
        event.preventDefault();
        saveProfile();
    });
});

function showSection(sectionId) {
    const sections = document.querySelectorAll("main > section");
    sections.forEach(section => {
        section.style.display = section.id === sectionId ? "block" : "none";
    });
}

function addShift() {
    const date = document.getElementById("shift-date").value;
    const time = document.getElementById("shift-time").value;
    const unit = document.getElementById("shift-unit").value;

    const scheduleList = document.querySelector(".schedule-list");
    const shiftItem = document.createElement("div");
    shiftItem.className = "shift-item";
    shiftItem.innerHTML = `<p>Shift on ${date} at ${time} in ${unit}</p>`;
    scheduleList.appendChild(shiftItem);

    showSection("schedule");
}

function saveProfile() {
    const name = document.getElementById("profile-name").value;
    const email = document.getElementById("profile-email").value;

    document.getElementById("user-name").textContent = name;

    alert("Profile updated!");
    showSection("dashboard");
}

function logout() {
    alert("Logged out!");
    // Implement logout functionality here
    showSection("home");
}
