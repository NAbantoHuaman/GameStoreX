// funcionalidad de los reviews
class Reviews {
    constructor() {
        // Elementos de reseñas
        this.reviewsContainer = document.querySelector('.reviews-slider');
        this.reviewCards = document.querySelectorAll('.review-card');

        // Si no hay elementos de reseñas, salir
        if (!this.reviewCards.length) return;

        this.init();
    }

    init() {
        // Inicializar interacciones de las tarjetas de reseñas
        this.setupReviewCards();

        // Configurar acciones de las reseñas (likes, comentarios, etc.)
        this.setupReviewActions();
    }

    setupReviewCards() {
        // Añadir efectos de hover y animaciones a las tarjetas
        this.reviewCards.forEach(card => {
            // Asegurar que los elementos de glare y hologram existan
            if (!card.querySelector('.card-glare')) {
                const glare = document.createElement('div');
                glare.className = 'card-glare';
                card.prepend(glare);
            }

            if (!card.querySelector('.card-hologram')) {
                const hologram = document.createElement('div');
                hologram.className = 'card-hologram';
                card.prepend(hologram);
            }

            // Efecto de movimiento sutil al pasar el mouse
            card.addEventListener('mousemove', (e) => {
                const { left, top, width, height } = card.getBoundingClientRect();
                const x = (e.clientX - left) / width;
                const y = (e.clientY - top) / height;

                // Rotación sutil basada en la posición del mouse
                card.style.transform = `perspective(1000px) rotateY(${(x - 0.5) * 5}deg) rotateX(${(y - 0.5) * -5}deg) translateY(-5px)`;

                // Mover el efecto de brillo - CORREGIDO para alinear correctamente
                const glare = card.querySelector('.card-glare');
                if (glare) {
                    glare.style.opacity = 0.2;
                    glare.style.transform = `translate(-50%, -50%) rotate(30deg) scale(2)`;
                    glare.style.left = `${x * 100}%`;
                    glare.style.top = `${y * 100}%`;
                }
            });

            // Restablecer al salir
            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
                const glare = card.querySelector('.card-glare');
                if (glare) {
                    glare.style.opacity = 0;
                }
            });
        });
    }

    setupReviewActions() {
        // Configurar botones de like, comentario y compartir
        const actionButtons = document.querySelectorAll('.like-btn, .comment-btn, .share-btn');

        actionButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();

                // Efecto visual al hacer clic
                button.classList.add('clicked');
                setTimeout(() => button.classList.remove('clicked'), 300);

                if (button.classList.contains('like-btn')) {
                    this.handleLike(button);
                } else if (button.classList.contains('comment-btn')) {
                    this.handleComment(button);
                } else if (button.classList.contains('share-btn')) {
                    this.handleShare(button);
                }
            });
        });
    }

    handleLike(button) {
        // Incrementar contador de likes
        const countSpan = button.querySelector('span') || button.childNodes[1];
        if (countSpan && countSpan.nodeType === Node.TEXT_NODE) {
            let count = parseInt(countSpan.nodeValue.trim(), 10) || 0;
            count++;
            countSpan.nodeValue = ` ${count}`;
        } else if (button.textContent.includes(' ')) {
            const parts = button.textContent.split(' ');
            const icon = parts[0];
            let count = parseInt(parts[1], 10) || 0;
            count++;
            button.innerHTML = `${icon} ${count}`;
        }

        // Efecto visual
        button.classList.add('liked');
        setTimeout(() => {
            button.classList.remove('liked');
        }, 1000);
    }

    handleComment(button) {
        // Aquí iría la lógica para abrir un modal de comentarios
        console.log('Abrir modal de comentarios');
        // Por ahora solo mostramos un mensaje en la consola
    }

    handleShare(button) {
        // Opciones de compartir
        if (navigator.share) {
            navigator.share({
                title: 'Reseña de juego',
                text: 'Mira esta reseña de juego en GameZone',
                url: window.location.href
            })
                .catch(err => console.error('Error al compartir:', err));
        } else {
            // Fallback para navegadores que no soportan Web Share API
            console.log('Compartir en redes sociales');
            // Aquí iría la lógica para mostrar un menú de compartir personalizado
        }
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new Reviews();
});