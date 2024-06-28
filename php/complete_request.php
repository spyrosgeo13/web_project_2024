<?php
// Include database connection
include 'connect_to_db.php';

// Check if POST data is present
$data = json_decode(file_get_contents("php://input"));

// Check if request_id is provided and valid
if (isset($data->request_id) && is_numeric($data->request_id)) {
    $request_id = intval($data->request_id);

    session_start();

    // Check if user is logged in
    if (!isset($_SESSION['user_id_logged_in'])) {
        echo json_encode(['success' => false, 'error' => 'User is not logged in']);
        exit;
    }

    // Get logged-in user's ID
    $resquer_id = $_SESSION['user_id_logged_in'];

    // Update requests table to set is_completed to 1 and update completed_timestamp
    $updateRequestSql = "UPDATE requests SET is_completed = 1, completed_timestamp = NOW() WHERE request_id = $request_id AND accepted_by = $resquer_id";
    $resultUpdate = $db->query($updateRequestSql);

    if ($resultUpdate) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'error' => 'Failed to update request']);
    }
} else {
    echo json_encode(['success' => false, 'error' => 'Invalid request ID']);
}

// Close database connection
$db->close();
?>

