document.addEventListener('DOMContentLoaded', function () {
    
    // Function for Update Products (URL) button
    document.getElementById('updateurlbtn').addEventListener('click', function () {
        // Implement your logic for updating products using a URL
        // For example:
        // 1. Make an AJAX request to fetch data from the provided URL
        // 2. Update your database with the fetched data
        // 3. Update UI or display a success message
        console.log('Update Products (URL) button clicked');
    });

    // Function for Upload JSON File button
    document.getElementById('uploadjsonbtn').addEventListener('click', function () {
        // Create an input element to trigger file selection
        var fileInput = document.createElement('input');
        fileInput.type = 'file';
    
        // Set accept attribute to allow only JSON files
        fileInput.accept = '.json';
    
        // Trigger click event on the input element
        fileInput.click();
    
        // Event listener for when a file is selected
        fileInput.addEventListener('change', function () {
            var file = fileInput.files[0];
    
            if (file) {
                var reader = new FileReader();
    
                reader.onload = function (e) {
                    try {
                        var jsonData = JSON.parse(e.target.result);
                        uploadToServer(jsonData);
                    } catch (error) {
                        console.error('Error parsing JSON:', error);
                        alert('Error parsing JSON. Please check the file format.');
                    }
                };
    
                reader.readAsText(file);
            } else {
                alert('Please choose a JSON file to upload.');
            }
        });
    });
    
    function uploadToServer(jsonData) {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'php/upload_by_file.php', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
    
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    alert(xhr.responseText);
                } else {
                    alert('Error uploading JSON data.');
                }
            }
        };
    
        var jsonDataString = JSON.stringify(jsonData);
        xhr.send(jsonDataString);
        console.log(jsonData)
    }
});
