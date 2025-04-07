// Script para redirigir a las páginas de categorías
document.addEventListener('DOMContentLoaded', function () {
    const categoryButtons = document.querySelectorAll('.category-card .details-btn');

    categoryButtons.forEach(button => {
        button.addEventListener('click', function () {
            const categoryCard = this.closest('.category-card');
            const categoryName = categoryCard.querySelector('.title-category').textContent;

            // Mapeo de categorías a sus respectivas páginas
            const categoryPages = {
                'Acción': '/catalogo/acción/accion.html',
                'Aventura': '/catalogo/aventura/aventura.html',
                'RPG': '/catalogo/rpg/rpg.html',
                'Deportes': '/catalogo/deportes/deportes.html'
            };

            // Redirigir a la página correspondiente
            const categoryPage = categoryPages[categoryName];
            if (categoryPage) {
                window.location.href = categoryPage;
            } else {
                alert('Página de categoría no disponible');
            }
        });
    });

    // Efecto de partículas neón para el fondo
    function createNeonParticles() {
        const particles = document.getElementById('neonParticles');
        const particlesCount = 50;

        if (particles) {
            for (let i = 0; i < particlesCount; i++) {
                const particle = document.createElement('div');
                particle.classList.add('neon-particle');

                // Posición aleatoria
                const posX = Math.random() * 100;
                const posY = Math.random() * 100;

                // Tamaño aleatorio
                const size = Math.random() * 3 + 1;

                // Color aleatorio entre los colores neón
                const colors = ['#00f3ff', '#ff00ff', '#ffff00', '#ff0066'];
                const color = colors[Math.floor(Math.random() * colors.length)];

                // Aplicar estilos
                particle.style.cssText = `
                    position: absolute;
                    top: ${posY}%;
                    left: ${posX}%;
                    width: ${size}px;
                    height: ${size}px;
                    background-color: ${color};
                    border-radius: 50%;
                    filter: blur(${size}px);
                    box-shadow: 0 0 ${size * 2}px ${color};
                    opacity: ${Math.random() * 0.5 + 0.3};
                    animation: floatParticle ${Math.random() * 10 + 10}s linear infinite;
                `;

                particles.appendChild(particle);
            }
        }
    }

    // Iniciar efectos visuales
    createNeonParticles();
});

// Animación para las partículas neón
document.head.insertAdjacentHTML('beforeend', `
<style>
@keyframes floatParticle {
    0% {
        transform: translateY(0) translateX(0);
    }
    25% {
        transform: translateY(-20px) translateX(10px);
    }
    50% {
        transform: translateY(0) translateX(20px);
    }
    75% {
        transform: translateY(20px) translateX(10px);
    }
    100% {
        transform: translateY(0) translateX(0);
    }
}
</style>
`);