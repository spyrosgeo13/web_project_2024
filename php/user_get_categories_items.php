<?php
// Include the database connection
include 'connect_to_db.php';

// Check if the request is for categories or items
if (isset($_GET['action'])) {
    $action = $_GET['action'];
    
    // Fetch categories
    if ($action === 'categories') {
        $sql = "SELECT id, category_name FROM categories";
        $result = $db->query($sql);

        if ($result->num_rows > 0) {
            // Output data of each row as JSON
            $categories = array();
            while ($row = $result->fetch_assoc()) {
                $categories[] = $row;
            }
            echo json_encode($categories);
        } else {
            echo "0 results";
        }
    }
    
    // Fetch items for the specified category
    elseif ($action === 'items' && isset($_GET['category'])) {
        $category_id = $_GET['category'];
        $sql = "SELECT id, name FROM items WHERE category_id = $category_id";
        $result = $db->query($sql);

        if ($result->num_rows > 0) {
            // Output data of each row as JSON
            $items = array();
            while ($row = $result->fetch_assoc()) {
                $items[] = $row;
            }
            echo json_encode($items);
        } else {
            echo "0 results";
        }
    } 
    else {
        echo "Invalid action";
    }
} 
else {
    echo "Action parameter is missing";
}

// Close connection
$db->close();
?>
