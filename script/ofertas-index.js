// ofertas-index.js - Funcionalidad específica para los botones de ofertas en la página principal

// Inicializar todo cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', function () {
    // Inicializar los botones de carrito específicos para ofertas en la página principal
    initOfferCartButtons();
});

// Función para inicializar botones de carrito específicos para ofertas en la página principal
function initOfferCartButtons() {
    // Seleccionamos específicamente los botones de ofertas en la página principal
    document.querySelectorAll('.offers-grid .btn-cart').forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            
            // Obtener información del producto desde los atributos data
            const productId = this.getAttribute('data-id');
            const productName = this.getAttribute('data-name');
            const productPrice = this.getAttribute('data-price');
            const productImage = this.getAttribute('data-image');
            
            if (!productId || !productName || !productPrice || !productImage) {
                console.error('Faltan datos del producto en el botón');
                return;
            }

            // Crear objeto del producto
            const product = {
                id: productId,
                name: productName,
                price: productPrice,
                image: productImage,
                quantity: 1
            };

            // Añadir al carrito
            addToCart(product);
        });
    });
}

// Función para añadir productos al carrito
function addToCart(product) {
    // Obtener carrito actual del localStorage o crear uno nuevo
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Verificar si el producto ya está en el carrito
    const existingProductIndex = cart.findIndex(item => item.id === product.id);

    if (existingProductIndex !== -1) {
        // Si el producto ya está en el carrito, incrementar la cantidad
        cart[existingProductIndex].quantity += 1;
        showNotification(`Se ha añadido otra unidad de ${product.name} al carrito`);
    } else {
        // Si el producto no está en el carrito, añadirlo
        cart.push(product);
        showNotification(`¡${product.name} ha sido añadido al carrito!`);
    }

    // Guardar carrito actualizado en localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Actualizar contador del carrito
    updateCartCount();
}

// Función para actualizar el contador del carrito
function updateCartCount() {
    const cartCountElement = document.querySelector('.cart-count');
    if (!cartCountElement) return;

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    let totalItems = 0;

    // Sumar todas las cantidades
    cart.forEach(item => {
        totalItems += item.quantity || 1;
    });

    // Actualizar el texto del contador
    cartCountElement.textContent = totalItems.toString();

    // Mostrar u ocultar el contador según si hay items
    if (totalItems > 0) {
        cartCountElement.style.display = 'flex';
    } else {
        cartCountElement.style.display = 'none';
    }
}

// Función para mostrar notificación
function showNotification(message) {
    // Verificar si ya existe una notificación
    let notification = document.querySelector('.cart-notification');
    
    // Si no existe, crearla
    if (!notification) {
        notification = document.createElement('div');
        notification.className = 'cart-notification';
        document.body.appendChild(notification);
    }
    
    // Actualizar el mensaje
    notification.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`;
    notification.classList.add('show');
    
    // Ocultar después de 3 segundos
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}