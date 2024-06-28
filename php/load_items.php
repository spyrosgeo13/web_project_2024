<?php
// Include the database connection
include 'connect_to_db.php';

// Start the session (if not already started)
session_start();

// Check if the user is logged in
if (isset($_SESSION['user_id_logged_in'])) {
    // Get the user ID from session
    $resquer_id = $_SESSION['user_id_logged_in'];
    
    // Get the POST data
    $data = json_decode(file_get_contents('php://input'), true);
    $category_id = $data['category_id'];
    $item_id = $data['item_id'];
    $quantity = $data['quantity'];

    // Insert the load data into the load_management table
    $sql = "INSERT INTO load_management (resquer_id, category_id, item_id, quantity, load_timestamp) 
            VALUES ($resquer_id, $category_id, $item_id, $quantity, NOW())";

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
