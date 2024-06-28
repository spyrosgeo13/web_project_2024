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
        if (isset($_POST["category"], $_POST["item"], $_POST["quantity"])) {
            // Extract form data
            $category = $_POST["category"];
            $item_name = $_POST["item"];
            $quantity = $_POST["quantity"];
            

            // Include the database connection code
            include 'connect_to_db.php';

            // Get the ID of the item based on its name
            $item_name_escaped = mysqli_real_escape_string($db, $item_name);
            $sql = "SELECT id FROM items WHERE name = '$item_name_escaped'";
            $result = $db->query($sql);
            if ($result && $result->num_rows > 0) {
                $row = $result->fetch_assoc();
                $item_id = $row['id'];

                // Insert data into MySQL database
                $sql = "INSERT INTO announcements (admin_id, category_id, item_id, quantity) 
                        VALUES ('33', '$category', '$item_id', '$quantity')";
                if ($db->query($sql)) {
                    // Request submitted successfully
                    echo "Request submitted successfully";
                } else {
                    // Error handling if the request could not be submitted
                    echo "Error: " . $sql . "<br>" . $db->error;
                }
            } else {
                // Error handling if the item name is not found
                echo "Error: Item with name '$item_name' not found";
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
