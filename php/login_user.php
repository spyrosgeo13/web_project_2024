<?php

include 'connect_to_db.php';

if($_SERVER["REQUEST_METHOD"] == "POST") {
    $jsonData = file_get_contents('php://input');
    $data = json_decode($jsonData, true);

    // Access the values
    $username = $data['username'];
    $password = $data['password'];

    $query = $db->query("SELECT * FROM users WHERE username = '$username'");

    if(mysqli_num_rows($query) === 1) {
        $row = mysqli_fetch_assoc($query);

        if(password_verify($password, $row['password'])) {
            

            $user_id = $row['id'];
            $role_id = $db->query("SELECT id_role FROM user_roles WHERE id_user='$user_id'");
            $row = mysqli_fetch_assoc($role_id);

            if($row['id_role'] == 0) {
                echo 0; //user login
                $_SESSION['user_id_logged_in']= $user_id;
                $_SESSION['status'] = true;
                session_start();
            } else {
                echo 1; //admin login
                session_start();
                $_SESSION['user_id_logged_in']= $user_id;
                $_SESSION['status'] = true;
            }
        } else {
            echo 2; //wrong pass
            $_SESSION['status'] = false;
        }
    } else {
        echo 3; // wrong username
        $_SESSION['status'] = false;
    }

}

?>