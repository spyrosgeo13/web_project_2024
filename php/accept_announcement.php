<?php
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    include 'connect_to_db.php';

    $data = json_decode(file_get_contents("php://input"), true);

    if (isset($data['announcement_id']) && isset($_SESSION['user_id_logged_in'])) {
        $announcement_id = $data['announcement_id'];
        $resquer_id = $_SESSION['user_id_logged_in'];

        $sql = "UPDATE announcements SET accepted_by_resquer = 1, resquer_id = ?, timestamp_accepted_resquer = NOW() WHERE announcement_id = ?";
        $stmt = $db->prepare($sql);
        $stmt->bind_param('ii', $resquer_id, $announcement_id);

        if ($stmt->execute()) {
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false, 'error' => $db->error]);
        }

        $stmt->close();
    } else {
        echo json_encode(['success' => false, 'error' => 'Invalid data or not logged in.']);
    }

    $db->close();
} else {
    echo json_encode(['success' => false, 'error' => 'Invalid request method.']);
}
?>
