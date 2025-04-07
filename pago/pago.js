// Script para manejar la funcionalidad de la página de pago
document.addEventListener('DOMContentLoaded', function () {
    // Inicializar contador del carrito
    updateCartCount();
    // Cargar productos del carrito
    loadCartItems();

    // Cambiar entre métodos de pago
    const paymentMethods = document.querySelectorAll('.payment-method');
    const creditCardFields = document.getElementById('credit-card-fields');

    function togglePaymentFields(paymentMethod) {
        // Ocultar todos los campos específicos primero
        if (creditCardFields) {
            creditCardFields.style.display = 'none';
        }

        // Mostrar los campos según el método seleccionado
        switch (paymentMethod) {
            case 'credit-card':
                if (creditCardFields) {
                    creditCardFields.style.display = 'block';
                }
                break;
            case 'paypal':
                // Aquí puedes agregar lógica específica para PayPal
                break;
            case 'transfer':
                // Aquí puedes agregar lógica específica para transferencia
                break;
        }
    }

    // Establecer el estado inicial
    togglePaymentFields('credit-card');

    paymentMethods.forEach(method => {
        method.addEventListener('click', function () {
            // Quitar la clase active de todos los métodos
            paymentMethods.forEach(m => m.classList.remove('active'));
            // Añadir la clase active al método seleccionado
            this.classList.add('active');

            // Obtener el método de pago seleccionado
            const selectedMethod = this.getAttribute('data-method');

            // Actualizar el valor del método de pago seleccionado
            const paymentMethodInput = document.getElementById('payment-method-input');
            if (paymentMethodInput) {
                paymentMethodInput.value = selectedMethod;
            }

            // Mostrar/ocultar campos según el método seleccionado
            togglePaymentFields(selectedMethod);
        });
    });
});

// Función para cargar los productos del carrito en el resumen
function loadCartItems() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const orderSummary = document.querySelector('.order-summary');

    if (!orderSummary) {
        console.error('No se encontró el elemento .order-summary');
        return;
    }

    // Limpiar el contenedor de resumen
    orderSummary.innerHTML = '';

    // Verificar si el carrito está vacío
    if (cart.length === 0) {
        orderSummary.innerHTML = '<p class="empty-cart-message">No hay productos en el carrito</p>';

        // Deshabilitar el botón de confirmación
        const confirmBtn = document.querySelector('.confirm-btn');
        if (confirmBtn) confirmBtn.disabled = true;

        return;
    }

    // Crear elementos HTML para cada producto
    const fragment = document.createDocumentFragment();

    cart.forEach(item => {
        const summaryItem = document.createElement('div');
        summaryItem.className = 'cart-item';
        summaryItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="cart-item-image" loading="lazy">
                <div class="cart-item-details">
                    <h4 class="cart-item-title">${item.name}</h4>
                    <p class="cart-item-price">S/. ${item.price}</p>
                    <p class="cart-item-quantity">Cantidad: ${item.quantity}</p>
                </div>
            `;
        fragment.appendChild(summaryItem);
    });

    orderSummary.appendChild(fragment);

    // Calcular y mostrar los totales
    const totals = calculateTotals(cart);

    const summaryTotals = document.createElement('div');
    summaryTotals.className = 'summary-totals';
    summaryTotals.innerHTML = `
            <div class="summary-row">
                <span>Subtotal:</span>
                <span>S/. ${totals.subtotal.toFixed(2)}</span>
            </div>
            <div class="summary-row">
                <span>Envío:</span>
                <span>Gratis</span>
            </div>
            <div class="summary-row">
                <span>Impuestos:</span>
                <span>S/. ${totals.tax.toFixed(2)}</span>
            </div>
            <div class="summary-row total-row">
                <span>Total:</span>
                <span>S/. ${totals.total.toFixed(2)}</span>
            </div>
        `;

    orderSummary.appendChild(summaryTotals);

    // Guardar el total en un campo oculto para el formulario
    const totalInput = document.getElementById('order-total');
    if (totalInput) {
        totalInput.value = totals.total.toFixed(2);
    }
}

// Función para extraer el valor numérico del precio
function extractPrice(price) {
    if (typeof price === 'number') return price;
    if (!price) return 0;
    // Eliminar el prefijo 'S/. ' y cualquier espacio en blanco
    const cleanPrice = price.replace('S/. ', '').trim();
    return parseFloat(cleanPrice);
}

// Función para calcular los totales
function calculateTotals(cart) {
    let subtotal = 0;

    cart.forEach(item => {
        const price = extractPrice(item.price);
        const quantity = parseInt(item.quantity) || 1;
        subtotal += price * quantity;
    });

    // Calcular impuestos (10%)
    const tax = subtotal * 0.10;

    // Calcular total
    const total = subtotal + tax;

    return {
        subtotal,
        tax,
        total
    };
}

// Función para actualizar el contador del carrito
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        cartCount.textContent = cart.reduce((total, item) => total + (parseInt(item.quantity) || 1), 0);
    }
}

// Validación básica del formulario
const paymentForm = document.getElementById('payment-form');
const confirmBtn = document.querySelector('.confirm-btn');

if (confirmBtn) {
    confirmBtn.addEventListener('click', function (e) {
        if (!paymentForm) {
            console.error('No se encontró el formulario de pago');
            return;
        }

        const cart = JSON.parse(localStorage.getItem('cart')) || [];

        // Verificar si hay productos en el carrito
        if (cart.length === 0) {
            e.preventDefault();
            alert('No hay productos en el carrito. Añade productos antes de confirmar el pedido.');
            return;
        }

        // Obtener el método de pago seleccionado
        const selectedMethod = document.querySelector('.payment-method.active');
        const paymentMethod = selectedMethod ? selectedMethod.getAttribute('data-method') : null;

        if (!paymentMethod) {
            e.preventDefault();
            alert('Por favor, selecciona un método de pago.');
            return;
        }

        // Si es tarjeta de crédito, validar los campos
        if (paymentMethod === 'credit-card') {
            const cardName = document.getElementById('card-name')?.value;
            const cardNumber = document.getElementById('card-number')?.value;
            const expiryDate = document.getElementById('expiry-date')?.value;
            const cvv = document.getElementById('cvv')?.value;

            if (!cardName || !cardNumber || !expiryDate || !cvv) {
                e.preventDefault();
                alert('Por favor, completa todos los campos de la tarjeta antes de confirmar el pedido.');
                return;
            }

            // Validar formato de tarjeta
            if (cardNumber.replace(/\s/g, '').length < 16) {
                e.preventDefault();
                alert('El número de tarjeta debe tener 16 dígitos.');
                return;
            }

            // Validar fecha de expiración
            if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
                e.preventDefault();
                alert('La fecha de expiración debe tener el formato MM/AA.');
                return;
            }

            // Validar CVV
            if (cvv.length < 3) {
                e.preventDefault();
                alert('El código CVV debe tener al menos 3 dígitos.');
                return;
            }
        }

        // Si todo está correcto, mostrar mensaje de confirmación
        alert('¡Gracias por tu compra! Tu pedido ha sido procesado correctamente.');

        // Limpiar el carrito después de la confirmación
        localStorage.removeItem('cart');

        // Redirigir a la página de confirmación
        setTimeout(() => {
            window.location.href = '/index.html';
        }, 1000);
    });
}

// Formateo de número de tarjeta
const cardNumberInput = document.getElementById('card-number');
if (cardNumberInput) {
    cardNumberInput.addEventListener('input', function (e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 16) value = value.slice(0, 16);

        // Añadir espacios cada 4 dígitos
        let formattedValue = '';
        for (let i = 0; i < value.length; i++) {
            if (i > 0 && i % 4 === 0) formattedValue += ' ';
            formattedValue += value[i];
        }

        e.target.value = formattedValue;
    });
}

// Formateo de fecha de expiración
const expiryDateInput = document.getElementById('expiry-date');
if (expiryDateInput) {
    expiryDateInput.addEventListener('input', function (e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 4) value = value.slice(0, 4);

        if (value.length > 2) {
            e.target.value = value.slice(0, 2) + '/' + value.slice(2);
        } else {
            e.target.value = value;
        }
    });
}

// Limitar CVV a 3-4 dígitos
const cvvInput = document.getElementById('cvv');
if (cvvInput) {
    cvvInput.addEventListener('input', function (e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 4) value = value.slice(0, 4);
        e.target.value = value;
    });
}
