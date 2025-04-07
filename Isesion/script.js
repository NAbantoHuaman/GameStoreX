document.addEventListener('DOMContentLoaded', function () {
    // Referencias a los formularios
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const showRegisterFormLink = document.getElementById('showRegisterForm');
    const showLoginFormLink = document.getElementById('showLoginForm');

    // Referencias a los mensajes
    const loginMessage = document.getElementById('loginMessage');
    const registerMessage = document.getElementById('registerMessage');

    // Cambiar entre formularios
    showRegisterFormLink.addEventListener('click', function (e) {
        e.preventDefault();
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
        registerMessage.style.display = 'none';
        registerMessage.className = 'message';
    });

    showLoginFormLink.addEventListener('click', function (e) {
        e.preventDefault();
        registerForm.style.display = 'none';
        loginForm.style.display = 'block';
        loginMessage.style.display = 'none';
        loginMessage.className = 'message';
    });

    // Mostrar/ocultar contraseña
    const togglePasswordButtons = document.querySelectorAll('.toggle-password');
    togglePasswordButtons.forEach(button => {
        button.addEventListener('click', function () {
            const targetId = this.getAttribute('data-target');
            const passwordInput = document.getElementById(targetId);

            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                this.classList.remove('fa-eye');
                this.classList.add('fa-eye-slash');
            } else {
                passwordInput.type = 'password';
                this.classList.remove('fa-eye-slash');
                this.classList.add('fa-eye');
            }
        });
    });

    // Medidor de fuerza de contraseña
    const passwordInput = document.getElementById('registerPassword');
    const strengthBar = document.querySelector('.strength-bar');
    const strengthText = document.querySelector('.strength-text');

    passwordInput.addEventListener('input', function () {
        const password = this.value;
        let strength = 0;

        // Criterios de fuerza
        if (password.length >= 8) strength += 25;
        if (password.match(/[a-z]+/)) strength += 25;
        if (password.match(/[A-Z]+/)) strength += 25;
        if (password.match(/[0-9]+/)) strength += 25;

        // Actualizar barra y texto
        strengthBar.style.width = strength + '%';

        if (strength <= 25) {
            strengthBar.style.backgroundColor = '#ff3860';
            strengthText.textContent = 'Débil';
        } else if (strength <= 50) {
            strengthBar.style.backgroundColor = '#ffdd57';
            strengthText.textContent = 'Media';
        } else if (strength <= 75) {
            strengthBar.style.backgroundColor = '#ffaa00';
            strengthText.textContent = 'Buena';
        } else {
            strengthBar.style.backgroundColor = '#23d160';
            strengthText.textContent = 'Fuerte';
        }
    });

    // Validación de formulario de registro
    registerForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const termsCheck = document.getElementById('termsCheck').checked;

        // Validaciones
        if (!termsCheck) {
            showMessage(registerMessage, 'Debes aceptar los términos y condiciones', 'error');
            return;
        }

        if (password !== confirmPassword) {
            showMessage(registerMessage, 'Las contraseñas no coinciden', 'error');
            return;
        }

        // Simulación de registro exitoso
        // En un caso real, aquí enviarías los datos al servidor
        showMessage(registerMessage, 'Registro exitoso. Redirigiendo...', 'success');

        // Simular redirección después de registro exitoso
        setTimeout(() => {
            window.location.href = '/index.html';
        }, 2000);
    });

    // Validación de formulario de login
    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        const rememberMe = document.getElementById('rememberMe')?.checked || false;

        // Extraer el nombre de usuario del email (simulación)
        const username = email.split('@')[0];

        // Guardar el nombre de usuario en localStorage
        localStorage.setItem('loggedInUser', username);

        // Simulación de login exitoso
        showMessage(loginMessage, 'Inicio de sesión exitoso. Redirigiendo...', 'success');

        // Simular redirección después de login exitoso
        setTimeout(() => {
            window.location.href = '/index.html';
        }, 2000);
    });

    // También para el registro
    registerForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('registerName').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const termsCheck = document.getElementById('termsCheck').checked;

        // Validaciones
        if (!termsCheck) {
            showMessage(registerMessage, 'Debes aceptar los términos y condiciones', 'error');
            return;
        }

        if (password !== confirmPassword) {
            showMessage(registerMessage, 'Las contraseñas no coinciden', 'error');
            return;
        }

        // Guardar el nombre de usuario en localStorage
        localStorage.setItem('loggedInUser', name);

        // Simulación de registro exitoso
        showMessage(registerMessage, 'Registro exitoso. Redirigiendo...', 'success');

        // Simular redirección después de registro exitoso
        setTimeout(() => {
            window.location.href = '/index.html';
        }, 2000);
    });

    // Función para mostrar mensajes
    function showMessage(element, message, type) {
        element.textContent = message;
        element.className = 'message ' + type;
        element.style.display = 'block';
    }

    // Inicializar partículas
    if (typeof particlesJS !== 'undefined') {
        particlesJS('neonParticles', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: "#00ffff"
                },
                shape: {
                    type: "circle",
                },
                opacity: {
                    value: 0.5,
                    random: true,
                },
                size: {
                    value: 3,
                    random: true,
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#8a2be2",
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: "none",
                    random: true,
                    straight: false,
                    out_mode: "out",
                    bounce: false,
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: {
                        enable: true,
                        mode: "grab"
                    },
                    onclick: {
                        enable: true,
                        mode: "push"
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 1
                        }
                    },
                    push: {
                        particles_nb: 4
                    }
                }
            },
            retina_detect: true
        });
    }
});