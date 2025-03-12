class Product {
    constructor(id, name, price, image) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.image = image;
    }
}

class Cart {
    constructor() {
        this.items = [];
        this.date = new Date().toLocaleString(); 
    }

    addItem(product) {
        this.items.push(product);
        this.date = new Date().toLocaleString(); 
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.date = new Date().toLocaleString();
    }

    getTotal() {
        return this.items.reduce((total, item) => total + item.price, 0);
    }

    getCartDisplay() {
        return this.items.map(item => `
            <div class="cart-item">
                <p>${item.name} - $${item.price}</p>
                <button class="remove-from-cart" data-id="${item.id}">Remove</button>
            </div>
        `).join('');
    }

    getCartDate() {
        return this.date;
    }
}

const products = [
    new Product(1, 'Sports Car', 20000000, 'https://wallpapers.com/images/featured/cool-cars-cipxrabgpci91ils.jpg'),
    new Product(2, 'Keychain', 25, 'https://rukminim3.flixcart.com/image/850/1000/xif0q/key-chain/z/7/l/gojo-satoru-anime-keychain-steel-for-man-and-woman-skycart-1-original-imaghtsah8gjqsrz.jpeg?q=20&crop=false'),
    new Product(3, 'Book', 30, 'https://m.media-amazon.com/images/I/81R2N4PRuUL.jpg'),
    new Product(4, 'Lenovo Legion', 350000, 'https://p1-ofp.static.pub/ShareResource/ww/landing-pages/legion-brand-2024/Agnostic-version/img/lenovo-legion-agnostic-ai-blade-mobile-img.png'),
    new Product(5, 'Resident Evil PS5', 200, 'https://preview.redd.it/capcom-recently-released-ps5-physical-versions-of-older-v0-alt75kqa9r5e1.jpeg?auto=webp&s=e874e46fe972e5bc718b9049a452ffe2e95347ae'),
    new Product(6, 'PC setup', 500000, 'https://i.pinimg.com/736x/bd/f2/ec/bdf2ec5b6e89933199a7927c11e7342d.jpg')
];

const cart = new Cart();

function displayProducts() {
    const productsSection = document.getElementById('products');
    productsSection.innerHTML = '';

    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price}</p>
            <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
        `;
        productsSection.appendChild(productDiv);
    });
}

function updateCartDisplay() {
    const cartItemsDiv = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const cartDate = document.getElementById('cart-date');

    cartItemsDiv.innerHTML = cart.getCartDisplay();
    cartTotal.textContent = cart.getTotal().toFixed(2);
    cartDate.textContent = `Cart Date: ${cart.getCartDate()}`;
}

document.addEventListener('click', (event) => {
    if (event.target.classList.contains('add-to-cart')) {
        const productId = parseInt(event.target.dataset.id);
        const product = products.find(p => p.id === productId);

        cart.addItem(product);

        updateCartDisplay();
    }

    if (event.target.classList.contains('remove-from-cart')) {
        const productId = parseInt(event.target.dataset.id);

        cart.removeItem(productId);

        updateCartDisplay();
    }
});

displayProducts();
function toggleTheme() {
    const body = document.body;
    const themeToggleButton = document.getElementById('theme-toggle');

    // Toggle dark mode class
    body.classList.toggle('dark-mode');

    // Change button text based on current theme
    if (body.classList.contains('dark-mode')) {
        themeToggleButton.textContent = 'Switch to Light Mode';
    } else {
        themeToggleButton.textContent = 'Switch to Dark Mode';
    }

    // Save theme preference to localStorage
    localStorage.setItem('theme', body.classList.contains('dark-mode') ? 'dark' : 'light');
}

// Check the stored theme in localStorage and apply it on page load
window.addEventListener('load', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        document.getElementById('theme-toggle').textContent = 'Switch to Light Mode';
    }
});

// Event listener for the toggle button
document.getElementById('theme-toggle').addEventListener('click', toggleTheme);

// Countdown Timer Functionality
let countdownTimer;
let timeLeft = 0;
let isRunning = false;

document.getElementById('start-timer').addEventListener('click', () => {
    if (isRunning) return;

    timeLeft = parseInt(document.getElementById('countdown-input').value);
    if (isNaN(timeLeft) || timeLeft <= 0) return;

    countdownTimer = setInterval(updateTimer, 1000);
    isRunning = true;
});

document.getElementById('pause-timer').addEventListener('click', () => {
    clearInterval(countdownTimer);
    isRunning = false;
});

document.getElementById('reset-timer').addEventListener('click', () => {
    clearInterval(countdownTimer);
    isRunning = false;
    timeLeft = 0;
    document.getElementById('timer-display').textContent = timeLeft;
});

function updateTimer() {
    if (timeLeft <= 0) {
        clearInterval(countdownTimer);
        isRunning = false;
        return;
    }

    timeLeft--;
    document.getElementById('timer-display').textContent = timeLeft;

    // Change background color based on time left
    if (timeLeft > 10) {
        document.body.style.backgroundColor = 'green';
    } else if (timeLeft > 5) {
        document.body.style.backgroundColor = 'yellow';
    } else {
        document.body.style.backgroundColor = 'red';
    }
}

// Image Gallery Functionality
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const closeLightbox = document.getElementById('close-lightbox');

// Function to open lightbox with large image
galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        const largeImageSrc = item.getAttribute('data-large');
        lightboxImage.src = largeImageSrc; // Set the src of the large image in the lightbox
        lightbox.style.display = 'flex'; // Show the lightbox
    });
});

// Close lightbox when clicking the close button
closeLightbox.addEventListener('click', () => {
    lightbox.style.display = 'none'; // Hide the lightbox
});

// Close lightbox when clicking outside the image
lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) {
        lightbox.style.display = 'none'; // Hide the lightbox if clicked outside the image
    }
});

// Dynamic Table Functionality
const addRowButton = document.getElementById('add-row');
const dataTableBody = document.querySelector('#data-table tbody');
const nameInput = document.getElementById('name-input');
const ageInput = document.getElementById('age-input');

addRowButton.addEventListener('click', () => {
    const name = nameInput.value.trim();
    const age = ageInput.value.trim();

    if (!name || !age) {
        alert('Please fill out both fields.');
        return;
    }

    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${name}</td>
        <td>${age}</td>
        <td>
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
        </td>
    `;
    dataTableBody.appendChild(row);

    // Clear inputs after adding row
    nameInput.value = '';
    ageInput.value = '';

    // Edit Button Functionality
    row.querySelector('.edit-btn').addEventListener('click', () => {
        nameInput.value = name;
        ageInput.value = age;
        dataTableBody.removeChild(row); // Remove the current row for editing
    });

    // Delete Button Functionality
    row.querySelector('.delete-btn').addEventListener('click', () => {
        dataTableBody.removeChild(row); // Remove the row when Delete button is clicked
    });
});


