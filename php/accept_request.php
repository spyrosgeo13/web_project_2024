<?php
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    include 'connect_to_db.php';

    $data = json_decode(file_get_contents("php://input"), true);
    $requestId = $data['request_id'];
    $resquerId = $_SESSION['user_id_logged_in'];

    
    $sql = "UPDATE requests SET is_accepted = 1, accepted_by = $resquerId, accepted_timestamp = NOW() WHERE request_id = $requestId AND is_accepted = 0";
    if ($db->query($sql) === TRUE) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'error' => $db->error]);
    }

    $db->close();
} else {
    echo json_encode(['success' => false, 'error' => 'Invalid request method']);
}
?>
