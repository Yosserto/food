const mostrarMasButtons = document.querySelectorAll('.mostrar-mas');
mostrarMasButtons.forEach(button => {
    button.addEventListener('click', function (e) {
        e.stopPropagation();
        const ingredientesList = this.nextElementSibling;
        const productoCard = this.closest('.producto');
        if (ingredientesList.style.display === "none" || ingredientesList.style.display === "") {
            ingredientesList.style.display = "block";
            productoCard.style.height = `${productoCard.scrollHeight * 1.4}px`;
        } else {
            ingredientesList.style.display = "none";
            productoCard.style.height = "400px";
        }
        productoCard.classList.toggle('active');
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const carrito = {};
    const carritoContainer = document.querySelector("#carrito-container");
    const totalElement = document.querySelector("#total");
    const botonPagar = document.querySelector("#boton-pagar");

    // Función para agregar productos al carrito
    function agregarAlCarrito(producto, precio, imagen) {
        if (!carrito[producto]) {
            carrito[producto] = { precio: precio, cantidad: 0, imagen: imagen };
        }
        carrito[producto].cantidad++;

        // Mostrar alerta de producto agregado
        Swal.fire({
            title: 'Producto Agregado',
            text: `Has agregado ${producto} al carrito.`,
            icon: 'success',
            timer: 1500,
            showConfirmButton: false
        });

        actualizarCarrito();
    }

    // Función para actualizar el carrito
    function actualizarCarrito() {
        carritoContainer.innerHTML = "";
        let total = 0;

        for (const producto in carrito) {
            const item = carrito[producto];
            total += item.precio * item.cantidad;

            const row = document.createElement("tr");
            row.innerHTML = `
                <td><img src="${item.imagen}" alt="${producto}" class="producto-imagen" style="width: 50px; height: 50px;"></td>
                <td>${producto}</td>
                <td>$${item.precio}</td>
                <td>
                    <span class="cantidad">${item.cantidad}</span>
                    <button class="disminuir" data-producto="${producto}">-</button>
                </td>
                <td>
                    <button class="eliminar" data-producto="${producto}">Eliminar</button>
                </td>
            `;
            carritoContainer.appendChild(row);
        }

        totalElement.textContent = `Total: $${total}`;
    }

    // Agregar evento a botones de "Agregar al carrito"
    document.querySelectorAll(".agregar-carrito").forEach(boton => {
        boton.addEventListener("click", function () {
            const producto = this.dataset.producto;
            const precio = parseInt(this.dataset.precio);
            const imagen = this.closest(".producto").querySelector(".producto-imagen").src;

            agregarAlCarrito(producto, precio, imagen);
        });
    });

    // Evento para disminuir la cantidad o eliminar producto
    carritoContainer.addEventListener("click", function (e) {
        // Disminuir cantidad
        if (e.target.classList.contains("disminuir")) {
            const producto = e.target.dataset.producto;
            if (carrito[producto]) {
                carrito[producto].cantidad--;
                if (carrito[producto].cantidad <= 0) {
                    Swal.fire({
                        title: 'Producto Eliminado',
                        text: `Has quitado ${producto} del carrito.`,
                        icon: 'warning',
                        timer: 1500,
                        showConfirmButton: false
                    });
                    delete carrito[producto];
                } else {
                    Swal.fire({
                        title: 'Producto Disminuido',
                        text: `Has quitado una unidad de ${producto}.`,
                        icon: 'info',
                        timer: 1500,
                        showConfirmButton: false
                    });
                }
                actualizarCarrito();
            }
        }

        // Eliminar producto
        if (e.target.classList.contains("eliminar")) {
            const producto = e.target.dataset.producto;
            Swal.fire({
                title: '¿Estás seguro?',
                text: `Vas a eliminar ${producto} del carrito.`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Sí, eliminar',
                cancelButtonText: 'Cancelar',
            }).then((result) => {
                if (result.isConfirmed) {
                    delete carrito[producto];
                    actualizarCarrito();
                    Swal.fire({
                        title: 'Eliminado',
                        text: `${producto} ha sido eliminado del carrito.`,
                        icon: 'success',
                        timer: 1500,
                        showConfirmButton: false
                    });
                }
            });
        }
    });

    // Función para mostrar modal de pago
    function mostrarModalDePago() {
        const totalCarrito = totalElement.textContent;

        if (totalCarrito === "Total: $0") {
            Swal.fire({
                title: 'Carrito vacío',
                text: 'No has agregado ningún producto al carrito.',
                icon: 'error',
                timer: 1500,
                showConfirmButton: false
            });
        } else {
            // Crear el contenido del formulario
            const formulario = `
                <div style="display: flex; flex-direction: column; gap: 10px;">
                    <div style="display: flex; align-items: center;">
                        <label for="nombre" style="margin-right: 10px;">Nombre:</label>
                        <input type="text" id="nombre" required style="flex-grow: 1;">
                    </div>
                    <div style="display: flex; align-items: center;">
                        <label for="direccion" style="margin-right: 10px;">Dirección:</label>
                        <input type="text" id="direccion" required style="flex-grow: 1;">
                    </div>
                    <div style="display: flex; align-items: center;">
                        <label for="telefono" style="margin-right: 10px;">Teléfono:</label>
                        <input type="tel" id="telefono" required style="flex-grow: 1;">
                    </div>
                    <div style="display: flex; align-items: center;">
                        <label for="metodoPago" style="margin-right: 10px;">Método de pago:</label>
                        <select id="metodoPago" style="flex-grow: 1;">
                            <option value="tarjeta">Tarjeta de crédito</option>
                            <option value="efectivo">Efectivo</option>
                            <option value="Nequi/Daviplata">Nequi/Daviplata</option>
                        </select>
                    </div>
                </div>
                <div>
                    <h3>${totalCarrito}</h3>
                </div>
            `;

            // Mostrar el modal con el formulario
            Swal.fire({
                title: 'Confirmar compra',
                html: formulario,
                showCancelButton: true,
                confirmButtonText: 'Pagar',
                cancelButtonText: 'Cancelar',
                preConfirm: () => {
                    const nombre = document.getElementById('nombre').value;
                    const direccion = document.getElementById('direccion').value;
                    const telefono = document.getElementById('telefono').value;
                    const metodoPago = document.getElementById('metodoPago').value;

                    // Validar que los campos no estén vacíos
                    if (!nombre || !direccion || !telefono) {
                        Swal.showValidationMessage('Por favor completa todos los campos');
                    }

                    return { nombre, direccion, telefono, metodoPago };
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        title: '¡Compra realizada!',
                        text: 'Tu compra ha sido confirmada. ¡Gracias por tu compra!',
                        icon: 'success',
                        timer: 2000,
                        showConfirmButton: false
                    });

                    // Vaciar el carrito
                    for (const producto in carrito) {
                        delete carrito[producto];
                    }
                    actualizarCarrito();
                }
            });
        }
    }


    // Evento del botón de pagar
    botonPagar.addEventListener("click", mostrarModalDePago);

});

document.addEventListener("DOMContentLoaded", function () {
    const preloader = document.getElementById('preloader');
    
    // Ocultar el preloader después de cargar el contenido
    window.onload = function () {
      preloader.style.display = 'none';
    };
  });
  


