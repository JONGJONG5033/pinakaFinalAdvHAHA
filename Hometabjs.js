// script.js for sidebar menu
document.getElementById('toggleButton').addEventListener('click', function() {
    var sidebar = document.getElementById('sidebar');
    if (sidebar.style.right === "-250px") {
        sidebar.style.right = "0";
    } else {
        sidebar.style.right = "-250px";
    }
});

// Close sidebar when clicking the close button
document.getElementById('closeButton').addEventListener('click', function() {
    var sidebar = document.getElementById('sidebar');
    sidebar.style.right = "-250px";
});

// Close sidebar when clicking outside of it
document.addEventListener('click', function(event) {
    var sidebar = document.getElementById('sidebar');
    var toggleButton = document.getElementById('toggleButton');
    if (!sidebar.contains(event.target) && !toggleButton.contains(event.target)) {
        sidebar.style.right = "-250px";
    }
});

// Add to Cart and Add to Favorite Icon

const cartIcons = document.querySelectorAll('.cart-icon');
const favoritesIcons = document.querySelectorAll('.favorites-icon');
cartIcons.forEach(cartIcon => {
    cartIcon.addEventListener('click', function() {
        if (cartIcon.src.includes('Cart.png')) {
            cartIcon.src = 'Cart2.png';
        } else {
            cartIcon.src = 'Cart.png';
        }
    });
});

favoritesIcons.forEach(favoritesIcon => {
    favoritesIcon.addEventListener('click', function() {
        if (favoritesIcon.src.includes('Favorite.png')) {
            favoritesIcon.src = 'Favorite2.png';
        } else {
            favoritesIcon.src = 'Favorite.png';
        }
    });
});



// Initialize cart, totalItems, and totalCost from localStorage if available
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let totalItems = parseInt(localStorage.getItem("totalItems")) || 0;
let totalCost = parseFloat(localStorage.getItem("totalCost")) || 0;

// Update cart display on page load
updateCartDisplay();

// Function to update the cart display and save to localStorage
function updateCartDisplay() {
    cartItems.innerHTML = ''; // Clear the current items
    cart.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.innerHTML = `${item.name} - ${item.price.toLocaleString()} PHP`; // Format price with commas
        cartItems.appendChild(itemDiv);
    });
    totalProducts.innerText = totalItems;
    totalPrice.innerText = totalCost.toLocaleString(); // Format total cost with commas

    // Save updated cart data to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("totalItems", totalItems);
    localStorage.setItem("totalCost", totalCost);
}

// Function to add item to the cart
function addToCart(image, name, price) {
    cart.push({ image, name, price });
    totalItems += 1;
    totalCost += price;
    updateCartDisplay();
}

// Event listeners for opening and closing the sidebar
openRightbar.addEventListener("click", function (event) {
    event.preventDefault();
    rightbar.style.width = "250px";
});

closeRightbar.addEventListener("click", function () {
    rightbar.style.width = "0";
});

// Remove all items from the cart
removeAll.addEventListener("click", function () {
    cart = [];
    totalItems = 0;
    totalCost = 0;
    updateCartDisplay();
});

// Add/Remove item on cart-icon click
const cartIcon = document.querySelectorAll('.cart-icon');

cartIcon.forEach((icon, index) => {
    icon.addEventListener("click", function () {
        const productName = document.querySelectorAll('.card-title')[index].innerText; // Get product name
        const productPrice = parseFloat(
            document.querySelectorAll('.price-box')[index].innerText.replace(/,/g, '').replace(" PHP", "") // Remove commas and " PHP"
        );

        // Check if the item is already in the cart
        const existingItemIndex = cart.findIndex(item => item.name === productName);

        if (existingItemIndex !== -1) {
            // Item exists, remove it from the cart
            cart.splice(existingItemIndex, 1);
            totalItems -= 1;
            totalCost -= productPrice;
            updateCartDisplay();
            alert(`${productName} has been removed from the cart!`); // Alert message for removal
        } else {
            // Item does not exist, add it to the cart
            addToCart(icon.src, productName, productPrice);
            alert(`${productName} has been added to the cart!`); // Alert message for addition
        }
    });
});





// Search bar functionality
const searchInput = document.getElementById('searchInput');
const suggestionsContainer = document.getElementById('suggestionsContainer');


const productData = {
    Backtab: {
        products: ['Lat Pulldown Machine', 'T Bar Row', 'Hyperextension Bench', 'Cable Row Machine', 'Seated Row Machine', 'Pullover Machine'],
        page: 'Backtab.html' // payts nani
    },
    Armstab: {
        products: ['Hexagonal Dumbbell', 'Trax Strengh Pull-up', 'Cable Stations', 'Barbell 45-Pound Set', 'Kettlebell', 'Wall Mounted Chin-up Bar'],
        page: 'Armstab.html'// payts nani
    },
    Chesttab: {
        products: ['Push-up Bracket Board Portable', 'Chest Smith', 'Power Twister Bar Chest Builder', 'Weight Bench Barbell Rack Adjustable', 'Kettlebell', 'Push Up Bars Stand Grip (Paralletes)'],
        page: 'Chesttab.html' // payts nani
    },
    Coretab: {
        products: ['Exercise Mat', 'Yoga Ball', 'Ab Wheel Roller', 'ABS Workout Equipment', 'Jump Rope Cable', 'Core Hammer'],
        page: 'Coretab.html' // payts nani
    },
    Legstab: {
        products: ['Leg Press Machine', 'Leg Extension Machine', 'Plyometric Box', 'Squat Machine', 'Jump Rope Cable', 'Calf Raise Machine'],
        page: 'Legstab.html' // payts nani
    }
};


const allProducts = Object.entries(productData).flatMap(([tab, { products, page }]) =>
    products.map(product => ({ title: product, page }))
);


searchInput.addEventListener('input', function () {
    const query = searchInput.value.toLowerCase().trim();
    suggestionsContainer.innerHTML = ''; 

    if (query) {
        const filteredProducts = allProducts.filter(({ title }) => title.toLowerCase().includes(query));

        filteredProducts.forEach(({ title, page }) => {
            const suggestion = document.createElement('div');
            suggestion.classList.add('suggestion');
            suggestion.textContent = title;
            suggestionsContainer.appendChild(suggestion);

            suggestion.addEventListener('click', function () {
                window.location.href = page; 
            });
        });
    }
});

// Close the suggestions container when clicking outside of it
document.addEventListener('click', function (event) {
    if (!searchInput.contains(event.target) && !suggestionsContainer.contains(event.target)) {
        suggestionsContainer.innerHTML = ''; 
    }
});