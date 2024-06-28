<?php
// Include database connection
include 'connect_to_db.php';

// Check if POST data is present
$data = json_decode(file_get_contents("php://input"));

// Check if announcement_id is provided and valid
if (isset($data->announcement_id) && is_numeric($data->announcement_id)) {
    $announcement_id = intval($data->announcement_id);

    // Start session
    session_start();

    // Check if user is logged in
    if (!isset($_SESSION['user_id_logged_in'])) {
        echo json_encode(['success' => false, 'error' => 'User is not logged in']);
        exit;
    }

    // Get logged-in user's ID
    $resquer_id = $_SESSION['user_id_logged_in'];

    // Update announcements table
    $updateAnnouncementSql = "UPDATE announcements SET completed_timestamp = NOW(), is_completed = 1 WHERE announcement_id = $announcement_id AND resquer_id = $resquer_id";
    $resultUpdate = $db->query($updateAnnouncementSql);

    if ($resultUpdate) {
        // Get announcement details
        $getAnnouncementSql = "SELECT * FROM announcements WHERE announcement_id = $announcement_id";
        $resultAnnouncement = $db->query($getAnnouncementSql);

        if ($resultAnnouncement && $resultAnnouncement->num_rows > 0) {
            $announcement = $resultAnnouncement->fetch_assoc();

            // Insert into load_management table
            $insertLoadSql = "INSERT INTO load_management (resquer_id, category_id, item_id, quantity, load_timestamp)
                            VALUES ({$announcement['resquer_id']}, {$announcement['category_id']}, {$announcement['item_id']}, {$announcement['quantity']}, NOW())";
            $resultInsert = $db->query($insertLoadSql);

            if ($resultInsert) {
                echo json_encode(['success' => true]);
            } else {
                echo json_encode(['success' => false, 'error' => 'Failed to insert into load_management']);
            }
        } else {
            echo json_encode(['success' => false, 'error' => 'Announcement not found']);
        }
    } else {
        echo json_encode(['success' => false, 'error' => 'Failed to update announcement']);
    }
} else {
    echo json_encode(['success' => false, 'error' => 'Invalid announcement ID']);
}

// Close database connection
$db->close();
?>
