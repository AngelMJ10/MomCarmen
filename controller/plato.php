<?php
    session_start();
    require_once '../model/Plato.php';

    if (isset($_POST['op'])) {
        $plato = new Plato();

        if ($_POST['op'] == 'listarPlatos') {
            $datos = $plato->listarPLatos();
            echo json_encode($datos);
        }

        if ($_POST['op'] == 'buscar') {
            $data = [
                        "plato"        => $_POST['plato'],
                        "precio"        => $_POST['precio'],
                        "estado"        => $_POST['estado']
                    ];
            $datos = $plato->buscar($data);
            echo json_encode($datos);
        }

        if ($_POST['op'] == 'obtener') {
            $idplato = ["idplato"  => $_POST['idplato']];
            $datos = $plato->obtener($idplato);
            echo json_encode($datos);
        }

        if ($_POST['op'] == 'registrar') {
            $data = [
                        "plato" => $_POST['plato'],
                        "precio" => $_POST['precio']
                    ];
            $datos = $plato->registrar($data);
        }

        if ($_POST['op'] == 'editar') {
            $data = [
                        "idplato"   => $_POST['idplato'],
                        "plato"     => $_POST['plato'],
                        "precio"    => $_POST['precio'],
                        "estado"    => $_POST['estado']
                    ];
            $datos = $plato->editar($data);
        }

    }

?>