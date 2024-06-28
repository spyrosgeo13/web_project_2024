<?php
// Include database connection
include 'connect_to_db.php';

// Check if POST data is present
$data = json_decode(file_get_contents("php://input"));

// Check if announcement_id is provided and valid
if (isset($data->announcement_id) && is_numeric($data->announcement_id)) {
    $announcement_id = intval($data->announcement_id);

    // Update is_accepted to 0 in announcements table
    $updateAnnouncementSql = "UPDATE announcements SET accepted_by_resquer = 0 WHERE announcement_id = $announcement_id";
    $resultUpdate = $db->query($updateAnnouncementSql);

    if ($resultUpdate) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'error' => 'Failed to cancel announcement']);
    }
} else {
    echo json_encode(['success' => false, 'error' => 'Invalid announcement ID']);
}

// Close database connection
$db->close();
?>
