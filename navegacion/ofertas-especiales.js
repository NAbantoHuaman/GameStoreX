// ofertas-especiales.js - Funcionalidad específica para la página de ofertas especiales

// Inicializar todo cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', function () {
    // Inicializar filtros por categoría
    initCategoryTabs();
    
    // Inicializar contador de tiempo
    initCountdown();
    
    // Inicializar los botones de carrito específicos para ofertas
    // Evitamos duplicar la inicialización que ya hace main.js
    initOfferCartButtons();
    
    // Actualizar contador del carrito al cargar la página
    updateCartCount();
});

// Función para inicializar botones de carrito específicos para ofertas
function initOfferCartButtons() {
    document.querySelectorAll('.btn-cart').forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            
            // Obtener el contenedor de la oferta
            const offerCard = this.closest('.offer-card');
            if (!offerCard) return;

            // Obtener información del producto
            const productName = offerCard.querySelector('h4')?.textContent;
            const productPriceElement = offerCard.querySelector('.current-price');
            const productImageElement = offerCard.querySelector('.offer-image img');
            const productGenre = offerCard.querySelector('.offer-genre')?.textContent || '';

            if (!productName || !productPriceElement || !productImageElement) return;

            // Obtener el texto del precio y la imagen
            const priceText = productPriceElement.textContent;
            const productImage = productImageElement.src;

            // Crear objeto del producto
            const product = {
                name: productName,
                price: priceText,
                image: productImage,
                genre: productGenre,
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
    const existingProductIndex = cart.findIndex(item => item.name === product.name);

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

// Función para inicializar las pestañas de categorías
function initCategoryTabs() {
    const categoryTabs = document.querySelectorAll('.category-tab');
    const offerCards = document.querySelectorAll('.offer-card');
    
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remover clase activa de todas las pestañas
            categoryTabs.forEach(t => t.classList.remove('active'));
            
            // Añadir clase activa a la pestaña actual
            this.classList.add('active');
            
            // Obtener categoría seleccionada
            const category = this.dataset.category;
            
            // Filtrar tarjetas según la categoría
            offerCards.forEach(card => {
                if (category === 'all') {
                    card.style.display = 'block';
                } else {
                    const cardCategories = card.dataset.category?.split(' ') || [];
                    if (cardCategories.includes(category)) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                }
            });
        });
    });
}

// Función para inicializar la cuenta regresiva
function initCountdown() {
    // Establecer fecha objetivo (2 días desde ahora)
    const now = new Date();
    const targetDate = new Date(now);
    targetDate.setDate(now.getDate() + 2);
    targetDate.setHours(now.getHours() + 18);
    targetDate.setMinutes(now.getMinutes() + 45);
    targetDate.setSeconds(now.getSeconds() + 30);
    
    // Actualizar cada segundo
    const countdownInterval = setInterval(function() {
        const now = new Date().getTime();
        const distance = targetDate - now;
        
        // Cálculos de tiempo
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Actualizar elementos HTML
        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
        
        // Si la cuenta regresiva termina
        if (distance < 0) {
            clearInterval(countdownInterval);
            document.querySelector('.countdown-container').innerHTML = '<p>¡Las ofertas han terminado!</p>';
        }
    }, 1000);
}

// Inicializar botón "Ver más ofertas"
document.addEventListener('DOMContentLoaded', function() {
    const loadMoreBtn = document.querySelector('.load-more-btn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            // Aquí se implementaría la carga de más ofertas
            // Por ahora, solo mostraremos un mensaje
            alert('Próximamente: Más ofertas especiales');
        });
    }
});