const BASE_URL = "http://localhost:8080";

// Fetch categories for dropdown
async function fetchCategories() {
    try {
        const response = await fetch(`${BASE_URL}/itemCategory`);
        const categories = await response.json();

        const categorySelect = document.getElementById("category-select");
        const categoryList = document.getElementById("category-list");
        categorySelect.innerHTML = '<option value="">Select Category</option>';
        categoryList.innerHTML = "";

        categories.forEach((category) => {
            // Add to dropdown
            const option = document.createElement("option");
            option.value = category.categoryId;
            option.textContent = category.categoryName;
            categorySelect.appendChild(option);

            // Add to list
            const li = document.createElement("li");
            li.textContent = category.categoryName;
            categoryList.appendChild(li);
        });
    } catch (error) {
        console.error("Error fetching categories:", error);
    }
}

// Fetch and display menu items
async function fetchMenuItems() {
    try {
        const response = await fetch(`${BASE_URL}/menuItem`);
        const menuItems = await response.json();

        const menuList = document.getElementById("menu-list");
        menuList.innerHTML = "";

        menuItems.forEach((item) => {
            const li = document.createElement("li");
            li.innerHTML = `
                <strong>${item.name}</strong> - ₹${item.price} <br>
                ${item.description} <br>
                <img src="${item.img}" width="100px" alt="${item.name}"> <br>
                <button class="delete-btn" data-id="${item.id}">Delete</button>
            `;
            menuList.appendChild(li);
        });

        // Add event listeners to delete buttons
        document.querySelectorAll(".delete-btn").forEach((button) => {
            button.addEventListener("click", (event) => {
                const menuItemId = event.target.getAttribute("data-id");
                if (!menuItemId) {
                    console.error("Menu Item ID is undefined!");
                    return;
                }

                console.log("Deleting menu item with ID:", menuItemId);
                deleteMenuItem(menuItemId);
            });
        });
    } catch (error) {
        console.error("Error fetching menu items:", error);
    }
}

// Add new category
document.getElementById("category-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const categoryName = document.getElementById("category-name").value;

    try {
        const response = await fetch(`${BASE_URL}/itemCategory`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ categoryName }),
        });

        if (response.ok) {
            alert("Category added successfully!");
            document.getElementById("category-name").value = "";
            fetchCategories();
        } else {
            alert("Failed to add category");
        }
    } catch (error) {
        console.error("Error adding category:", error);
    }
});

// Add new menu item
document.getElementById("menu-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("item-name").value;
    const description = document.getElementById("item-description").value;
    const price = parseFloat(document.getElementById("item-price").value);
    const img = document.getElementById("item-img").value;
    const categoryId = document.getElementById("category-select").value;

    if (!categoryId) {
        alert("Please select a category");
        return;
    }

    try {
        const response = await fetch(`${BASE_URL}/menuItem`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, description, price, img, category: { categoryId } }),
        });

        if (response.ok) {
            alert("Menu item added successfully!");
            document.getElementById("menu-form").reset();
            fetchMenuItems();
        } else {
            alert("Failed to add menu item");
        }
    } catch (error) {
        console.error("Error adding menu item:", error);
    }
});


// // Delete menu item
// async function deleteMenuItem(itemId) {
//     console.log("Attempting to delete menu item with ID:", itemId);

//     try {
//         const response = await fetch(`${BASE_URL}/itemId/${itemId}`, {
//             method: "DELETE",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//         });

//         if (!response.ok) {
//             throw new Error(`HTTP error! Status: ${response.status}`);
//         }

//         console.log("Menu item deleted successfully!");
//         alert("Menu item deleted successfully!");

//         // Refresh menu list
//         fetchMenuItems();
//     } catch (error) {
//         console.error("Error deleting menu item:", error);
//     }
// }

// Initial data load
fetchCategories();
fetchMenuItems();
