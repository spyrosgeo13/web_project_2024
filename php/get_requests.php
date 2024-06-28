<?php
// Start the session
session_start();

// Check if the user is logged in
if (isset($_SESSION['user_id_logged_in'])) {
    // Extract user ID from session
    $user_id = $_SESSION['user_id_logged_in'];

    // Include the database connection code
    include 'connect_to_db.php';

    // Prepare the SQL query
    $sql = "SELECT categories.category_name, items.name, requests.quantity, requests.request_timestamp, requests.is_accepted
            FROM requests
            JOIN categories ON requests.category_id = categories.id
            JOIN items ON requests.item_id = items.id
            WHERE requests.user_id = $user_id";

    // Execute the query
    $result = $db->query($sql);

    // Check if the query was successful
    if ($result) {
        // Fetch the results and encode them as JSON
        $requests = [];
        while ($row = $result->fetch_assoc()) {
            $requests[] = $row;
        }
        echo json_encode($requests);
    } else {
        // Handle the case where the query failed
        echo json_encode(['error' => $db->error]);
    }
} else {
    // Redirect the user to the login page or handle the case where the user is not logged in
    header("Location: login.php");
    exit; // Ensure script execution stops after redirection
}
?>
