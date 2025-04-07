// Funcionalidad de los contadores

class Countdown {
    constructor() {
        // Elementos de cuenta regresiva
        this.countdownElements = document.querySelectorAll('.countdown');

        if (!this.countdownElements.length) return;

        this.init();
    }

    init() {
        // Iniciar todas las cuentas regresivas
        this.countdownElements.forEach(element => {
            // Obtener el tiempo en segundos desde el atributo data-time
            const seconds = parseInt(element.getAttribute('data-time'), 10);
            if (isNaN(seconds)) return;

            // Establecer el tiempo inicial
            element.seconds = seconds;

            // Formatear y mostrar el tiempo inicial
            this.updateDisplay(element);
        });

        // Iniciar el intervalo para actualizar todas las cuentas regresivas
        this.startCountdown();
    }

    startCountdown() {
        // Actualizar cada segundo
        this.interval = setInterval(() => {
            let allExpired = true;

            this.countdownElements.forEach(element => {
                if (element.seconds <= 0) return;

                // Decrementar el contador
                element.seconds--;

                // Actualizar la visualización
                this.updateDisplay(element);

                // Verificar si alguna cuenta regresiva sigue activa
                if (element.seconds > 0) {
                    allExpired = false;
                }

                // Efectos cuando queda poco tiempo
                if (element.seconds < 3600) { // Menos de una hora
                    element.classList.add('urgent');
                }

                // Cuando la cuenta regresiva llega a cero
                if (element.seconds === 0) {
                    this.handleExpired(element);
                }
            });

            // Si todas las cuentas regresivas han expirado, detener el intervalo
            if (allExpired) {
                clearInterval(this.interval);
            }
        }, 1000);
    }

    updateDisplay(element) {
        const seconds = element.seconds;

        // Calcular horas, minutos y segundos
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;

        // Formatear con ceros a la izquierda
        const formattedTime = `${this.padZero(hours)}:${this.padZero(minutes)}:${this.padZero(secs)}`;

        // Actualizar el texto del elemento
        element.textContent = formattedTime;

        // Añadir efecto de parpadeo cuando queda poco tiempo
        if (seconds < 300) { // Menos de 5 minutos
            element.classList.add('flicker');
        } else {
            element.classList.remove('flicker');
        }
    }

    padZero(num) {
        return num.toString().padStart(2, '0');
    }

    handleExpired(element) {
        // Añadir clase para estilo expirado
        element.classList.add('expired');

        // Cambiar el texto a "EXPIRADO"
        element.textContent = "EXPIRADO";

        // Encontrar el contenedor de oferta padre y añadir clase expirada
        const offerCard = element.closest('.offer-card');
        if (offerCard) {
            offerCard.classList.add('offer-expired');
        }
    }

    // Método para reiniciar una cuenta regresiva específica
    resetCountdown(element, newSeconds) {
        if (!element) return;

        element.seconds = newSeconds || parseInt(element.getAttribute('data-time'), 10);
        element.classList.remove('expired', 'urgent', 'flicker');
        this.updateDisplay(element);

        // Si el intervalo se detuvo, reiniciarlo
        if (!this.interval) {
            this.startCountdown();
        }
    }

    // Método para detener todas las cuentas regresivas
    stopAll() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }

    // Método para observar nuevos elementos de cuenta regresiva añadidos al DOM
    observeNewCountdowns() {
        // Crear un observador de mutaciones para detectar nuevos elementos
        const observer = new MutationObserver(mutations => {
            let newElementsAdded = false;

            mutations.forEach(mutation => {
                if (mutation.type === 'childList' && mutation.addedNodes.length) {
                    mutation.addedNodes.forEach(node => {
                        // Verificar si el nodo es un elemento y contiene elementos de cuenta regresiva
                        if (node.nodeType === Node.ELEMENT_NODE) {
                            // Buscar elementos de cuenta regresiva dentro del nodo añadido
                            const newCountdowns = node.querySelectorAll('.countdown');
                            if (newCountdowns.length) {
                                newElementsAdded = true;
                                // Añadir los nuevos elementos al conjunto existente
                                newCountdowns.forEach(element => {
                                    if (!Array.from(this.countdownElements).includes(element)) {
                                        // Inicializar el nuevo elemento
                                        const seconds = parseInt(element.getAttribute('data-time'), 10);
                                        if (!isNaN(seconds)) {
                                            element.seconds = seconds;
                                            this.updateDisplay(element);
                                            // Añadir al NodeList existente (convertir a array y volver)
                                            this.countdownElements = document.querySelectorAll('.countdown');
                                        }
                                    }
                                });
                            }
                        }
                    });
                }
            });

            // Si se añadieron nuevos elementos y el intervalo se detuvo, reiniciarlo
            if (newElementsAdded && !this.interval) {
                this.startCountdown();
            }
        });

        // Configurar el observador para observar todo el documento
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });

        return observer;
    }

    // Método para guardar el estado actual en localStorage
    saveState() {
        const state = {};
        this.countdownElements.forEach((element, index) => {
            if (element.seconds > 0) {
                // Guardar el tiempo restante y el ID o algún identificador único
                const id = element.id || `countdown-${index}`;
                state[id] = {
                    seconds: element.seconds,
                    timestamp: Date.now()
                };
            }
        });

        localStorage.setItem('countdownState', JSON.stringify(state));
        return state;
    }

    // Método para cargar el estado desde localStorage
    loadState() {
        const savedState = localStorage.getItem('countdownState');
        if (!savedState) return false;

        try {
            const state = JSON.parse(savedState);
            const now = Date.now();
            let stateApplied = false;

            this.countdownElements.forEach((element, index) => {
                const id = element.id || `countdown-${index}`;
                if (state[id]) {
                    // Calcular el tiempo transcurrido desde que se guardó
                    const elapsed = Math.floor((now - state[id].timestamp) / 1000);
                    const remainingSeconds = Math.max(0, state[id].seconds - elapsed);

                    // Aplicar el tiempo restante
                    element.seconds = remainingSeconds;
                    this.updateDisplay(element);

                    if (remainingSeconds === 0) {
                        this.handleExpired(element);
                    } else {
                        stateApplied = true;
                    }
                }
            });

            return stateApplied;
        } catch (error) {
            console.error('Error al cargar el estado de la cuenta regresiva:', error);
            return false;
        }
    }
}

// Exportar la clase para su uso en otros archivos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Countdown;
} else {
    // Inicializar automáticamente cuando se carga el DOM
    document.addEventListener('DOMContentLoaded', () => {
        const countdown = new Countdown();
        // Iniciar observador para nuevos elementos
        countdown.observeNewCountdowns();
        // Intentar cargar estado guardado
        countdown.loadState();

        // Guardar estado periódicamente
        setInterval(() => {
            countdown.saveState();
        }, 30000); // Cada 30 segundos

        // Guardar estado antes de cerrar la página
        window.addEventListener('beforeunload', () => {
            countdown.saveState();
        });

        // Exponer la instancia globalmente para su uso en la consola o desde otros scripts
        window.countdownInstance = countdown;
    });
}