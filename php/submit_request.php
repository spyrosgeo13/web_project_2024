<?php
// Start the session
session_start();

// Check if the user is logged in
if (isset($_SESSION['user_id_logged_in'])) {
    // Extract user ID from session
    $user_id = $_SESSION['user_id_logged_in'];

    // Check if the form is submitted
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        // Check if all required fields are present
        if (isset($_POST["category"], $_POST["item"], $_POST["quantity"], $_POST["description"])) {
            // Extract form data
            $category = $_POST["category"];
            $item_name = $_POST["item"]; // Get item name instead of item ID
            $quantity = $_POST["quantity"];
            $description = $_POST["description"];

            // Include the database connection code
            include 'connect_to_db.php';

            // Get the ID of the item based on its name
            $item_id_query = "SELECT id FROM items WHERE name = '$item_name'";
            $item_id_result = $db->query($item_id_query);
            if ($item_id_result && $item_id_result->num_rows > 0) {
                $row = $item_id_result->fetch_assoc();
                $item_id = $row['id'];

                // Insert data into MySQL database
                $sql = "INSERT INTO requests (user_id, category_id, item_id, quantity, request_description) 
                        VALUES ('$user_id', '$category', '$item_id', '$quantity', '$description')";
                if ($db->query($sql)) {
                    // Request submitted successfully
                    echo "Request submitted successfully";
                } else {
                    // Error handling if the request could not be submitted
                    echo "Error: " . $sql . "<br>" . $db->error;
                }
            } else {
                // Handle case where item name does not exist
                echo "Error: Item name not found";
            }
        } else {
            // Handle case where required fields are missing
            echo "Error: Missing required fields";
        }
    } else {
        // Handle case where the form is not submitted via POST request
        echo "Error: Form submission method not allowed";
    }
} else {
    // Redirect the user to the login page or handle the case where the user is not logged in
    header("Location: php/login_user.php");
    exit; // Ensure script execution stops after redirection
}
?>
