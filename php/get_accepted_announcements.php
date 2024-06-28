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

// Construct the SQL query to get accepted announcements for the logged-in user
$sql = "
SELECT 
    announcements.announcement_id,
    announcements.admin_id,
    announcements.category_id,
    announcements.item_id,
    announcements.quantity,
    announcements.resquer_id,
    announcements.user_id,
    announcements.accepted_by_user,
    announcements.accepted_by_resquer,
    announcements.timestamp_made,
    announcements.timestamp_accepted_user,
    announcements.timestamp_accepted_resquer,
    announcements.is_completed,  -- Include the is_completed column
    users.lat_user AS latitude,
    users.lng_user AS longitude,
    categories.category_name AS category,
    items.name AS item,
    users.username,
    users.telephone_number
FROM 
    announcements
JOIN 
    categories ON announcements.category_id = categories.id
JOIN 
    items ON announcements.item_id = items.id
JOIN 
    users ON announcements.user_id = users.id
WHERE 
    announcements.accepted_by_resquer = 1 AND announcements.resquer_id = $resquer_id
    AND announcements.is_completed = 0  -- Filter out completed announcements
";

// Execute the query
$result = $db->query($sql);

// Check if there are results for accepted announcements
if ($result && $result->num_rows > 0) {
    $accepted_announcements = [];
    while ($row = $result->fetch_assoc()) {
        // Convert timestamps to formatted date/time strings if they exist
        if ($row['timestamp_accepted_user'] !== null) {
            $row['timestamp_accepted_user'] = date('Y-m-d H:i:s', strtotime($row['timestamp_accepted_user']));
        }
        if ($row['timestamp_accepted_resquer'] !== null) {
            $row['timestamp_accepted_resquer'] = date('Y-m-d H:i:s', strtotime($row['timestamp_accepted_resquer']));
        }
        $accepted_announcements[] = $row;
    }
} else {
    $accepted_announcements = [];
}

// Close the database connection
$db->close();

// Encode the accepted announcements as JSON and return them
echo json_encode($accepted_announcements);
?>

