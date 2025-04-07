// Script para manejar la funcionalidad del carrito
document.addEventListener('DOMContentLoaded', function () {
    // Cargar productos del carrito desde localStorage
    loadCartItems();

    // Función para cargar los productos del carrito
    function loadCartItems() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const cartItemsContainer = document.querySelector('.cart-items');
        const emptyCart = document.querySelector('.cart-empty');
        const cartSummary = document.querySelector('.cart-summary');

        // Limpiar el contenedor de items
        cartItemsContainer.innerHTML = '';

        // Verificar si el carrito está vacío
        if (cart.length === 0) {
            emptyCart.style.display = 'block';
            cartItemsContainer.style.display = 'none';
            cartSummary.style.display = 'none';
            return;
        }

        // Mostrar los contenedores necesarios
        emptyCart.style.display = 'none';
        cartItemsContainer.style.display = 'block';
        cartSummary.style.display = 'block';

        // Crear elementos HTML para cada producto en el carrito
        cart.forEach((item, index) => {
            // Verificar si es una pre-orden
            const isPreorder = item.isPreorder || false;
            const preorderBadge = isPreorder ? `<span class="preorder-badge">Pre-orden</span>` : '';
            const releaseDate = isPreorder && item.releaseDate ? `<p class="release-date">Lanzamiento: ${item.releaseDate}</p>` : '';
            
            const cartItemHTML = `
                        <div class="cart-item ${isPreorder ? 'preorder-item' : ''}" data-index="${index}">
                            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                            <div class="cart-item-details">
                                <h3 class="cart-item-title">${item.name} ${preorderBadge}</h3>
                                <p class="cart-item-price">${item.price}</p>
                                ${releaseDate}
                            </div>
                            <div class="cart-item-actions">
                                <div class="quantity-control">
                                    <button class="quantity-btn decrease-btn">-</button>
                                    <input type="text" class="quantity-input" value="${item.quantity}" readonly>
                                    <button class="quantity-btn increase-btn">+</button>
                                </div>
                                <button class="remove-btn">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <polyline points="3 6 5 6 21 6"></polyline>
                                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                        <line x1="10" y1="11" x2="10" y2="17"></line>
                                        <line x1="14" y1="11" x2="14" y2="17"></line>
                                    </svg>
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    `;
            cartItemsContainer.innerHTML += cartItemHTML;
        });

        // Actualizar los totales
        updateCartTotals();

        // Añadir event listeners a los botones
        setupEventListeners();
    }

    // Configurar event listeners para los botones
    function setupEventListeners() {
        // Botones de disminuir cantidad
        const decreaseBtns = document.querySelectorAll('.decrease-btn');
        decreaseBtns.forEach(btn => {
            btn.addEventListener('click', function () {
                const cartItem = this.closest('.cart-item');
                const index = cartItem.dataset.index;
                const input = this.nextElementSibling;
                let value = parseInt(input.value);

                if (value > 1) {
                    value--;
                    input.value = value;

                    // Actualizar cantidad en localStorage
                    updateCartItemQuantity(index, value);

                    // Actualizar totales
                    updateCartTotals();
                }
            });
        });

        // Botones de aumentar cantidad
        const increaseBtns = document.querySelectorAll('.increase-btn');
        increaseBtns.forEach(btn => {
            btn.addEventListener('click', function () {
                const cartItem = this.closest('.cart-item');
                const index = cartItem.dataset.index;
                const input = this.previousElementSibling;
                let value = parseInt(input.value);

                value++;
                input.value = value;

                // Actualizar cantidad en localStorage
                updateCartItemQuantity(index, value);

                // Actualizar totales
                updateCartTotals();
            });
        });

        // Botones de eliminar
        const removeBtns = document.querySelectorAll('.remove-btn');
        removeBtns.forEach(btn => {
            btn.addEventListener('click', function () {
                const cartItem = this.closest('.cart-item');
                const index = cartItem.dataset.index;

                // Efecto de desvanecimiento
                cartItem.style.opacity = '0';

                setTimeout(() => {
                    // Eliminar del localStorage
                    removeCartItem(index);

                    // Recargar los items del carrito
                    loadCartItems();
                }, 300);
            });
        });
    }

    // Función para actualizar la cantidad de un producto en el carrito
    function updateCartItemQuantity(index, quantity) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        if (cart[index]) {
            cart[index].quantity = quantity;
            localStorage.setItem('cart', JSON.stringify(cart));
        }
    }

    // Función para eliminar un producto del carrito
    function removeCartItem(index) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        if (cart[index]) {
            cart.splice(index, 1);
            localStorage.setItem('cart', JSON.stringify(cart));
        }
    }

    // Función para extraer el valor numérico del precio
    function extractPrice(priceString) {
        try {
            // Verificar si priceString es undefined o null
            if (!priceString) return 0;

            console.log("Procesando precio original:", priceString);

            // Para el formato peruano "S/. 59.99"
            if (priceString.includes('S/.')) {
                // Eliminar "S/." y espacios
                const numericPart = priceString.replace('S/.', '').trim();
                // Convertir a número
                const price = parseFloat(numericPart);
                console.log("Precio extraído:", price);
                return price;
            }

            // Para otros formatos
            const numericValue = parseFloat(priceString.replace(/[^\d.]/g, ''));
            console.log("Precio extraído (formato alternativo):", numericValue);
            return numericValue;
        } catch (error) {
            console.error("Error al extraer precio:", error);
            return 0;
        }
    }

    // Función para actualizar los totales del carrito
    function updateCartTotals() {
        try {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];

            // Calcular subtotal
            let subtotal = 0;

            cart.forEach(item => {
                const price = extractPrice(item.price);
                const quantity = parseInt(item.quantity) || 1;
                subtotal += price * quantity;
                console.log(`Producto: ${item.name}, Precio: ${item.price}, Extraído: ${price}, Cantidad: ${quantity}`);
            });

            // Calcular impuestos (10%)
            const tax = subtotal * 0.10;

            // Calcular total
            const total = subtotal + tax;

            console.log(`Subtotal: ${subtotal}, Impuestos: ${tax}, Total: ${total}`);

            // Actualizar el HTML
            document.querySelectorAll('.summary-row').forEach((row, index) => {
                const valueSpan = row.querySelector('span:last-child');
                if (!valueSpan) return;

                if (index === 0) {
                    // Subtotal
                    valueSpan.textContent = `S/. ${subtotal.toFixed(2)}`;
                } else if (index === 2) {
                    // Impuestos
                    valueSpan.textContent = `S/. ${tax.toFixed(2)}`;
                } else if (index === 3) {
                    // Total
                    valueSpan.textContent = `S/. ${total.toFixed(2)}`;
                }
            });
        } catch (error) {
            console.error("Error al actualizar totales:", error);
        }
    }

    // Botón de proceder al pago
    const checkoutBtn = document.querySelector('.checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function (e) {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            if (cart.length === 0) {
                e.preventDefault();
                alert('Tu carrito está vacío. Añade productos antes de proceder al pago.');
            }
        });
    }

    // Eliminar el HTML estático de ejemplo al cargar la página
    const staticCartItems = document.querySelectorAll('.cart-item');
    staticCartItems.forEach(item => {
        if (!item.hasAttribute('data-index')) {
            item.remove();
        }
    });
});