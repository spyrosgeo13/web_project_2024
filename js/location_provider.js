document.addEventListener('DOMContentLoaded', function () {
    // Initialize the map
    var map = L.map('map').setView([0, 0], 2); // Set initial view to center of the map

    // Add a tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    var marker = L.marker([0, 0], { draggable: true }).addTo(map);

    // Update marker position when it is dragged
    marker.on('dragend', function (event) {
        var markerLatLng = marker.getLatLng();
        console.log('New marker position:', markerLatLng);
    });

    // Geolocation
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var lat = position.coords.latitude;
            var lng = position.coords.longitude;

            // Set map view to user's location
            map.setView([lat, lng], 13); // Zoom level can be adjusted

            // Set marker to user's location
            marker.setLatLng([lat, lng]);

            console.log('User location found:', lat, lng);
        }, function (error) {
            console.error('Geolocation error:', error.message);
        });
    } else {
        console.error('Geolocation not supported by this browser.');
    }

    // Example: Call the backend script to save the location when the button is clicked
    document.getElementById('saveLocationBtn').addEventListener('click', function () {
        // Get the marker position
        var latitude = marker.getLatLng().lat;
        var longitude = marker.getLatLng().lng;

        // Send the data to the backend for saving
        var xhttp = new XMLHttpRequest();
        xhttp.open("POST", "php/save_user_location.php", true);
        xhttp.setRequestHeader('Content-Type', 'application/json');

        var data = {
            latitude: latitude,
            longitude: longitude
        };

        xhttp.onload = function () {
            if (xhttp.status === 200) {
                console.log('Location saved successfully!');
                // Show SweetAlert and redirect
                Swal.fire({
                    title: 'Success!',
                    text: 'Location saved successfully!',
                    icon: 'success',
                    confirmButtonText: 'OK'
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = 'user_main_page.html';
                    }
                });
            } else {
                console.error('Failed to save location. Status code: ' + xhttp.status);
                // Show error SweetAlert
                Swal.fire({
                    title: 'Error!',
                    text: 'Failed to save location.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        };

        xhttp.send(JSON.stringify(data));
    });
});
