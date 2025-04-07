document.addEventListener('DOMContentLoaded', function () {
    // Cachear referencias DOM para mejor rendimiento
    const elements = {
        // Información del perfil
        profileName: document.getElementById('profileName'),
        profileInitial: document.getElementById('profileInitial'),
        profileEmail: document.getElementById('profileEmail'),
        profileNameInput: document.getElementById('profileNameInput'),
        profileEmailInput: document.getElementById('profileEmailInput'),
        profileBio: document.getElementById('profileBio'),
        loginStatus: document.getElementById('loginStatus'),

        // Contadores
        gamesCount: document.getElementById('gamesCount'),
        wishlistCount: document.getElementById('wishlistCount'),
        reviewsCount: document.getElementById('reviewsCount'),

        // Contenedores
        wishlistContainer: document.getElementById('wishlistContainer'),
        collectionContainer: document.getElementById('collectionContainer'),

        // Formularios
        profileForm: document.getElementById('profileForm'),

        // Tabs
        tabButtons: document.querySelectorAll('.tab-btn')
    };

    // Inicializar la página
    initializePage(elements);
});


//Inicializa todos los componentes de la página

function initializePage(elements) {
    // Verificar si es la primera visita para limpiar la lista de deseos
    const firstVisit = localStorage.getItem('firstProfileVisit') !== 'true';
    if (firstVisit) {
        localStorage.removeItem('wishlist');
        localStorage.setItem('firstProfileVisit', 'true');
    }

    // Verificar si el usuario está logueado
    checkUserLogin(elements);

    // Cargar datos del usuario
    loadUserProfile(elements);

    // Configurar navegación por tabs
    setupTabNavigation(elements);

    // Cargar lista de deseos
    loadWishlist(elements);

    // Cargar colección de juegos
    loadCollection(elements);

    // Configurar formularios
    setupForms(elements);
}

/**
 * Verifica si el usuario está logueado
 */
function checkUserLogin(elements) {
    const loggedInUser = localStorage.getItem('loggedInUser');

    if (!loggedInUser) {
        // Redirigir a la página de inicio de sesión
        window.location.href = '../Isesion/index.html';
        return;
    }

    // Actualizar los botones de autenticación en el header
    const authButtons = document.querySelector('.auth-buttons');
    if (authButtons) {
        // Limpiar botones existentes
        authButtons.innerHTML = '';

        // Crear botón de perfil (con el nombre de usuario)
        const profileBtn = document.createElement('a');
        profileBtn.href = '../perfil/perfil.html';
        profileBtn.textContent = loggedInUser;
        authButtons.appendChild(profileBtn);

        // Crear botón de cerrar sesión
        const logoutBtn = document.createElement('a');
        logoutBtn.href = '#';
        logoutBtn.textContent = 'Cerrar Sesión';
        logoutBtn.addEventListener('click', function (e) {
            e.preventDefault();
            localStorage.removeItem('loggedInUser');
            window.location.href = '../index.html';
        });
        authButtons.appendChild(logoutBtn);
    }
}

/**
 * Carga los datos del perfil del usuario
 */
function loadUserProfile(elements) {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (!loggedInUser) return;

    // Actualizar nombre e inicial
    if (elements.profileName) {
        elements.profileName.textContent = loggedInUser;
    }

    if (elements.profileInitial) {
        elements.profileInitial.textContent = loggedInUser.charAt(0).toUpperCase();
    }

    // Actualizar email
    if (elements.profileEmail) {
        elements.profileEmail.textContent = `${loggedInUser.toLowerCase().replace(/\s+/g, '.')}@gmail.com`;
    }

    // Actualizar campos del formulario de perfil
    if (elements.profileNameInput) {
        elements.profileNameInput.value = loggedInUser;
    }

    if (elements.profileEmailInput) {
        elements.profileEmailInput.value = `${loggedInUser.toLowerCase().replace(/\s+/g, '.')}@gmail.com`;
    }

    // Cargar biografía si existe
    const bioKey = `${loggedInUser}_bio`;
    const savedBio = localStorage.getItem(bioKey);
    if (savedBio && elements.profileBio) {
        elements.profileBio.value = savedBio;
    }

    // Actualizar contadores con datos reales
    updateCounters(elements);
}

// Actualiza los contadores de estadísticas
function updateCounters(elements) {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (!loggedInUser) return;

    // Lista de deseos - usar datos reales
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    if (elements.wishlistCount) {
        elements.wishlistCount.textContent = wishlist.length;
    }

    // Colección de juegos
    const collectionKey = `${loggedInUser}_collection`;
    const collection = JSON.parse(localStorage.getItem(collectionKey)) || [];
    if (elements.gamesCount) {
        elements.gamesCount.textContent = collection.length;
    }

    // Reseñas - usar datos persistentes
    if (elements.reviewsCount) {
        const reviewsKey = `${loggedInUser}_reviews`;
        let reviews = localStorage.getItem(reviewsKey);

        if (!reviews) {
            // Si no hay datos guardados, inicializar con 0
            reviews = "0";
            localStorage.setItem(reviewsKey, reviews);
        }

        elements.reviewsCount.textContent = reviews;
    }
}

/**
 * Configura la navegación por tabs
 */
function setupTabNavigation(elements) {
    if (!elements.tabButtons) return;

    elements.tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');

            // Desactivar todos los tabs
            elements.tabButtons.forEach(btn => btn.classList.remove('active'));
            document.querySelectorAll('.tab-pane').forEach(tab => tab.classList.remove('active'));

            // Activar el tab seleccionado
            button.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
}

/**
 * Carga la lista de deseos
 */
function loadWishlist(elements) {
    if (!elements.wishlistContainer) return;

    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

    // Mostrar mensaje si la lista está vacía
    if (wishlist.length === 0) {
        elements.wishlistContainer.innerHTML = '<p class="empty-state">No tienes productos en tu lista de deseos. Explora nuestro catálogo para añadir tus juegos favoritos.</p>';
        return;
    }

    // Crear fragmento para mejor rendimiento
    const fragment = document.createDocumentFragment();

    // Añadir cada producto
    wishlist.forEach(product => {
        const item = document.createElement('div');
        item.className = 'wishlist-item';
        item.innerHTML = `
            <img src="${product.image}" alt="${product.name}" loading="lazy">
            <div class="item-details">
                <h3>${product.name}</h3>
                <div class="item-price">S/. ${product.price}</div>
            </div>
            <div class="item-actions">
                <button class="action-btn add-cart-btn" data-id="${product.id}" title="Añadir al carrito">
                    <i class="fas fa-cart-plus"></i>
                </button>
                <button class="action-btn remove-wish-btn" data-id="${product.id}" title="Eliminar">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;

        fragment.appendChild(item);
    });

    // Limpiar contenedor y añadir items
    elements.wishlistContainer.innerHTML = '';
    elements.wishlistContainer.appendChild(fragment);

    // Configurar botones con delegación de eventos
    setupWishlistButtons(elements);
}

/**
 * Configura los botones de la lista de deseos
 */
function setupWishlistButtons(elements) {
    if (!elements.wishlistContainer) return;

    // Usar delegación de eventos para mejor rendimiento
    elements.wishlistContainer.addEventListener('click', function (e) {
        const target = e.target.closest('.action-btn');
        if (!target) return;

        const productId = target.getAttribute('data-id');

        // Botón añadir al carrito
        if (target.classList.contains('add-cart-btn')) {
            addToCart(productId);
        }

        // Botón eliminar de la lista
        if (target.classList.contains('remove-wish-btn')) {
            removeFromWishlist(productId, elements);
        }
    });
}

/**
 * Añade un producto al carrito
 */
function addToCart(productId) {
    // Obtener lista de deseos
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

    // Buscar producto en la lista de deseos
    const product = wishlist.find(item => item.id === productId);
    if (!product) return;

    // Obtener carrito actual
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Verificar si el producto ya está en el carrito
    const existingProductIndex = cart.findIndex(item => item.id === productId);

    if (existingProductIndex >= 0) {
        // Incrementar cantidad si ya existe
        cart[existingProductIndex].quantity += 1;
    } else {
        // Añadir nuevo producto
        cart.push({
            id: productId,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }

    // Guardar carrito actualizado
    localStorage.setItem('cart', JSON.stringify(cart));

    // Mostrar notificación de éxito
    showNotification('Producto añadido al carrito', 'success');
}

/**
 * Elimina un producto de la lista de deseos
 */
function removeFromWishlist(productId, elements) {
    // Obtener lista de deseos actual
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

    // Filtrar el producto a eliminar
    const updatedWishlist = wishlist.filter(item => item.id !== productId);

    // Guardar lista actualizada
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));

    // Recargar la lista de deseos
    loadWishlist(elements);

    // Actualizar contador
    updateCounters(elements);

    // Mostrar notificación
    showNotification('Producto eliminado de favoritos', 'info');
}

/**
 * Carga la colección de juegos
 */
function loadCollection(elements) {
    if (!elements.collectionContainer) return;

    const loggedInUser = localStorage.getItem('loggedInUser');
    if (!loggedInUser) return;

    const collectionKey = `${loggedInUser}_collection`;
    const collection = JSON.parse(localStorage.getItem(collectionKey)) || [];

    // Mostrar mensaje si la colección está vacía
    if (collection.length === 0) {
        elements.collectionContainer.innerHTML = '<p class="empty-state">No tienes juegos en tu colección. ¡Explora nuestro catálogo para comenzar!</p>';
        return;
    }

    // Crear fragmento para mejor rendimiento
    const fragment = document.createDocumentFragment();

    // Añadir cada juego
    collection.forEach(game => {
        const item = document.createElement('div');
        item.className = 'collection-item';
        item.innerHTML = `
            <img src="${game.image}" alt="${game.name}" loading="lazy">
            <div class="item-title">${game.name}</div>
        `;

        fragment.appendChild(item);
    });

    // Limpiar contenedor y añadir items
    elements.collectionContainer.innerHTML = '';
    elements.collectionContainer.appendChild(fragment);
}

/**
 * Configura los formularios
 */
function setupForms(elements) {
    if (!elements.profileForm) return;

    elements.profileForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const loggedInUser = localStorage.getItem('loggedInUser');
        if (!loggedInUser) return;

        // Guardar biografía
        const bioKey = `${loggedInUser}_bio`;
        localStorage.setItem(bioKey, elements.profileBio.value);

        // Actualizar nombre de usuario
        const newUsername = elements.profileNameInput.value.trim();
        if (newUsername && newUsername !== loggedInUser) {
            localStorage.setItem('loggedInUser', newUsername);

            // Recargar la página para reflejar los cambios
            showNotification('Perfil actualizado correctamente', 'success');
            setTimeout(() => {
                window.location.reload();
            }, 1500);
        } else {
            showNotification('Perfil actualizado correctamente', 'success');
        }
    });
}

/**
 * Muestra una notificación estilizada
 */
function showNotification(message, type = 'info') {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;

    // Iconos según tipo
    let icon = '';
    switch (type) {
        case 'success':
            icon = '<i class="fas fa-check-circle"></i>';
            break;
        case 'error':
            icon = '<i class="fas fa-exclamation-circle"></i>';
            break;
        case 'warning':
            icon = '<i class="fas fa-exclamation-triangle"></i>';
            break;
        default:
            icon = '<i class="fas fa-info-circle"></i>';
    }

    notification.innerHTML = `
        ${icon}
        <span>${message}</span>
    `;

    // Añadir al DOM
    document.body.appendChild(notification);

    // Mostrar con animación y estilo mejorado
    notification.style.opacity = '0';
    notification.style.transform = 'translateY(20px)';
    document.body.appendChild(notification);

    // Forzar un reflow para asegurar la transición
    notification.offsetHeight;

    // Aplicar transición
    notification.style.opacity = '1';
    notification.style.transform = 'translateY(0)';

    // Ocultar después de 3 segundos
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(-20px)';

        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}