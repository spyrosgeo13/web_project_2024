document.addEventListener('DOMContentLoaded', function () {
    // Initialize the map
    var map = L.map('map').setView([0, 0], 2); // Set initial view to center of the map

    // Add a tile layer (you may need to replace the URL with a suitable one for your application)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    var marker = L.marker([0, 0], { draggable: true }).addTo(map);

    // Update marker position when it is dragged
    marker.on('dragend', function (event) {
        var markerLatLng = marker.getLatLng();
        console.log('New marker position:', markerLatLng);
    });

    // Example: Call the backend script to save the location when the button is clicked
    document.getElementById('saveLocationBtn').addEventListener('click', function () {
        // Get the  marker position
        
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
            } else {
                console.error('Failed to save location. Status code: ' + xhttp.status);
            }
        };

        xhttp.send(JSON.stringify(data));
    });
});