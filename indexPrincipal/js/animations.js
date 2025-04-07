// Funcionalidad de las animaciones

class Animations {
    constructor() {
        // Elementos para animar
        this.elements = {
            psParticles: document.querySelector('.ps-particles-container'),
            psLines: document.querySelector('.ps-lines'),
            psIcons: document.querySelectorAll('.ps-icon'),
            cards: document.querySelectorAll('.game-card, .offer-card, .upcoming-card, .category-card'),
            sections: document.querySelectorAll('.section')
        };

        // Configuración
        this.config = {
            particles: {
                count: 50,
                colors: ['rgba(0, 243, 255, 0.7)', 'rgba(255, 255, 0, 0.7)', 'rgba(255, 0, 102, 0.7)'],
                minSize: 2,
                maxSize: 5,
                minSpeed: 0.5,
                maxSpeed: 2
            },
            lines: {
                count: 15,
                color: 'rgba(0, 243, 255, 0.2)',
                minHeight: 1,
                maxHeight: 3
            }
        };

        // Estado
        this.particles = [];
        this.lines = [];
        this.animationFrame = null;
        this.scrollObserver = null;

        this.init();
    }

    init() {
        // Inicializar partículas si existe el contenedor
        if (this.elements.psParticles) {
            this.initParticles();
        }

        // Inicializar líneas si existe el contenedor
        if (this.elements.psLines) {
            this.initLines();
        }

        // Inicializar animaciones de iconos
        if (this.elements.psIcons.length) {
            this.initIconsAnimation();
        }

        // Inicializar animaciones al hacer scroll
        this.initScrollAnimations();

        // Inicializar efectos de hover para tarjetas
        this.initCardEffects();
    }

    initParticles() {
        // Crear partículas
        for (let i = 0; i < this.config.particles.count; i++) {
            this.createParticle();
        }

        // Iniciar animación
        this.animateParticles();
    }

    createParticle() {
        const container = this.elements.psParticles;
        const containerRect = container.getBoundingClientRect();

        // Crear elemento de partícula
        const particle = document.createElement('div');
        particle.className = 'ps-particle';

        // Propiedades aleatorias
        const size = Math.random() * (this.config.particles.maxSize - this.config.particles.minSize) + this.config.particles.minSize;
        const color = this.config.particles.colors[Math.floor(Math.random() * this.config.particles.colors.length)];
        const x = Math.random() * containerRect.width;
        const y = Math.random() * containerRect.height;
        const speedX = (Math.random() * (this.config.particles.maxSpeed - this.config.particles.minSpeed) + this.config.particles.minSpeed) * (Math.random() > 0.5 ? 1 : -1);
        const speedY = (Math.random() * (this.config.particles.maxSpeed - this.config.particles.minSpeed) + this.config.particles.minSpeed) * (Math.random() > 0.5 ? 1 : -1);

        // Aplicar estilos
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.backgroundColor = color;
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;

        // Añadir al DOM
        container.appendChild(particle);

        // Guardar datos para animación
        this.particles.push({
            element: particle,
            x,
            y,
            speedX,
            speedY,
            size
        });
    }

    animateParticles() {
        const container = this.elements.psParticles;
        const containerRect = container.getBoundingClientRect();

        // Actualizar posición de cada partícula
        this.particles.forEach(particle => {
            // Mover partícula
            particle.x += particle.speedX;
            particle.y += particle.speedY;

            // Rebotar en los bordes
            if (particle.x <= 0 || particle.x >= containerRect.width - particle.size) {
                particle.speedX *= -1;
            }

            if (particle.y <= 0 || particle.y >= containerRect.height - particle.size) {
                particle.speedY *= -1;
            }

            // Aplicar nueva posición
            particle.element.style.left = `${particle.x}px`;
            particle.element.style.top = `${particle.y}px`;
        });

        // Continuar animación
        this.animationFrame = requestAnimationFrame(() => this.animateParticles());
    }

    initLines() {
        const container = this.elements.psLines;

        // Crear líneas
        for (let i = 0; i < this.config.lines.count; i++) {
            const line = document.createElement('div');
            line.className = 'ps-line';

            // Propiedades aleatorias
            const height = Math.random() * (this.config.lines.maxHeight - this.config.lines.minHeight) + this.config.lines.minHeight;
            const position = Math.random() * 100;
            const delay = Math.random() * 5;

            // Aplicar estilos
            line.style.height = `${height}px`;
            line.style.left = `${position}%`;
            line.style.backgroundColor = this.config.lines.color;
            line.style.animationDelay = `${delay}s`;

            // Añadir al DOM
            container.appendChild(line);

            // Guardar referencia
            this.lines.push(line);
        }
    }

    initIconsAnimation() {
        // Animar iconos de PlayStation
        this.elements.psIcons.forEach((icon, index) => {
            // Añadir delay escalonado
            icon.style.animationDelay = `${index * 0.2}s`;

            // Añadir clase para iniciar animación
            setTimeout(() => {
                icon.classList.add('animate');
            }, 100);
        });
    }

    initScrollAnimations() {
        // Configurar Intersection Observer para animaciones al hacer scroll
        this.scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Añadir clase para animar cuando el elemento es visible
                    entry.target.classList.add('animate-in');

                    // Dejar de observar después de animar
                    this.scrollObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1, // 10% del elemento visible
            rootMargin: '0px 0px -50px 0px' // Margen negativo para activar antes
        });

        // Observar secciones
        this.elements.sections.forEach(section => {
            this.scrollObserver.observe(section);
        });

        // Observar tarjetas
        this.elements.cards.forEach(card => {
            this.scrollObserver.observe(card);
        });
    }

    initCardEffects() {
        // Efectos de hover 3D para tarjetas
        this.elements.cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left; // Posición X relativa a la tarjeta
                const y = e.clientY - rect.top; // Posición Y relativa a la tarjeta

                // Calcular rotación basada en la posición del cursor
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 20; // Dividir para reducir el efecto
                const rotateY = (centerX - x) / 20;

                // Aplicar transformación
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

                // Efecto de brillo
                const glare = card.querySelector('.card-glare') || this.createGlareElement(card);
                const glareX = (x / rect.width) * 100;
                const glareY = (y / rect.height) * 100;
                glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 80%)`;
            });

            // Restablecer al salir
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';

                const glare = card.querySelector('.card-glare');
                if (glare) {
                    glare.style.background = 'none';
                }
            });
        });
    }

    createGlareElement(card) {
        const glare = document.createElement('div');
        glare.className = 'card-glare';
        glare.style.position = 'absolute';
        glare.style.top = '0';
        glare.style.left = '0';
        glare.style.width = '100%';
        glare.style.height = '100%';
        glare.style.pointerEvents = 'none';
        glare.style.zIndex = '1';
        card.appendChild(glare);
        return glare;
    }

    // Método para detener animaciones (útil al cambiar de página)
    stopAnimations() {
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
            this.animationFrame = null;
        }

        if (this.scrollObserver) {
            this.scrollObserver.disconnect();
        }
    }

    // Método para reiniciar animaciones
    restartAnimations() {
        this.stopAnimations();
        this.init();
    }
}

// Exportar la clase para su uso en otros archivos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Animations;
} else {
    // Inicializar automáticamente cuando se carga el DOM
    document.addEventListener('DOMContentLoaded', () => {
        const animations = new Animations();

        // Exponer la instancia globalmente para su uso en la consola o desde otros scripts
        window.animationsInstance = animations;
    });
}