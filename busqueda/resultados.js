// Barra de busqueda 
document.addEventListener('DOMContentLoaded', function () {
    // Buscar url mediante query
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('q');

    // Elementos del DOM
    const searchInput = document.getElementById('searchInput');
    const resultsContainer = document.getElementById('searchResults');
    const resultsTitle = document.getElementById('resultsTitle');
    const filterButtons = document.querySelectorAll('.filter-btn');

    // Inicializar el contador del carrito al cargar la página
    updateCartCounter();

    // Crear el dropdown para búsqueda en tiempo real
    const searchResultsDropdown = document.createElement('div');
    searchResultsDropdown.className = 'search-results-dropdown';

    // Agregar el dropdown al DOM después del input de búsqueda
    if (searchInput && searchInput.parentNode) {
        searchInput.parentNode.appendChild(searchResultsDropdown);
    }

    if (!searchInput || !resultsContainer) return;

    // Set initial search value
    if (searchQuery) {
        searchInput.value = decodeURIComponent(searchQuery);
        performSearch(searchQuery);
    }

    // Funcion de busqueda 
    function performSearch(query) {
        const activeCategory = document.querySelector('.filter-btn.active')?.dataset.category || 'all';
        const filteredGames = window.allGames.filter(game => {
            const matchesSearch = game.title.toLowerCase().includes(query.toLowerCase()) ||
                game.category.toLowerCase().includes(query.toLowerCase());
            const matchesCategory = activeCategory === 'all' ||
                game.category.toLowerCase() === activeCategory.toLowerCase();
            return matchesSearch && matchesCategory;
        });

        displayResults(filteredGames, query);

        // Ocultar el dropdown de búsqueda en tiempo real
        if (searchResultsDropdown) {
            searchResultsDropdown.style.display = 'none';
        }
    }

    // Resultados del Display 
    function displayResults(games, query) {
        resultsContainer.innerHTML = '';

        if (games.length === 0) {
            resultsContainer.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-gamepad icon-controller"></i>
                    <h3 class="empty-title">Sin resultados</h3>
                    <p class="empty-message">No se encontraron juegos para "${query}"</p>
                </div>
            `;
            return;
        }

        const resultsGrid = document.createElement('div');
        resultsGrid.className = 'results-grid';

        games.forEach(game => {
            const gameCard = document.createElement('div');
            gameCard.className = 'product-tile';
            const gameData = {
                title: game.title,
                price: game.price,
                image: game.image,
                category: game.category,
                url: game.url
            };
            gameCard.innerHTML = `
                <div class="product-header">
                    <span class="category-badge">${gameData.category}</span>
                    <button class="wishlist-btn"><i class="far fa-heart"></i></button>
                </div>
                <div class="media-wrapper">
                    <img src="${gameData.image}" alt="${gameData.title}" class="product-image">
                    <div class="overlay-panel">
                        <a href="${gameData.url}" class="action-link">
                            <span class="action-text">Ver detalles</span>
                            <i class="fas fa-arrow-right icon icon-arrow"></i>
                        </a>
                    </div>
                </div>
                <div class="product-info">
                    <h3 class="product-title">${gameData.title}</h3>
                    <div class="game-meta">
                        <span class="game-category">${gameData.category}</span>
                        <div class="game-rating">
                            <i class="fas fa-star"></i>
                            <span>${(Math.random() * (5 - 4) + 4).toFixed(1)}</span>
                        </div>
                    </div>
                    <div class="game-price-actions">
                        <div class="game-price">${gameData.price}</div>
                        <button class="btn-cart" data-game='${JSON.stringify(gameData)}'><i class="fas fa-shopping-cart"></i></button>
                    </div>
                </div>
            `;

            // Agregar event listener para el botón del carrito
            const cartBtn = gameCard.querySelector('.btn-cart');
            cartBtn.addEventListener('click', function () {
                try {
                    const gameData = JSON.parse(this.dataset.game);
                    let cart = JSON.parse(localStorage.getItem('cart')) || [];

                    // Verificar si el producto ya está en el carrito
                    const existingProductIndex = cart.findIndex(item => item.name === gameData.title);

                    if (existingProductIndex !== -1) {
                        // Si el producto ya está en el carrito, incrementar la cantidad
                        cart[existingProductIndex].quantity += 1;
                        showNotification(`Se ha añadido otra unidad de ${gameData.title} al carrito`);
                    } else {
                        // Si el producto no está en el carrito, añadirlo
                        cart.push({
                            name: gameData.title,
                            price: gameData.price,
                            image: gameData.image,
                            quantity: 1
                        });
                        showNotification(`¡${gameData.title} ha sido añadido al carrito!`);
                    }

                    // Guardar carrito actualizado en localStorage
                    localStorage.setItem('cart', JSON.stringify(cart));

                    // Actualizar contador del carrito
                    updateCartCounter();
                } catch (error) {
                    console.error('Error al agregar al carrito:', error);
                }
            });

            resultsGrid.appendChild(gameCard);
        });

        resultsContainer.appendChild(resultsGrid);
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

    // Función para actualizar el contador del carrito
    function updateCartCounter() {
        const cartCounter = document.querySelector('.cart-count');
        if (!cartCounter) return;

        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        let totalItems = 0;

        // Sumar todas las cantidades
        cart.forEach(item => {
            totalItems += item.quantity || 1;
        });

        // Actualizar el texto del contador
        cartCounter.textContent = totalItems.toString();

        // Mostrar u ocultar el contador según si hay items
        if (totalItems > 0) {
            cartCounter.style.display = 'flex';
        } else {
            cartCounter.style.display = 'none';
        }
    }

    // Actualizar el título con el número de resultados
    if (resultsTitle) {
        resultsTitle.innerHTML = `RESULTADOS DE <span class="accent">BÚSQUEDA</span> <span class="results-count">(${games.length} juegos)</span>`;
    }

    // Event listeners
    // Búsqueda en tiempo real mientras el usuario escribe
    searchInput.addEventListener('input', function () {
        const query = this.value.trim();
        if (query.length >= 2) {
            performRealTimeSearch(query);
        } else {
            searchResultsDropdown.innerHTML = '';
            searchResultsDropdown.style.display = 'none';
        }
    });

    searchInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') performSearch(this.value.trim());
    });

    // Función para realizar búsqueda en tiempo real
    function performRealTimeSearch(query) {
        const activeCategory = document.querySelector('.filter-btn.active')?.dataset.category || 'all';
        const filteredGames = window.allGames.filter(game => {
            const matchesSearch = game.title.toLowerCase().includes(query.toLowerCase()) ||
                game.category.toLowerCase().includes(query.toLowerCase());
            const matchesCategory = activeCategory === 'all' ||
                game.category.toLowerCase() === activeCategory.toLowerCase();
            return matchesSearch && matchesCategory;
        }).slice(0, 5); // Limitar a 5 resultados para el dropdown

        // Mostrar resultados en el dropdown
        if (filteredGames.length > 0) {
            searchResultsDropdown.innerHTML = '';

            // Crear elementos para cada juego encontrado
            filteredGames.forEach(game => {
                const resultItem = document.createElement('div');
                resultItem.className = 'search-result-item';
                resultItem.innerHTML = `
                    <img src="${game.image}" alt="${game.title}" class="search-result-image">
                    <div class="search-result-info">
                        <div class="search-result-title">${game.title}</div>
                        <div class="search-result-category">${game.category}</div>
                        <div class="search-result-price">${game.price}</div>
                    </div>
                `;

                // Agregar evento de clic para ir a la página del producto
                resultItem.addEventListener('click', function () {
                    window.location.href = game.url;
                });

                searchResultsDropdown.appendChild(resultItem);
            });

            // Agregar enlace para ver todos los resultados
            const viewAllLink = document.createElement('div');
            viewAllLink.className = 'search-view-all';
            viewAllLink.innerHTML = `Ver todos los resultados (${filteredGames.length})`;
            viewAllLink.addEventListener('click', function () {
                performSearch(query);
            });
            searchResultsDropdown.appendChild(viewAllLink);

            searchResultsDropdown.style.display = 'block';
        } else {
            searchResultsDropdown.innerHTML = '<div class="search-no-results">No se encontraron resultados</div>';
            searchResultsDropdown.style.display = 'block';
        }
    }

    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            filterButtons.forEach(btn => btn.classList.remove('gc-active'));
            this.classList.add('gc-active');
            if (searchInput.value) performSearch(searchInput.value.trim());
        });
    });

    // Añadir efecto de foco a la barra de búsqueda
    searchInput.addEventListener('focus', function () {
        this.parentElement.classList.add('gc-search-focused');
    });

    searchInput.addEventListener('blur', function () {
        this.parentElement.classList.remove('gc-search-focused');
    });

    // Cerrar el dropdown cuando se hace clic fuera de él
    document.addEventListener('click', function (e) {
        if (!searchInput.contains(e.target) && !searchResultsDropdown.contains(e.target)) {
            searchResultsDropdown.style.display = 'none';
        }
    });
});