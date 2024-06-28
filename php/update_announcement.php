<?php
// Start the session
session_start();

// Check if the user is logged in
if (isset($_SESSION['user_id_logged_in'])) {
    // Extract user ID from session
    $user_id = $_SESSION['user_id_logged_in'];

    // Check if the request is submitted via POST
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        // Check if the required fields are present
        if (isset($_POST["announcement_id"])) {
            // Extract announcement ID from the form data
            $announcement_id = $_POST["announcement_id"];

            // Include the database connection code
            include 'connect_to_db.php';

            // Update the announcement in the database
            $sql = "UPDATE announcements SET accepted_by_user = '1', user_id = $user_id WHERE announcement_id = $announcement_id";
            $result = $db->query($sql);

            // Check if the update was successful
            if ($result) {
                echo "Announcement accepted successfully";
            } else {
                echo "Error updating announcement: " . $db->error;
            }
        } else {
            echo "Error: Missing required fields";
        }
    } else {
        echo "Error: Form submission method not allowed";
    }
} else {
    // Redirect the user to the login page or handle the case where the user is not logged in
    header("Location: php/login_user.php");
    exit; // Ensure script execution stops after redirection
}
?>
