const listaB = document.querySelector("#lista-bebidas");
const listaP = document.querySelector("#lista-platos");
let idPB = 0;
let idPP = 0;

// Función para listar las bebidas
function listarB() {
    const parametrosURL = new URLSearchParams();
    parametrosURL.append("op", "listar");

    fetch('../controller/bebida.php', {
        method: 'POST',
        body: parametrosURL
    })
    .then(respuesta => respuesta.json())
    .then(data => {
        listaP.classList.add('d-none')
        let contador = 1;
        let cardRow = '<div class="row">'; // Iniciar una nueva fila de tarjetas

        data.forEach(element => {
            const estado = element.estado == 1 ? 'Activo' : element.estado == 0 ? 'Inactivo' : element.estado;
            // Formatear el precio con dos decimales fijos
            const precioSinDecimales = parseFloat(element.precio).toString();
            
            // Agregar una tarjeta a la fila actual
            cardRow += `
            <div class='col-md-3 mt-3'>
                <div class="card card-hover border-primary" onclick='pedirB(${element.idbebida})'>
                    <div class='card-header text-bg-primary'>
                        <p class='fs-5'><b>${element.bebida}</b> </p>
                    </div>
                    <div class="card-body">
                        <p class='fs-5'>Precio: <b>S/. ${precioSinDecimales} </b></p>
                        <p class='fs-5'>Stock: <b>${element.stock} </b></p>
                    </div>
                </div>
            </div>
        `;

            // Si se han agregado 4 tarjetas, cerrar la fila actual y comenzar una nueva
            if (contador % 4 === 0) {
                cardRow += '</div>'; // Cerrar la fila actual
                listaB.innerHTML += cardRow; // Agregar la fila al contenedor
                cardRow = '<div class="row">'; // Iniciar una nueva fila
            }
            contador++;
        });

        // Si queda alguna fila sin cerrar, ciérrala
        if (contador % 4 !== 1) {
            cardRow += '</div>';
            listaB.innerHTML += cardRow;
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Función para listar los platos
function listarP() {
    const parametrosURL = new URLSearchParams();
    parametrosURL.append("op", "listarPlatos");

    fetch('../controller/plato.php', {
        method: 'POST',
        body: parametrosURL
    })
    .then(respuesta => respuesta.json())
    .then(data => {
        let contador = 1;
        let cardRow = '<div class="row">'; // Iniciar una nueva fila de tarjetas

        data.forEach(element => {
            const estado = element.estado == 1 ? 'Activo' : element.estado == 0 ? 'Inactivo' : element.estado;
            // Formatear el precio con dos decimales fijos
            const precioSinDecimales = parseFloat(element.precio).toString();
            
            // Agregar una tarjeta a la fila actual
            cardRow += `
                <div class='col-md-3 p-3'>
                    <div class="card card-hover border-success" onclick='pedirP(${element.idplato})'>
                        <div class='card-header text-bg-success'>
                            <p class='fs-5'><b>${element.plato}</b> </p>
                        </div>
                        <div class="card-body">
                            <p class='fs-5'>Precio: <b>S/. ${precioSinDecimales} </b></p>
                            <p class='fs-5'>Estado: <span class='badge rounded-pill bg-success'>${estado}</td></p>
                        </div>
                    </div>
                </div>
            `;

            // Si se han agregado 4 tarjetas, cerrar la fila actual y comenzar una nueva
            if (contador % 4 === 0) {
                cardRow += '</div>'; // Cerrar la fila actual
                listaP.innerHTML += cardRow; // Agregar la fila al contenedor
                cardRow = '<div class="row">'; // Iniciar una nueva fila
            }
            contador++;
        });

        // Si queda alguna fila sin cerrar, ciérrala
        if (contador % 4 !== 1) {
            cardRow += '</div>';
            listaP.innerHTML += cardRow;
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Función para cambiar a la vista de platos
function limpiarB() {
    listaB.classList.add('d-none');
    listaP.classList.remove('d-none');
}

// Funciñon para cambiar a la vista de bebidas
function limpiarP() {
    listaB.classList.remove('d-none');
    listaP.classList.add('d-none');
}

// Función que abre el modal de carrito de ventas
function abrirCarrito(){
    const modalCarrito = document.querySelector("#modal-carrito");
    const bootstrapModal = new bootstrap.Modal(modalCarrito);
    bootstrapModal.show();
    total();
}

// Función que le aumenta un numero al carrito
function numerarPedidos() {
    const tablaCarrito = document.querySelector("#tabla-carrito");
    const tbodyC = tablaCarrito.querySelector("tbody");
    const filasExistente = tbodyC.querySelectorAll("tr");
    const carritoCantidad = document.getElementById("carritoCantidad");
    let contador = 1;

    for (let i = 0; i < filasExistente.length; i++) {
        const fila = filasExistente[i];
        const cantidad = parseInt(fila.querySelector("td:nth-child(6)").textContent);

        if (!isNaN(cantidad)) {
            contador += cantidad;
        }
    }

    console.log(contador);
    // Actualiza el elemento HTML con el contador
    carritoCantidad.textContent = contador;
}


let contadorC = 1;

// Función para anotar la bebida al carrito

function pedirB(id) {
    const tablaCarrito = document.querySelector("#tabla-carrito");
    const tbodyC = tablaCarrito.querySelector("tbody");
    const parametros = new URLSearchParams();
    parametros.append("op", "obtener");
    parametros.append("idbebida", id);

    let idfila = parseInt(id); // Convertir id a número entero
    let filasExistente = tbodyC.querySelectorAll("tr");
    
    for (let i = 0; i < filasExistente.length; i++) {
        let fila = filasExistente[i];
        let idExistente = parseInt(fila.querySelector("td:nth-child(2)").textContent);
        let tipoComida = fila.querySelector("td:nth-child(3)").textContent;

        if (idExistente === idfila && tipoComida === "Bebida") {
            numerarPedidos();
            // Si ya existe una fila, actualiza la cantidad y el total
            let cantidadElement = fila.querySelector("td:nth-child(6)");
            let totalElement = fila.querySelector("td:nth-child(7)");
            let cantidad = parseInt(cantidadElement.textContent) + 1;
            cantidadElement.textContent = cantidad;
            totalElement.textContent = cantidad * parseFloat(fila.querySelector("td:nth-child(5)").textContent);
            return; // Salir de la función si ya se actualizó la fila
        }
    }
    

    // Si no existe una fila, agrega una nueva fila
    fetch(`../controller/bebida.php`, {
        method: 'POST',
        body: parametros
    })
    .then(respuesta => respuesta.json())
    .then(datos => {
        numerarPedidos();
        const precioSinDecimales = parseFloat(datos.precio).toString();
        let cantidad = 1;
        let total1 = cantidad * precioSinDecimales;
        let nuevaFila = `
            <tr>
                <td data-label='#'>${contadorC}</td>
                <td class='d-none'>${datos.idbebida}</td>
                <td class='d-none'>Bebida</td>
                <td data-label='Comida'>${datos.bebida}</td>
                <td data-label='Precio'>${precioSinDecimales}</td>
                <td data-label='Cantidad'>${cantidad}</td>
                <td data-label='Total'>${total1}</td>
            </tr>
        `;
        tbodyC.innerHTML += nuevaFila;
        contadorC++;
    });
}

// Función para anotar el plato en el carrito
function pedirP(id) {
    const tablaCarrito = document.querySelector("#tabla-carrito");
    const tbodyC = tablaCarrito.querySelector("tbody");
    const parametros = new URLSearchParams();
    parametros.append("op", "obtener");
    parametros.append("idplato", id);

    const idfila = parseInt(id); // Convertir id a número entero
    const filasExistente = tbodyC.querySelectorAll("tr");
    
    for (let i = 0; i < filasExistente.length; i++) {
        numerarPedidos();
        const fila = filasExistente[i];
        const idExistente = parseInt(fila.querySelector("td:nth-child(2)").textContent);
        const tipoComida = fila.querySelector("td:nth-child(3)").textContent;

        if (idExistente === idfila && tipoComida === "Comida") {
            // Si ya existe una fila, actualiza la cantidad y el total
            const cantidadElement = fila.querySelector("td:nth-child(6)");
            const totalElement = fila.querySelector("td:nth-child(7)");
            let cantidad = parseInt(cantidadElement.textContent) + 1;
            cantidadElement.textContent = cantidad;
            totalElement.textContent = cantidad * parseFloat(fila.querySelector("td:nth-child(5)").textContent);
            return;
        }
    }

    // Si no existe una fila, agrega una nueva fila
    fetch(`../controller/plato.php`, {
        method: 'POST',
        body: parametros
    })
    .then(respuesta => respuesta.json())
    .then(datos => {
        numerarPedidos();
        const precioSinDecimales = parseFloat(datos.precio).toString();
        let cantidad = 1;
        let total1 = cantidad * precioSinDecimales;
        let nuevaFila = `
            <tr>
                <td data-label='#'>${contadorC}</td>
                <td class='d-none'>${datos.idplato}</td>
                <td class='d-none'>Comida</td>
                <td data-label='Comida'>${datos.plato}</td>
                <td data-label='Precio'>${precioSinDecimales}</td>
                <td data-label='Cantidad'>${cantidad}</td>
                <td data-label='Total'>${total1}</td>
            </tr>
        `;
        tbodyC.innerHTML += nuevaFila;
        contadorC++;
    });
    total();
}

// Función para calcular el total
function total() {
    let labelTotal = document.querySelector("#total");
    const tablaCarrito = document.querySelector("#tabla-carrito");
    const tbodyC = tablaCarrito.querySelector("tbody");
    const filasExistente = tbodyC.querySelectorAll("tr");
    let sumaTotal = 0; // Inicializar la suma total

    // Recorrer todas las filas y sumar el valor de la columna 7 (última columna)
    for (let i = 0; i < filasExistente.length; i++) {
        const fila = filasExistente[i];
        const valorColumna7 = parseFloat(fila.querySelector("td:nth-child(7)").textContent); // Cambiado a parseFloat

        // Verificar si el valor es un número válido antes de sumarlo
        if (!isNaN(valorColumna7)) {
            sumaTotal += valorColumna7;
        }
    }

    // Actualizar el valor del input de tipo número
    labelTotal.value = sumaTotal.toFixed(2); // Redondear a 2 decimales y asignar el valor
}

// Función para registrar el pedido de las bebidas
function pedidoB() {
    const tablaCarrito = document.querySelector("#tabla-carrito");
    const filasExistente = tablaCarrito.querySelectorAll("tbody tr");
    
    // Crear un array para almacenar los objetos JSON
    const pedidoArray = [];
    
    // Recorrer las filas de la tabla
    for (let i = 0; i < filasExistente.length; i++) {
        const fila = filasExistente[i];
        const tipoComida = fila.querySelector("td:nth-child(3)").textContent;
        
        // Verificar si la fila es de tipo "Bebida"
        if (tipoComida === "Bebida") {
            const idbebida = fila.querySelector("td:nth-child(2)").textContent;
            const cantidad = fila.querySelector("td:nth-child(6)").textContent;
            
            // Crear un objeto JSON con los datos de la fila actual
            const pedidoItem = {
                "idbebida": idbebida,
                "cantidad": cantidad
            };
            
            // Agregar el objeto al array
            pedidoArray.push(pedidoItem);
        }
    }
    
    // Convertir el array a formato JSON
    const pedidoJSON = JSON.stringify(pedidoArray);
    
    // Realizar la solicitud POST con los datos JSON
    const parametros = new URLSearchParams();
    parametros.append("op", "pedidoB");
    parametros.append("listabebida", pedidoJSON);
    
    fetch('../controller/venta.php', {
        method: 'POST',
        body: parametros
    })
    .then(respuesta => {
        if (respuesta.ok) {
        } else {
            throw new Error('Error en la solicitud');
        }
    })
    .catch(error => {
        console.error(error);
        // Manejar el error aquí
    });
}

// Función para registrar el pedido de los platos
function pedidoP() {
    const tablaCarrito = document.querySelector("#tabla-carrito");
    const filasExistente = tablaCarrito.querySelectorAll("tbody tr");
    
    // Crear un array para almacenar los objetos JSON
    const pedidoArray = [];
    
    // Recorrer las filas de la tabla
    for (let i = 0; i < filasExistente.length; i++) {
        const fila = filasExistente[i];
        const tipoComida = fila.querySelector("td:nth-child(3)").textContent;
        
        // Verificar si la fila es de tipo "Bebida"
        if (tipoComida === "Comida") {
            const idplato = fila.querySelector("td:nth-child(2)").textContent;
            const cantidad = fila.querySelector("td:nth-child(6)").textContent;
            
            // Crear un objeto JSON con los datos de la fila actual
            const pedidoItem = {
                "idplato": idplato,
                "cantidad": cantidad
            };
            
            // Agregar el objeto al array
            pedidoArray.push(pedidoItem);
        }
    }
    
    // Convertir el array a formato JSON
    const pedidoJSON = JSON.stringify(pedidoArray);
    
    // Realizar la solicitud POST con los datos JSON
    const parametros = new URLSearchParams();
    parametros.append("op", "pedidoP");
    parametros.append("listaplato", pedidoJSON);
    
    fetch('../controller/venta.php', {
        method: 'POST',
        body: parametros
    })
    .then(respuesta => {
        if (respuesta.ok) {
            
        } else {
            throw new Error('Error en la solicitud');
        }
    })
    .catch(error => {
        console.error(error);
        // Manejar el error aquí
    });
}

// Función para registrar la venta
function caja() {
    const tablaCarrito = document.querySelector("#tabla-carrito");
    const filasExistente = tablaCarrito.querySelectorAll("tbody tr");
    let comida = 0;
    let bebida = 0;
    let pedidoPRealizado = false;
    let pedidoBRealizado = false;

    // Recorrer las filas de la tabla
    for (let i = 0; i < filasExistente.length; i++) {
        const fila = filasExistente[i];
        const tipoComida = fila.querySelector("td:nth-child(3)").textContent;

        // Verificar si la fila es de tipo "Comida"
        if (tipoComida === "Comida" && !pedidoPRealizado) {
            pedidoP();
            pedidoPRealizado = true;
            comida = 1;
        }

        // Verificar si la fila es de tipo "Bebida"
        if (tipoComida === "Bebida" && !pedidoBRealizado) {
            pedidoB();
            pedidoBRealizado = true;
            bebida = 1;
        }
    }

    let total = document.querySelector("#total").value;

    if (total > 0) {
        // Si hay bebidas y comidas en la lista
        if (comida !== 0 && bebida !== 0) {
            Swal.fire({
                icon: 'question',
                title: 'Confirmación',
                text: '¿Está seguro de los datos ingresados?',
                showCancelButton: true,
                confirmButtonText: 'Si',
                cancelButtonText: 'No',
            })
            .then((result) => {
                if (result.isConfirmed) {
                    console.log("VENTA COMPLETA");
                    ventaCompleta(total);
                }
            });
        }

        // Si solo hay bebidas en la lista
        if (comida === 0) {
            Swal.fire({
                icon: 'question',
                title: 'Confirmación',
                text: '¿Está seguro de los datos ingresados?',
                showCancelButton: true,
                confirmButtonText: 'Si',
                cancelButtonText: 'No',
            })
            .then((result) => {
                if (result.isConfirmed) {
                    console.log("VENTA BEBIDA");
                    ventaBebida(total);
                }
            });
            
        }

        // Si solo hay comidas en la lista
        if (bebida === 0) {
            Swal.fire({
                icon: 'question',
                title: 'Confirmación',
                text: '¿Está seguro de los datos ingresados?',
                showCancelButton: true,
                confirmButtonText: 'Si',
                cancelButtonText: 'No',
            })
            .then((result) => {
                if (result.isConfirmed) {
                    console.log("VENTA COMIDA");
                    ventaComida(total);
                }
            });
        }
    }else{
        Swal.fire({
            icon: 'warning',
            title: 'Lista Vacía',
            text: 'Por favor selecciona un producto.',
        });
        return;
    }
}

// Función para registrar la venta completa(bebida + plato)
function ventaCompleta(total){
    console.log("VENTA COMPLETA");
        // Obtener el id de pedido_plato
        parametrosP = new URLSearchParams();
        parametrosP.append("op", "listarPP");
        fetch('../controller/venta.php', {
            method: 'POST',
            body: parametrosP
        })
        .then(respuesta => respuesta.json())
        .then(datos => {
            const idPP = datos.idpedidoP;

            // Obtener el id de pedido_bebida
            parametrosB = new URLSearchParams();
            parametrosB.append("op", "listarPB");
            fetch('../controller/venta.php', {
                method: 'POST',
                body: parametrosB
            })
            .then(respuesta => respuesta.json())
            .then(datos => {
                const idPB = datos.idpedidoB;
                parametros = new URLSearchParams();
                parametros.append("op", "vender");
                parametros.append("idpedidoP", idPP);
                parametros.append("idpedidoB", idPB);
                parametros.append("total", total);
                fetch('../controller/venta.php', {
                    method: 'POST',
                    body: parametros
                })
                .then(respuesta => {
                    if (respuesta.ok) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Venta Realizada',
                            html: 'Se ha registrado la venta'
                        }).then(() => {
                            obtenerBebidas(idPB);
                        });
                    } else {
                        throw new Error('Error en la solicitud');
                    }
                })
                .catch(error => {
                    console.error(error);
                });
            });
        });
}

// Función para registrar la venta (solo bebida)
function ventaBebida(total) {
    // Obtener el id de pedido_plato
    const parametrosB = new URLSearchParams();
    parametrosB.append("op", "listarPB");
    fetch('../controller/venta.php', {
        method: 'POST',
        body: parametrosB
    })
    .then(respuesta => respuesta.json())
    .then(datos => {
        const idPB = datos.idpedidoB;
        const parametros = new URLSearchParams();
        parametros.append("op", "ventaB");
        parametros.append("idpedidoB", idPB);
        parametros.append("total", total);
        fetch('../controller/venta.php', {
            method: 'POST',
            body: parametros
        })
        .then(respuesta => {
            if (respuesta.ok) {
                Swal.fire({
                    icon: 'success',
                    title: 'Bebida vendida',
                    html: 'Se ha registrado la venta'
                }).then(() => {
                    obtenerBebidas(idPB);
                });
            } else {
                throw new Error('Error en la solicitud');
            }
        })
        .catch(error => {
            console.error(error);
        });
    });
}

// Función para obtener el stock de la bebida a la cual se le desminuirá un stock
function obtenerBebidas(idpedidoB) {
    const parametros = new URLSearchParams();
    parametros.append("op", "obtenerPB");
    parametros.append("idpedidoB", idpedidoB);
    fetch('../controller/venta.php', {
        method: 'POST',
        body: parametros
    })
    .then(respuesta => respuesta.json())
    .then(datos => {
        datos.forEach(element => {
            console.log(element.idbebida);
            console.log(element.cantidad);
            quitarStock(element.idbebida, element.cantidad);
        });
    })
}

// Función para quitar stocks a las bebidas que se vendan
function quitarStock(idbebida, cantidad) {
    const parametrosB = new URLSearchParams();
    parametrosB.append("op", "quitarStock")
    parametrosB.append("idbebida", idbebida)
    parametrosB.append("cantidad", cantidad)
    fetch('../controller/bebida.php', {
        method: 'POST',
        body: parametrosB
    })
    .then(respuesta => {
        if (respuesta.ok) {
            console.log("STOCK ACTUALIZADO")
            location.reload();
        } else {
            throw new Error('Error en la solicitud');
        }
    })
    .catch(error => {
        console.error(error);
    });
}

// Función para registrar la venta(solo plato)
function ventaComida(total) {
    // Obtener el id de pedido_plato
    parametrosB = new URLSearchParams();
    parametrosB.append("op", "listarPP");
    fetch('../controller/venta.php', {
        method: 'POST',
        body: parametrosB
    })
    .then(respuesta => respuesta.json())
    .then(datos => {
        const idPP = datos.idpedidoP;
        parametros = new URLSearchParams();
        parametros.append("op", "ventaP");
        parametros.append("idpedidoP", idPP);
        parametros.append("total", total);
        fetch('../controller/venta.php', {
            method: 'POST',
            body: parametros
        })
        .then(respuesta => {
            if (respuesta.ok) {
                Swal.fire({
                    icon: 'success',
                    title: 'Plato vendido',
                    html: 'Se ha registrado la venta'
                })
                location.reload();
            } else {
                throw new Error('Error en la solicitud');
            }
        })
        .catch(error => {
            console.error(error);
        });
    });
}

// Función inicial para poder quitar las bebidas que no tengan stock
function quitarBebidasSinStock() {
    const params = new URLSearchParams();
    params.append("op", "desahabilitarBebida");
    fetch("../controller/bebida.php", {
        method: 'POST',
        body: params
    })
    .then(respuesta => respuesta)
}

const btnVistaB = document.querySelector("#bebidas-vista");
btnVistaB.addEventListener("click", limpiarP);
const btnVistaP = document.querySelector("#platos-vista");
btnVistaP.addEventListener("click", limpiarB);

const btnCarrito = document.querySelector("#carrito");
btnCarrito.addEventListener("click", abrirCarrito);

const btnVenta = document.querySelector("#realizar-venta");
btnVenta.addEventListener("click", caja);

quitarBebidasSinStock();
listarB();
listarP();
