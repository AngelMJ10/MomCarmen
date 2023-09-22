const tablaP = document.querySelector("#tabla-plato");
const tbodyP = tablaP.querySelector("tbody");
let idbebida = 0 ;

function listar(){
    const parametrosURL = new URLSearchParams();
    parametrosURL.append("op", "listar");

    fetch('../controller/bebida.php',{
        method: 'POST',
        body: parametrosURL 
    })
    .then(respuesta => respuesta.json())
    .then(data =>{
        let tbody = "";
        let contador = 1;
        data.forEach(element => {
            const estado = element.estado == 1 ? 'Activo' : element.estado == 0 ? 'Inactivo' : element.estado;
            // Formatear el precio con dos decimales fijos
            const precioSinDecimales = parseFloat(element.precio).toString();
            tbody += `
                <tr>
                    <td data-label='#'>${contador}</td>
                    <td data-label='Bebida'>${element.bebida}</td>
                    <td data-label='Marca'>${element.marca}</td>
                    <td data-label='Precio'>S/. ${precioSinDecimales}</td>
                    <td data-label='Marca'>${element.stock}</td>
                    <td data-label='Estado'><span class='badge rounded-pill' style='background-color: #005478'>${estado}</td>
                    <td data-label='Acciones'>
                        <a class='btn btn-sm btn-outline-success'
                            title='Clic,para editar el plato' onclick='obtener(${element.idbebida})'>
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

function listarMarcas() {
    const txtMarca = document.querySelector('#marca');
    const txtMarcaEdit = document.querySelector('#marca-editar');
    const txtMarcaBuscar = document.querySelector('#marca-buscar');
    const parametrosURL = new URLSearchParams();
    parametrosURL.append("op", "listar");

    fetch('../controller/marca.php',{
        method: 'POST',
        body: parametrosURL 
    })
    .then(respuesta => respuesta.json())
    .then(data =>{
        let options = "<option value='0'>Seleccione la marca</option>";
        data.forEach(element => {
            options += `
                <option value='${element.idmarca}'>${element.marca}</option>
            `;
        });
        txtMarca.innerHTML = options;
        txtMarcaEdit.innerHTML = options;
        txtMarcaBuscar.innerHTML = options;
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function registrar(){
    const txtMarca = document.querySelector('#marca');
    const txtBebida = document.querySelector("#bebida");
    const txtPrecio = document.querySelector("#precio");
    const txtStock = document.querySelector("#stock");
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
            parametros.append("idmarca", txtMarca.value);
            parametros.append("bebida", txtBebida.value);
            parametros.append("precio", txtPrecio.value);
            parametros.append("stock", txtStock.value);
            fetch('../controller/bebida.php', {
                method: 'POST',
                body: parametros
            })
            .then(respuesta =>{
                if(respuesta.ok){
                    Swal.fire({
                        icon: 'success',
                        title: 'Bebida registrada',
                        html: `La bebida <b>${txtBebida.value}</b> ha sido registrada correctamente.`
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
                    title: 'Error al registrar la bebida',
                    text: 'Ocurrió un error al registrar la beboda. Por favor intentelo nuevamente.'
                })
            });
        }
    });
}

function obtener(id) {
    const txtMarca = document.querySelector('#marca-editar');
    const txtBebida = document.querySelector("#bebida-editar");
    const txtPrecio = document.querySelector("#precio-editar");
    const txtStock = document.querySelector("#stock-editar");
    const txtestado = document.querySelector("#estado-editar");
    const modal = document.querySelector("#modal-editar");
    const bootstrapModal = new bootstrap.Modal(modal);
    bootstrapModal.show();
    idbebida = id;
    const parametros = new URLSearchParams();
    parametros.append("op", "obtener");
    parametros.append("idbebida", idbebida);
    fetch("../controller/bebida.php" , {
        method: 'POST',
        body: parametros
    })
    .then(respuesta => respuesta.json())
    .then(datos => {
        txtMarca.value = datos.idmarca;
        txtBebida.value = datos.bebida;
        txtPrecio.value = datos.precio;
        txtStock.value = datos.stock;
        txtestado.value = datos.estado;
    })
}

function editar(){
    const txtMarca = document.querySelector('#marca-editar');
    const txtBebida = document.querySelector("#bebida-editar");
    const txtPrecio = document.querySelector("#precio-editar");
    const txtStock = document.querySelector("#stock-editar");
    const txtestado = document.querySelector("#estado-editar");
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
            parametros.append("idbebida", idbebida);
            parametros.append("idmarca", txtMarca.value);
            parametros.append("bebida", txtBebida.value);
            parametros.append("precio", txtPrecio.value);
            parametros.append("stock", txtStock.value);
            parametros.append("estado", txtestado.value);
            fetch('../controller/bebida.php', {
                method: 'POST',
                body: parametros
            })
            .then(respuesta =>{
                if(respuesta.ok){
                    Swal.fire({
                        icon: 'success',
                        title: 'Bebida Actualizada',
                        html: `La bebida <b>${txtBebida.value}</b> ha sido actualizada correctamente.`
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
                    title: 'Error al actualizar la bebida',
                    text: 'Ocurrió un error al actualizar la bebida. Por favor intentelo nuevamente.'
                })
            });
        }
    });
}

function buscar() {
    const txtMarca = document.querySelector("#marca-buscar");
    const txtBebida = document.querySelector("#bebida-buscar");
    const txtPrecio = document.querySelector("#precio-buscar");
    const txtStock = document.querySelector("#stock-buscar");
    const txtestado = document.querySelector("#estado-buscar");
    const parametros = new URLSearchParams();
    parametros.append("op", "buscar");
    parametros.append("idmarca", txtMarca.value);
    parametros.append("bebida", txtBebida.value);
    parametros.append("precio", txtPrecio.value);
    parametros.append("stock", txtStock.value);
    parametros.append("estado", txtestado.value);
    fetch('../controller/bebida.php', {
        method: 'POST',
        body: parametros
    })
    .then(respuesta => respuesta.json())
    .then(datos => {
        let tbody = "";
        let contador = 1;
        datos.forEach(element => {
            const estado = element.estado == 1 ? 'Activo' : element.estado == 0 ? 'Inactivo' : element.estado;
            // Formatear el precio con dos decimales fijos
            const precioSinDecimales = parseFloat(element.precio).toString();
            tbody += `
                <tr>
                    <td data-label='#'>${contador}</td>
                    <td data-label='Bebida'>${element.bebida}</td>
                    <td data-label='Marca'>${element.marca}</td>
                    <td data-label='Precio'>S/. ${precioSinDecimales}</td>
                    <td data-label='Marca'>${element.stock}</td>
                    <td data-label='Estado'><span class='badge rounded-pill' style='background-color: #005478'>${estado}</td>
                    <td data-label='Acciones'>
                        <a class='btn btn-sm btn-outline-success'
                            title='Clic,para editar el plato' onclick='obtener(${element.idbebida})'>
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

const btnRegistrar = document.querySelector("#registrar-bebida");
btnRegistrar.addEventListener("click" , registrar);
const btnEditar = document.querySelector("#editar-bebida");
btnEditar.addEventListener("click" , editar);

const btnBuscar = document.querySelector("#buscar-bebida");
btnBuscar.addEventListener("click", buscar);

listar();
listarMarcas();