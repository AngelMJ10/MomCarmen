const tablaP = document.querySelector("#tabla-plato");
const tbodyP = tablaP.querySelector("tbody");
let idplato = 0 ;

function listar(){
    const parametrosURL = new URLSearchParams();
    parametrosURL.append("op", "listarPlatos");

    fetch('../controller/plato.php',{
        method: 'POST',
        body: parametrosURL 
    })
    .then(respuesta => respuesta.json())
    .then(data =>{
        let tbody = "";
        let contador = 1;
        data.forEach(element => {
            const fechaCreate = new Date(element.fecha_creacion);
            const fecha = fechaCreate.toISOString().split('T')[0];
            const estado = element.estado == 1 ? 'Activo' : element.estado == 0 ? 'Inactivo' : element.estado;
            // Formatear el precio con dos decimales fijos
            const precioSinDecimales = parseFloat(element.precio).toString();
            tbody += `
                <tr>
                    <td data-label='#'>${contador}</td>
                    <td data-label='Plato'>${element.plato}</td>
                    <td data-label='Precio'>S/. ${precioSinDecimales}</td>
                    <td data-label='Fecha'>${fecha}</td>
                    <td data-label='Estado'><span class='badge rounded-pill' style='background-color: #005478'>${estado}</td>
                    <td data-label='Acciones'>
                        <a class='btn btn-sm btn-outline-success'
                            title='Clic,para editar el plato' onclick='obtener(${element.idplato})'>
                            <i class="fa-regular fa-pen-to-square"></i>
                        </a>
                        <a class='btn btn-sm btn-outline-danger'
                            title='Clic,para eliminar la lectura'>
                            <i class="fa-solid fa-trash"></i>
                        </a>
                    </td>
                </tr>
            `;
            contador++;
        });
        tbodyP.innerHTML = tbody;
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function registrar(){
    const txtPlato = document.querySelector("#plato");
    const IntPrecio = document.querySelector("#precio");
    Swal.fire({
        icon: 'question',
        title: 'Confirmación',
        text: '¿Está seguro de los datos ingresados?',
        showCancelButton: true,
        confirmButtonText: 'Si',
        cancelButtonText: 'No',
    }).then((result) => {
        if (result.isConfirmed) {
            const parametros = new URLSearchParams();
            parametros.append("op", "registrar");
            parametros.append("plato", txtPlato.value);
            parametros.append("precio", IntPrecio.value);
            fetch('../controller/plato.php', {
                method: 'POST',
                body: parametros
            })
            .then(respuesta =>{
                if(respuesta.ok){
                    Swal.fire({
                        icon: 'success',
                        title: 'Plato registrado',
                        html: `El plato <b>${txtPlato.value}</b> se ha registrado correctamente.`
                    }).then(() => {
                        location.reload();
                    });
                } else{
                    throw new Error('Error en la solicitud');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                Swal.alert({
                    icon: 'Error',
                    title: 'Error al registrar el plato',
                    text: 'Ocurrió un error al registrar el plato. Por favor intentelo nuevamente.'
                })
            });
        }
    });
}

function obtener(id) {
    const txtPlato = document.querySelector("#plato-editar");
    const txtprecio = document.querySelector("#precio-editar");
    const txtestadp = document.querySelector("#estado-editar");
    const modal = document.querySelector("#modal-editar");
    const bootstrapModal = new bootstrap.Modal(modal);
    bootstrapModal.show();
    idplato = id;
    const parametros = new URLSearchParams();
    parametros.append("op", "obtener");
    parametros.append("idplato", idplato);
    fetch("../controller/plato.php" , {
        method: 'POST',
        body: parametros
    })
    .then(respuesta => respuesta.json())
    .then(datos => {
        txtPlato.value = datos.plato;
        txtprecio.value = datos.precio;
        txtestadp.value = datos.estado;
    })
}

function editar(){
    const txtPlato = document.querySelector("#plato-editar");
    const txtprecio = document.querySelector("#precio-editar");
    const txtestadp = document.querySelector("#estado-editar");
    Swal.fire({
        icon: 'question',
        title: 'Confirmación',
        text: '¿Está seguro de modificar los siguientes datos?',
        showCancelButton: true,
        confirmButtonText: 'Si',
        cancelButtonText: 'No',
    }).then((result) => {
        if (result.isConfirmed) {
            const parametros = new URLSearchParams();
            parametros.append("op", "editar");
            parametros.append("idplato", idplato);
            parametros.append("plato", txtPlato.value);
            parametros.append("precio", txtprecio.value);
            parametros.append("estado", txtestadp.value);
            fetch('../controller/plato.php', {
                method: 'POST',
                body: parametros
            })
            .then(respuesta =>{
                if(respuesta.ok){
                    Swal.fire({
                        icon: 'success',
                        title: 'Plato editado',
                        html: `El plato <b>${txtPlato.value}</b> se ha actualizado correctamente.`
                    }).then(() => {
                        location.reload();
                    });
                } else{
                    throw new Error('Error en la solicitud');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                Swal.alert({
                    icon: 'Error',
                    title: 'Error al actualizar el plato',
                    text: 'Ocurrió un error al actualizar el plato. Por favor intentelo nuevamente.'
                })
            });
        }
    });
}

function buscar() {
    const txtPlato = document.querySelector("#plato-buscar");
    const txtPrecio = document.querySelector("#precio-buscar");
    const txtestado = document.querySelector("#estado-buscar");
    const parametros = new URLSearchParams();
    parametros.append("op", "buscar");
    parametros.append("plato", txtPlato.value);
    parametros.append("precio", txtPrecio.value);
    parametros.append("estado", txtestado.value);
    fetch('../controller/plato.php', {
        method: 'POST',
        body: parametros
    })
    .then(respuesta => respuesta.json())
    .then(datos =>{
        let tbody = "";
        let contador = 1;
        datos.forEach(element => {
            const fechaCreate = new Date(element.fecha_creacion);
            const fecha = fechaCreate.toISOString().split('T')[0];
            const estado = element.estado == 1 ? 'Activo' : element.estado == 0 ? 'Inactivo' : element.estado;
            // Formatear el precio con dos decimales fijos
            const precioSinDecimales = parseFloat(element.precio).toString();
            tbody += `
                <tr>
                    <td data-label='#'>${contador}</td>
                    <td data-label='Plato'>${element.plato}</td>
                    <td data-label='Precio'>S/. ${precioSinDecimales}</td>
                    <td data-label='Fecha'>${fecha}</td>
                    <td data-label='Estado'><span class='badge rounded-pill' style='background-color: #005478'>${estado}</td>
                    <td data-label='Acciones'>
                        <a class='btn btn-sm btn-outline-success'
                            title='Clic,para editar el plato' onclick='obtener(${element.idplato})'>
                            <i class="fa-regular fa-pen-to-square"></i>
                        </a>
                        <a class='btn btn-sm btn-outline-danger'
                            title='Clic,para eliminar la lectura'>
                            <i class="fa-solid fa-trash"></i>
                        </a>
                    </td>
                </tr>
            `;
            contador++;
        });
        tbodyP.innerHTML = tbody;
    })
}

const btnRegistrar = document.querySelector("#registrar-plato");
btnRegistrar.addEventListener("click" , registrar);
const btnEditar = document.querySelector("#editar-plato");
btnEditar.addEventListener("click" , editar);
const btnBuscar = document.querySelector("#buscar-plato");
btnBuscar.addEventListener("click", buscar);

listar();