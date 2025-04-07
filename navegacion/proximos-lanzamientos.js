document.addEventListener('DOMContentLoaded', function() {
    // Inicializar botones de pre-orden
    initPreorderButtons();
    
    // Actualizar contador del carrito
    updateCartCount();
});

// Función para inicializar los botones de pre-orden
function initPreorderButtons() {
    // Seleccionar todos los botones de pre-orden (tanto el destacado como los de la grid)
    const preorderButtons = document.querySelectorAll('.preorder-btn, .preorder-now');
    
    preorderButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Obtener datos del producto desde los atributos data
            const productId = this.dataset.id;
            const productName = this.dataset.name;
            const productPrice = this.dataset.price;
            const productImage = this.dataset.image;
            
            if (!productId || !productName || !productPrice || !productImage) {
                console.error('Faltan datos del producto para la pre-orden');
                return;
            }
            
            // Crear objeto del producto con estado de pre-orden
            const product = {
                id: productId,
                name: productName,
                price: productPrice,
                image: productImage,
                quantity: 1,
                isPreorder: true, // Marcar como pre-orden
                releaseDate: getReleaseDate(this.closest('.upcoming-card')) // Obtener fecha de lanzamiento
            };
            
            // Añadir al carrito
            addToCart(product);
            
            // Mostrar notificación
            showPreorderNotification(productName);
        });
    });
}

// Función para obtener la fecha de lanzamiento desde la tarjeta del juego
function getReleaseDate(card) {
    if (!card) return 'Próximamente';
    
    const releaseBadge = card.querySelector('.release-badge');
    return releaseBadge ? releaseBadge.textContent : 'Próximamente';
}

// Función para añadir producto al carrito
function addToCart(product) {
    // Obtener carrito actual del localStorage o crear uno nuevo
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Verificar si el producto ya está en el carrito
    const existingProductIndex = cart.findIndex(item => item.id === product.id);
    
    if (existingProductIndex !== -1) {
        // Si el producto ya está en el carrito, incrementar la cantidad
        cart[existingProductIndex].quantity += 1;
    } else {
        // Si el producto no está en el carrito, añadirlo
        cart.push(product);
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

// Función para mostrar notificación de pre-orden
function showPreorderNotification(productName) {
    // Verificar si ya existe una notificación y eliminarla
    const existingNotification = document.querySelector('.preorder-notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = 'preorder-notification';
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <div class="preorder-notification-content">
            <h4>¡Pre-orden exitosa!</h4>
            <p>${productName} ha sido añadido a tu carrito como pre-orden.</p>
        </div>
    `;
    
    // Añadir al DOM
    document.body.appendChild(notification);
    
    // Mostrar con animación
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Ocultar después de 4 segundos
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 4000);
}