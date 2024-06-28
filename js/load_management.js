document.addEventListener('DOMContentLoaded', function () {
    // Fetch categories
    fetchCategories();

    // Fetch loaded items details
    fetchLoadedItems();

    // Fetch items when a category is selected
    document.getElementById('category').addEventListener('change', function () {
        const categoryId = this.value;
        const itemSelect = document.getElementById('item');
        itemSelect.innerHTML = '<option value="">Select an item</option>';
        itemSelect.disabled = true;

        if (categoryId) {
            fetchItems(categoryId)
                .then(data => {
                    data.forEach(item => {
                        const option = document.createElement('option');
                        option.value = item.id;
                        option.textContent = item.name;
                        itemSelect.appendChild(option);
                    });
                    itemSelect.disabled = false;
                });
        }
    });

    // Load button click handler
    document.getElementById('load-button').addEventListener('click', function () {
        const categoryId = document.getElementById('category').value;
        const itemId = document.getElementById('item').value;
        const quantity = document.getElementById('quantity').value;

        if (categoryId && itemId && quantity > 0) {
            loadItems(categoryId, itemId, quantity)
                .then(response => {
                    if (response.success) {
                        Swal.fire('Success', 'Items loaded successfully', 'success');
                        fetchLoadedItems(); // Update loaded items table after loading
                    } else {
                        Swal.fire('Error', response.error, 'error');
                    }
                });
        } else {
            Swal.fire('Error', 'Please select a category, item, and quantity', 'error');
        }
    });

    // Unload button click handler
    document.getElementById('unload-button').addEventListener('click', function () {
        // Add logic to handle unloading (assuming it sets quantity to zero)
        unloadItems()
            .then(response => {
                if (response.success) {
                    Swal.fire('Success', 'Items unloaded successfully', 'success');
                    fetchLoadedItems(); // Update loaded items table after unloading
                } else {
                    Swal.fire('Error', response.error, 'error');
                }
            });
    });

    function fetchCategories() {
        return fetch('php/user_get_categories_items.php?action=categories')
            .then(response => response.json())
            .then(data => {
                const categorySelect = document.getElementById('category');
                data.forEach(category => {
                    const option = document.createElement('option');
                    option.value = category.id;
                    option.textContent = category.category_name;
                    categorySelect.appendChild(option);
                });
            });
    }

    function fetchItems(categoryId) {
        return fetch(`php/user_get_categories_items.php?action=items&category=${categoryId}`)
            .then(response => response.json());
    }

    function fetchLoadedItems() {
        return fetch('php/fetch_loaded_items.php')
            .then(response => response.json())
            .then(data => {
                const loadedItemsTable = document.getElementById('loaded-items-table').getElementsByTagName('tbody')[0];
                loadedItemsTable.innerHTML = ''; // Clear existing rows

                data.forEach(item => {
                    const row = loadedItemsTable.insertRow();
                    row.innerHTML = `
                        <td>${item.id}</td>
                        <td>${item.item_name}</td>
                        <td>${item.quantity}</td>
                        <td>${item.load_timestamp}</td>
                        <td>${item.unload_timestamp}</td>
                    `;
                });
            })
            .catch(error => {
                console.error('Error fetching loaded items:', error);
            });
    }

    function loadItems(categoryId, itemId, quantity) {
        return fetch('php/load_items.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                category_id: categoryId,
                item_id: itemId,
                quantity: quantity
            })
        })
        .then(response => response.json());
    }

    function unloadItems() {
        return fetch('php/unload_items.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({})
        })
            .then(response => response.json());
    }
});
