document.addEventListener('DOMContentLoaded', function () {
    console.log("DOM cargado, iniciando carga de producto");

    // Función para dividir el título y aplicar la clase accent a la segunda parte
    function splitTitleForAccent(title) {
        // Si el título tiene más de una palabra, dividimos en dos partes
        const words = title.split(' ');
        if (words.length <= 1) return title; // Si solo hay una palabra, devolvemos el título original
        
        // Dividimos el título aproximadamente a la mitad
        const midPoint = Math.ceil(words.length / 2);
        const firstPart = words.slice(0, midPoint).join(' ');
        const secondPart = words.slice(midPoint).join(' ');
        
        return `${firstPart} <span class="accent">${secondPart}</span>`;
    }

    // Cargar estilos CSS
    if (!document.getElementById('product-detail-styles')) {
        const linkElement = document.createElement('link');
        linkElement.id = 'product-detail-styles';
        linkElement.rel = 'stylesheet';
        linkElement.href = '/css/product-detail-new.css';

        document.head.appendChild(linkElement);
    }

    // Verificar si los datos de productos están disponibles
    if (!window.productsData) {
        console.error("Error: No se encontraron datos de productos");
        showError("No se pudieron cargar los datos de productos. Por favor, recarga la página.");
        return;
    }

    // Obtener el ID del producto de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    console.log("ID de producto solicitado:", productId);

    if (!productId) {
        showError("No se especificó un producto");
        return;
    }

    // Obtener los datos del producto
    const product = window.productsData[productId];

    console.log("Datos del producto:", product);

    if (!product) {
        showError("Producto no encontrado");
        return;
    }

    // Actualizar el título de la página
    document.title = `${product.name} - GameStore`;

    // Crear la estructura HTML para los detalles del producto
    const productDetailHTML = `
        <div class="product-container">
            <!-- Encabezado del producto -->
            <div class="product-header">
                <div class="product-breadcrumb">
                    <a href="/new_index.html">Inicio</a>
                    <span class="separator">/</span>
                    <a href="/new_index.html">Catálogo</a>
                    <span class="separator">/</span>
                    <a href="/new_index.html?category=${product.category}">${capitalizeFirstLetter(product.category)}</a>
                    <span class="separator">/</span>
                    <span>${product.name}</span>
                </div>
                <h1 class="product-title">${splitTitleForAccent(product.name)}</h1>
            </div>
            
            <!-- Sección principal del producto -->
            <div class="product-main">
                <!-- Galería de imágenes -->
                <div class="product-gallery">
                    <div class="main-image-container">
                        <img src="${product.image}" alt="${product.name} - Portada del juego" class="main-image" id="mainProductImage" onclick="openLightbox(0)" loading="lazy">
                    </div>
                </div>
                
                <!-- Información del producto -->
                <div class="product-info">
                    <div>
                        <div class="product-price-container">
                            <div class="product-price">${product.price}</div>
                            <div class="product-status">${product.releaseDate.includes('202') ? 'Pre-orden' : 'Disponible'}</div>
                        </div>
                        
                        <div class="product-description">
                            <p>${product.description}</p>
                        </div>
                        
                        <div class="product-actions">
                            <button class="btn-primary" id="addToCartBtn" data-product-id="${product.id}" data-product-price="${product.price.replace('S/. ', '')}">
                                <i class="fas fa-shopping-cart"></i>
                                <span>Añadir al Carrito</span>
                            </button>
                            <button class="btn-secondary" id="wishlistBtn" data-product-id="${product.id}">
                                <i class="far fa-heart"></i>
                                <span>Favoritos</span>
                            </button>
                        </div>
                    </div>
                    
                    <div class="product-meta">
                        <div class="meta-item">
                            <i class="fas fa-gamepad meta-icon"></i>
                            <div>
                                <div class="meta-text">Plataforma</div>
                                <div class="meta-value">PlayStation 5</div>
                            </div>
                        </div>
                        <div class="meta-item">
                            <i class="fas fa-calendar-alt meta-icon"></i>
                            <div>
                                <div class="meta-text">Lanzamiento</div>
                                <div class="meta-value">${product.releaseDate}</div>
                            </div>
                        </div>
                        <div class="meta-item">
                            <i class="fas fa-code-branch meta-icon"></i>
                            <div>
                                <div class="meta-text">Desarrollador</div>
                                <div class="meta-value">${product.developer}</div>
                            </div>
                        </div>
                        <div class="meta-item">
                            <i class="fas fa-star meta-icon"></i>
                            <div>
                                <div class="meta-text">Valoración</div>
                                <div class="meta-value">${product.rating}/5</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Carrusel de imágenes del juego -->
            ${product.thumbnails && product.thumbnails.length > 0 ? `
            <div class="carousel-section">
                <h2 class="carousel-title">IMÁGENES DEL <span class="accent">JUEGO</span></h2>
                <div class="carousel">
                    <div class="carousel-container" id="carouselContainer">
                        ${product.thumbnails.map((thumb, index) => `
                            <div class="carousel-slide" style="background-image: url('${thumb}')" onclick="openLightbox(${index + 1})"></div>
                        `).join('')}
                    </div>
                    
                    <div class="carousel-nav" id="carouselNav">
                        ${product.thumbnails.map((thumb, index) => `
                            <div class="carousel-dot ${index === 0 ? 'active' : ''}" data-index="${index}"></div>
                        `).join('')}
                    </div>
                    
                    <div class="carousel-arrow carousel-prev" id="carouselPrev">
                        <i class="fas fa-chevron-left"></i>
                    </div>
                    <div class="carousel-arrow carousel-next" id="carouselNext">
                        <i class="fas fa-chevron-right"></i>
                    </div>
                </div>
            </div>` : ''}
            
            <!-- Pestañas de contenido -->
            <div class="product-tabs">
                <div class="tabs-nav">
                    <button class="tab-btn active" data-tab="features">CARAC<span class="accent">TERÍSTICAS</span></button>
                    ${product.trailer ? `<button class="tab-btn" data-tab="trailer">TRA<span class="accent">ILER</span></button>` : ''}
                    <button class="tab-btn" data-tab="specs">ESPECI<span class="accent">FICACIONES</span></button>
                </div>
                
                <!-- Contenido de las pestañas -->
                <div id="features" class="tab-content active">
                    <div class="features-grid">
                        ${product.features.map(feature => `<div class="feature-item">${feature}</div>`).join('')}
                    </div>
                </div>
                
                ${product.trailer ? `
                <div id="trailer" class="tab-content">
                    <div class="trailer-container">
                        <iframe src="${product.trailer}" title="${product.name} Trailer Oficial" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe>
                    </div>
                </div>` : ''}
                
                <div id="specs" class="tab-content">
                    <div class="specs-grid">
                        <div class="spec-item">
                            <div class="spec-title">Plataforma</div>
                            <div class="spec-value">PlayStation 5</div>
                        </div>
                        <div class="spec-item">
                            <div class="spec-title">Género</div>
                            <div class="spec-value">${capitalizeFirstLetter(product.category)}</div>
                        </div>
                        <div class="spec-item">
                            <div class="spec-title">Desarrollador</div>
                            <div class="spec-value">${product.developer}</div>
                        </div>
                        <div class="spec-item">
                            <div class="spec-title">Editor</div>
                            <div class="spec-value">${product.publisher}</div>
                        </div>
                        <div class="spec-item">
                            <div class="spec-title">Fecha de lanzamiento</div>
                            <div class="spec-value">${product.releaseDate}</div>
                        </div>
                        ${product.languages ? `
                        <div class="spec-item">
                            <div class="spec-title">Idiomas</div>
                            <div class="spec-value">${product.languages}</div>
                        </div>` : ''}
                        ${product.players ? `
                        <div class="spec-item">
                            <div class="spec-title">Jugadores</div>
                            <div class="spec-value">${product.players}</div>
                        </div>` : ''}
                        ${product.classification ? `
                        <div class="spec-item">
                            <div class="spec-title">Clasificación</div>
                            <div class="spec-value">${product.classification}</div>
                        </div>` : ''}
                        ${product.resolution ? `
                        <div class="spec-item">
                            <div class="spec-title">Resolución</div>
                            <div class="spec-value">${product.resolution}</div>
                        </div>` : ''}
                    </div>
                </div>
            </div>
            
            <!-- Productos relacionados -->
            <div class="related-section" id="relatedProductsSection">
                <h2 class="related-title">PRODUCTOS <span class="accent">RELACIONADOS</span></h2>
                <div class="related-grid" id="relatedProductsContainer">
                    <!-- Los productos relacionados se cargarán dinámicamente -->
                </div>
            </div>
        </div>
        
        <!-- Lightbox para imágenes (simplificado) -->
        <div class="lightbox" id="imageLightbox">
            <div class="lightbox-close" onclick="closeLightbox()">&times;</div>
            <div class="lightbox-content">
                <img id="lightboxImg" class="lightbox-img" alt="Imagen ampliada">
            </div>
        </div>
    `;

    // Insertar el HTML en el contenedor
    const container = document.getElementById('productDetailContainer');
    container.innerHTML = productDetailHTML;

    // Configurar el botón de añadir al carrito
    setupAddToCartButton(product);

    // Cargar productos relacionados
    loadRelatedProducts(productId, product.category);

    // Configurar las pestañas
    setupTabs();

    // Configurar el carrusel
    if (product.thumbnails && product.thumbnails.length > 0) {
        setupCarousel(product);
    }

    // Configurar el lightbox
    setupLightbox(product);

    // Ya no necesitamos configurar las miniaturas, se eliminaron del diseño
});

// Función para configurar las pestañas
function setupTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Desactivar todas las pestañas
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Activar la pestaña seleccionada
            button.classList.add('active');
            const tabId = button.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
}

// Función para configurar el carrusel
function setupCarousel(product) {
    const carouselContainer = document.getElementById('carouselContainer');
    const carouselDots = document.querySelectorAll('.carousel-dot');
    const prevButton = document.getElementById('carouselPrev');
    const nextButton = document.getElementById('carouselNext');

    let currentSlide = 0;
    const totalSlides = product.thumbnails.length;

    // Función para mostrar una diapositiva específica
    function showSlide(index) {
        if (index < 0) index = totalSlides - 1;
        if (index >= totalSlides) index = 0;

        currentSlide = index;
        carouselContainer.style.transform = `translateX(-${currentSlide * 100}%)`;

        // Actualizar los puntos de navegación
        carouselDots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentSlide);
        });
    }

    // Configurar los botones de navegación
    prevButton.addEventListener('click', () => showSlide(currentSlide - 1));
    nextButton.addEventListener('click', () => showSlide(currentSlide + 1));

    // Configurar los puntos de navegación
    carouselDots.forEach((dot, index) => {
        dot.addEventListener('click', () => showSlide(index));
    });

    // Iniciar el carrusel
    showSlide(0);

    // Autoplay opcional
    let autoplayInterval;

    function startAutoplay() {
        autoplayInterval = setInterval(() => {
            showSlide(currentSlide + 1);
        }, 5000);
    }

    function stopAutoplay() {
        clearInterval(autoplayInterval);
    }

    // Iniciar autoplay
    startAutoplay();

    // Detener autoplay al interactuar con el carrusel
    document.querySelector('.carousel').addEventListener('mouseenter', stopAutoplay);
    document.querySelector('.carousel').addEventListener('mouseleave', startAutoplay);
}

// Función para configurar el lightbox simplificado (solo muestra la imagen actual)
function setupLightbox(product) {
    const lightbox = document.getElementById('imageLightbox');
    const lightboxImg = document.getElementById('lightboxImg');

    // Crear array con todas las imágenes (principal + thumbnails)
    const allImages = [product.image, ...product.thumbnails];

    // Función para abrir el lightbox
    window.openLightbox = function (index) {
        lightboxImg.src = allImages[index];
        lightbox.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    };

    // Función para cerrar el lightbox
    window.closeLightbox = function () {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    };

    // Cerrar lightbox al hacer clic fuera de la imagen
    lightbox.addEventListener('click', function (e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Navegación con teclado (solo escape para cerrar)
    document.addEventListener('keydown', function (e) {
        if (lightbox.style.display === 'flex' && e.key === 'Escape') {
            closeLightbox();
        }
    });
}

// Función para configurar el botón de añadir al carrito
function setupAddToCartButton(product) {
    const addToCartBtn = document.getElementById('addToCartBtn');

    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', () => {
            // Crear objeto del producto para el carrito
            const cartProduct = {
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: 1
            };

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
                cart.push(cartProduct);
                showNotification(`¡${product.name} ha sido añadido al carrito!`);
            }

            // Guardar carrito actualizado en localStorage
            localStorage.setItem('cart', JSON.stringify(cart));

            // Actualizar contador del carrito en el header
            updateCartCount();
        });
    }

    // Configurar botón de lista de deseos
    const wishlistBtn = document.getElementById('wishlistBtn');
    if (wishlistBtn) {
        // Verificar si el producto ya está en la lista de deseos
        const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        if (wishlist.some(item => item.id === product.id)) {
            wishlistBtn.classList.add('active');
            wishlistBtn.querySelector('i').classList.remove('far');
            wishlistBtn.querySelector('i').classList.add('fas');
        }

        wishlistBtn.addEventListener('click', () => {
            // Obtener lista de deseos actual del localStorage o crear una nueva
            let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

            // Verificar si el producto ya está en la lista de deseos
            const existingProductIndex = wishlist.findIndex(item => item.id === product.id);

            if (existingProductIndex !== -1) {
                // Si el producto ya está en la lista de deseos, eliminarlo
                wishlist.splice(existingProductIndex, 1);
                showNotification(`${product.name} ha sido eliminado de tu lista de favoritos`);
                wishlistBtn.classList.remove('active');
                wishlistBtn.querySelector('i').classList.remove('fas');
                wishlistBtn.querySelector('i').classList.add('far');
            } else {
                // Si el producto no está en la lista de deseos, añadirlo
                wishlist.push({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image
                });
                showNotification(`¡${product.name} ha sido añadido a tu lista de favoritos!`);
                wishlistBtn.classList.add('active');
                wishlistBtn.querySelector('i').classList.remove('far');
                wishlistBtn.querySelector('i').classList.add('fas');
            }

            // Guardar lista de deseos actualizada en localStorage
            localStorage.setItem('wishlist', JSON.stringify(wishlist));
        });
    }
}

// Función para actualizar el contador del carrito
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

    const cartCountElement = document.querySelector('.cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = cartCount;
    }
}

// Función para cargar productos relacionados
function loadRelatedProducts(currentProductId, category) {
    // Filtrar productos de la misma categoría (excluyendo el producto actual)
    const relatedProducts = Object.values(window.productsData)
        .filter(product => product.category === category && product.id !== currentProductId)
        .slice(0, 4); // Limitar a 4 productos relacionados

    if (relatedProducts.length === 0) {
        const relatedSection = document.getElementById('relatedProductsSection');
        if (relatedSection) {
            relatedSection.style.display = 'none';
        }
        return;
    }

    // Crear HTML para productos relacionados
    const relatedProductsHTML = relatedProducts.map(product => `
        <a href="/producto.html?id=${product.id}" class="related-card" aria-label="Ver detalles de ${product.name}">
            <div class="related-img-container">
                <img src="${product.image}" alt="${product.name}" class="related-img" loading="lazy">
            </div>
            <div class="related-info">
                <h3 class="related-name">${product.name}</h3>
                <div class="related-category">${capitalizeFirstLetter(product.category)}</div>
                <div class="related-price">${product.price}</div>
            </div>
        </a>
    `).join('');

    // Insertar HTML en el contenedor
    const relatedContainer = document.getElementById('relatedProductsContainer');
    if (relatedContainer) {
        relatedContainer.innerHTML = relatedProductsHTML;
    }
}

// Función para mostrar errores
function showError(message) {
    const container = document.getElementById('productDetailContainer');
    container.innerHTML = `
        <div class="error-message">
            <h2>Error</h2>
            <p>${message}</p>
            <a href="/new_index.html" class="button">Volver a la página principal</a>
        </div>
    `;
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
    }

    // Actualizar mensaje
    notification.textContent = message;
    notification.classList.add('show');

    // Ocultar después de 3 segundos
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Función para capitalizar la primera letra
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}