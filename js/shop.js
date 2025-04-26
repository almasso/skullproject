function loadProducts(products) {
    const productList = document.getElementById("productList");
    productList.innerHtml = "";

    console.log(productList)
    products.forEach(product => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("product-card");
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <h3>${product.name}</h3>
            <p class="price">${product.price.toFixed(2)}€</p>
            <button class="add-to-cart" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}" data-image="${product.image}">añadir al carrito</button>
        `;
        productList.appendChild(productDiv);
    });
    console.log(productList)
}

document.addEventListener("click", (e) => {
    if(e.target.classList.contains("add-to-cart")) {
        const product = {
            id: e.target.getAttribute("data-id"),
            name: e.target.getAttribute("data-name"),
            price: parseFloat(e.target.getAttribute("data-price")),
            image: e.target.getAttribute("data-image"),
            quantity: 1
        };

        addToCart(product);
    }
});

function loadProductsFromJson() {
    fetch("assets/data/products.json").then(response => response.json()).then(products => {
        loadProducts(products);
    }).catch(error => console.error("Error cargando los productos: ", error));
}