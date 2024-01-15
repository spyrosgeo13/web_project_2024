document.addEventListener('DOMContentLoaded', function () {
    // Function for Delete Products button
    document.getElementById('deletebtn').addEventListener('click', function () {
        // Implement your logic for deleting products and categories tables massively
        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'php/admin_delete_massively.php', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    console.log('Products deleted successfully');
                    // 2. Update UI or display a success message
                } else {
                    console.error('Error:', xhr.status, xhr.statusText);
                    // Handle error, update UI or display an error message
                }
            }
        };

        xhr.send(); // You can pass data in the send method if needed
    });
});
