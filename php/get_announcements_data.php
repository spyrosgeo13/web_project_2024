<?php

// Include the database connection file
include 'connect_to_db.php';

// Fetch announcements data where is_completed = 0
$sql = "SELECT 
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
            announcements.completed_timestamp,
            announcements.is_completed,
            users.user_fullname,
            users.lat_user,
            users.lng_user
        FROM announcements 
        LEFT JOIN users ON announcements.user_id = users.id 
        WHERE announcements.is_completed = 0";

$result = $db->query($sql);

if ($result && $result->num_rows > 0) {
    $announcements = array();

    // Fetch and store each announcement
    while ($row = $result->fetch_assoc()) {
        $announcement = array(
            'announcement_id' => $row['announcement_id'],
            'admin_id' => $row['admin_id'],
            'category_id' => $row['category_id'],
            'item_id' => $row['item_id'],
            'quantity' => $row['quantity'],
            'resquer_id' => $row['resquer_id'],
            'user_id' => $row['user_id'],
            'accepted_by_user' => $row['accepted_by_user'],
            'accepted_by_resquer' => $row['accepted_by_resquer'],
            'timestamp_made' => $row['timestamp_made'],
            'timestamp_accepted_user' => $row['timestamp_accepted_user'],
            'timestamp_accepted_resquer' => $row['timestamp_accepted_resquer'],
            'completed_timestamp' => $row['completed_timestamp'],
            'is_completed' => $row['is_completed'],
            'user_fullname' => $row['user_fullname'],
            'lat_user' => $row['lat_user'],
            'lng_user' => $row['lng_user']
        );

        $announcements[] = $announcement;
    }

    // Convert the array to JSON and output
    echo json_encode($announcements);
} else {
    // No announcements found or all announcements are completed
    echo json_encode(array());
}

// Close database connection
$db->close();

?>
