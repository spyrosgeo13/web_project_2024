<?php
session_start();


if (isset($_SESSION['user_id_logged_in'])) {
    // Extract user ID from session
    $user_id = $_SESSION['user_id_logged_in'];

    // Include the database connection code
    include 'connect_to_db.php';

    // Check if it's a POST request
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        // Get the JSON data from the request body
        $json_data = file_get_contents('php://input');

        // Check if JSON data exists
        if ($json_data) {
            // Decode the JSON data
            $data = json_decode($json_data, true);

            // Check if latitude and longitude are present in the decoded data
            if (isset($data["latitude"]) && isset($data["longitude"])) {
                // Extract latitude and longitude
                $latitude = $data['latitude'];
                $longitude = $data['longitude'];

                // Check if the user's location exists in the database
                $sql = "SELECT * FROM users WHERE id = $user_id";
                $result = $db->query($sql);

                if ($result->num_rows > 0) {
                    // Update the user's location in the database
                    $update_sql = "UPDATE users SET lat_user = '$latitude', lng_user = '$longitude' WHERE id = $user_id";
                    $update_result = $db->query($update_sql);

                    // Check if the update was successful
                    if ($update_result) {
                        echo json_encode(array("success" => true));
                    } else {
                        echo json_encode(array("success" => false, "error" => $db->error));
                    }
                } else {
                    // Insert the user's location into the database
                    $insert_sql = "INSERT INTO users (id, lat_user, lng_user) VALUES ($user_id, '$latitude', '$longitude')";
                    $insert_result = $db->query($insert_sql);

                    // Check if the insertion was successful
                    if ($insert_result) {
                        echo json_encode(array("success" => true));
                    } else {
                        echo json_encode(array("success" => false, "error" => $db->error));
                    }
                }
            } else {
                echo json_encode(array("success" => false, "error" => "Latitude and longitude are missing in the request"));
            }
        } else {
            echo json_encode(array("success" => false, "error" => "No data received in the request"));
        }
    } elseif ($_SERVER["REQUEST_METHOD"] == "GET") {
        // Fetch the resquer's position from the database
        $sql = "SELECT lat_user, lng_user FROM users WHERE id = $user_id";
        $result = $db->query($sql);

        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            $resquer_position = array("latitude" => $row["lat_user"], "longitude" => $row["lng_user"]);
            echo json_encode($resquer_position);
        } else {
            echo json_encode(array("error" => "Resquer position not found"));
        }
    } else {
        echo json_encode(array("error" => "Form submission method not allowed"));
    }

    // Close the database connection
    $db->close();
} else {
    echo json_encode(array("error" => "User not logged in"));
}
