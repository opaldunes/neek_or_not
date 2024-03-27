
// Register User
document.getElementById("create-button").addEventListener("click", function(event) {
    event.preventDefault(); // Prevent form submission

    // Get the username and password from the form
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    // Send a POST request to register endpoint
    fetch('/api/users/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: username, password: password })
    })
    .then(response => {
        if (response.ok) {
            alert("User registered successfully!");
        } else {
            throw new Error('Failed to register user');
        }
    })
    .catch(error => {
        console.error('Error registering user:', error);
        alert("Failed to register user. Please try again.");
    });
});

// Log-in 
document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission

    // Get the username and password from the form
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    // Send a POST request to login endpoint
    fetch('/api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: username, password: password })
    })
    .then(response => {
        if (response.ok) {
            // Redirect to homepage upon successful login
            window.location.href = "homepage.html";
        } else {
            throw new Error('Failed to login');
        }
    })
    .catch(error => {
        console.error('Error logging in:', error);
        alert("Invalid username or password. Please try again.");
    });
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