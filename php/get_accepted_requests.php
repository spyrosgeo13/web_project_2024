<?php
// Start the session
session_start();

// Check if the user is logged in
if (!isset($_SESSION['user_id_logged_in'])) {
    echo json_encode([]);
    exit;
}

// Extract user ID from session
$resquer_id = $_SESSION['user_id_logged_in'];

// Include the database connection code
include 'connect_to_db.php';

// Execute a query to get accepted requests for the logged-in user
$sql = "
SELECT 
    requests.request_id,
    requests.user_id,
    requests.quantity,
    requests.request_description,
    requests.request_timestamp,
    requests.is_accepted,
    requests.accepted_by,
    requests.accepted_timestamp,
    requests.is_completed,  -- Include the is_completed column
    users.lat_user AS latitude,
    users.lng_user AS longitude,
    categories.category_name AS category,
    items.name AS item,
    users.username,
    users.telephone_number
FROM 
    requests
JOIN 
    categories ON requests.category_id = categories.id
JOIN 
    items ON requests.item_id = items.id
JOIN 
    users ON requests.user_id = users.id
WHERE 
    requests.is_accepted = 1 
    AND requests.accepted_by = $resquer_id
    AND requests.is_completed = 0  -- Filter out completed requests
";

$result = $db->query($sql);

// Check if there are results
if ($result && $result->num_rows > 0) {
    $accepted_requests = [];
    while ($row = $result->fetch_assoc()) {
        // Convert accepted_timestamp to a formatted date/time string if it exists
        if ($row['accepted_timestamp'] !== null) {
            $row['accepted_timestamp'] = date('Y-m-d H:i:s', strtotime($row['accepted_timestamp']));
        }
        $accepted_requests[] = $row;
    }
    echo json_encode($accepted_requests);
} else {
    echo json_encode([]); // Return an empty array if no accepted requests found
}

$db->close();
?>

