<?php

include 'connect_to_db.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Access the values
    $username = $_POST['username'];
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT); // Hash the password

    // Perform the query to insert the new user
    $query = "INSERT INTO users (username, password, user_role) VALUES ('$username', '$password', 2)";
    $result = $db->query($query);

    if ($result) {
        echo json_encode(['status' => 'success', 'message' => 'Resquer user created successfully!']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Error creating resquer user.']);
    }
}

?>
