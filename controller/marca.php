<?php
    session_start();
    require_once '../model/Marca.php';

    if (isset($_POST['op'])) {
        $marca = new Marca();

        if ($_POST['op'] == 'listar') {
            $datos = $marca->listar();
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

    }

?>