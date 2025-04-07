//main.js - Funciones principales para la tienda GameStore

// Inicializar todo cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', function () {
    // Funcionalidad de login y lista de deseos
    updateLoginStatus();
    setupWishlistButtons();

    // Inicializar los botones de carrito y detalles
    initCartButtons();
    initDetailsButtons();
});



// Función para inicializar botones de carrito
function initCartButtons() {
    document.querySelectorAll('.btn-cart').forEach(button => {
        button.addEventListener('click', function () {
            // Obtener el contenedor del juego (game-card)
            const gameCard = this.closest('.game-card');
            if (!gameCard) return;

            // Obtener información del producto
            const productName = gameCard.querySelector('h3')?.textContent;
            const productPriceElement = gameCard.querySelector('.game-price');
            const productImageElement = gameCard.querySelector('.game-image');

            if (!productName || !productPriceElement || !productImageElement) return;

            // Obtener el texto del precio y la imagen
            const priceText = productPriceElement.textContent;
            const productImage = productImageElement.src;

            // Crear objeto del producto
            const product = {
                name: productName,
                price: priceText,
                image: productImage,
                quantity: 1
            };

            // Obtener carrito actual del localStorage o crear uno nuevo
            let cart = JSON.parse(localStorage.getItem('cart')) || [];

            // Verificar si el producto ya está en el carrito
            const existingProductIndex = cart.findIndex(item => item.name === product.name);

            if (existingProductIndex !== -1) {
                // Si el producto ya está en el carrito, incrementar la cantidad
                cart[existingProductIndex].quantity += 1;
                showNotification(`Se ha añadido otra unidad de ${productName} al carrito`);
            } else {
                // Si el producto no está en el carrito, añadirlo
                cart.push(product);
                showNotification(`¡${productName} ha sido añadido al carrito!`);
            }

            // Guardar carrito actualizado en localStorage
            localStorage.setItem('cart', JSON.stringify(cart));

            // Actualizar contador del carrito
            updateCartCount();
        });
    });

    // Actualizar contador del carrito al cargar la página
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

// Función para inicializar botones de detalles
function initDetailsButtons() {
    document.querySelectorAll('.btn-details').forEach(button => {
        // Solo añadir event listener si no tiene un enlace <a> dentro
        if (!button.querySelector('a')) {
            button.addEventListener('click', function () {
                const gameCard = this.closest('.game-card');
                if (!gameCard) return;

                const productNameElement = gameCard.querySelector('h3');
                if (!productNameElement) return;

                const productName = productNameElement.textContent;

                // Crear un ID a partir del nombre
                const productId = productName.toLowerCase()
                    .replace(/[^\w\s]/gi, '') // Eliminar caracteres especiales
                    .replace(/\s+/g, '-');    // Reemplazar espacios con guiones

                // Redirigir a la página de detalles dinámica
                window.location.href = `/producto.html?id=${productId}`;
            });
        }
    });
}

// Función para actualizar el estado de login en la interfaz
function updateLoginStatus() {
    const userIconElement = document.querySelector('.user-icon');
    const loggedInUser = localStorage.getItem('loggedInUser');

    if (userIconElement) {
        if (loggedInUser) {
            // Usuario logueado - cambiar el ícono y añadir tooltip
            userIconElement.innerHTML = `
                <i class="fas fa-user-check"></i>
                <span class="user-tooltip" data-text="Hola, ${loggedInUser}">Hola, ${loggedInUser}</span>
            `;
            userIconElement.classList.add('logged-in');
            userIconElement.href = '/perfil/perfil.html';
        } else {
            // Usuario no logueado - mostrar ícono normal
            userIconElement.innerHTML = `
                <i class="fas fa-user"></i>
            `;
            userIconElement.classList.remove('logged-in');
            userIconElement.href = '/Isesion/index.html';
        }
    }
}

// Configurar botones de lista de deseos
function setupWishlistButtons() {
    document.querySelectorAll('.wishlist-btn').forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();

            // Obtener el contenedor del juego
            const gameCard = this.closest('.game-card');
            if (!gameCard) return;

            // Obtener datos del producto
            const title = gameCard.querySelector('h3').textContent;
            const image = gameCard.querySelector('.game-image').src;
            const priceText = gameCard.querySelector('.game-price').textContent;
            const price = priceText.replace('S/. ', '');

            // Generar un ID único para el producto basado en su título
            const productId = title.toLowerCase().replace(/\s+/g, '-');

            // Verificar si el producto ya está en la lista de deseos
            const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
            const existingIndex = wishlist.findIndex(item => item.id === productId);

            if (existingIndex >= 0) {
                // Eliminar de la lista si ya existe
                wishlist.splice(existingIndex, 1);
                this.classList.remove('in-wishlist');
                this.innerHTML = `<i class="far fa-heart"></i>`;
                showNotification('Producto eliminado de tu lista de deseos');
            } else {
                // Añadir a la lista si no existe
                wishlist.push({
                    id: productId,
                    name: title,
                    image: image,
                    price: price
                });
                this.classList.add('in-wishlist');
                this.innerHTML = `<i class="fas fa-heart"></i>`;
                showNotification('Producto añadido a tu lista de deseos');
            }

            // Guardar lista actualizada
            localStorage.setItem('wishlist', JSON.stringify(wishlist));
        });

        // Verificar estado inicial
        const gameCard = button.closest('.game-card');
        if (gameCard) {
            const title = gameCard.querySelector('h3').textContent;
            const productId = title.toLowerCase().replace(/\s+/g, '-');
            const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
            const isInWishlist = wishlist.some(item => item.id === productId);

            if (isInWishlist) {
                button.classList.add('in-wishlist');
                button.innerHTML = `<i class="fas fa-heart"></i>`;
            }
        }
    });
}

// Función para mostrar notificaciones
function showNotification(message) {
    // Verificar si ya existe una notificación
    let notification = document.querySelector('.notification');

    if (!notification) {
        // Crear elemento de notificación
        notification = document.createElement('div');
        notification.className = 'notification';
        document.body.appendChild(notification);

        // Estilos para la notificación
        notification.style.position = 'fixed';
        notification.style.bottom = '20px';
        notification.style.right = '20px';
        notification.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        notification.style.color = '#fff';
        notification.style.padding = '12px 20px';
        notification.style.borderRadius = '5px';
        notification.style.boxShadow = '0 0 10px rgba(0, 243, 255, 0.5)';
        notification.style.zIndex = '9999';
        notification.style.transform = 'translateY(100px)';
        notification.style.opacity = '0';
        notification.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
    }

    // Actualizar mensaje
    notification.textContent = message;
    notification.classList.add('show');
    notification.style.transform = 'translateY(0)';
    notification.style.opacity = '1';

    // Ocultar después de 3 segundos
    setTimeout(() => {
        notification.style.transform = 'translateY(100px)';
        notification.style.opacity = '0';
        setTimeout(() => {
            notification.classList.remove('show');
        }, 300);
    }, 3000);
}

// Añadir estilos CSS para los elementos de la interfaz
function addStyles() {
    if (!document.getElementById('custom-styles')) {
        const styleElement = document.createElement('style');
        styleElement.id = 'custom-styles';
        styleElement.textContent = `
            .wishlist-btn.in-wishlist i {
                color: #ff3e66;
            }
        `;
        document.head.appendChild(styleElement);
    }
}

// Llamar a la función para añadir estilos
addStyles();