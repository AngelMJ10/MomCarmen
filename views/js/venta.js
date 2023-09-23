const tablaVenta = document.querySelector("#tabla-venta");
const tbody = tablaVenta.querySelector("tbody");

// Modal
const modalVenta = document.querySelector("#modal-venta");
const tablaDatos = document.querySelector("#tabla-datos");
const tbodyD = tablaDatos.querySelector("tbody");
let tbodyDatos = "";
let contadorDatos = 1;
function listar(){
    const parametros = new URLSearchParams();
    parametros.append("op", "listar");
    fetch('../controller/venta.php', {
        method: 'POST',
        body: parametros
    })
    .then(respuesta => respuesta.json())
    .then(datos => {
        let tbodyV = "";
        let contador = 1;
        datos.forEach(element => {
            const fechaCreate = new Date(element.fecha_creacion);
            const fecha = fechaCreate.toISOString().split('T')[0];
            const horaCreate = new Date(element.fecha_creacion);
            const hora = `${horaCreate.getHours()}:${horaCreate.getMinutes()}:${horaCreate.getSeconds()}`;
            const total = parseFloat(element.total).toString();
            tbodyV += `
                <tr ondblclick='obtener(${element.idventa}, ${total})'>
                    <td data-label='#'>${contador}</td>
                    <td data-label='Usuario'>${element.usuario}</td>
                    <td data-label='Fecha'>${fecha}</td>
                    <td data-label='Hora'>${hora}</td>
                    <td data-label='Total'>S/ ${total}</td>
                </tr>
            `;
            contador++;
        });
        tbody.innerHTML = tbodyV;
    })
}

function obtener(id, total) {
    const totalLabel = document.querySelector("#total-venta");
    const parametros = new URLSearchParams();
    parametros.append("op", "obtener");
    parametros.append("idventa", id);

    fetch('../controller/venta.php', {
        method: 'POST',
        body: parametros
    })
    .then(respuesta => respuesta.json())
    .then(datos => {
        contadorDatos = 1;
        tbodyDatos = "";
        const bootstrapModal = new bootstrap.Modal(modalVenta);
        bootstrapModal.show();

        if (datos.bebidas) {
            datos.bebidas.forEach(bebida => {
                console.log(bebida.idbebida);
                obtenerBebida(bebida.idbebida, bebida.cantidad);
            });
        }

        if (datos.platos) {
            datos.platos.forEach(plato => {
                console.log(plato.idplato);
                obtenerPlato(plato.idplato, plato.cantidad);
            });
        }
        totalLabel.textContent = 'S/' + total;
    })
    .catch(error => {
        console.error("Error al obtener los datos de la venta:", error);
    });
}

function obtenerBebida(id, cantidad){
    const parametros = new URLSearchParams();
    parametros.append("op", "obtener");
    parametros.append("idbebida", id);
    fetch('../controller/bebida.php', {
        method: 'POST',
        body:   parametros
    })
    .then(respuesta => respuesta.json())
    .then(datos => {
        let total = datos.precio * cantidad;
        tbodyDatos +=`
            <tr>
                <td data-label='#'>${contadorDatos}</td>
                <td data-label='Bebida'>${datos.bebida}</td>
                <td data-label='Precio'>${datos.precio}</td>
                <td data-label='Cantidad'>${cantidad}</td>
                <td data-label='Total'>${total}</td>
            </tr>
        `;
        tbodyD.innerHTML = tbodyDatos;
        contadorDatos++;
        });
}

function obtenerPlato(id, cantidad){
    const parametros = new URLSearchParams();
    parametros.append("op", "obtener");
    parametros.append("idplato", id);
    fetch('../controller/plato.php', {
        method: 'POST',
        body:   parametros
    })
    .then(respuesta => respuesta.json())
    .then(datos => {
        let total = datos.precio * cantidad;
        tbodyDatos +=`
            <tr>
                <td data-label='#'>${contadorDatos}</td>
                <td data-label='Bebida'>${datos.plato}</td>
                <td data-label='Precio'>${datos.precio}</td>
                <td data-label='Cantidad'>${cantidad}</td>
                <td data-label='Total'>${total}</td>
            </tr>
        `;
        tbodyD.innerHTML = tbodyDatos;
        contadorDatos++;
        });
}

listar();