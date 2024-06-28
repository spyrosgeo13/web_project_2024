//document.addEventListener('DOMContentLoaded', function() {
    // Function to fetch announcements and requests data
    function fetchData() {
        // Fetch announcements
        fetch('php/get_announcements.php')
            .then(response => response.json())
            .then(announcements => {
                // Process and display announcements data
                displayAnnouncements(announcements);
            })
            .catch(error => console.error('Error fetching announcements:', error));

        // Fetch requests
        fetch('php/get_requests.php')
            .then(response => response.json())
            .then(requests => {
                // Process and display requests data
                displayRequests(requests);
            })
            .catch(error => console.error('Error fetching requests:', error));
    }

    // Function to display announcements
    function displayAnnouncements(announcements) {
        const announcementsContainer = document.getElementById('announcementsContainer');
        announcements.forEach(announcement => {
            // Create HTML elements for each announcement and append them to the container
            const announcementElement = document.createElement('div');
            announcementElement.textContent = announcement.title; // Example: Assuming 'title' is a field in your announcement object
            announcementsContainer.appendChild(announcementElement);
        });
    }
// 
    // Function to display requests
    function displayRequests(requests) {
        const requestsContainer = document.getElementById('requestsContainer');
        requests.forEach(request => {
            // Create HTML elements for each request and append them to the container
            const requestElement = document.createElement('div');
            requestElement.textContent = request.item_name; // Example: Assuming 'item_name' is a field in your request object
            requestsContainer.appendChild(requestElement);
        });
    }

    // Call the fetchData function when the page is loaded
    fetchData();
});
