document.addEventListener('DOMContentLoaded', () => {
    // Animación para las tarjetas de juegos
    animateGameCards();
    
    // Animación para el slider principal
    animateHeroSlider();
    
    // Animación para las secciones al hacer scroll
    initScrollAnimations();
    
    // Animación para botones y elementos interactivos
    animateInteractiveElements();
    
    // Nuevas animaciones avanzadas
    initParallaxEffects();
    initParticleEffects();
    initMorphingEffects();
    initTypingEffects();
    initProgressiveReveal();
});

// Animación para las tarjetas de juegos
function animateGameCards() {
    // Seleccionar todas las tarjetas de juegos
    const gameCards = document.querySelectorAll('.game-card');
    
    // Aplicar animación de entrada inicial
    anime({
        targets: gameCards,
        scale: [0.9, 1],
        opacity: [0, 1],
        delay: anime.stagger(100),
        duration: 800,
        easing: 'easeOutElastic(1, .5)'
    });
    
    // Añadir efecto hover a cada tarjeta
    gameCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            anime({
                targets: card,
                scale: 1.05,
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
                duration: 300,
                easing: 'easeOutQuad'
            });
        });
        
        card.addEventListener('mouseleave', () => {
            anime({
                targets: card,
                scale: 1,
                boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
                duration: 300,
                easing: 'easeOutQuad'
            });
        });
    });
}

// Animación para el slider principal
function animateHeroSlider() {
    // Animación para el contenido del slide activo
    const animateActiveSlide = () => {
        const activeSlide = document.querySelector('.slide.active .slide-content');
        if (!activeSlide) return;
        
        // Elementos dentro del slide
        const slideBadge = activeSlide.querySelector('.slide-badge');
        const slideTitle = activeSlide.querySelector('h1');
        const slideText = activeSlide.querySelector('p');
        const slideButtons = activeSlide.querySelector('.slide-buttons');
        const promoTag = activeSlide.querySelector('.promo-tag');
        
        // Secuencia de animación
        const timeline = anime.timeline({
            easing: 'easeOutExpo'
        });
        
        // Añadir animaciones a la línea de tiempo
        timeline
            .add({
                targets: slideBadge,
                translateY: [20, 0],
                opacity: [0, 1],
                duration: 500
            })
            .add({
                targets: slideTitle,
                translateY: [30, 0],
                opacity: [0, 1],
                duration: 700
            }, '-=300')
            .add({
                targets: slideText,
                translateY: [20, 0],
                opacity: [0, 1],
                duration: 600
            }, '-=400')
            .add({
                targets: slideButtons,
                translateY: [20, 0],
                opacity: [0, 1],
                duration: 600
            }, '-=300')
            .add({
                targets: promoTag,
                scale: [0.8, 1],
                opacity: [0, 1],
                duration: 500
            }, '-=300');
    };
    
    // Ejecutar animación inicial
    animateActiveSlide();
    
    // Detectar cambios de slide
    const sliderDots = document.querySelectorAll('.slider-dots .dot');
    const prevButton = document.querySelector('.prev-slide');
    const nextButton = document.querySelector('.next-slide');
    
    if (sliderDots.length) {
        sliderDots.forEach(dot => {
            dot.addEventListener('click', () => {
                // Pequeña pausa para permitir que el slide cambie
                setTimeout(animateActiveSlide, 100);
            });
        });
    }
    
    if (prevButton && nextButton) {
        prevButton.addEventListener('click', () => {
            setTimeout(animateActiveSlide, 100);
        });
        
        nextButton.addEventListener('click', () => {
            setTimeout(animateActiveSlide, 100);
        });
    }
}

// Animación para secciones al hacer scroll
function initScrollAnimations() {
    // Función para verificar si un elemento está en el viewport
    const isInViewport = (element, offset = 100) => {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight - offset) &&
            rect.bottom >= 0
        );
    };
    
    // Elementos a animar
    const sections = [
        { selector: '.featured-games', animation: 'fadeInUp' },
        { selector: '.categories', animation: 'fadeInUp' },
        { selector: '.offers', animation: 'fadeInUp' },
        { selector: '.upcoming', animation: 'fadeInUp' },
        { selector: '.exclusives', animation: 'fadeInUp' },
        { selector: '.reviews', animation: 'fadeInUp' },
        { selector: '.blog', animation: 'fadeInUp' },
        { selector: '.newsletter', animation: 'fadeInUp' }
    ];
    
    // Aplicar animaciones según el scroll
    const handleScroll = () => {
        sections.forEach(section => {
            const element = document.querySelector(section.selector);
            if (element && isInViewport(element)) {
                if (!element.classList.contains('animated')) {
                    element.classList.add('animated');
                    
                    // Animar el título de la sección
                    const sectionHeader = element.querySelector('.section-header');
                    if (sectionHeader) {
                        anime({
                            targets: sectionHeader,
                            translateY: [30, 0],
                            opacity: [0, 1],
                            duration: 800,
                            easing: 'easeOutQuad'
                        });
                    }
                    
                    // Animar los elementos dentro de la sección
                    const items = element.querySelectorAll('.game-card, .category-card, .offer-card, .upcoming-card, .blog-card');
                    if (items.length) {
                        anime({
                            targets: items,
                            translateY: [30, 0],
                            opacity: [0, 1],
                            delay: anime.stagger(100),
                            duration: 800,
                            easing: 'easeOutQuad'
                        });
                    }
                }
            }
        });
    };
    
    // Escuchar el evento de scroll
    window.addEventListener('scroll', handleScroll);
    
    // Ejecutar una vez al cargar la página
    handleScroll();
}

// Animación para botones y elementos interactivos
function animateInteractiveElements() {
    // Animación para botones de compra
    const cartButtons = document.querySelectorAll('.btn-cart, .btn-secondary');
    
    cartButtons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            anime({
                targets: button,
                scale: 1.05,
                duration: 200,
                easing: 'easeOutQuad'
            });
        });
        
        button.addEventListener('mouseleave', () => {
            anime({
                targets: button,
                scale: 1,
                duration: 200,
                easing: 'easeOutQuad'
            });
        });
        
        button.addEventListener('click', function(e) {
            if (!this.classList.contains('btn-details')) {
                // Efecto de onda al hacer clic
                const circle = document.createElement('div');
                const diameter = Math.max(button.clientWidth, button.clientHeight);
                
                circle.style.width = circle.style.height = `${diameter}px`;
                circle.style.left = `${e.clientX - button.getBoundingClientRect().left - diameter/2}px`;
                circle.style.top = `${e.clientY - button.getBoundingClientRect().top - diameter/2}px`;
                circle.classList.add('ripple');
                
                const ripple = button.getElementsByClassName('ripple')[0];
                if (ripple) {
                    ripple.remove();
                }
                
                button.appendChild(circle);
                
                // Animación del icono del carrito
                const cartIcon = document.querySelector('.cart-icon');
                if (cartIcon) {
                    anime({
                        targets: cartIcon,
                        scale: [1, 1.2, 1],
                        duration: 500,
                        easing: 'easeInOutQuad'
                    });
                }
            }
        });
    });
    
    // Animación para el contador del carrito
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        // Observar cambios en el contenido del contador
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList' || mutation.type === 'characterData') {
                    anime({
                        targets: cartCount,
                        scale: [1, 1.5, 1],
                        duration: 500,
                        easing: 'easeInOutElastic(1, .6)'
                    });
                }
            });
        });
        
        observer.observe(cartCount, { childList: true, characterData: true, subtree: true });
    }
    
    // Animación para el logo
    const logo = document.querySelector('.logo');
    if (logo) {
        anime({
            targets: logo.querySelector('.logo-icon'),
            rotate: [0, 360],
            duration: 1500,
            easing: 'easeInOutBack'
        });
    }
}

// Efecto de parallax para fondos de secciones
function initParallaxEffects() {
    // Seleccionar secciones con fondo para aplicar parallax
    const parallaxSections = document.querySelectorAll('.featured-games, .exclusives, .upcoming, .newsletter');
    
    // Aplicar efecto parallax al hacer scroll
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        
        parallaxSections.forEach(section => {
            // Obtener la posición de la sección
            const sectionTop = section.getBoundingClientRect().top + scrollY;
            const sectionHeight = section.offsetHeight;
            
            // Calcular si la sección está visible
            if (scrollY + window.innerHeight > sectionTop && scrollY < sectionTop + sectionHeight) {
                // Calcular el valor de desplazamiento para el parallax
                const yPos = (scrollY - sectionTop) * 0.1;
                
                // Aplicar transformación al fondo
                section.style.backgroundPosition = `center ${yPos}px`;
                
                // Añadir clase para activar el efecto
                if (!section.classList.contains('parallax-active')) {
                    section.classList.add('parallax-active');
                }
            }
        });
    });
    
    // Inicializar secciones con clase para estilos CSS
    parallaxSections.forEach(section => {
        section.classList.add('parallax-section');
    });
}

// Efecto de partículas para celebrar compras o eventos especiales
function initParticleEffects() {
    // Crear contenedor para las partículas
    const particleContainer = document.createElement('div');
    particleContainer.classList.add('particle-container');
    document.body.appendChild(particleContainer);
    
    // Función para crear partículas
    const createParticles = (x, y, count = 30, colors = ['#ff5722', '#ffc107', '#2196f3', '#4caf50']) => {
        // Limpiar partículas anteriores
        particleContainer.innerHTML = '';
        
        // Crear nuevas partículas
        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            // Posición inicial
            particle.style.left = `${x}px`;
            particle.style.top = `${y}px`;
            
            // Color aleatorio
            const colorIndex = Math.floor(Math.random() * colors.length);
            particle.style.backgroundColor = colors[colorIndex];
            
            // Añadir al contenedor
            particleContainer.appendChild(particle);
            
            // Animar la partícula
            anime({
                targets: particle,
                translateX: () => anime.random(-100, 100),
                translateY: () => anime.random(-100, 100),
                scale: [1, 0],
                opacity: [1, 0],
                easing: 'easeOutExpo',
                duration: () => anime.random(1000, 1500),
                complete: () => {
                    particle.remove();
                }
            });
        }
    };
    
    // Detectar clics en botones de compra para activar partículas
    const buyButtons = document.querySelectorAll('.btn-cart, .btn-buy-now');
    buyButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const rect = button.getBoundingClientRect();
            const x = rect.left + rect.width / 2;
            const y = rect.top + rect.height / 2;
            
            createParticles(x, y);
        });
    });
    
    // Exponer la función para usarla en otros contextos
    window.createParticles = createParticles;
}

// Efecto de morphing para transiciones entre elementos
function initMorphingEffects() {
    // Seleccionar elementos para aplicar morphing
    const morphElements = document.querySelectorAll('.game-card .game-img, .category-icon');
    
    morphElements.forEach(element => {
        // Guardar estado original
        const originalState = {
            width: element.offsetWidth,
            height: element.offsetHeight,
            borderRadius: getComputedStyle(element).borderRadius
        };
        
        // Aplicar efecto al hacer hover
        element.addEventListener('mouseenter', () => {
            anime({
                targets: element,
                borderRadius: ['5%', '15%'],
                scale: 1.05,
                duration: 800,
                easing: 'easeOutElastic(1, .6)'
            });
        });
        
        // Restaurar estado original
        element.addEventListener('mouseleave', () => {
            anime({
                targets: element,
                borderRadius: originalState.borderRadius,
                scale: 1,
                duration: 600,
                easing: 'easeOutQuad'
            });
        });
    });
    
    // Efecto de morphing para botones de categoría
    const categoryButtons = document.querySelectorAll('.category-btn, .filter-btn');
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Animar el botón seleccionado
            anime({
                targets: this,
                borderRadius: ['5px', '20px', '5px'],
                backgroundColor: {
                    value: function(el) {
                        // Cambiar temporalmente el color de fondo
                        const currentColor = getComputedStyle(el).backgroundColor;
                        const isActive = el.classList.contains('active');
                        return isActive ? currentColor : 'rgba(255, 87, 34, 0.2)';
                    },
                    duration: 800,
                    easing: 'easeInOutQuad'
                },
                duration: 900,
                easing: 'easeInOutBack'
            });
        });
    });
}


