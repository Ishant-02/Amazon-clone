// ===== CART DATA =====
let cart = JSON.parse(localStorage.getItem("cart")) || [];

let cartCount = document.getElementById("cart-count");
let cartItems = document.getElementById("cart-items");
let totalPriceEl = document.getElementById("total-price");

// ===== ADD TO CART =====
document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", () => {
        let name = button.dataset.name;
        let price = Number(button.dataset.price);

        cart.push({ name, price });
        saveCart();
        updateCartUI();
    });
});

// ===== SAVE TO LOCAL STORAGE =====
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// ===== UPDATE CART UI =====
function updateCartUI() {
    cartCount.innerText = cart.length;
    cartItems.innerHTML = "";

    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;

        let li = document.createElement("li");
        li.innerHTML = `
            ${item.name} - ₹${item.price}
            <button onclick="removeItem(${index})">❌</button>
        `;
        cartItems.appendChild(li);
    });

    totalPriceEl.innerText = total;
}

// ===== REMOVE ITEM =====
function removeItem(index) {
    cart.splice(index, 1);
    saveCart();
    updateCartUI();
}

// ===== SEARCH LOGIC =====
let searchInput = document.querySelector(".search-input");
let boxes = document.querySelectorAll(".box");

searchInput.addEventListener("keyup", () => {
    let value = searchInput.value.toLowerCase();

    boxes.forEach(box => {
        let title = box.querySelector("h2").innerText.toLowerCase();
        box.style.display = title.includes(value) ? "block" : "none";
    });
});

// ===== LOAD CART ON REFRESH =====
updateCartUI();
