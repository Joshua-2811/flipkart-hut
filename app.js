// Cart functionality
const cartBtn = document.querySelector(".icon-cart");
const cartModal = document.querySelector(".cartTab");
const closeCartBtn = document.querySelector(".close");
const checkoutBtn = document.querySelector(".checkOut");
const cartCountElem = document.getElementById("cart-count");
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to update cart count
function updateCartCount() {
    cartCountElem.textContent = cart.length;
}

// Function to save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Function to add product to cart
function addToCart(product) {
    cart.push(product);
    saveCart();
    updateCartCount();
    displayCart();
}

// Function to display cart
function displayCart() {
    const cartList = document.querySelector(".listCart");
    cartList.innerHTML = ""; // Clear cart display

    cart.forEach((product, index) => {
        const productElem = document.createElement("div");
        productElem.classList.add("cart-item");
        productElem.innerHTML = `
            <h4>${product.name}</h4>
            <p>${product.price}</p>
            <button class="remove-btn" data-index="${index}">Remove</button>
        `;
        cartList.appendChild(productElem);
    });

    // Add event listeners to remove buttons
    document.querySelectorAll(".remove-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const index = e.target.getAttribute("data-index");
            cart.splice(index, 1); // Remove product from cart
            saveCart();
            updateCartCount();
            displayCart();
        });
    });
}

// Event listeners for "Add to Cart" buttons
document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", (event) => {
        const productElement = event.target.closest(".product-item");
        const productId = productElement.getAttribute("data-id");
        const productName = productElement.querySelector("h3").textContent;
        const productPrice = productElement.querySelector(".price").textContent;

        const product = {
            id: productId,
            name: productName,
            price: productPrice
        };

        addToCart(product);
    });
});

// Event listener to open cart modal
cartBtn.addEventListener("click", () => {
    displayCart();
    cartModal.style.display = "block";
});

// Event listener to close cart modal
closeCartBtn.addEventListener("click", () => {
    cartModal.style.display = "none";
});

// Event listener for checkout
checkoutBtn.addEventListener("click", () => {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    showPaymentModal(); // Show payment modal instead of alert
});

// Close cart modal when clicking outside the modal content
window.addEventListener("click", (event) => {
    if (event.target === cartModal) {
        cartModal.style.display = "none";
    }
});

// Initialize cart count on page load
updateCartCount();

// Payment modal functionality
// Function to display the payment modal
function showPaymentModal() {
    document.getElementById("paymentModal").style.display = "block";
}

// Function to close the payment modal
function closePaymentModal() {
    document.getElementById("paymentModal").style.display = "none";
}

// Function to handle payment selection
function selectPayment(method) {
    alert("You selected: " + method + " as your payment method");
    if (method === 'Credit Card') {
        document.getElementById("credit-card-details").style.display = "block"; // Show credit card details
    } else {
        document.getElementById("credit-card-details").style.display = "none"; // Hide if not credit card
    }
    closePaymentModal(); // Close the modal after selecting (or keep it open if you want)
}

// Event listener for payment options
document.querySelectorAll(".payment-options button").forEach(button => {
    button.addEventListener("click", (event) => {
        const selectedPayment = event.target.textContent;
        selectPayment(selectedPayment);
    });
});
