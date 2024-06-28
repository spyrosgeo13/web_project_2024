<?php
// Start the session
session_start();

// Check if the user is logged in
if (isset($_SESSION['user_id_logged_in'])) {
    // Extract user ID from session
    $resquer_id = $_SESSION['user_id_logged_in'];

    // Include the database connection code
    include 'connect_to_db.php';

    // Prepare the SQL query to get all requests and offers
    $sql = "
    SELECT 
        requests.request_id,
        requests.user_id,
        requests.quantity,
        requests.request_timestamp,
        requests.is_accepted,
        requests.accepted_by,
        requests.accepted_timestamp,
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
        (requests.is_accepted = 0 OR requests.accepted_by = $resquer_id)
        AND requests.is_completed = 0
    ";

    // Execute the query
    $result = $db->query($sql);

    // Check if the query was successful
    if ($result) {
        // Fetch the results and encode them as JSON
        $requests = [];
        while ($row = $result->fetch_assoc()) {
            // Convert accepted_timestamp to a formatted date/time string if it exists
            if ($row['accepted_timestamp'] !== null) {
                $row['accepted_timestamp'] = date('Y-m-d H:i:s', strtotime($row['accepted_timestamp']));
            }
            $requests[] = $row;
        }
        echo json_encode($requests);
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
