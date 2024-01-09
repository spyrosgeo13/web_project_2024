document.addEventListener('DOMContentLoaded', function(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(show_map);
    } else {
        Swal.fire({
            icon: "error",
            title: "User Error",
            text: "User didnt give permission to share his current location."
        });
    }
    
    function show_map(position){
        let map = L.map('map').setView([position.coords.latitude, position.coords.longitude], 10);    const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);
    }
});


    
