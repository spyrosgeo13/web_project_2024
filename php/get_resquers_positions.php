<?php
// Include database connection code
include 'connect_to_db.php';

// Fetch positions of rescuers from the database along with their loads and announcements
$sql = "
    SELECT 
        users.lat_user, 
        users.lng_user, 
        users.username, 
        load_management.category_id, 
        load_management.item_id, 
        load_management.quantity, 
        announcements.item_id AS announcement_item_id, 
        announcements.quantity AS announcement_quantity 
    FROM 
        users 
    LEFT JOIN 
        load_management ON users.id = load_management.resquer_id 
    LEFT JOIN 
        announcements ON users.id = announcements.resquer_id 
        AND announcements.accepted_by_resquer = 1 
        AND announcements.is_completed = 0 
    WHERE 
        users.user_role = 2
"; // Assuming role 2 represents rescuers, adjust the query accordingly

$result = $db->query($sql);

// Check if there are any results
if ($result && $result->num_rows > 0) {
    $rescuers = array();

    // Fetch and store each rescuer's position
    while ($row = $result->fetch_assoc()) {
        $rescuer = array(
            'latitude' => $row['lat_user'], 
            'longitude' => $row['lng_user'], 
            'username' => $row['username'],
            'load' => array()
        );

        if (!empty($row['category_id']) && !empty($row['item_id']) && !empty($row['quantity'])) {
            $rescuer['load'][] = array(
                'category_id' => $row['category_id'],
                'item_id' => $row['item_id'],
                'quantity' => $row['quantity']
            );
        }

        if (!empty($row['announcement_item_id']) && !empty($row['announcement_quantity'])) {
            $rescuer['accepted_announcements'][] = array(
                'item_id' => $row['announcement_item_id'],
                'quantity' => $row['announcement_quantity']
            );
        }

        // Check if rescuer is already in the array
        $rescuerIndex = array_search($row['username'], array_column($rescuers, 'username'));
        if ($rescuerIndex === false) {
            // Add new rescuer to the array
            $rescuers[] = $rescuer;
        } else {
            // Add load and accepted announcement to existing rescuer
            if (!empty($row['category_id']) && !empty($row['item_id']) && !empty($row['quantity'])) {
                $rescuers[$rescuerIndex]['load'][] = array(
                    'category_id' => $row['category_id'],
                    'item_id' => $row['item_id'],
                    'quantity' => $row['quantity']
                );
            }
            if (!empty($row['announcement_item_id']) && !empty($row['announcement_quantity'])) {
                $rescuers[$rescuerIndex]['accepted_announcements'][] = array(
                    'item_id' => $row['announcement_item_id'],
                    'quantity' => $row['announcement_quantity']
                );
            }
        }
    }

    // Convert the array to JSON and output
    echo json_encode($rescuers);
} else {
    // No rescuers found
    echo json_encode(array());
}

$db->close();
?>

