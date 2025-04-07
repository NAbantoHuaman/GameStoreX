// Animaciones optimizadas para la página Nosotros
document.addEventListener('DOMContentLoaded', function() {
    // Cache de elementos DOM
    const elements = {
        statNumbers: document.querySelectorAll('.stat-number'),
        aboutSections: document.querySelectorAll('.about-section'),
        aboutImages: document.querySelectorAll('.about-image')
    };
    
    // Configuración optimizada de animaciones
    const config = {
        numberDuration: 1000,
        transition: {
            duration: '0.2s',
            timing: 'ease-out'
        },
        threshold: {
            sections: 0.1,
            stats: 0.1,
            team: 0.1
        },
        updateInterval: 60 // ms entre actualizaciones de animación
    };
    
    // Función principal de inicialización
    function init() {
        createStyles();
        setupObservers();
    }
    
    // Crear estilos CSS optimizados
    function createStyles() {
        const styleEl = document.createElement('style');
        styleEl.textContent = `
            .fade-in {
                opacity: 0;
                transform: translateY(5px);
                transition: opacity ${config.transition.duration} ${config.transition.timing},
                            transform ${config.transition.duration} ${config.transition.timing};
            }
            .fade-in.visible {
                opacity: 1;
                transform: translateY(0);
            }
            

            
            .stat-number.animated {
                color: var(--color-primary);
            }
        `;
        document.head.appendChild(styleEl);
        
        elements.aboutSections.forEach(section => section.classList.add('fade-in'));
        elements.aboutImages.forEach(image => image.classList.add('fade-in'));

    }
    
    // Configuración optimizada de observadores
    function setupObservers() {
        const defaultOptions = {
            threshold: 0.1,
            rootMargin: '20px'
        };

        // Observador unificado para elementos con fade-in
        const fadeObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    fadeObserver.unobserve(entry.target);
                }
            });
        }, defaultOptions);

        // Aplicar observador a secciones e imágenes
        elements.aboutSections.forEach(section => fadeObserver.observe(section));
        elements.aboutImages.forEach(image => fadeObserver.observe(image));


        // Observador específico para estadísticas
        const statsObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const text = el.textContent;
                    if (!text.includes('/')) {
                        el.classList.add('animated');
                        animateNumber(el, text);
                    }
                    statsObserver.unobserve(el);
                }
            });
        }, defaultOptions);

        elements.statNumbers.forEach(stat => statsObserver.observe(stat));
    }
    
    // Función optimizada de animación de números
    function animateNumber(element, target) {
        const prefix = target.toString().startsWith('+') ? '+' : '';
        const suffix = target.toString().includes('%') ? '%' : '';
        const numericTarget = parseInt(target.toString().replace(/[^0-9]/g, ''));
        let current = 0;
        
        const step = Math.ceil(numericTarget / (config.numberDuration / config.updateInterval));
        
        const timer = setInterval(() => {
            current = Math.min(current + step, numericTarget);
            element.textContent = `${prefix}${current}${suffix}`;
            
            if (current >= numericTarget) {
                clearInterval(timer);
            }
        }, config.updateInterval);
    }
    
    // Iniciar todas las animaciones
    init();
});