auth0.createAuth0Client({
    domain: "dev-q2uoeptszv4xfljl.eu.auth0.com",
    clientId: "XUzajVRXoDxADinp4Xz6BdZJlDlC6yJH",
    authorizationParams: {
      redirect_uri: window.location.origin
    }
}).then(async (auth0Client) => {
  // Assumes a button with id "login" in the DOM
  const loginButton = document.getElementById("login");

  loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    auth0Client.loginWithRedirect();
  });

  if (location.search.includes("state=") && 
      (location.search.includes("code=") || 
      location.search.includes("error="))) {
    await auth0Client.handleRedirectCallback();
    window.history.replaceState({}, document.title, "/");
  }

  // Assumes a button with id "logout" in the DOM
  const logoutButton = document.getElementById("logout");

  logoutButton.addEventListener("click", (e) => {
    e.preventDefault();
    auth0Client.logout();
  });

  const isAuthenticated = await auth0Client.isAuthenticated();
  const userProfile = await auth0Client.getUser();

  // Assumes an element with id "profile" in the DOM
  const profileElement = document.getElementById("profile");

  if (isAuthenticated) {
    profileElement.style.display = "block";
    profileElement.innerHTML = `
            <p>${userProfile.name}</p>
            <img src="${userProfile.picture}" />
          `;
  } else {
    profileElement.style.display = "none";
  }
});






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