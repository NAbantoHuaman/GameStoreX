//Script del Slider

class Slider {
    constructor() {
        // Elementos del slider
        this.slider = document.querySelector('.hero-slider');
        this.slides = document.querySelectorAll('.slide');
        this.dots = document.querySelectorAll('.dot');
        this.prevBtn = document.querySelector('.prev-slide');
        this.nextBtn = document.querySelector('.next-slide');

        // Si no hay slider en la página, salir
        if (!this.slider || !this.slides.length) return;

        // Estado del slider
        this.currentSlide = 0;
        this.slideCount = this.slides.length;
        this.autoplayInterval = null;
        this.transitionInProgress = false;

        this.init();
    }

    init() {
        // Configurar eventos de los botones
        this.prevBtn?.addEventListener('click', () => this.prevSlide());
        this.nextBtn?.addEventListener('click', () => this.nextSlide());

        // Configurar eventos de los dots
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToSlide(index));
        });

        // Iniciar autoplay
        this.startAutoplay();

        // Pausar autoplay al pasar el mouse por encima
        this.slider.addEventListener('mouseenter', () => this.stopAutoplay());
        this.slider.addEventListener('mouseleave', () => this.startAutoplay());

        // Eventos táctiles para dispositivos móviles
        this.setupTouchEvents();

        // Evento de teclado para accesibilidad
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prevSlide();
            if (e.key === 'ArrowRight') this.nextSlide();
        });

        // Evento de visibilidad para pausar cuando la página no está visible
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.stopAutoplay();
            } else {
                this.startAutoplay();
            }
        });
    }

    goToSlide(index) {
        // Evitar transiciones múltiples
        if (this.transitionInProgress) return;
        this.transitionInProgress = true;

        // Validar el índice
        if (index < 0) index = this.slideCount - 1;
        if (index >= this.slideCount) index = 0;

        // Quitar clase active de la slide actual
        this.slides[this.currentSlide].classList.remove('active');
        this.dots[this.currentSlide].classList.remove('active');

        // Añadir clase active a la nueva slide
        this.slides[index].classList.add('active');
        this.dots[index].classList.add('active');

        // Añadir clase para la dirección de la animación
        const direction = index > this.currentSlide ? 'next' : 'prev';
        if (index !== this.currentSlide) {
            this.slides[this.currentSlide].classList.add(`slide-exit-${direction}`);
            this.slides[index].classList.add(`slide-enter-${direction}`);
        }

        // Actualizar el índice actual
        this.currentSlide = index;

        // Permitir nueva transición después de un tiempo
        setTimeout(() => {
            this.slides.forEach(slide => {
                slide.classList.remove('slide-exit-next', 'slide-exit-prev', 'slide-enter-next', 'slide-enter-prev');
            });
            this.transitionInProgress = false;
        }, 700);
    }

    nextSlide() {
        this.goToSlide(this.currentSlide + 1);
    }

    prevSlide() {
        this.goToSlide(this.currentSlide - 1);
    }

    startAutoplay() {
        // Limpiar intervalo existente si lo hay
        this.stopAutoplay();

        // Crear nuevo intervalo
        this.autoplayInterval = setInterval(() => {
            this.nextSlide();
        }, 5000); // Cambiar cada 5 segundos
    }

    stopAutoplay() {
        if (this.autoplayInterval) {
            clearInterval(this.autoplayInterval);
            this.autoplayInterval = null;
        }
    }

    setupTouchEvents() {
        let touchStartX = 0;
        let touchEndX = 0;

        this.slider.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        this.slider.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe(touchStartX, touchEndX);
        }, { passive: true });
    }

    handleSwipe(startX, endX) {
        const threshold = 50; // Mínima distancia para considerar un swipe

        if (startX - endX > threshold) {
            // Swipe hacia la izquierda - siguiente slide
            this.nextSlide();
        } else if (endX - startX > threshold) {
            // Swipe hacia la derecha - slide anterior
            this.prevSlide();
        }
    }
}

// Exportar la clase para su uso en otros archivos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Slider;
} else {
    // Inicializar automáticamente cuando se carga el DOM
    document.addEventListener('DOMContentLoaded', () => {
        const slider = new Slider();

        // Exponer la instancia globalmente para su uso en la consola o desde otros scripts
        window.sliderInstance = slider;
    });
}