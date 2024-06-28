document.addEventListener('DOMContentLoaded', function() {
    const announcementsContainer = document.getElementById('announcementsContainer');

    // Fetch announcements data from PHP script
    fetch('php/get_announcements.php')
        .then(response => response.json())
        .then(announcements => {
            console.log('Announcements:', announcements); // Debugging: Log announcements data
            // Visualize announcements in the HTML container
            visualizeAnnouncements(announcements);
        })
        .catch(error => console.error('Error fetching announcements:', error));

    // Function to visualize announcements in the HTML container
    function visualizeAnnouncements(announcements) {
        // Clear previous content in the container
        announcementsContainer.innerHTML = '';

        // Loop through each announcement and create HTML elements to display them
        announcements.forEach(announcement => {
            const announcementDiv = document.createElement('div');
            announcementDiv.classList.add('announcement');

            // Construct HTML content for the announcement
            announcementDiv.innerHTML = `
                <h3>Announcement ID: ${announcement.announcement_id}</h3>
                <p>Category: ${announcement.category_name}</p>
                <p>Item: ${announcement.name}</p>
                <p>Quantity: ${announcement.quantity}</p>
                <p>Timestamp Made: ${announcement.timestamp_made}</p>
                <p>Accepted by User: ${announcement.accepted_by_user == '1' ? 'yes' : 'no'}</p>
                <button class="accept-button">Accept Announcement</button> <!-- Button for accepting the announcement -->
            `;

            // Add event listener to the accept button
            const acceptButton = announcementDiv.querySelector('.accept-button');
            acceptButton.addEventListener('click', function() {
                // Make AJAX request to update the accepted_by_user field
                const announcementId = announcement.announcement_id;
                fetch('php/update_announcement.php', {
                    method: 'POST',
                    body: new URLSearchParams({
                        announcement_id: announcementId
                    }),
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                })
                .then(response => response.text())
                .then(data => {
                    // Check the response from the server and update the UI accordingly
                    if (data === "Announcement accepted successfully") {
                        // Update the UI to indicate that the announcement has been accepted
                        const acceptedText = announcementDiv.querySelector('p:nth-last-child(2)');
                        acceptedText.textContent = 'Accepted by User: Yes';
                        // You can also hide or disable the accept button if needed
                        acceptButton.disabled = true;
                    } else {
                        console.error('Failed to update announcement:', data);
                    }
                })
                .catch(error => console.error('Error updating announcement:', error));
            });

            // Append the announcement HTML to the container
            announcementsContainer.appendChild(announcementDiv);
        });
    }
});
