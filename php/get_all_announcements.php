<?php
// Start the session
session_start();

// Check if the user is logged in
if (isset($_SESSION['user_id_logged_in'])) {
    // Extract user ID from session
    $user_id = $_SESSION['user_id_logged_in'];

    // Include the database connection code
    include 'connect_to_db.php';

    // Prepare the SQL query to get announcements
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
        ((announcements.accepted_by_user = 1 
        OR announcements.accepted_by_resquer = 1 AND announcements.resquer_id = $user_id) AND announcements.is_completed = 0)
    ";

    // Execute the query
    $result = $db->query($sql);

    // Check if the query was successful
    if ($result) {
        // Fetch the results and encode them as JSON
        $announcements = [];
        while ($row = $result->fetch_assoc()) {
            // Convert timestamps to formatted date/time strings if they exist
            if ($row['timestamp_made'] !== null) {
                $row['timestamp_made'] = date('Y-m-d H:i:s', strtotime($row['timestamp_made']));
            }
            if ($row['timestamp_accepted_user'] !== null) {
                $row['timestamp_accepted_user'] = date('Y-m-d H:i:s', strtotime($row['timestamp_accepted_user']));
            }
            if ($row['timestamp_accepted_resquer'] !== null) {
                $row['timestamp_accepted_resquer'] = date('Y-m-d H:i:s', strtotime($row['timestamp_accepted_resquer']));
            }
            $announcements[] = $row;
        }
        echo json_encode($announcements);
    } else {
        // Handle the case where the query failed
        echo json_encode(['error' => $db->error]);
    }

    $db->close();
} else {
    // Redirect the user to the login page or handle the case where the user is not logged in
    header("Location: login.php");
    exit; // Ensure script execution stops after redirection
}
?>
