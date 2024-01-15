<?php
include 'connect_to_db.php';

// Handle CORS
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

// Get categories
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['action']) && $_GET['action'] === 'categories') {
    $sql = "SELECT * FROM categories";
    $result = $db->query($sql);

    if ($result) {
        $categories = [];
        while ($row = $result->fetch_assoc()) {
            $categories[] = $row;
        }
        echo json_encode($categories);
    } else {
        echo json_encode(['error' => $db->error]);
    }

    exit;
}

// Get items by category
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['action']) && $_GET['action'] === 'items' && isset($_GET['category_id'])) {
    $categoryId = $_GET['category_id'];
    $sql = "SELECT * FROM items WHERE category_id = $categoryId";
    $result = $db->query($sql);

    if ($result) {
        $items = [];
        while ($row = $result->fetch_assoc()) {
            $items[] = $row;
        }
        echo json_encode($items);
    } else {
        echo json_encode(['error' => $db->error]);
    }

    exit;
}

// Create a new category
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_GET['action']) && $_GET['action'] === 'create_category') {
    $requestData = json_decode(file_get_contents("php://input"));
    $categoryName = $requestData->name;

    $sql = "INSERT INTO categories (category_name) VALUES ('$categoryName')";
    $result = $db->query($sql);

    if ($result) {
        echo json_encode(['message' => 'Category created successfully']);//edo mallon thelei kai id na gini isert.
    } else {
        echo json_encode(['error' => $db->error]);
    }

    exit;
}

// Delete a category and its items
if ($_SERVER['REQUEST_METHOD'] === 'DELETE' && isset($_GET['action']) && $_GET['action'] === 'delete_category' && isset($_GET['category_id'])) {
    $categoryId = $_GET['category_id'];

    // Delete items in the category
    $sqlDeleteitems = "DELETE FROM items WHERE category_id = $categoryId";
    $resultDeleteitems = $db->query($sqlDeleteitems);

    // Delete the category
    $sqlDeleteCategory = "DELETE FROM categories WHERE id = $categoryId";
    $resultDeleteCategory = $db->query($sqlDeleteCategory);

    if ($resultDeleteitems && $resultDeleteCategory) {
        echo json_encode(['message' => 'Category and its items deleted successfully']);
    } else {
        echo json_encode(['error' => $db->error]);
    }

    exit;
}


// Get item details by item_id
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['action']) && $_GET['action'] === 'item_details' && isset($_GET['item_id'])) {
    $itemId = $_GET['item_id'];
    $sql = "SELECT * FROM items WHERE id = $itemId";
    $result = $db->query($sql);

    if ($result) {
        $itemDetails = $result->fetch_assoc();
        echo json_encode($itemDetails);
    } else {
        echo json_encode(['error' => $db->error]);
    }

    exit;
}

// Create a new item in a category
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_GET['action']) && $_GET['action'] === 'create_item') {
    $requestData = json_decode(file_get_contents("php://input"));
    $itemName = $requestData->name;
    $itemStock = $requestData->stock;
    $categoryId = $requestData->category_id;

    // Get the highest existing ID in the items table using db
    

    if ($db->connect_error) {
        die("Connection failed: " . $db->connect_error);
    }

    $sqlMaxId = "SELECT MAX(id) AS max_id FROM items";
    $resultMaxId = $db->query($sqlMaxId)->fetch_assoc();

    // Calculate the new ID for the next item
    $newItemId = $resultMaxId['max_id'] + 1;

    // Insert the new item
    $sql = "INSERT INTO items (id, name, stock_value, category_id) VALUES (?, ?, ?, ?)";
    $stmt = $db->prepare($sql);
    $stmt->bind_param("isii", $newItemId, $itemName, $itemStock, $categoryId);
    $stmt->execute();

    echo json_encode(['message' => 'Item created successfully', 'id' => $newItemId]);
    $stmt->close();
    $db->close();
    exit;
}

// Delete an item
if ($_SERVER['REQUEST_METHOD'] === 'DELETE' && isset($_GET['action']) && $_GET['action'] === 'delete_item' && isset($_GET['item_id'])) {
    $itemId = $_GET['item_id'];

    $sql = "DELETE FROM items WHERE id = ?";
    $stmt = $db->prepare($sql);
    $stmt->execute([$itemId]);

    echo json_encode(['message' => 'Item deleted successfully']);
    exit;
}

// Update item details
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_GET['action']) && $_GET['action'] === 'update_item' && isset($_GET['item_id'])) {
    $itemId = $_GET['item_id'];
    $newStock = json_decode(file_get_contents("php://input"))->stock;

    $sql = "UPDATE items SET stock_value = ? WHERE id = ?";
    $stmt = $db->prepare($sql);
    $stmt->execute([$newStock, $itemId]);

    echo json_encode(['message' => 'Item updated successfully']);
    exit;
}


// Default response for unsupported actions
http_response_code(404);
echo json_encode(['error' => 'Not Found']);
?>
