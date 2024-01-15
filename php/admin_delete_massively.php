<?php

include 'connect_to_db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Disable foreign key checks temporarily
    $db->query("SET FOREIGN_KEY_CHECKS = 0");

    // Delete rows from categories table
    $db->query("DELETE FROM categories");
    if ($db->errno) {
        error_log("Error deleting from categories table: " . $db->error);
    }

    // Delete rows from items table
    $db->query("DELETE FROM items");
    if ($db->errno) {
        error_log("Error deleting from items table: " . $db->error);
    }

    // Delete rows from item_details table
    $db->query("DELETE FROM item_details");
    if ($db->errno) {
        error_log("Error deleting from item_details table: " . $db->error);
    }

    // Enable foreign key checks
    $db->query("SET FOREIGN_KEY_CHECKS = 1");

    // Close connection
    $db->close();

    echo "Rows deleted successfully from categories, items, and item_details tables.";
} else {
    http_response_code(405); // Method Not Allowed
    echo "Invalid request method. Please use POST.";
}
?>