const BASE_URL = 'http://localhost:8080/itemCategory';

// Get all categories
async function getAllCategories() {
    try {
        const response = await fetch(BASE_URL);
        return await response.json();
    } catch (error) {
        console.error('Error fetching categories:', error);
    }
}

// Add a new category
async function addCategory(category) {
    try {
        const response = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(category)
        });
        return await response.json();
    } catch (error) {
        console.error('Error adding category:', error);
    }
}

// Delete a category by ID
async function deleteCategory(categoryId) {
    try {
        const response = await fetch(`${BASE_URL}/categoryId/${categoryId}`, {
            method: 'DELETE'
        });
        return response.ok;
    } catch (error) {
        console.error('Error deleting category:', error);
    }
}

// Update a category by ID
async function updateCategory(categoryId, updatedCategory) {
    try {
        const response = await fetch(`${BASE_URL}/categoryId/${categoryId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedCategory)
        });
        return await response.json();
    } catch (error) {
        console.error('Error updating category:', error);
    }
}

// Example usage
// getAllCategories().then(console.log);
// addCategory({ categoryName: 'New Category', image: 'image_url' }).then(console.log);
// deleteCategory(1).then(console.log);
// updateCategory(1, { categoryName: 'Updated Name', image: 'new_image_url' }).then(console.log);

export { getAllCategories, addCategory, deleteCategory, updateCategory };
