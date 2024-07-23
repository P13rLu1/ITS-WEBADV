document.addEventListener("DOMContentLoaded", function () {
    loadProducts();
});

function loadProducts() {
    let request = new XMLHttpRequest();
    request.open('GET', 'prodotti.json');
    request.responseType = 'json';
    request.send();

    request.onload = function () {
        if (request.status === 200) {
            let products = request.response.products;
            displayProducts(products);
        } else {
            console.error('Failed to load products.');
        }
    };
}

function displayProducts(products) {
    let productList = document.getElementById("productList");
    productList.innerHTML = ''; // Clear previous content

    products.forEach(product => {
        let productItem = `
            <div class="product-item">
                <img src="${product.image}" alt="${product.name}">
                <h2>${product.name}</h2>
                <p>${product.description}</p>
                <p>Prezzo: €${product.price}</p>
                <button onclick="addToCart(${product.id})">Aggiungi al Carrello</button>
            </div>
        `;
        productList.innerHTML += productItem;
    });
}

function addToCart(productId) {
    let cart = getCookie("cart");
    cart = cart ? JSON.parse(cart) : {};

    if (cart[productId]) {
        cart[productId] += 1;
    } else {
        cart[productId] = 1;
    }

    setCookie("cart", JSON.stringify(cart), 7);
    alert('Prodotto aggiunto al carrello!');
}

function getCookie(name) {
    let cookies = document.cookie.split('; ');
    for (let cookie of cookies) {
        const [key, value] = cookie.split('=');
        if (key === name) {
            return decodeURIComponent(value);
        }
    }
    return null;
}

function setCookie(name, value, days) {
    let expires = '';
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = '; expires=' + date.toUTCString();
    }
    document.cookie = name + '=' + (value || '') + expires + '; path=/';
}