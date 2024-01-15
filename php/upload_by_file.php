<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

ini_set('memory_limit', '256M');
// Include your database connection file
include 'connect_to_db.php';

// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Retrieve the JSON data from the request
    $jsonData = json_decode(file_get_contents('php://input'), true);

    // Assuming $db is your database connection object

    // Insert categories
    foreach ($jsonData['categories'] as $category) {
        $categoryId = $db->real_escape_string($category['id']);
        $categoryName = $db->real_escape_string($category['category_name']);

        // Check if the category with the same ID already exists
        $checkCategoryQuery = "SELECT * FROM categories WHERE id = '$categoryId'";
        $result = $db->query($checkCategoryQuery);

        if ($result->num_rows == 0) {
            // If the category doesn't exist, insert it
            $insertCategoryQuery = "INSERT INTO categories (id, category_name) VALUES ('$categoryId', '$categoryName')";
            $db->query($insertCategoryQuery);
        } else {
            // If the category already exists, you may want to handle it differently
            // For example, you can update the category name
            $updateCategoryQuery = "UPDATE categories SET category_name = '$categoryName' WHERE id = '$categoryId'";
            $db->query($updateCategoryQuery);
        }
    }

    // Insert items and details
    foreach ($jsonData['items'] as $item) {
        $itemId = $db->real_escape_string($item['id']);
        $itemName = $db->real_escape_string($item['name']);
        $itemCategory = $db->real_escape_string($item['category']);

        // Check if the item with the same ID and name already exists
        $checkItemQuery = "SELECT * FROM items WHERE id = '$itemId' AND name = '$itemName'";
        $resultItem = $db->query($checkItemQuery);

        if ($resultItem->num_rows == 0) {
            // If the item doesn't exist, insert it
            $sql = "INSERT INTO items (id, name, category_id) VALUES ('$itemId', '$itemName', '$itemCategory')";
            $db->query($sql);

            foreach ($item['details'] as $detail) {
                $detailName = $db->real_escape_string($detail['detail_name']);
                $detailValue = $db->real_escape_string($detail['detail_value']);

                $sql = "INSERT INTO item_details (item_id, detail_name, detail_value) VALUES ('$itemId', '$detailName', '$detailValue')";
                $db->query($sql);
            }
        } else {
            // If the item already exists, you may want to handle it differently
            // For example, you can update other attributes
            $updateItemQuery = "UPDATE items SET category_id = '$itemCategory' WHERE id = '$itemId' AND name = '$itemName'";
            $db->query($updateItemQuery);
        }
    }

    // Close the database connection (if needed)
    $db->close();
} else {
    // If the request method is not POST, handle the error or take appropriate action
    header('HTTP/1.1 405 Method Not Allowed');
    echo 'Invalid request method.';
}
?>