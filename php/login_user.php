<?php

include 'connect_to_db.php';
session_start(); // Start the session at the beginning of the script

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $jsonData = file_get_contents('php://input');
    $data = json_decode($jsonData, true);

    // Access the values
    $username = $data['username'];
    $password = $data['password'];

    // Perform the query
    $query = "SELECT id, password, user_role FROM users WHERE username = '$username'";
    $result = $db->query($query);

    if ($result === false) {
        echo 5; // Query error
    } else {
        if ($result->num_rows === 1) {
            $row = $result->fetch_assoc();

            if (password_verify($password, $row['password'])) {
                // Set session variables
                $_SESSION['user_id_logged_in'] = $row['id'];
                $_SESSION['status'] = true;

                if ($row['user_role'] == 0) {
                    echo 0; // admin login
                } else if ($row['user_role'] == 1) {
                    echo 1; // user login
                } else if ($row['user_role'] == 2) {
                    
                    echo 2; // resquer login
                }
            } else {
                echo 3; // Wrong password
            }
        } else {
            echo 4; // Wrong username
        }
    }
}
?>
