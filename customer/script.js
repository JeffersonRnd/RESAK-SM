const products = [
    { id: 1, name: 'Aceite', price: '1.50', image: 'images/food1.png', category: 'Abarrotes' },
    { id: 2, name: 'Huevos', price: '2.50', image: 'images/food2.png', category: 'Abarrotes' },
    { id: 3, name: 'Sal', price: '3.00', image: 'images/food3.png', category: 'Abarrotes' },
    { id: 4, name: 'Whisky', price: '45.00', image: 'images/food4.png', category: 'Licores' },
    { id: 5, name: 'Vino', price: '25.00', image: 'images/food5.png', category: 'Licores' },
    { id: 6, name: 'Ron', price: '35.00', image: 'images/food6.png', category: 'Licores' },
    { id: 7, name: 'Detergente', price: '15.00', image: 'images/food7.png', category: 'Limpieza' },
    { id: 8, name: 'Suavizante', price: '12.00', image: 'images/food8.png', category: 'Limpieza' },
    { id: 9, name: 'Jabón', price: '2.50', image: 'images/food9.png', category: 'Limpieza' },
    { id: 10, name: 'Pollo', price: '8.50', image: 'images/food10.png', category: 'Carnes' },
    { id: 11, name: 'Carne', price: '15.00', image: 'images/food11.png', category: 'Carnes' },
    { id: 12, name: 'Pescado', price: '12.00', image: 'images/food12.png', category: 'Carnes' },
    { id: 13, name: 'Agua', price: '1.00', image: 'images/food13.png', category: 'Bebidas' },
    { id: 14, name: 'Inca Kola', price: '11.60', image: 'images/food14.png', category: 'Bebidas' },
    { id: 15, name: 'Volt', price: '2.49', image: 'images/food15.png', category: 'Bebidas' },
    { id: 16, name: 'Pan Marraqueta', price: '1.00', image: 'images/food16.png', category: 'Panadería' },
    { id: 17, name: 'Pan Torta', price: '1.00', image: 'images/food17.png', category: 'Panadería' },
    { id: 18, name: 'Alfajores de maicena', price: '3.00', image: 'images/food18.png', category: 'Panadería' }
];


let cartItems = [];

// Función para cargar los datos del carrito desde localStorage
function loadCartFromStorage() {
    const storedCart = localStorage.getItem('cartItems');
    if (storedCart) {
        cartItems = JSON.parse(storedCart);
        updateCartModal();
    }
}

// Función para guardar los datos del carrito en localStorage
function saveCartToStorage() {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}


document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.getElementById('loadingScreen').style.display = 'none';
        document.getElementById('mainContent').classList.remove('d-none');
    }, 2000);

    loadCartFromStorage();
    setupEventListeners();
});

function setupEventListeners() {
    document.querySelector('.home-icon').addEventListener('click', () => {
        window.location.reload();
    });

    document.querySelector('.user-icon').addEventListener('click', () => {
        window.open('../login/index.html', '_blank');
    });

    
    document.querySelectorAll('.category-buttons .btn').forEach(button => {
        button.addEventListener('click', () => {
            document.querySelectorAll('.category-buttons .btn').forEach(btn => {
                btn.classList.remove('active');
            });
            button.classList.add('active');
            const category = button.textContent.trim();
            renderProducts(category); // Renderizar productos de la categoría seleccionada
        });
    });
    
}

function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast show';
    toast.innerHTML = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cartItems.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cartItems.push({ ...product, quantity: 1 });
    }

    saveCartToStorage(); 
    showToast('Producto agregado correctamente');
    updateCartModal();
}

function updateCartModal() {
    const cartContent = document.getElementById('cartContent');
    if (cartItems.length === 0) {
        cartContent.innerHTML = '<p>No hay productos en el carrito</p>';
        return;
    }

    const total = cartItems.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0);

    cartContent.innerHTML = `
        <div class="cart-items">
            ${cartItems.map(item => `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                    <div class="cart-item-details">
                        <h5>${item.name}</h5>
                        <p>Cantidad: ${item.quantity}</p>
                        <p>Precio: S/. ${item.price}</p>
                    </div>
                </div>
            `).join('')}
        </div>
        <div class="cart-total">
            <h4>Total: S/. ${total.toFixed(2)}</h4>
        </div>
        <button onclick="processPay()" class="btn btn-success w-100 mt-3">Realizar Pago</button>
    `;
}

function processPay() {
    cartItems = [];
    // Limpiar carrito en localStorage
    saveCartToStorage(); 
    updateCartModal();
    showToast('¡Pago realizado con éxito!');
    const modal = bootstrap.Modal.getInstance(document.getElementById('cartModal'));
    modal.hide();
}

function renderProducts(category) {
    const productsGrid = document.getElementById('productsGrid');
    const filteredProducts = products.filter(product => product.category === category);

    if (filteredProducts.length === 0) {
        productsGrid.innerHTML = '<p>No hay productos en esta categoría.</p>';
        return;
    }

    productsGrid.innerHTML = filteredProducts.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}">
            <h5>${product.name}</h5>
            <p>S/. ${product.price}</p>
            <button onclick="addToCart(${product.id})" class="btn btn-outline-light btn-sm">
                <i class="bi bi-cart-plus"></i> Agregar al carrito
            </button>
        </div>
    `).join('');
}
