// Script para manejar las preguntas frecuentes con efectos cyberpunk
document.addEventListener('DOMContentLoaded', function () {

    // Manejar clics en preguntas FAQ con efectos visuales
    document.querySelectorAll('.faq-question').forEach((question, index) => {
        question.addEventListener('click', () => {
            toggleFAQ(question, index + 1);
            // Efecto visual al hacer clic
            question.style.transform = 'scale(0.98)';
            setTimeout(() => {
                question.style.transform = '';
            }, 200);
        });

        // Soporte para navegación por teclado
        question.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleFAQ(question, index + 1);
            }
        });

        // Efecto hover neon
        question.addEventListener('mouseenter', () => {
            question.style.textShadow = '0 0 8px rgba(0, 243, 255, 0.7)';
        });

        question.addEventListener('mouseleave', () => {
            question.style.textShadow = '';
        });
    });

    // Función mejorada para alternar estado de FAQ
    function toggleFAQ(question, id) {
        const answer = document.getElementById(`faq-answer-${id}`);
        const isOpen = question.getAttribute('aria-expanded') === 'true';
        const icon = question.querySelector('svg');

        // Animación suave para el icono
        if (isOpen) {
            icon.style.transform = 'rotate(0deg)';
        } else {
            icon.style.transform = 'rotate(45deg)';
        }

        // Cerrar todas las respuestas primero
        document.querySelectorAll('.faq-question').forEach((q, i) => {
            const a = document.getElementById(`faq-answer-${i + 1}`);
            const otherIcon = q.querySelector('svg');

            if (q !== question) {
                q.setAttribute('aria-expanded', 'false');
                a.style.maxHeight = null;
                otherIcon.style.transform = 'rotate(0deg)';
            }
        });

        // Abrir la respuesta seleccionada si estaba cerrada
        if (!isOpen) {
            question.setAttribute('aria-expanded', 'true');
            answer.style.maxHeight = answer.scrollHeight + "px";

            // Efecto visual al abrir
            answer.style.animation = 'fadeIn 0.5s ease-out';
            setTimeout(() => {
                answer.style.animation = '';
            }, 500);
        }
    }

    // Manejar envío del formulario con efectos cyberpunk
    const supportForm = document.getElementById('supportForm');
    if (supportForm) {
        supportForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Validación mejorada
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const issue = document.getElementById('issue').value;
            const message = document.getElementById('message').value.trim();
            const submitBtn = supportForm.querySelector('button[type="submit"]');

            if (!name || !email || !issue || !message) {
                // Efecto de error cyberpunk
                const invalidFields = [];
                if (!name) invalidFields.push('name');
                if (!email) invalidFields.push('email');
                if (!issue) invalidFields.push('issue');
                if (!message) invalidFields.push('message');

                invalidFields.forEach(fieldId => {
                    const field = document.getElementById(fieldId);
                    field.style.borderColor = '#ff0090';
                    field.style.boxShadow = '0 0 10px rgba(255, 0, 144, 0.5)';
                    setTimeout(() => {
                        field.style.borderColor = '#00f3ff';
                        field.style.boxShadow = '';
                    }, 2000);
                });

                // Mostrar notificación estilo cyberpunk
                showCyberNotification('Por favor completa todos los campos requeridos.', 'error');
                return;
            }

            // Efecto de envío
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span>Enviando...</span><div class="cyber-spinner"></div>';

            // Simular envío (en un caso real sería una llamada AJAX)
            setTimeout(() => {
                // Mostrar notificación de éxito
                showCyberNotification('¡Mensaje enviado con éxito! Te responderemos a la brevedad.', 'success');

                // Efecto de confirmación
                supportForm.style.boxShadow = '0 0 20px rgba(0, 243, 255, 0.7)';
                setTimeout(() => {
                    supportForm.style.boxShadow = '';
                }, 1000);

                supportForm.reset();
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<span>Enviar Mensaje</span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>';
            }, 1500);
        });
    }

    // Función para mostrar notificaciones estilo cyberpunk
    function showCyberNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `cyber-notification ${type}`;
        notification.textContent = message;

        // Estilo según el tipo
        const colors = {
            'error': { bg: 'rgba(255, 0, 144, 0.2)', border: '#ff0090' },
            'success': { bg: 'rgba(0, 243, 255, 0.2)', border: '#00f3ff' },
            'info': { bg: 'rgba(157, 0, 255, 0.2)', border: '#9d00ff' }
        };

        notification.style.backgroundColor = colors[type].bg;
        notification.style.border = `1px solid ${colors[type].border}`;
        notification.style.boxShadow = `0 0 15px ${colors[type].border}`;

        document.body.appendChild(notification);

        // Mostrar con animación
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateY(0)';
        }, 10);

        // Ocultar después de 3 segundos
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateY(-20px)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
});

