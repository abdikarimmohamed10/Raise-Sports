let cart = JSON.parse(localStorage.getItem("cart")) || [];
let total = JSON.parse(localStorage.getItem("total")) || 0;

window.onload = function () {
  const cartList = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");

  cartList.innerHTML = "";
  let totalPrice = 0;

  cart.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.name} (${item.size}) - Quantity: ${item.quantity} - $${item.price * item.quantity}`;
    cartList.appendChild(li);
    totalPrice += item.price * item.quantity;
  });

  if (cart.length > 0) {
    cartTotal.textContent = `Total Items: ${total} | Total Price: $${totalPrice}`;
  }
};

function addToCart(button) {
  const product = button.closest(".product");

  const size = product.querySelector(".size").value;
  const quantity = parseInt(product.querySelector(".quantity").value);

  if (quantity <= 0) {
    alert("Please enter a valid quantity");
    return;
  }

  if (size === "") {
    alert("Please select a size");
    return;
  }

  const name = product.querySelector("h3").textContent;
  const price = parseInt(product.querySelector("p").textContent.replace("$", ""));

  cart.push({ name, size, quantity, price });
  total += quantity;

  localStorage.setItem("cart", JSON.stringify(cart));
  localStorage.setItem("total", JSON.stringify(total));

  const cartList = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");

  cartList.innerHTML = "";
  let totalPrice = 0;

  cart.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.name} (${item.size}) - Quantity: ${item.quantity} - $${item.price * item.quantity}`;
    cartList.appendChild(li);
    totalPrice += item.price * item.quantity;
  });

  cartTotal.textContent = `Total Items: ${total} | Total Price: $${totalPrice}`;

  product.querySelector(".quantity").value = 1;
  product.querySelector(".size").value = "";

  alert("Item added to cart");
}

document.getElementById("visitor-form").addEventListener("submit", function (e) {
  e.preventDefault();

  if (cart.length === 0) {
    alert("Your cart is empty. Please add items first.");
    return;
  }

  const name = document.getElementById("name").value;

  alert("Thank you " + name + "! Your order has been submitted.");

  this.reset();
  cart = [];
  total = 0;

  localStorage.removeItem("cart");
  localStorage.removeItem("total");

  document.getElementById("cart-items").innerHTML = "";
  document.getElementById("cart-total").textContent = "";
});

const form = document.getElementById("visitor-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const addressInput = document.getElementById("address");

// Full Name
function validateName() {
  if (nameInput.value.trim().length >= 3 && !/[0-9]/.test(nameInput.value)) {
    nameInput.style.border = "3px solid green";
    return true;
  } else {
    nameInput.style.border = "3px solid red";
    return false;
  }
}

// Email
function validateEmail() {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (pattern.test(emailInput.value.trim())) {
    emailInput.style.border = "3px solid green";
    return true;
  } else {
    emailInput.style.border = "3px solid red";
    return false;
  }
}

// Phone Number (61xxxxxxx Somalia)
function validatePhone() {
  const phone = phoneInput.value.trim();
  if (
    phone.length >= 8 &&
    phone.length <= 12 &&
    phone >= 610000000 &&
    phone <= 619999999
  ) {
    phoneInput.style.border = "3px solid green";
    return true;
  } else {
    phoneInput.style.border = "3px solid red";
    return false;
  }
}

// Address
function validateAddress() {
  if (addressInput.value.trim().length >= 5) {
    addressInput.style.border = "3px solid green";
    return true;
  } else {
    addressInput.style.border = "3px solid red";
    return false;
  }
}

// Real-time validation
nameInput.addEventListener("input", validateName);
emailInput.addEventListener("input", validateEmail);
phoneInput.addEventListener("input", validatePhone);
addressInput.addEventListener("input", validateAddress);

// Form submit control
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const isValid =
    validateName() &&
    validateEmail() &&
    validatePhone() &&
    validateAddress();

  if (isValid) {
    alert("Form submitted successfully!");
    form.reset();
  } else {
    alert("Please fill in all information correctly");
  }
});