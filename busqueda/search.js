// Funcion para la busqueda global
document.addEventListener('DOMContentLoaded', function () {
    // DOM elements
    const searchInput = document.querySelector('.search-bar input') || document.querySelector('.search-bar input');
    const searchButton = document.querySelector('.search-btn') || document.querySelector('.search-btn');
    const searchResultsDropdown = document.createElement('div');
    searchResultsDropdown.className = 'search-results-dropdown';

    // Agregar el dropdown al DOM después del input de búsqueda
    if (searchInput && searchInput.parentNode) {
        searchInput.parentNode.appendChild(searchResultsDropdown);
    }

    if (!searchInput) return;

    // Game data (sample - replace with your actual data)
    window.allGames = [
        // Juegos de la página principal
        { title: "Elden Ring", price: "S/. 59.99", image: "/img/juegos/1639687011-elden-ring-ps5-pre-orden.jpg", url: "/producto.html?id=elden-ring", category: "RPG" },
        { title: "Hogwarts Legacy", price: "S/. 79.00", image: "/img/juegos/1675969170-hogwarts-legacy-digital-deluxe-edition-pre-orden-ps5-0.jpg", url: "/producto.html?id=hogwarts-legacy", category: "Aventura" },
        { title: "Monster Hunter Wilds", price: "S/. 164.00", image: "/img/juegos/1718238829-monster-hunter-wilds-ps5-pre-orden-0.jpg", url: "/producto.html?id=monster-hunter-wilds", category: "RPG" },
        { title: "MARVEL'S SPIDER MAN 2", price: "S/. 159.00", image: "/img/juegos/1697557602-marvels-spider-man-2-ps5-pre-orden-0.jpg", url: "/producto.html?id=spider-man-2", category: "Acción" },
        { title: "Dragon Ball: Sparking! ZERO", price: "S/. 174.00", image: "/img/juegos/1718034332-dragon-ball-sparking-zero-pre-orden-0.jpg", url: "/producto.html?id=dragon-ball-sparking-zero", category: "Lucha" },
        { title: "Black Myth: Wukong", price: "S/. 144.00", image: "/img/juegos/1718149460-black-myth-wukong-ps5-pre-orden-0.jpg", url: "/producto.html?id=black-myth-wukong", category: "Acción" },
        { title: "DOOM: The Dark Ages", price: "S/. 164.00", image: "/img/juegos/1737754002-doom-the-dark-ages-ps5-pre-orden-0.webp", url: "/producto.html?id=doom-the-dark-ages", category: "Acción" },
        { title: "Assassins Creed Shadows", price: "S/. 104.00", image: "/img/juegos/1715874649-assassins-creed-shadows-ps5-pre-orden-0.webp", url: "/producto.html?id=assassins-creed-shadows", category: "RPG" },
        { title: "Assassins Creed Mirage", price: "S/. 104.00", image: "/img/imgjuegos/amirage/1689115719-assassins-creed-mirage-ps5-pre-orden-0.jpg", url: "/producto.html?id=assassins-creed-mirage", category: "Aventura" },
        // Juegos de Acción
        { title: "The Last of Us Part II Remastered", price: "S/. 59.99", image: "/img/juegos/1701964990-the-last-of-us-part-ii-remastered-ps5-pre-orden-0.jpg", url: "/producto.html?id=the-last-of-us-part-2-remastered", category: "Acción" },
        { title: "LEGO Horizon Adventures", price: "S/. 59.99", image: "/img/juegos/1718230814-lego-horizon-adventures-ps5-pre-orden-0.webp", url: "/producto.html?id=lego-horizon", category: "Acción" },
        { title: "Dragon Age: The Veilguard", price: "S/. 59.99", image: "/img/juegos/1727472891-dragon-age-dreadwolf-ps5-pre-orden-0.webp", url: "/producto.html?id=dragon-age-veilguard", category: "Acción" },
        { title: "SUICIDE SQUAD", price: "S/. 59.99", image: "/img/juegos/1737070461-suicide-squad-ps5-0.webp", url: "/producto.html?id=suicide-squad", category: "Acción" },


        // Juegos de Aventura
        { title: "FINAL FANTASY XVI", price: "S/. 59.99", image: "/img/juegos2/1654560614-final-fantasy-xvi-ps5-pre-orden-0.jpg", url: "/producto.html?id=final-fantasy-xvi", category: "Aventura" },
        { title: "A Plague Tale Requiem", price: "S/. 59.99", image: "/img/juegos2/1659477995-a-plague-tale-requiem-ps5-pre-orden-0.jpg", url: "/producto.html?id=plague-tale", category: "Aventura" },
        { title: "Lies Of P", price: "S/. 59.99", image: "/img/juegos2/1689120412-lies-of-p-ps5-pre-orden-0.jpg", url: "/producto.html?id=lies-of-p", category: "Aventura" },
        { title: "Back 4 Blood Ultimate Edition", price: "S/. 59.99", image: "/img/juegos2/1679425138-back-4-blood-ultimate-edition-ps5-0.jpg", url: "/producto.html?id=back4blood", category: "Aventura" },
        { title: "Assassins Creed Valhalla Deluxe", price: "S/. 59.99", image: "/img/juegos2/1692833779-assassins-creed-valhalla-deluxe-ps5-0.jpg", url: "/producto.html?id=ac-valhalla", category: "Aventura" },
        { title: "Assassin's Creed Origins Deluxe Edition", price: "S/. 59.99", image: "/img/juegos2/1646843815-assassins-creed-origins-deluxe-edition-ps5.jpg", url: "/producto.html?id=ac-origins", category: "Aventura" },
        { title: "Cyberpunk 2077", price: "S/. 59.99", image: "/img/juegos2/1730415530-cyberpunk-2077-ps5-0.webp", url: "/producto.html?id=cyberpunk", category: "Aventura" },
        { title: "The Witcher 3: Wild Hunt", price: "S/. 59.99", image: "/img/juegos/1740506597-the-witcher-3-wild-hunt-ps5-0.webp", url: "/producto.html?id=witcher3", category: "Aventura" },
        { title: "Red Dead Redemption 2", price: "S/. 59.99", image: "/img/juegos/1692382805-red-dead-redemption-ps5-0.jpg", url: "/producto.html?id=rdr2", category: "Aventura" },
        // Juegos de RPG
        { title: "Cyberpunk 2077: Ultimate Edition", price: "S/. 59.99", image: "/img/juegos2/1727476960-cyberpunk-2077-ultimate-edition-ps5-0.webp", url: "/producto.html?id=cyberpunk-ultimate", category: "RPG" },

        { title: "Bloodborne Game of the Year Edition", price: "S/. 59.99", image: "/img/juegos2/1646845135-bloodborne-game-of-the-year-edition-ps5.jpg", url: "/producto.html?id=bloodborne", category: "RPG" },
        { title: "Forspoken", price: "S/. 59.99", image: "/img/juegos2/1643756137-forspoken-ps5-pre-orden.jpg", url: "/producto.html?id=forspoken", category: "RPG" },
        { title: "Final Fantasy VII Rebirth", price: "S/. 59.99", image: "/img/juegos/1674068125-final-fantasy-vii-rebirth-ps5-pre-orden-0.jpg", url: "/producto.html?id=final-fantasy-vii", category: "RPG" },
        { title: "Dragons Dogma 2", price: "S/. 59.99", image: "/img/juegos/1711060112-dragons-dogma-2-ps5-0.png", url: "/producto.html?id=dragons-dogma2", category: "RPG" },
        { title: "SUICIDE SQUAD", price: "S/. 59.99", image: "/img/juegos/1737070461-suicide-squad-ps5-0.webp", url: "/producto.html?id=suicide-squad", category: "Acción" },
        { title: "Horizon Zero Dawn Remastered", price: "S/. 59.99", image: "/img/juegos/1727997956-horizon-zero-dawn-remastered-ps5-pre-orden-0.webp", url: "/producto.html?id=horizon-zero-dawn-remastered", category: "Acción" },

        // Juegos de Deportes
        { title: "FC25", price: "S/. 59.99", image: "/img/juegos/1721239187-fc-25-pre-orden-0.webp", url: "/producto.html?id=fc25", category: "Deportes" },
        { title: "UFC 5", price: "S/. 59.99", image: "/img/juegos/1695073909-ufc-5-ps5-pre-orden-0.jpg", url: "/producto.html?id=ufc5", category: "Deportes" },
        { title: "WWE 2K25", price: "S/. 59.99", image: "/img/juegos/1738168989-wwe-2k25-ps5-pre-orden-0.webp", url: "/producto.html?id=wwe2k25", category: "Deportes" },
        { title: "FIFA 23", price: "S/. 59.99", image: "/img/juegos2/1698340923-fifa-23-ps5-0.jpg", url: "/producto.html?id=fifa23", category: "Deportes" },
        { title: "EA SPORTS FC 24", price: "S/. 59.99", image: "/img/juegos2/1717689078-ea-sports-fc-24-ps5-0.webp", url: "/producto.html?id=fc24", category: "Deportes" },
        { title: "NBA 2K20", price: "S/. 59.99", image: "/img/juegos2/1689628920-nba-2k20-ps5-0.jpg", url: "/producto.html?id=nba2k20", category: "Deportes" },
        { title: "FIFA 18 Español", price: "S/. 59.99", image: "/img/juegos2/1689626756-fifa-18-espanol-ps5-0.jpg", url: "/producto.html?id=fifa18", category: "Deportes" },
        { title: "MLB The Show 24", price: "S/. 59.99", image: "/img/juegos2/1708549904-mlb-the-show-24-ps5-pre-orden-0.png", url: "/producto.html?id=mlb24", category: "Deportes" },
        { title: "Descenders", price: "S/. 59.99", image: "/img/juegos2/1646773235-descenders-ps5.jpg", url: "/producto.html?id=descenders", category: "Deportes" },

        // Juegos de Acción adicionales para PS5
        { title: "God of War Ragnarök", price: "S/. 179.00", image: "https://storegamesperu.com/files/images/productos/1670879846-god-of-war-ragnarok-deluxe-edition-ps5-0.jpg", url: "/producto.html?id=gow-ragnarok", category: "Acción" },
        { title: "Returnal", price: "S/. 129.00", image: "https://storegamesperu.com/files/images/productos/1619742395-returnal-ps5.jpg", url: "/producto.html?id=returnal", category: "Acción" },
        { title: "Demon's Souls Remake", price: "S/. 149.00", image: "https://storegamesperu.com/files/images/productos/1607360160-demons-souls-ps5.jpg", url: "/producto.html?id=demons-souls", category: "Acción" },
        { title: "Ratchet & Clank: Rift Apart", price: "S/. 139.00", image: "https://storegamesperu.com/files/images/productos/1624750215-ratchet-clank-una-dimension-aparte-ps5.jpg", url: "/producto.html?id=ratchet-clank", category: "Acción" },
        { title: "Ghostwire: Tokyo", price: "S/. 119.00", image: "https://storegamesperu.com/files/images/productos/1644076691-ghostwire-tokyo-ps5-pre-orden.jpg", url: "/producto.html?id=ghostwire", category: "Acción" },
        { title: "Deathloop", price: "S/. 109.00", image: "https://storegamesperu.com/files/images/productos/1626277627-deathloop-ps5-pre-orden.jpg", url: "/producto.html?id=deathloop", category: "Acción" },
        { title: "Sifu", price: "S/. 89.00", image: "https://storegamesperu.com/files/images/productos/1644440926-sifu-ps5.jpg", url: "/producto.html?id=sifu", category: "Acción" },
        { title: "Kena: Bridge of Spirits", price: "S/. 79.00", image: "https://storegamesperu.com/files/images/productos/1624892728-kena-bridge-of-spirits.jpg", url: "/producto.html?id=kena", category: "Acción" },

        // Juegos de Aventura adicionales para PS5
        { title: "Horizon Forbidden West", price: "S/. 169.00", image: "https://storegamesperu.com/files/images/productos/1631119907-horizon-forbidden-west-ps5-pre-orden.jpg", url: "/producto.html?id=horizon-fw", category: "Aventura" },
        { title: "Star Wars Jedi: Survivor", price: "S/. 159.00", image: "https://storegamesperu.com/files/images/productos/1671052917-star-wars-jedi-survivor-ps5-pre-orden-0.jpg", url: "/producto.html?id=jedi-survivor", category: "Aventura" },
        { title: "Stray", price: "S/. 69.00", image: "https://storegamesperu.com/files/images/productos/1655148681-stray-ps5-pre-orden-0.jpg", url: "/producto.html?id=stray", category: "Aventura" },
        { title: "Sackboy: A Big Adventure", price: "S/. 89.00", image: "https://storegamesperu.com/files/images/productos/1624751051-sackboy-una-gran-aventura-ps5.jpg", url: "/producto.html?id=sackboy", category: "Aventura" },

        // Juegos de RPG adicionales para PS5
        { title: "Tales of Arise", price: "S/. 129.00", image: "https://storegamesperu.com/files/images/productos/1653437446-tales-of-arise-ps5-0.jpg", url: "/producto.html?id=tales-arise", category: "RPG" },
        { title: "Atlas Fallen", price: "S/. 99.00", image: "https://storegamesperu.com/files/images/productos/1685479087-atlas-fallen-ps5-pre-orden-0.jpg", url: "/producto.html?id=atlas-fallen", category: "RPG" },

        // Juegos de Lucha adicionales para PS5
        { title: "Street Fighter 6", price: "S/. 139.00", image: "https://storegamesperu.com/files/images/productos/1685745014-street-fighter-vi-ps5-0.jpg", url: "/producto.html?id=sf6", category: "Lucha" },
        { title: "Tekken 8", price: "S/. 149.00", image: "https://storegamesperu.com/files/images/productos/1671054064-tekken-8-ps5-pre-orden-0.jpg", url: "/producto.html?id=tekken8", category: "Lucha" },
        { title: "Mortal Kombat 1", price: "S/. 159.00", image: "https://storegamesperu.com/files/images/productos/1738430523-mortal-kombat-1-khaos-reigns-kollection-ps5-0.webp", url: "/producto.html?id=mk1", category: "Lucha" },

        // Juegos de Deportes adicionales para PS5
        { title: "NBA 2K24", price: "S/. 129.00", image: "https://storegamesperu.com/files/images/productos/1689036310-nba-2k24-kobe-bryant-edition-ps5-pre-orden-0.jpg", url: "/producto.html?id=nba2k24", category: "Deportes" },
        { title: "PGA Tour 2K23", price: "S/. 99.00", image: "https://storegamesperu.com/files/images/productos/1662250231-pga-tour-2k23-pre-orden-ps5-0.jpg", url: "/producto.html?id=pga-tour", category: "Deportes" },

        // Juegos de Terror adicionales para PS5
        { title: "Resident Evil 4 Remake", price: "S/. 149.00", image: "https://storegamesperu.com/files/images/productos/1679608467-resident-evil-4-remake-ps5-pre-orden-0.jpg", url: "/producto.html?id=re4-remake", category: "Terror" },
        { title: "The Callisto Protocol", price: "S/. 119.00", image: "https://storegamesperu.com/files/images/productos/1654559505-the-callisto-protocol-ps5-pre-orden-0.jpg", url: "/producto.html?id=callisto", category: "Terror" },
        { title: "Dead Space Remake", price: "S/. 139.00", image: "https://storegamesperu.com/files/images/productos/1665006021-dead-space-remake-ps5-pre-orden-0.jpg", url: "/producto.html?id=dead-space", category: "Terror" },

        // Juegos Exclusivos PS5
        { title: "Gran Turismo 7", price: "S/. 169.00", image: "https://storegamesperu.com/files/images/productos/1632529127-gran-turismo-7-ps5.jpg", url: "/producto.html?id=gt7", category: "Carreras" },
        { title: "Astro's Playroom", price: "S/. 0.00", image: "https://storegamesperu.com/files/images/productos/1718124270-astro-bot-ps5-pre-orden-0.webp", url: "/producto.html?id=astros", category: "Plataformas" }
    ];

    // Función para realizar búsqueda en tiempo real
    function performRealTimeSearch() {
        const searchTerm = searchInput.value.trim();
        if (!searchTerm) {
            searchResultsDropdown.innerHTML = '';
            searchResultsDropdown.style.display = 'none';
            return;
        }

        // Filtrar juegos que coincidan con el término de búsqueda
        const filteredGames = window.allGames.filter(game => {
            return game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                game.category.toLowerCase().includes(searchTerm.toLowerCase());
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
                performGlobalSearch();
            });
            searchResultsDropdown.appendChild(viewAllLink);

            searchResultsDropdown.style.display = 'block';
        } else {
            searchResultsDropdown.innerHTML = '<div class="search-no-results">No se encontraron resultados</div>';
            searchResultsDropdown.style.display = 'block';
        }
    }

    // Perform search and redirect
    function performGlobalSearch() {
        const searchTerm = searchInput.value.trim();
        if (!searchTerm) return;

        // Asegurar que la ruta sea correcta independientemente de dónde se llame
        const baseUrl = window.location.pathname.includes('/index/') ? '/index' : '';
        window.location.href = `${baseUrl}/busqueda/resultados-busqueda.html?q=${encodeURIComponent(searchTerm)}`;
    }

    // Event listeners
    searchInput.addEventListener('input', performRealTimeSearch);

    // Event listener para tecla Enter
    searchInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            const query = this.value.trim();
            if (query) {
                window.location.href = `/busqueda/resultados-busqueda.html?q=${encodeURIComponent(query)}`;
            }
        }
    });

    // Cerrar el dropdown cuando se hace clic fuera de él
    document.addEventListener('click', function (e) {
        if (!searchInput.contains(e.target) && !searchResultsDropdown.contains(e.target)) {
            searchResultsDropdown.style.display = 'none';
        }
    });

    if (searchButton) {
        searchButton.addEventListener('click', performGlobalSearch);
    }
});