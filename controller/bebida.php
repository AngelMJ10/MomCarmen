<?php
    session_start();
    require_once '../model/Bebida.php';

    if (isset($_POST['op'])) {
        $bebida = new Bebida();

        if ($_POST['op'] == 'listar') {
            $datos = $bebida->listar();
            echo json_encode($datos);
        }

        if ($_POST['op'] == 'obtener') {
            $idbebida = ["idbebida"  => $_POST['idbebida']];
            $datos = $bebida->obtener($idbebida);
            echo json_encode($datos);
        }

        if ($_POST['op'] == 'registrar') {
            $data = [
                        "idmarca"   => $_POST['idmarca'],
                        "bebida"    => $_POST['bebida'],
                        "precio"    => $_POST['precio'],
                        "stock"     => $_POST['stock']
                    ];
            $datos = $bebida->registrar($data);
        }

        if ($_POST['op'] == 'editar') {
            $data = [
                        "idbebida"      => $_POST['idbebida'],
                        "idmarca"       => $_POST['idmarca'],
                        "bebida"        => $_POST['bebida'],
                        "precio"        => $_POST['precio'],
                        "stock"         => $_POST['stock'],
                        "estado"        => $_POST['estado']
                    ];
            $datos = $bebida->editar($data);
        }

        if ($_POST['op'] == 'buscar') {
            $data = [
                        "idmarca"       => $_POST['idmarca'],
                        "bebida"        => $_POST['bebida'],
                        "precio"        => $_POST['precio'],
                        "stock"         => $_POST['stock'],
                        "estado"        => $_POST['estado']
                    ];
            $datos = $bebida->buscar($data);
            echo json_encode($datos);
        }

        if ($_POST['op'] == 'quitarStock') {
            $idbebida = ["idbebida"  => $_POST['idbebida']];
            $datosB = $bebida->obtener($idbebida);
            $cantidad = $_POST['cantidad'];
            $newStock = $datosB['stock'] - $cantidad;
            $datos = [
                "idbebida" => $_POST['idbebida'],
                "stock" => $newStock
            ];
            $bebida->quitarStockB($datos);
        }

        if ($_POST['op'] == 'desahabilitarBebida') {
            $datosBebida = $bebida->sinStock();
            foreach ($datosBebida as $registro) {
                $datos = ["idbebida" => $registro['idbebida']];
                $bebida->updateStock($datos);
            }
        }

    }

?>