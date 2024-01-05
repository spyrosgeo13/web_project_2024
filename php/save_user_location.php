<?php

include 'connect_to_db.php';
session_start();
if ($_SERVER["REQUEST_METHOD"]== "POST") {
    $jsonData = file_get_contents('php://input');
    $data = json_decode($jsonData,true);

    // Access the values
    $user_id = $_SESSION['user_id_logged_in'];
    $latitude = $data['latitude'];
    $longitude = $data['longitude'];

    // Update the user's location in the database
    $updateQuery = "UPDATE users SET lat_user = '$latitude', lng_user = '$longitude' WHERE id = '$user_id'";

    if ($db->query($updateQuery) !== true) {
        die("Error updating user location: " . $db->error);
    }
    
    echo 0; // Success response

} else {
    echo "Invalid request method";


}