document.addEventListener('DOMContentLoaded', function () {
    var map = L.map('map').setView([0, 0], 2);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    var baseLocationMarker; // Variable to store the base location marker
    var rescuerMarkers = []; // Array to store markers for rescuers
    var requestMarkers = []; 
    var announcementMarkers= [];// Array to store markers for requests

    // Fetch the base location from the server when the map is loaded
    fetch('php/save_and_get_base_location.php') 
        .then(response => response.json())
        .then(data => {
            // Check if the response contains valid location data
            if (data && data.baseLocation && data.baseLocation.latitude && data.baseLocation.longitude) {
                var baseLocation = L.latLng(data.baseLocation.latitude, data.baseLocation.longitude);

                // Create a marker with a home icon at the base location
                var homeIcon = L.icon({
                    iconUrl: 'Images/home.png', // Replace with the path to your home icon
                    iconSize: [32, 32],
                    iconAnchor: [16, 32],
                    popupAnchor: [0, -32]
                });

                baseLocationMarker = L.marker(baseLocation, { icon: homeIcon }).addTo(map);
                baseLocationMarker.bindPopup('Your Base Location').openPopup();

                // Set the map's view to the base location
                map.setView(baseLocation, 15); // Adjust the zoom level as needed
            } else {
                console.log('Base location not available.');
            }
        })
        .catch(error => {
            console.error('Error fetching base location:', error);
        });

    // Fetch positions of rescuers from the server
    fetch('php/get_resquers_positions.php')
        .then(response => response.json())
        .then(rescuers => {
            console.log('rescuers:', rescuers); // Debugging: Log rescuers data
            // Visualize rescuers' positions on the map
            visualizeRescuers(rescuers);
        })
        .catch(error => console.error('Error fetching rescuers positions:', error));

    // Fetch requests data from the server
    fetch('php/get_requests_data.php')
        .then(response => response.json())
        .then(requests => {
            console.log('requests:', requests); // Debugging: Log requests data
            // Visualize requests' positions on the map
            visualizeRequests(requests);
        })
        .catch(error => console.error('Error fetching requests:', error));

    // Function to visualize rescuers' positions on the map
    function visualizeRescuers(rescuers) {
        rescuers.forEach(rescuer => {
            var rescuerLatLng = L.latLng(rescuer.latitude, rescuer.longitude);

            // Create a custom icon for the rescuer marker
            var rescuerIcon = L.icon({
                iconUrl: 'images/vehicle.png', // Replace with the path to your rescuer icon
                iconSize: [32, 32],
                iconAnchor: [16, 32],
                popupAnchor: [0, -32]
            });

            // Create a marker for the rescuer and add it to the map
            var rescuerMarker = L.marker(rescuerLatLng, { icon: rescuerIcon }).addTo(map);

            // Create popup content with rescuer information
            var popupContent = `<b>Rescuer: ${rescuer.username}</b><br>`;

            // Add load information
            if (rescuer.load && rescuer.load.length > 0) {
                popupContent += '<b>Load:</b><br>';
                rescuer.load.forEach(loadItem => {
                    popupContent += `Item: ${loadItem.item_id}, Quantity: ${loadItem.quantity}<br>`;
                });
            } else {
                popupContent += '<b>Load:</b> None<br>';
            }

            // Add accepted announcements information
            if (rescuer.accepted_announcements && rescuer.accepted_announcements.length > 0) {
                popupContent += '<b>Accepted Announcements:</b><br>';
                rescuer.accepted_announcements.forEach(announcement => {
                    popupContent += `Item: ${announcement.item_id}, Quantity: ${announcement.quantity}<br>`;
                });
            } else {
                popupContent += '<b>Accepted Announcements:</b> None<br>';
            }

            rescuerMarker.bindPopup(popupContent);

            // Add the rescuer marker to the array
            rescuerMarkers.push(rescuerMarker);
        });
    }
    fetch('php/get_announcements_data.php')
    .then(response => response.json())
    .then(announcements => {
        console.log('announcements:', announcements); // Debugging: Log announcements data
        // Visualize announcements' positions on the map
        visualizeAnnouncements(announcements);
    })
    .catch(error => console.error('Error fetching announcements:', error));

    function visualizeAnnouncements(announcements) {
    announcements.forEach(announcement => {
        var announcementLatLng = L.latLng(announcement.lat_user, announcement.lng_user);

        // Determine marker color based on accepted_by_resquer value
        var markerIconUrl = 'Images/red_balloon.png'; // Default to red icon
        if (announcement.accepted_by_resquer === '1') {
            markerIconUrl = 'Images/green_balloon.png'; // Use green icon if accepted_by_resquer is 1
        }

        // Create a marker for the announcement and add it to the map
        var announcementMarker = L.marker(announcementLatLng, { 
            icon: L.icon({
                iconUrl: markerIconUrl,
                iconSize: [32, 32],
                iconAnchor: [16, 32],
                popupAnchor: [0, -32]
            })
        }).addTo(map);

        // Create popup content with announcement information
        var popupContent = `<b>Announcement ID: ${announcement.announcement_id}</b><br>`;
        popupContent += `<b>User: ${announcement.user_fullname}</b><br>`;
        popupContent += `<b>Description: ${announcement.request_description}</b><br>`;
        popupContent += `<b>Quantity: ${announcement.quantity}</b><br>`;
        popupContent += `<b>Timestamp: ${announcement.timestamp_made}</b><br>`;

        if (announcement.accepted_by_resquer === '1') {
            popupContent += `<b>Accepted By: ${announcement.accepted_by_user}</b><br>`;
            popupContent += `<b>Accepted Timestamp: ${announcement.timestamp_accepted_user}</b><br>`;
        }

        announcementMarker.bindPopup(popupContent);

        // Add the announcement marker to the array
        announcementMarkers.push(announcementMarker);
    });
}

    // Function to visualize requests' positions on the map
    function visualizeRequests(requests) {
        requests.forEach(request => {
            var requestLatLng = L.latLng(request.lat_user, request.lng_user);
    
            // Determine marker icon based on is_accepted value
            var markerIconUrl = request.is_accepted === '0' ? 'Images/red_one.png' : 'Images/green_one.png';
    
            // Create a custom icon for the request marker
            var requestIcon = L.icon({
                iconUrl: markerIconUrl,
                iconSize: [32, 32], // Adjust the size of the icon as needed
                iconAnchor: [16, 32], // Position of the icon relative to its marker point
                popupAnchor: [0, -32] // Position of the popup relative to the icon
            });
    
            // Create a marker for the request and add it to the map
            var requestMarker = L.marker(requestLatLng, { icon: requestIcon }).addTo(map);
    
            // Create popup content with request information
            var popupContent = `<b>Request ID: ${request.request_id}</b><br>`;
            popupContent += `<b>User: ${request.user_fullname}</b><br>`;
            popupContent += `<b>Description: ${request.request_description}</b><br>`;
            popupContent += `<b>Quantity: ${request.quantity}</b><br>`;
            popupContent += `<b>Timestamp: ${request.request_timestamp}</b><br>`;
            popupContent += `<b>TTel:: ${request.number}</b><br>`;
    
            if (request.is_accepted === '1') {
                popupContent += `<b>Accepted By: ${request.accepted_by}</b><br>`;
                popupContent += `<b>Accepted Timestamp: ${request.accepted_timestamp}</b><br>`;
            }
    
            requestMarker.bindPopup(popupContent);
    
            // Add the request marker to the array
            requestMarkers.push(requestMarker);
        });
    }
    

    // Create a Leaflet control with the button
    var chooseLocationControl = L.control({ position: 'topright' });

    chooseLocationControl.onAdd = function (map) {
        var container = L.DomUtil.create('div', 'choose-location-control');

        var button = L.DomUtil.create('button', 'choose-location-button', container);
        button.innerHTML = 'Choose the Location of the Base';

        // Add click event listener to the button
        button.addEventListener('click', function () {
            enableDraggableMarker();
        });

        return container;
    };

    chooseLocationControl.addTo(map);

    // Function to enable the draggable marker
    function enableDraggableMarker() {
        // Remove any existing marker
        if (baseLocationMarker) {
            map.removeLayer(baseLocationMarker);
        }

        // Create a new marker at the map center
        baseLocationMarker = L.marker(map.getCenter(), { draggable: true }).addTo(map);
        baseLocationMarker.bindPopup('Drag me to choose the base location').openPopup();

        // Update the base location when the marker is dragged
        baseLocationMarker.on('dragend', function (e) {
            var draggedLatLng = baseLocationMarker.getLatLng();
            console.log('Chosen Location:', draggedLatLng);

            // You can store the dragged location for later use
            // For example, update the baseLocation variable
            baseLocation = draggedLatLng;

            // Ask for confirmation before saving the data
            var confirmation = window.confirm('Do you want to save the chosen location?');
            if (confirmation) {
                saveBaseLocation(draggedLatLng);
            }
        });
    }

    // Function to save the base location in the database
    function saveBaseLocation(location) {
        var data = {
            latitude: location.lat,
            longitude: location.lng
        };

        // Send an AJAX request to save the data
        fetch('php/save_and_get_base_location.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Server Response:', data);
            alert('Base location saved successfully!');
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error saving base location.');
        });
    }

    // Add more map-related functionality as needed
});
