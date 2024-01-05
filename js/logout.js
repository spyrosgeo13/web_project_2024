// Add an event listener to the logout link
const logoutLink = document.querySelector(".logout");
logoutLink.addEventListener("click", logout);

// Function to handle the logout
function logout(event) {
  let xhttp = new XMLHttpRequest();
  let url = "php/logout.php";
  let method = "GET";

  xhttp.open(method, url, true);
  xhttp.setRequestHeader('Content-Type', 'application/json');

  xhttp.onload = function() {
    if (xhttp.status === 200) {
        console.log(xhttp.responseText);
    }
  }
  event.preventDefault(); // Prevent the default link behavior

  // Perform any necessary logout operations here

  // Redirect to the login page
  window.location.href = "login.html";
}