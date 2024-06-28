<?php
// Include the database connection
include 'connect_to_db.php';

// Start the session (if not already started)
session_start();

// Check if the user is logged in
if (isset($_SESSION['user_id_logged_in'])) {
    // Get the user ID from session
    $resquer_id = $_SESSION['user_id_logged_in'];

    // Fetch loaded items for the logged-in user
    $sql = "SELECT lm.id, i.name AS item_name, lm.quantity, lm.load_timestamp, lm.unload_timestamp
            FROM load_management lm
            INNER JOIN items i ON lm.item_id = i.id
            WHERE lm.resquer_id = $resquer_id";
    
    $result = $db->query($sql);

    if ($result->num_rows > 0) {
        $loadedItems = array();
        while ($row = $result->fetch_assoc()) {
            $loadedItems[] = $row;
        }
        echo json_encode($loadedItems);
    } else {
        echo json_encode([]); // No loaded items found
    }

    // Close database connection
    $db->close();
} else {
    echo json_encode(['success' => false, 'error' => 'User not logged in']);
}
?>
