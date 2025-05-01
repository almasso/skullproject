function loadProducts(products) {
    const productList = document.getElementById("productList");
    productList.innerHTML = "";

    products.forEach(product => {
        const productDiv = document.createElement("div");
        const sizesHTML = product.sizes.map(size => `<span class="size-box">${size}</span>`).join('');
        productDiv.classList.add("product-card");
        productDiv.innerHTML = `
            <div class="card-inner">
                <div class="card-front">
                    <img src="${product.image}" alt="${product.name}" class="product-image">
                    <h3>${product.name}</h3>
                    <p class="price">${product.price.toFixed(2)}€</p>
                    <button class="add-to-cart" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}" data-image="${product.image}">añadir al carrito</button>
                </div>
                <div class="card-back">
                    <h3>${product.name}</h3>
                    <p class="descrption">${product.description}</p>
                    <div class="sizes-container">
                        ${sizesHTML}
                    </div>
                    <p class="price>${product.price.toFixed(2)}€</p>
                </div>
            </div>
            `;

        productDiv.addEventListener("click", (e) => {
            if(!e.target.classList.contains("add-to-cart") && !e.target.classList.contains("size-box")) {
                productDiv.classList.toggle("flipped");
            }
        });
        productList.appendChild(productDiv);
    });
}

document.addEventListener("click", (e) => {
    if(e.target.classList.contains("add-to-cart")) {
        const card = e.target.closest(".product-card");
        const selectedSize = card.querySelector(".size-box.selected");

        if(!selectedSize) {
            alert("por favor, selecciona una talla antes de añadir al carrito.");
            return;
        }

        const product = {
            id: e.target.getAttribute("data-id"),
            name: e.target.getAttribute("data-name"),
            price: parseFloat(e.target.getAttribute("data-price")),
            image: e.target.getAttribute("data-image"),
            quantity: 1,
            size: selectedSize.textContent
        };

        addToCart(product);
    }
});

function loadProductsFromJson() {
    fetch("assets/data/products.json").then(response => response.json()).then(products => {
        loadProducts(products);
    }).catch(error => console.error("Error cargando los productos: ", error));
}

document.addEventListener("click", (e) => {
    if(e.target.classList.contains("size-box")) {
        const allSizes = e.target.parentElement.querySelectorAll(".size-box");
        allSizes.forEach(size => size.classList.remove("selected"));
        e.target.classList.add("selected");
    }
});