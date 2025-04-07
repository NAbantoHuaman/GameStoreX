// Funcionalidad de los filtros de juegos

class Filters {
    constructor() {
        // Elementos de filtros
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.gameCards = document.querySelectorAll('.game-card');

        // Si no hay elementos de filtro, salir
        if (!this.filterButtons.length || !this.gameCards.length) return;

        this.init();
    }

    init() {
        // Configurar eventos de los botones de filtro
        this.filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Quitar clase activa de todos los botones
                this.filterButtons.forEach(btn => btn.classList.remove('active'));

                // Añadir clase activa al botón clickeado
                button.classList.add('active');

                // Aplicar filtro
                const filter = button.dataset.filter;
                this.filterGames(filter);
            });
        });

        // Configurar animaciones de entrada para las tarjetas
        this.setupCardAnimations();
    }

    filterGames(filter) {
        // Filtrar juegos según la categoría
        this.gameCards.forEach(card => {
            // Obtener categorías del juego
            const categories = card.dataset.category ? card.dataset.category.split(' ') : [];

            // Determinar si el juego debe mostrarse
            const shouldShow = filter === 'all' || categories.includes(filter);

            // Aplicar clase para mostrar/ocultar con animación
            if (shouldShow) {
                card.classList.remove('filtered-out');
                setTimeout(() => {
                    card.classList.add('filtered-in');
                }, 50); // Pequeño retraso para que la animación funcione correctamente
            } else {
                card.classList.remove('filtered-in');
                card.classList.add('filtered-out');
            }
        });

        // Actualizar layout después de la animación
        setTimeout(() => {
            this.updateLayout();
        }, 300); // Debe coincidir con la duración de la transición CSS
    }

    updateLayout() {
        // Reorganizar el grid después de filtrar
        const gamesGrid = document.querySelector('.games-grid');
        if (!gamesGrid) return;

        // Contar juegos visibles
        const visibleGames = document.querySelectorAll('.game-card:not(.filtered-out)');

        // Actualizar mensaje si no hay juegos
        if (visibleGames.length === 0) {
            // Verificar si ya existe el mensaje
            let noGamesMessage = gamesGrid.querySelector('.no-games-message');

            if (!noGamesMessage) {
                // Crear mensaje
                noGamesMessage = document.createElement('div');
                noGamesMessage.className = 'no-games-message';
                noGamesMessage.textContent = 'No hay juegos disponibles en esta categoría.';
                gamesGrid.appendChild(noGamesMessage);
            }

            // Mostrar mensaje con animación
            setTimeout(() => {
                noGamesMessage.classList.add('show');
            }, 10);
        } else {
            // Eliminar mensaje si existe
            const noGamesMessage = gamesGrid.querySelector('.no-games-message');
            if (noGamesMessage) {
                noGamesMessage.classList.remove('show');
                setTimeout(() => {
                    noGamesMessage.remove();
                }, 300);
            }
        }
    }

    setupCardAnimations() {
        // Configurar animaciones de entrada para las tarjetas
        this.gameCards.forEach((card, index) => {
            // Añadir delay escalonado para efecto de cascada
            card.style.animationDelay = `${index * 0.1}s`;
            card.classList.add('card-animation');
        });
    }

    // Método para filtrar por búsqueda de texto
    filterBySearch(searchText) {
        if (!searchText.trim()) {
            // Si la búsqueda está vacía, mostrar todos
            this.resetFilters();
            return;
        }

        // Convertir a minúsculas para búsqueda insensible a mayúsculas/minúsculas
        const searchLower = searchText.toLowerCase();

        // Filtrar juegos según el texto de búsqueda
        this.gameCards.forEach(card => {
            // Obtener título del juego
            const title = card.querySelector('h3')?.textContent.toLowerCase() || '';
            // Obtener categoría del juego
            const category = card.querySelector('.game-category')?.textContent.toLowerCase() || '';

            // Determinar si el juego coincide con la búsqueda
            const matchesSearch = title.includes(searchLower) || category.includes(searchLower);

            // Aplicar clase para mostrar/ocultar con animación
            if (matchesSearch) {
                card.classList.remove('filtered-out');
                setTimeout(() => {
                    card.classList.add('filtered-in');
                }, 50);
            } else {
                card.classList.remove('filtered-in');
                card.classList.add('filtered-out');
            }
        });

        // Actualizar layout después de la animación
        setTimeout(() => {
            this.updateLayout();
        }, 300);
    }

    resetFilters() {
        // Restablecer todos los filtros
        this.filterButtons.forEach(btn => btn.classList.remove('active'));

        // Activar el botón 'Todos'
        const allButton = Array.from(this.filterButtons).find(btn => btn.dataset.filter === 'all');
        if (allButton) {
            allButton.classList.add('active');
        }

        // Mostrar todos los juegos
        this.gameCards.forEach(card => {
            card.classList.remove('filtered-out');
            setTimeout(() => {
                card.classList.add('filtered-in');
            }, 50);
        });

        // Actualizar layout
        setTimeout(() => {
            this.updateLayout();
        }, 300);
    }
}

// Exportar la clase para su uso en otros archivos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Filters;
} else {
    // Inicializar automáticamente cuando se carga el DOM
    document.addEventListener('DOMContentLoaded', () => {
        const filters = new Filters();

        // Configurar búsqueda si existe
        const searchInput = document.querySelector('.search-bar input');
        const searchButton = document.querySelector('.search-btn');

        if (searchInput && searchButton) {
            // Evento de búsqueda al hacer clic en el botón
            searchButton.addEventListener('click', () => {
                filters.filterBySearch(searchInput.value);
            });

            // Evento de búsqueda al presionar Enter
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    filters.filterBySearch(searchInput.value);
                }
            });
        }

        // Exponer la instancia globalmente para su uso en la consola o desde otros scripts
        window.filtersInstance = filters;
    });
}