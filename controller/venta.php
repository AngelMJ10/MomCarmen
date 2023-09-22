<?php
    session_start();
    require_once '../model/Venta.php';
    require_once '../model/Bebida.php';
    require_once '../model/Plato.php';

    if (isset($_POST['op'])) {
        $venta = new Venta();
        $bebida = new Bebida();
        $plato = new Plato();

        if ($_POST['op'] == 'listar') {
            $datos = $venta->listar();
            echo json_encode($datos);
        }

        // Para obtener los IDS de las bebidas y platos de la venta
        if ($_POST['op'] == 'obtener') {
            $idventa = ["idventa" => $_POST['idventa']];
            $datos = $venta->obtener($idventa);
            $listabebidaArray = json_decode($datos['listabebida'], true);
            $datosBebidas = array();
            foreach ($listabebidaArray as $item) {
                $idbebida = $item['idbebida'];
                $cantidad = $item['cantidad'];
                $datosBebidas[] = array(
                    "idbebida" => $idbebida,
                    "cantidad" => $cantidad,
                );
            }
            $jsonDesglosado = json_encode($datosBebidas);
            echo $jsonDesglosado;

            $datosPlatos = array();
            foreach ($listabebidaArray as $item) {
                $idbebida = $item['idbebida'];
                $cantidad = $item['cantidad'];
                $datosPlatos[] = array(
                    "idplato" => $idbebida,
                    "cantidad" => $cantidad,
                );
            }
            $newjson = json_encode($datosPlatos);
            echo $newjson;
        }

        if ($_POST['op'] == 'obtenerPB') {
            $idpedidoB = ["idpedidoB" => $_POST['idpedidoB']];
            $datos = $venta->obtenerPB($idpedidoB);
        
            // Decodificar la cadena JSON en un array asociativo de PHP
            $listabebidaArray = json_decode($datos['listabebida'], true);
        
            // Crear un nuevo array para los datos desglosados
            $datosDesglosados = array();
            foreach ($listabebidaArray as $item) {
                $idbebida = $item['idbebida'];
                $cantidad = $item['cantidad'];
        
                // Agregar los datos desglosados al nuevo array
                $datosDesglosados[] = array(
                    "idbebida" => $idbebida,
                    "cantidad" => $cantidad
                );
            }
        
            // Codificar el nuevo array como JSON
            $jsonDesglosado = json_encode($datosDesglosados);
        
            // Enviar el JSON como respuesta
            echo $jsonDesglosado;
        }

        if ($_POST['op'] == 'listarPB') {
            $datos = $venta->listarPB();
            echo json_encode($datos);
        }

        if ($_POST['op'] == 'listarPP') {
            $datos = $venta->listarPP();
            echo json_encode($datos);
        }

        if ($_POST['op'] == 'pedidoB') {
            $data = [
                        "idusuario"   => $_SESSION['idusuario'],
                        "listabebida"    => $_POST['listabebida']
                    ];
            $datos = $venta->pedidoB($data);
        }

        if ($_POST['op'] == 'pedidoP') {
            $data = [
                        "idusuario"   => $_SESSION['idusuario'],
                        "listaplato"    => $_POST['listaplato']
                    ];
            $datos = $venta->pedidoP($data);
        }

        if ($_POST['op'] == 'vender') {
            $data = [
                "idpedidoP"         => $_POST['idpedidoP'],
                "idpedidoB"         => $_POST['idpedidoB'],
                "total"             => $_POST['total'],
                "idusuario"         => $_SESSION['idusuario']
            ];
            $datos = $venta->vender($data);
        }

        if ($_POST['op'] == 'ventaP') {
            $data = [
                "idpedidoP"         => $_POST['idpedidoP'],
                "total"             => $_POST['total'],
                "idusuario"         => $_SESSION['idusuario']
            ];
            $datos = $venta->ventaP($data);
        }

        if ($_POST['op'] == 'ventaB') {
            $data = [
                "idpedidoB"         => $_POST['idpedidoB'],
                "total"             => $_POST['total'],
                "idusuario"         => $_SESSION['idusuario']
            ];
            $datos = $venta->ventaB($data);
        }

    }

?>