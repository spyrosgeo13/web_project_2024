<?php

include 'connect_to_db.php';

// Receive JSON data from the request body
$jsonData = file_get_contents('php://input');
$data = json_decode($jsonData, true);

try {
    // Loop through the data and update the database
    foreach ($data['products'] as $product) {
        // Insert or update category
        $categoryName = $product['category_name'];
        $stmt = mysqli_prepare($db, 'INSERT INTO categories (category_name) VALUES (?) ON DUPLICATE KEY UPDATE category_id = LAST_INSERT_ID(category_id)');
        mysqli_stmt_bind_param($stmt, 's', $categoryName);
        mysqli_stmt_execute($stmt);
        $categoryId = mysqli_insert_id($db);

        // Insert or update product
        $productName = $product['product_name'];
        $stockQuantity = $product['stock_quantity'];
        $details = json_encode($product['details']);
        $stmt = mysqli_prepare($db, 'INSERT INTO products (category_id, product_name, stock_quantity, details) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE product_id = LAST_INSERT_ID(product_id)');
        mysqli_stmt_bind_param($stmt, 'iss', $categoryId, $productName, $stockQuantity, $details);
        mysqli_stmt_execute($stmt);

        echo "Product $productName updated/inserted with ID " . mysqli_insert_id($db) . "<br>";
    }

    echo 'Database update complete.';
} catch (Exception $e) {
    echo 'Error: ' . $e->getMessage();
}

// Close the database connection
mysqli_close($db);



?>