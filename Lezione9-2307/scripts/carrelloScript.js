document.addEventListener("DOMContentLoaded", function () {
    displayCart();
});

function displayCart() {
    let cart = getCart();
    let cartList = document.getElementById("cartList");
    cartList.innerHTML = ''; // Clear previous content

    if (Object.keys(cart).length === 0) {
        cartList.innerHTML = '<p>Il carrello è vuoto.</p>';
        return;
    }

    let request = new XMLHttpRequest();
    request.open('GET', 'prodotti.json');
    request.responseType = 'json';
    request.send();

    request.onload = function () {
        if (request.status === 200) {
            let products = request.response.products;
            let productMap = {};
            products.forEach(product => {
                productMap[product.id] = product;
            });

            for (let productId in cart) {
                let product = productMap[productId];
                if (product) {
                    let cartItem = `
                        <div class="cart-item">
                            <img src="${product.image}" alt="${product.name}">
                            <h2>${product.name}</h2>
                            <p>${product.description}</p>
                            <p>Prezzo: €${product.price}</p>
                            <p>Quantità: ${cart[productId]}</p>
                            <button onclick="removeFromCart(${productId})">Rimuovi</button>
                        </div>
                    `;
                    cartList.innerHTML += cartItem;
                }
            }
        } else {
            console.error('Failed to load products.');
        }
    };
}

function getCart() {
    let cart = document.cookie.split('; ').find(row => row.startsWith('cart='));
    if (cart) {
        return JSON.parse(decodeURIComponent(cart.split('=')[1]));
    }
    return {};
}

function setCart(cart) {
    let expires = new Date();
    expires.setTime(expires.getTime() + (7 * 24 * 60 * 60 * 1000)); // 7 days
    document.cookie = 'cart=' + encodeURIComponent(JSON.stringify(cart)) + '; expires=' + expires.toUTCString() + '; path=/';
}

function removeFromCart(productId) {
    let cart = getCart();
    if (cart[productId]) {
        delete cart[productId];
        if (Object.keys(cart).length === 0) {
            // Remove the cart cookie if it is empty
            deleteCookie('cart');
        } else {
            setCart(cart);
        }
        displayCart(); // Refresh the cart display
    }
}

// Helper function to delete a cookie by setting its expiration date to a past date
function deleteCookie(nomeCookie) {
    let expires = new Date();
    expires.setTime(expires.getTime() - 1); // Set expiry date to a past date
    document.cookie = nomeCookie + '=; expires=' + expires.toUTCString() + '; path=/';
}