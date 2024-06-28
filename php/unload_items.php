<?php
// Start the session
session_start();

// Include the database connection
include 'connect_to_db.php';

// Check if the user is logged in
if (isset($_SESSION['user_id_logged_in'])) {
    // Get the user ID from session
    $resquer_id = $_SESSION['user_id_logged_in'];

    // Delete all rows from load_management table for the logged-in user
    $sql = "DELETE FROM load_management 
            WHERE resquer_id = $resquer_id 
            AND unload_timestamp IS NULL";

    if ($db->query($sql) === TRUE) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'error' => $db->error]);
    }

    // Close database connection
    $db->close();
} else {
    echo json_encode(['success' => false, 'error' => 'User not logged in']);
}
?>

