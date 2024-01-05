<?php


include 'connect_to_db.php';

if($_SERVER["REQUEST_METHOD"] == "POST") {
    $jsonData = file_get_contents('php://input');
    $data = json_decode($jsonData, true);

    // Access the values
    $username = $data['username'];
    $email = $data['email'];
    $password = $data['password'];
    $telephone_number =$data['contact_info'];
    $fullname =$data['fullname'];

    $query = $db->query("SELECT * FROM users WHERE username = '$username' OR email = '$email'");

    if (mysqli_num_rows($query) != 0) {
        echo 1;
    } else {
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);

        if ($db->query("INSERT INTO users(username, email, password, telephone_number,user_role,user_fullname) VALUES ('$username', '$email', '$hashed_password','$telephone_number','1', '$fullname')") !== true) {
            die("Error in inserting data into users table: " . $db->error);
        }

        session_start();
        $get_last_id_inserted = $db->query("SELECT id FROM users WHERE username = '$username'");
        $last_id = $get_last_id_inserted->fetch_assoc()['id'];
        
        $_SESSION['user_id_logged_in']= $last_id;
        $_SESSION['status'] = true;
        echo 0;
    }
}

?>