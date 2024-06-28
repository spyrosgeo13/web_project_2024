document.addEventListener('DOMContentLoaded', function () {
    // Get the form element
    var createResquerForm = document.getElementById('createResquerForm');

    // Add event listener for form submission
    createResquerForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the default form submission

        // Fetch form data
        var formData = new FormData(createResquerForm);

        // Send a POST request to the PHP script
        fetch('php/create_resquer_user.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            // Handle the response
            if (data.status === 'success') {
                // Show success message (you can customize this)
                alert(data.message);
                // Optionally, reset the form
                createResquerForm.reset();
            } else {
                // Show error message (you can customize this)
                alert(data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});
