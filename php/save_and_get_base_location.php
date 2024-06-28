<?php

// Assuming you have a database connection in connect_to_db.php
include 'connect_to_db.php';

// Access the values sent in the POST request
$data = json_decode(file_get_contents('php://input'), true);

// Check if it's a POST request for saving the location
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Extract latitude and longitude
    $latitude = $data['latitude'];
    $longitude = $data['longitude'];

    // Perform the query to save the base location in the database
    $query = "INSERT INTO bases (latitude, longitude) VALUES ('$latitude', '$longitude')";
    $result = $db->query($query);

    if ($result) {
        echo json_encode(['status' => 'success', 'message' => 'Base location saved successfully!']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Error saving base location.']);
    }
} else if ($_SERVER["REQUEST_METHOD"] == "GET") {
    // Check if it's a GET request for retrieving the location
    $query = "SELECT * FROM bases ORDER BY id DESC LIMIT 1";
    $result = $db->query($query);

    if ($result && $result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $baseLocation = ['latitude' => $row['latitude'], 'longitude' => $row['longitude']];
        echo json_encode(['status' => 'success', 'baseLocation' => $baseLocation]);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Base location not found.']);
    }
}

?>

