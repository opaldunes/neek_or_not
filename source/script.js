const onlineBtn = document.getElementById('onlineBtn');
const workBtn = document.getElementById('workBtn');

const apiKey = 'patIfaS9rxvey5yzF.ffb1ac6f25310d8d49cb12ce82ed0020effde4922d6dd636d513145d59ead35a';
const url = 'https://api.airtable.com/v0/appACEYultgfTJ5MV/button-status';

// Function to handle button click
function handleClick(event) {
    const clickedBtnId = event.target.id;
    
    // Update button classes
    if (clickedBtnId === 'onlineBtn') {
        console.log('online');
        onlineBtn.classList.add('green');
        updateButtonStatus('onlineBtn');
        workBtn.classList.remove('green');
    } else if (clickedBtnId === 'workBtn') {
        console.log('working');
        workBtn.classList.add('green');
        updateButtonStatus('workBtn');
        onlineBtn.classList.remove('green');
    }

    // Save button state to localStorage
    localStorage.setItem('selectedButton', clickedBtnId);
}

function updateButtonStatus(newStatus) {
    const url_update = url + '/rec5FOGLqoW9e7SVg'

    const requestData = {
      fields: {
        Name: newStatus
      }
    };
    
    fetch(url_update, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log('Button status updated:', data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

async function fetchButtonStatus() {
    try {
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${apiKey}`
        }
      });
  
      if (response.ok) {
        const data = await response.json();
        const record = data.records.find(record => record.id === "rec5FOGLqoW9e7SVg");
        console.log('Record:', record.fields.Name)
        return record ? record.fields.Name : null;
      } else {
        console.error('Failed to fetch button status:', response.statusText);
        }
    } catch (error) {
      console.error('Error:', error.message);
    }
}

async function main() {
    const button_status = await fetchButtonStatus();

    // Add event listeners
    onlineBtn.addEventListener('click', handleClick);
    workBtn.addEventListener('click', handleClick);

    // Check if there's a previously selected button
    const selectedButtonId = localStorage.getItem('selectedButton');
    console.log(button_status)
    if (button_status) {
        // Simulate click on the previously selected button
        document.getElementById(selectedButtonId).click();
    }
}
  
    main().catch(error => {
    console.error('An error occurred:', error);
});


