document.addEventListener('DOMContentLoaded', function() {
    const requestsContainer = document.getElementById('requestsContainer');

    // Fetch user's requests from the backend
    fetch('php/get_requests.php')
        .then(response => response.json())
        .then(requests => {
            // Check if there are any requests
            if (requests.length > 0) {
                // Create HTML elements for each request
                requests.forEach(request => {
                    const requestElement = document.createElement('div');
                    requestElement.classList.add('request');

                    // Construct the HTML content for the request
                    const htmlContent = `
                        <h3>Category: ${request.category_name}</h3>
                        <p>Item: ${request.name}</p>
                        <p>Quantity: ${request.quantity}</p>
                        <p>Request Timestamp: ${request.request_timestamp}</p>
                        <p>Is Accepted: ${request.is_accepted == '1' ? 'YES' : 'NO'}</p>

                    `;

                    // Set the HTML content for the request element
                    requestElement.innerHTML = htmlContent;

                    // Append the request element to the container
                    requestsContainer.appendChild(requestElement);
                });
            } else {
                // If no requests found, display a message
                requestsContainer.innerHTML = '<p>No requests found.</p>';
            }
        })
        .catch(error => console.error('Error fetching user requests:', error));
});
