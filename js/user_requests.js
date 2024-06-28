
document.addEventListener('DOMContentLoaded', function() {
    const categorySelect = document.getElementById('category');
    const itemInput = document.getElementById('item');

    console.log('itemInput:', itemInput); // Debugging: Log itemInput to verify targeting

    // Fetch categories from the backend
    fetch('php/user_get_categories_items.php?action=categories')
        .then(response => response.json())
        .then(data => {
            data.forEach(category => {
                const option = document.createElement('option');
                option.value = category.id;
                option.textContent = category.category_name;
                categorySelect.appendChild(option);
            });
        })
        .catch(error => console.error('Error fetching categories:', error));

    // Add event listener to category select to fetch items for the selected category
    categorySelect.addEventListener('change', function() {
        const selectedCategoryId = this.value;
        // Fetch items for the selected category from the backend
        fetch(`php/user_get_categories_items.php?action=items&category=${selectedCategoryId}`)
            .then(response => response.json())
            .then(items => {
                console.log('Items:', items); // Debugging: Log items data
                // Update item input field with autocomplete functionality
                initializeAutocomplete(items);
            })
            .catch(error => console.error('Error fetching items:', error));
    });

    // Function to initialize autocomplete for the item input field
    function initializeAutocomplete(items) {
        console.log('Initializing autocomplete with items:', items); // Debugging: Log items data
        // Destroy any existing autocomplete instances
        destroyAutocomplete();

        // Initialize new autocomplete instance
        new Awesomplete(itemInput, {
            list: items.map(item => item.name),
            minChars: 1,
            autoFirst: true
        });
    }

    // Function to destroy any existing autocomplete instances
    function destroyAutocomplete() {
        if (itemInput.hasAttribute('awesomplete')) {
            itemInput.removeAttribute('awesomplete');
            itemInput.nextElementSibling.remove(); // Remove Awesomplete dropdown if it exists
        }
    }
});
