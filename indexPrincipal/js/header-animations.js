document.addEventListener('DOMContentLoaded', () => {
    // Inicializar todas las animaciones del header
    initHeaderAnimations();
});

// Función principal para inicializar todas las animaciones del header
function initHeaderAnimations() {
    // Animación para el logo
    animateLogo();
    
    // Animación para la barra de navegación
    animateNavigation();
    
    // Animación para la barra de búsqueda
    animateSearchBar();
    
    // Animación para los iconos de acción (carrito y usuario)
    animateActionIcons();
    
    // Efecto de scroll para el header
    initHeaderScrollEffect();
}

// Animación para el logo
function animateLogo() {
    const logo = document.querySelector('.logo');
    const logoIcon = document.querySelector('.logo-icon');
    const logoText = document.querySelector('.logo-text');
    
    if (!logo || !logoIcon || !logoText) return;
    
    // Animación inicial del logo al cargar la página
    anime.timeline({
        easing: 'easeOutElastic(1, .8)'
    })
    .add({
        targets: logoIcon,
        scale: [0, 1],
        opacity: [0, 1],
        rotate: ['-30deg', '0deg'],
        duration: 800
    })
    .add({
        targets: logoText,
        translateX: [-20, 0],
        opacity: [0, 1],
        duration: 600
    }, '-=400');
    
    // Efecto hover para el logo
    logo.addEventListener('mouseenter', () => {
        anime({
            targets: logoIcon,
            rotate: '20deg',
            scale: 1.1,
            duration: 400,
            easing: 'easeOutQuad'
        });
        
        anime({
            targets: logoText.querySelector('.accent'),
            textShadow: '0 0 15px var(--color-accent)',
            scale: 1.05,
            duration: 400,
            easing: 'easeOutQuad'
        });
    });
    
    logo.addEventListener('mouseleave', () => {
        anime({
            targets: logoIcon,
            rotate: '0deg',
            scale: 1,
            duration: 400,
            easing: 'easeOutQuad'
        });
        
        anime({
            targets: logoText.querySelector('.accent'),
            textShadow: '0 0 10px var(--color-accent)',
            scale: 1,
            duration: 400,
            easing: 'easeOutQuad'
        });
    });
}

// Animación para la barra de navegación
function animateNavigation() {
    const navItems = document.querySelectorAll('.nav-list li');
    
    if (navItems.length === 0) return;
    
    // Animación inicial de los elementos de navegación
    anime({
        targets: navItems,
        translateY: [20, 0],
        opacity: [0, 1],
        delay: anime.stagger(100),
        duration: 800,
        easing: 'easeOutQuad'
    });
    
    // Efecto hover para los elementos de navegación
    navItems.forEach(item => {
        const link = item.querySelector('a');
        if (!link) return;
        
        link.addEventListener('mouseenter', () => {
            if (!link.classList.contains('active')) {
                anime({
                    targets: link,
                    translateY: -3,
                    textShadow: '0 0 8px var(--color-primary)',
                    duration: 300,
                    easing: 'easeOutQuad'
                });
            }
        });
        
        link.addEventListener('mouseleave', () => {
            if (!link.classList.contains('active')) {
                anime({
                    targets: link,
                    translateY: 0,
                    textShadow: 'none',
                    duration: 300,
                    easing: 'easeOutQuad'
                });
            }
        });
    });
    
    // Animación para el menú hamburguesa en móvil
    const menuToggle = document.querySelector('.menu-toggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            const spans = menuToggle.querySelectorAll('span');
            const navList = document.querySelector('.nav-list');
            
            if (menuToggle.classList.contains('active')) {
                // Cerrar menú
                anime({
                    targets: spans[0],
                    translateY: 0,
                    rotate: 0,
                    duration: 300,
                    easing: 'easeOutQuad'
                });
                anime({
                    targets: spans[1],
                    opacity: 1,
                    duration: 300,
                    easing: 'easeOutQuad'
                });
                anime({
                    targets: spans[2],
                    translateY: 0,
                    rotate: 0,
                    duration: 300,
                    easing: 'easeOutQuad'
                });
            } else {
                // Abrir menú
                anime({
                    targets: spans[0],
                    translateY: 9,
                    rotate: 45,
                    duration: 300,
                    easing: 'easeOutQuad'
                });
                anime({
                    targets: spans[1],
                    opacity: 0,
                    duration: 300,
                    easing: 'easeOutQuad'
                });
                anime({
                    targets: spans[2],
                    translateY: -9,
                    rotate: -45,
                    duration: 300,
                    easing: 'easeOutQuad'
                });
            }
            
            menuToggle.classList.toggle('active');
        });
    }
}

// Animación para la barra de búsqueda
function animateSearchBar() {
    const searchBar = document.querySelector('.search-bar');
    const searchInput = document.querySelector('.search-bar input');
    const searchButton = document.querySelector('.search-btn');
    
    if (!searchBar || !searchInput || !searchButton) return;
    
    // Animación inicial
    anime({
        targets: searchBar,
        translateX: [20, 0],
        opacity: [0, 1],
        duration: 800,
        easing: 'easeOutQuad',
        delay: 300
    });
    
    // Efecto focus para el input
    searchInput.addEventListener('focus', () => {
        anime({
            targets: searchBar,
            width: '+=20px',
            boxShadow: '0 0 15px rgba(0, 243, 255, 0.5)',
            duration: 300,
            easing: 'easeOutQuad'
        });
    });
    
    searchInput.addEventListener('blur', () => {
        anime({
            targets: searchBar,
            width: '-=20px',
            boxShadow: '0 0 10px rgba(0, 243, 255, 0.3)',
            duration: 300,
            easing: 'easeOutQuad'
        });
    });
    
    // Efecto hover para el botón de búsqueda
    searchButton.addEventListener('mouseenter', () => {
        anime({
            targets: searchButton,
            scale: 1.1,
            backgroundColor: 'rgba(0, 243, 255, 0.2)',
            duration: 300,
            easing: 'easeOutQuad'
        });
    });
    
    searchButton.addEventListener('mouseleave', () => {
        anime({
            targets: searchButton,
            scale: 1,
            backgroundColor: 'transparent',
            duration: 300,
            easing: 'easeOutQuad'
        });
    });
}

// Animación para los iconos de acción (carrito y usuario)
function animateActionIcons() {
    const cartIcon = document.querySelector('.cart-icon');
    const userIcon = document.querySelector('.user-icon');
    const cartCount = document.querySelector('.cart-count');
    
    // Animación inicial
    anime({
        targets: [cartIcon, userIcon],
        translateY: [10, 0],
        opacity: [0, 1],
        delay: anime.stagger(150),
        duration: 800,
        easing: 'easeOutQuad'
    });
    
    // Efecto hover para el icono del carrito
    if (cartIcon) {
        cartIcon.addEventListener('mouseenter', () => {
            anime({
                targets: cartIcon.querySelector('i'),
                rotate: ['0deg', '20deg', '-15deg', '0deg'],
                scale: 1.2,
                duration: 600,
                easing: 'easeOutElastic(1, .8)'
            });
            
            if (cartCount) {
                anime({
                    targets: cartCount,
                    scale: 1.2,
                    backgroundColor: 'var(--color-accent)',
                    duration: 300,
                    easing: 'easeOutQuad'
                });
            }
        });
        
        cartIcon.addEventListener('mouseleave', () => {
            anime({
                targets: cartIcon.querySelector('i'),
                scale: 1,
                duration: 300,
                easing: 'easeOutQuad'
            });
            
            if (cartCount) {
                anime({
                    targets: cartCount,
                    scale: 1,
                    backgroundColor: 'var(--color-accent)',
                    duration: 300,
                    easing: 'easeOutQuad'
                });
            }
        });
    }
    
    // Efecto hover para el icono de usuario
    if (userIcon) {
        userIcon.addEventListener('mouseenter', () => {
            anime({
                targets: userIcon.querySelector('i'),
                scale: 1.2,
                duration: 300,
                easing: 'easeOutQuad'
            });
        });
        
        userIcon.addEventListener('mouseleave', () => {
            anime({
                targets: userIcon.querySelector('i'),
                scale: 1,
                duration: 300,
                easing: 'easeOutQuad'
            });
        });
    }
}

// Efecto de scroll para el header
function initHeaderScrollEffect() {
    const header = document.querySelector('.header');
    if (!header) return;
    
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Cambiar la apariencia del header al hacer scroll
        if (scrollTop > 50) {
            if (!header.classList.contains('scrolled')) {
                header.classList.add('scrolled');
                anime({
                    targets: header,
                    height: '70px',
                    boxShadow: '0 5px 20px rgba(0, 243, 255, 0.15)',
                    duration: 300,
                    easing: 'easeOutQuad'
                });
            }
        } else {
            if (header.classList.contains('scrolled')) {
                header.classList.remove('scrolled');
                anime({
                    targets: header,
                    height: '90px',
                    boxShadow: '0 5px 15px rgba(0, 243, 255, 0.1)',
                    duration: 300,
                    easing: 'easeOutQuad'
                });
            }
        }
        
        // Ocultar/mostrar header al hacer scroll hacia abajo/arriba
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            // Scroll hacia abajo
            anime({
                targets: header,
                translateY: '-100%',
                duration: 300,
                easing: 'easeOutQuad'
            });
        } else {
            // Scroll hacia arriba
            anime({
                targets: header,
                translateY: 0,
                duration: 300,
                easing: 'easeOutQuad'
            });
        }
        
        lastScrollTop = scrollTop;
    });
}