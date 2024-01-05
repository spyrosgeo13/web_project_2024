<?php

session_start(); // Start the session

// Perform any necessary logout operations
// ...

// Clear the session data
session_unset();
session_destroy();

// Send a JSON response indicating successful logout
$response = [
  'success' => true
];
header('Content-Type: application/json');
echo json_encode($response);
exit;
?>