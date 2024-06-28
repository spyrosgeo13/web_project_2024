<?php

// Include the database connection file
include 'connect_to_db.php';

// Fetch requests data where is_completed = 0
$sql = "SELECT 
            requests.request_id, 
            requests.user_id,
            requests.category_id,
            requests.item_id,
            requests.request_description,
            requests.quantity,
            requests.is_accepted,
            requests.request_timestamp,
            requests.accepted_by,
            requests.accepted_timestamp,
            requests.completed_timestamp,
            requests.is_completed,
            users.user_fullname,
            users.lat_user,
            users.telephone_number,
            users.lng_user
        FROM requests 
        LEFT JOIN users ON requests.user_id = users.id 
        WHERE requests.is_completed = 0";

$result = $db->query($sql);

if ($result && $result->num_rows > 0) {
    $requests = array();

    // Fetch and store each request
    while ($row = $result->fetch_assoc()) {
        $request = array(
            'request_id' => $row['request_id'],
            'user_id' => $row['user_id'],
            'category_id' => $row['category_id'],
            'item_id' => $row['item_id'],
            'request_description' => $row['request_description'],
            'quantity' => $row['quantity'],
            'is_accepted' => $row['is_accepted'],
            'request_timestamp' => $row['request_timestamp'],
            'accepted_by' => $row['accepted_by'],
            'accepted_timestamp' => $row['accepted_timestamp'],
            'completed_timestamp' => $row['completed_timestamp'],
            'is_completed' => $row['is_completed'],
            'user_fullname' => $row['user_fullname'],
            'number' => $row['telephone_number'],
            'lat_user' => $row['lat_user'],
            'lng_user' => $row['lng_user']
        );

        $requests[] = $request;
    }

    // Convert the array to JSON and output
    echo json_encode($requests);
} else {
    // No requests found or all requests are completed
    echo json_encode(array());
}

// Close database connection
$db->close();

?>
