
// =================================
// 1. PRODUCT DATA
// =================================

const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 2499,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
    description: "Premium sound with deep bass"
  },
  {
    id: 2,
    name: "Mechanical Keyboard",
    price: 3299,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500",
    description: "Smooth and comfortable typing"
  },
  {
    id: 3,
    name: "Wireless Mouse",
    price: 999,
    image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=500",
    description: "Precision and comfort"
  },
  {
    id: 4,
    name: "Smart Watch",
    price: 1999,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
    description: "Your everyday smart companion"
  },
  {
    id: 5,
    name: "Bluetooth Speaker",
    price: 1499,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500",
    description: "Powerful portable sound"
  },
  {
    id: 6,
    name: "Gaming Controller",
    price: 1799,
    image: "https://images.unsplash.com/photo-1592840496694-26d035b52b48?w=500",
    description: "Take your gaming further"
  }
];


// =================================
// 2. CART STATE
// =================================

let cart = [];


// =================================
// 3. SELECT HTML ELEMENTS
// =================================

const productContainer =
  document.getElementById("product-container");

const cartItems =
  document.getElementById("cart-items");

const cartCount =
  document.getElementById("cart-count");

const cartTotal =
  document.getElementById("cart-total");

const searchInput =
  document.getElementById("product-search");

const cartButton =
  document.getElementById("cart-button");

const checkoutButton =
  document.getElementById("checkout-button");

const checkoutModal =
  document.getElementById("checkout-modal");

const checkoutDetails =
  document.getElementById("checkout-details");

const checkoutTotal =
  document.getElementById("checkout-total");

const closeModal =
  document.getElementById("close-modal");

const confirmButton =
  document.getElementById("confirm-button");


// =================================
// 4. FORMAT PRICE
// =================================

function formatPrice(price) {
  return "₹" + price.toLocaleString("en-IN");
}


// =================================
// 5. DISPLAY PRODUCTS
// =================================

function displayProducts(productList) {

  productContainer.innerHTML = "";

  if (productList.length === 0) {
    productContainer.innerHTML =
      "<p>No products found. Try another search.</p>";
    return;
  }

  productList.forEach(function(product) {

    const card = document.createElement("div");

    card.className = "product-card";

    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>${formatPrice(product.price)}</p>
      <p class="description">${product.description}</p>
      <button class="add-button" data-id="${product.id}">
        Add to Cart +
      </button>
    `;

    productContainer.appendChild(card);

  });
}


// =================================
// 6. ADD TO CART
// =================================

function addToCart(productId) {

  const product = products.find(function(item) {
    return item.id === productId;
  });

  if (!product) return;

  const existingItem = cart.find(function(item) {
    return item.id === productId;
  });

  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1
    });
  }

  updateCart();
}


// =================================
// 7. CHANGE PRODUCT QUANTITY
// =================================

function changeQuantity(productId, change) {

  const item = cart.find(function(product) {
    return product.id === productId;
  });

  if (!item) return;

  item.quantity += change;

  if (item.quantity <= 0) {
    removeFromCart(productId);
  } else {
    updateCart();
  }
}


// =================================
// 8. REMOVE FROM CART
// =================================

function removeFromCart(productId) {

  cart = cart.filter(function(item) {
    return item.id !== productId;
  });

  updateCart();
}


// =================================
// 9. UPDATE CART
// =================================

function updateCart() {

  cartItems.innerHTML = "";

  let totalItems = 0;
  let totalPrice = 0;

  if (cart.length === 0) {
    cartItems.innerHTML =
      "<p>Your cart is empty. Start shopping!</p>";
  }

  cart.forEach(function(item) {

    totalItems += item.quantity;

    totalPrice += item.price * item.quantity;

    const cartItem = document.createElement("div");

    cartItem.className = "cart-item";

    cartItem.innerHTML = `
      <div>
        <strong>${item.name}</strong>
        <p>${formatPrice(item.price)} each</p>
      </div>

      <div class="quantity-controls">
        <button data-action="decrease" data-id="${item.id}">−</button>
        <span>${item.quantity}</span>
        <button data-action="increase" data-id="${item.id}">+</button>
      </div>

      <strong>${formatPrice(item.price * item.quantity)}</strong>

      <button class="remove-button" data-id="${item.id}">
        Remove
      </button>
    `;

    cartItems.appendChild(cartItem);

  });

  cartCount.textContent = totalItems;

  cartTotal.textContent = formatPrice(totalPrice);

  checkoutButton.disabled = cart.length === 0;
}


// =================================
// 10. PRODUCT SEARCH
// =================================

searchInput.addEventListener("input", function() {

  const searchText = searchInput.value.toLowerCase();

  const filteredProducts = products.filter(function(product) {

    return (
      product.name.toLowerCase().includes(searchText) ||
      product.description.toLowerCase().includes(searchText)
    );

  });

  displayProducts(filteredProducts);

});


// =================================
// 11. PRODUCT BUTTON EVENTS
// =================================

productContainer.addEventListener("click", function(event) {

  const button = event.target.closest(".add-button");

  if (button) {

    const productId = Number(button.dataset.id);

    addToCart(productId);

  }

});


// =================================
// 12. CART BUTTON EVENTS
// =================================

cartItems.addEventListener("click", function(event) {

  const button = event.target.closest("button");

  if (!button) return;

  const productId = Number(button.dataset.id);

  if (button.classList.contains("remove-button")) {

    removeFromCart(productId);

  } else if (button.dataset.action === "increase") {

    changeQuantity(productId, 1);

  } else if (button.dataset.action === "decrease") {

    changeQuantity(productId, -1);

  }

});


// =================================
// 13. CART NAVIGATION
// =================================

cartButton.addEventListener("click", function() {

  document.getElementById("cart").scrollIntoView({
    behavior: "smooth"
  });

});


// =================================
// 14. CHECKOUT PREVIEW
// =================================

function showCheckout() {

  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  checkoutDetails.innerHTML = "";

  let total = 0;

  cart.forEach(function(item) {

    const itemTotal = item.price * item.quantity;

    total += itemTotal;

    const summary = document.createElement("p");

    summary.textContent =
      item.name + " × " + item.quantity +
      " = " + formatPrice(itemTotal);

    checkoutDetails.appendChild(summary);

  });

  checkoutTotal.textContent = formatPrice(total);

  checkoutModal.classList.remove("hidden");

}


// =================================
// 15. MODAL EVENTS
// =================================

checkoutButton.addEventListener("click", showCheckout);

closeModal.addEventListener("click", function() {

  checkoutModal.classList.add("hidden");

});

confirmButton.addEventListener("click", function() {

  checkoutModal.classList.add("hidden");

});

checkoutModal.addEventListener("click", function(event) {

  if (event.target === checkoutModal) {
    checkoutModal.classList.add("hidden");
  }

});


// =================================
// 16. INITIALIZE STORE
// =================================

displayProducts(products);

updateCart();
