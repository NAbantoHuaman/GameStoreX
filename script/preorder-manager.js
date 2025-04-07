// preorder-manager.js - Gestión de preórdenes para la página principal

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar botones de pre-orden en la página principal
    initPreorderButtons();
    
    // Actualizar contador del carrito
    updateCartCount();
});

// Función para inicializar los botones de pre-orden
function initPreorderButtons() {
    // Seleccionar todos los botones de pre-orden en la sección de próximos lanzamientos
    const preorderButtons = document.querySelectorAll('.upcoming-card .btn-secondary, .upcoming-card .preorder-btn');
    
    preorderButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Prevenir navegación si el botón es un enlace
            e.preventDefault();
            
            // Obtener el contenedor del juego (upcoming-card)
            const upcomingCard = this.closest('.upcoming-card');
            if (!upcomingCard) return;
            
            // Obtener información del producto
            const productName = upcomingCard.querySelector('h3')?.textContent;
            const productImage = upcomingCard.querySelector('.upcoming-image')?.src;
            
            // Si no se encuentra la imagen en el elemento .upcoming-image, buscar en el elemento img dentro del contenedor
            const imgElement = productImage || upcomingCard.querySelector('.upcoming-image-container img')?.src;
            
            if (!productName || !imgElement) {
                console.error('No se pudo obtener la información completa del producto');
                return;
            }
            
            // Obtener fecha de lanzamiento desde el elemento upcoming-date
            const releaseDateElement = upcomingCard.querySelector('.upcoming-date');
            let releaseDate = 'Próximamente';
            
            if (releaseDateElement) {
                const day = releaseDateElement.querySelector('.day')?.textContent || '';
                const month = releaseDateElement.querySelector('.month')?.textContent || '';
                if (day && month) {
                    releaseDate = `${day} ${month} 2025`; // Asumimos 2025 como año de lanzamiento
                }
            }
            
            // Generar un ID único para el producto basado en su título
            const productId = productName.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
            
            // Establecer un precio predeterminado para la preorden
            const productPrice = 'S/. 259.90';
            
            // Crear objeto del producto con estado de pre-orden
            const product = {
                id: productId,
                name: productName,
                price: productPrice,
                image: imgElement,
                quantity: 1,
                isPreorder: true, // Marcar como pre-orden
                releaseDate: releaseDate // Añadir fecha de lanzamiento
            };
            
            // Añadir al carrito
            addToCart(product);
            
            // Mostrar notificación
            showPreorderNotification(productName);
        });
    });
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

// Función para mostrar notificación de preorden
function showPreorderNotification(productName) {
    // Verificar si ya existe una notificación y eliminarla
    const existingNotification = document.querySelector('.preorder-notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = 'preorder-notification';
    
    // Contenido de la notificación
    notification.innerHTML = `
        <div class="preorder-notification-content">
            <i class="fas fa-check-circle"></i>
            <h4>¡Pre-orden Exitosa!</h4>
            <p>${productName} ha sido añadido a tu carrito como pre-orden.</p>
        </div>
    `;
    
    // Añadir al body
    document.body.appendChild(notification);
    
    // Mostrar con animación
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Ocultar después de 5 segundos
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}