// Function to create a new category
async function createCategory() {
    const categoryName = prompt('Enter the name of the new category:');

    if (!categoryName) {
        alert('Category name cannot be empty.');
        return;
    }

    const response = await fetch('php/admin_management_of_products_categories.php?action=create_category', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: categoryName }),
    });

    const result = await response.json();
    alert(result.message);

    // Refresh categories after creating a new one
    getCategories();
}

// Function to delete a category and its products
async function deleteCategory() {
    const categoryId = document.getElementById('category-select').value;

    if (!categoryId) {
        alert('Please select a category to delete.');
        return;
    }

    const confirmation = confirm('Are you sure you want to delete this category and its products?');

    if (!confirmation) {
        return;
    }

    const response = await fetch(`php/admin_management_of_products_categories.php?action=delete_category&category_id=${categoryId}`, {
        method: 'DELETE',
    });

    const result = await response.json();
    alert(result.message);

    // Refresh categories after deletion
    getCategories();
}

async function getCategories() {
    const selectElement = document.getElementById('category-select');

    // Check if options are already populated to avoid duplicate entries
    if (selectElement.options.length <= 1) {
        try {
            const response = await fetch('php/admin_management_of_products_categories.php?action=categories');
            const categories = await response.json();

            console.log('Fetched categories:', categories);

            categories.forEach(category => {
                const option = document.createElement('option');
                option.value = category.id;
                option.text = category.category_name; // Set the text content of the option
                selectElement.add(option);
            });
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    }
}
// Function to fetch items of the selected category
async function showItems() {
    const categoryId = document.getElementById('category-select').value;

    if (!categoryId) {
        alert('Please select a category.');
        return;
    }

    const productsList = document.getElementById('products-list');
    productsList.innerHTML = ''; // Clear previous list

    const response = await fetch(`php/admin_management_of_products_categories.php?action=items&category_id=${categoryId}`);
    const items = await response.json();

    if (items.length === 0) {
        alert('No items found for the selected category.');
        return; 0
    }

    items.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = item.name; // Assuming your item has a 'name' property
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => deleteItem(item.id));
        listItem.appendChild(deleteButton);
        const updateButton = document.createElement('button');
    updateButton.textContent = 'Update Stock';
    updateButton.addEventListener('click', () => updateItem(item.id));
    listItem.appendChild(updateButton);
        listItem.setAttribute('data-item-id', item.id); // Save the item id as a data attribute

        listItem.addEventListener('click', () => showItemDetails(item.id)); // Add click event to show details

        productsList.appendChild(listItem);
    });
}

// Function to show item details
async function showItemDetails(itemId) {
    const response = await fetch(`php/admin_management_of_products_categories.php?action=item_details&item_id=${itemId}`);
    const itemDetails = await response.json();

    // Assuming you have an element with the id 'item-details' to display details
    const itemDetailsContainer = document.getElementById('item-details');
    itemDetailsContainer.innerHTML = ''; // Clear previous details

    // Display item details in the container
    for (const key in itemDetails) {
        const detailItem = document.createElement('div');
        detailItem.textContent = `${key}: ${itemDetails[key]}`;
        itemDetailsContainer.appendChild(detailItem);
    }
}
async function createItem() {
    const itemName = prompt('Enter the name of the new item:');
    const itemStock = prompt('Enter the stock of the new item:');
    const categoryId = document.getElementById('category-select').value;

    if (!itemName || !itemStock || !categoryId) {
        alert('Item name, stock, and category are required.');
        return;
    }

    const response = await fetch('php/admin_management_of_products_categories.php?action=create_item', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: itemName,
            stock: itemStock,
            category_id: categoryId,
        }),
    });

    const result = await response.json();
    alert(result.message);

    // Refresh items after creating a new one
    getItems();
}

async function deleteItem(itemId) {
    const confirmation = confirm('Are you sure you want to delete this item?');

    if (!confirmation) {
        return;
    }

    const response = await fetch(`php/admin_management_of_products_categories.php?action=delete_item&item_id=${itemId}`, {
        method: 'DELETE',
    });

    const result = await response.json();
    alert(result.message);

    // Refresh items after deletion
    getItems();
}

async function updateItem(itemId) {
    const newStock = prompt('Enter the new stock value:');

    if (!newStock) {
        alert('New stock value is required.');
        return;
    }

    const response = await fetch(`php/admin_management_of_products_categories.php?action=update_item&item_id=${itemId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            stock: newStock,
        }),
    });

    const result = await response.json();
    alert(result.message);

    // Refresh items after updating
    getItems();
}

// ... Other functions ...

// Fetch categories on page load
document.addEventListener('DOMContentLoaded', getCategories);

