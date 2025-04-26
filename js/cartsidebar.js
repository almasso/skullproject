const cart = [];

function addToCart(item) {
    const existing = cart.find(i => i.id === item.id);
    if (existing) {
        existing.quantity += item.quantity;
    } else {
        cart.push({ ...item });
    }
    updateCartUI();
}

function updateCartUI() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotalPrice');
    const cartName = document.getElementById('cartName');
    cartItems.innerHTML = '';

    if (cart.length === 0) {
        cartItems.innerHTML = '<p>el carrito está vacío.</p>';
        cartTotal.textContent = '0.00€';
        cartName.textContent = "carrito (0)";
        return;
    }

    let total = 0;
    let totalItems = 0;
    cart.forEach(item => {
        const itemEl = document.createElement('div');
        itemEl.classList.add('cart-item');
        itemEl.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div>
                <strong>${item.name}</strong><br>
                ${item.quantity} × ${item.price.toFixed(2)}€ = ${(item.quantity * item.price).toFixed(2)}€
            </div>
            <hr>
        `;
        cartItems.appendChild(itemEl);
        total += item.quantity * item.price;
        totalItems += item.quantity;
    });

    cartName.textContent = `carrito (${totalItems})`;
    cartTotal.textContent = `${total.toFixed(2)}€`;
}

document.addEventListener("DOMContentLoaded", () => {
    updateCartUI();
});

document.querySelector('.cart a').addEventListener('click', e => {
    e.preventDefault();
    document.getElementById('cartSidebar').classList.add('open');
    document.getElementById('cartOverlay').classList.add('open');
});

document.getElementById('closeCart').addEventListener('click', () => {
    document.getElementById('cartSidebar').classList.remove('open');
    document.getElementById('cartOverlay').classList.remove('open');
});

document.getElementById('cartOverlay').addEventListener('click', e => {
    if (e.target === document.getElementById('cartOverlay')) {
        document.getElementById('cartSidebar').classList.remove('open');
        document.getElementById('cartOverlay').classList.remove('open');
    }
});