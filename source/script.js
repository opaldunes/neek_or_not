

// Log-in 
document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission

    // Get the username and password from the form
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    var isAuthenticated = false;

    // Check if the username and password are valid
    if ((username === "miguel" || username === "monty") && password === "brawl") {
        isAuthenticated = true;
    }

    if (isAuthenticated) {
        // Hide login form
        document.getElementById("login-container").style.display = "none";
        // Display main content
        document.getElementById("main-content").style.display = "block";
    } else {
        // Display error message or handle unsuccessful login
        alert("Invalid username or password. Please try again.");
    }
});

// Main Page

const onlineBtn = document.getElementById('onlineBtn');
const workBtn = document.getElementById('workBtn');

// Function to handle button click
function handleClick(event) {
    const clickedBtnId = event.target.id;
    
    // Update button classes
    if (clickedBtnId === 'onlineBtn') {
        onlineBtn.classList.add('green');
        workBtn.classList.remove('green');
    } else if (clickedBtnId === 'workBtn') {
        workBtn.classList.add('green');
        onlineBtn.classList.remove('green');
    }

    // Save button state to localStorage
    localStorage.setItem('selectedButton', clickedBtnId);
}

// Add event listeners
onlineBtn.addEventListener('click', handleClick);
workBtn.addEventListener('click', handleClick);

// Check if there's a previously selected button
const selectedButtonId = localStorage.getItem('selectedButton');
if (selectedButtonId) {
    // Simulate click on the previously selected button
    document.getElementById(selectedButtonId).click();
}