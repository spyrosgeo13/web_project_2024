document.addEventListener('DOMContentLoaded', function () {
    var map = L.map('map').setView([0, 0], 2);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    var baseLocationMarker;
    var resquerMarker;
    var requestMarkers = [];
    var announcementMarkers = [];

    fetchBaseLocation();
    fetchResquerPosition();
    fetchRequests();
    fetchAnnouncements();

    var chooseLocationControl = L.control({ position: 'topright' });

    chooseLocationControl.onAdd = function (map) {
        var container = L.DomUtil.create('div', 'choose-location-control');
        var button = L.DomUtil.create('button', 'choose-location-button', container);
        button.innerHTML = 'Choose Your Location';

        button.addEventListener('click', function () {
            enableDraggableMarker();
        });

        return container;
    };

    chooseLocationControl.addTo(map);

    function enableDraggableMarker() {
        if (resquerMarker) {
            map.removeLayer(resquerMarker);
        }

        resquerMarker = L.marker(map.getCenter(), { draggable: true }).addTo(map);
        resquerMarker.bindPopup('Drag me to choose your location').openPopup();

        resquerMarker.on('dragend', function (e) {
            var draggedLatLng = resquerMarker.getLatLng();
            saveResquerLocation(draggedLatLng);
        });
    }

    function saveResquerLocation(location) {
        var data = {
            latitude: location.lat,
            longitude: location.lng
        };

        fetch('php/save_and_get_resquer_position.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
            alert('Your location has been saved successfully!');
            fetchResquerPosition();
        })
        .catch(error => {
            alert('Error saving your location.');
        });
    }

    function fetchBaseLocation() {
        fetch('php/save_and_get_base_location.php')
            .then(response => response.json())
            .then(data => {
                if (data && data.baseLocation && data.baseLocation.latitude && data.baseLocation.longitude) {
                    var baseLocation = L.latLng(data.baseLocation.latitude, data.baseLocation.longitude);

                    var homeIcon = L.icon({
                        iconUrl: 'Images/home.png',
                        iconSize: [32, 32],
                        iconAnchor: [16, 32],
                        popupAnchor: [0, -32]
                    });

                    if (!baseLocationMarker) {
                        baseLocationMarker = L.marker(baseLocation, { icon: homeIcon }).addTo(map);
                        baseLocationMarker.bindPopup('Your Base Location').openPopup();
                        map.setView(baseLocation, 15);
                    }
                } else {
                    console.log('Base location not available.');
                }
            })
            .catch(error => {
                console.error('Error fetching base location:', error);
            });
    }

    function fetchResquerPosition() {
        fetch('php/save_and_get_resquer_position.php')
            .then(response => response.json())
            .then(data => {
                if (data && data.latitude && data.longitude) {
                    var resquerLatLng = L.latLng(data.latitude, data.longitude);

                    if (resquerMarker) {
                        resquerMarker.setLatLng(resquerLatLng).update();
                    } else {
                        var resquerIcon = L.icon({
                            iconUrl: 'Images/vehicle.png',
                            iconSize: [32, 32],
                            iconAnchor: [16, 32],
                            popupAnchor: [0, -32]
                        });

                        resquerMarker = L.marker(resquerLatLng, { icon: resquerIcon }).addTo(map);
                    }
                    resquerMarker.bindPopup('Your Location').openPopup();
                } else {
                    console.log('Resquer position not available.');
                }
            })
            .catch(error => {
                console.error('Error fetching resquer position:', error);
            });
    }

    function fetchRequests() {
        fetch('php/get_all_requests.php')
            .then(response => response.json())
            .then(data => {
                if (data && Array.isArray(data)) {
                    requestMarkers.forEach(marker => map.removeLayer(marker));
                    requestMarkers = [];

                    data.forEach(request => {
                        var requestLatLng = L.latLng(request.latitude, request.longitude);
                        var requestIcon = request.is_accepted === '1' ? 
                            L.icon({ iconUrl: 'Images/green_one.png', iconSize: [32, 32], iconAnchor: [16, 32], popupAnchor: [0, -32] }) :
                            L.icon({ iconUrl: 'Images/red_one.png', iconSize: [32, 32], iconAnchor: [16, 32], popupAnchor: [0, -32] });

                        var marker = L.marker(requestLatLng, { icon: requestIcon }).addTo(map);

                        var popupContent = `
                            <b>Request</b><br>
                            Name: ${request.username}<br>
                            Phone: ${request.telephone_number}<br>
                            Item: ${request.item}<br>
                            Quantity: ${request.quantity}<br>
                            Date: ${request.request_timestamp}<br>
                        `;
                        if (request.is_accepted === '0') {
                            popupContent += `<button class="accept-request-button" data-request-id="${request.request_id}">Accept Request</button>`;
                        }

                        marker.bindPopup(popupContent);
                        requestMarkers.push(marker);
                    });
                } else {
                    console.log('No requests found.');
                }
            })
            .catch(error => {
                console.error('Error fetching requests:', error);
            });
    }

    function fetchAnnouncements() {
        fetch('php/get_all_announcements.php')
            .then(response => response.json())
            .then(data => {
                console.log('Announcements data:', data); // Add this line to log the fetched data
                if (data && Array.isArray(data)) {
                    announcementMarkers.forEach(marker => map.removeLayer(marker));
                    announcementMarkers = [];
    
                    data.forEach(announcement => {
                        var announcementLatLng = L.latLng(announcement.latitude, announcement.longitude);
                        var announcementIcon = announcement.accepted_by_resquer === '1' ? 
                            L.icon({ iconUrl: 'Images/green_one.png', iconSize: [32, 32], iconAnchor: [16, 32], popupAnchor: [0, -32] }) :
                            L.icon({ iconUrl: 'Images/red_balloon.png', iconSize: [32, 32], iconAnchor: [16, 32], popupAnchor: [0, -32] });
    
                        var marker = L.marker(announcementLatLng, { icon: announcementIcon }).addTo(map);
    
                        var popupContent = `
                            <b>Announcement</b><br>
                            Name: ${announcement.username}<br>
                            Phone: ${announcement.telephone_number}<br>
                            Item: ${announcement.item}<br>
                            Quantity: ${announcement.quantity}<br>
                            Date: ${announcement.timestamp_made}<br>
                        `;
                        if (announcement.accepted_by_resquer === '0') {
                            popupContent += `<button class="accept-announcement-button" data-announcement-id="${announcement.announcement_id}">Accept Announcement</button>`;
                        } else {
                            popupContent += `<br>Accepted at: ${announcement.timestamp_accepted_resquer}`;
                        }
    
                        marker.bindPopup(popupContent);
                        announcementMarkers.push(marker);
                    });
                } else {
                    console.log('No announcements found.');
                }
            })
            .catch(error => {
                console.error('Error fetching announcements:', error);
            });
    }

    function acceptRequest(requestId) {
        fetch('php/accept_request.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ request_id: requestId }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Request accepted successfully!');
                fetchRequests();
            } else {
                alert('Failed to accept request.');
            }
        })
        .catch(error => {
            console.error('Error accepting request:', error);
        });
    }

    function acceptAnnouncement(announcementId) {
        fetch('php/accept_announcement.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ announcement_id: announcementId }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Announcement accepted successfully!');
                fetchAnnouncements();
            } else {
                alert('Failed to accept announcement.');
            }
        })
        .catch(error => {
            console.error('Error accepting announcement:', error);
        });
    }

    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('accept-request-button')) {
            var requestId = event.target.dataset.requestId;
            acceptRequest(requestId);
        }
        if (event.target.classList.contains('accept-announcement-button')) {
            var announcementId = event.target.dataset.announcementId;
            acceptAnnouncement(announcementId);
        }
    });
});
