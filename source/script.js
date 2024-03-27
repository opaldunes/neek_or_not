
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