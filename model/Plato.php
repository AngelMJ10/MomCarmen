<?php

    require_once 'Conexion.php';

    class Plato extends Conexion {
        private $conexion;

        public function __construct()
        {
            $this->conexion = parent::getConexion();
        }

        public function listarPLatos(){
            try {
                $query = "SELECT * FROM platos WHERE estado = 1";
                $consulta = $this->conexion->prepare($query);
                $consulta->execute();
                $datos = $consulta->fetchAll(PDO::FETCH_ASSOC);
                return $datos;
            } catch (Exception $e) {
                die($e->getMessage());
            }
        }

        public function buscar($data = []){
            try {
                $query = "CALL buscarPlato(?,?,?)";
                $consulta = $this->conexion->prepare($query);
                $consulta->execute(array(
                    $data['plato'],
                    $data['precio'],
                    $data['estado']
                ));
                $datos = $consulta->fetchAll(PDO::FETCH_ASSOC);
                return $datos;
            } catch (Exception $e) {
                die($e->getMessage());
            }
        }

        public function registrar($data = []){
            try {
                $query = "INSERT INTO platos(plato,precio) values(?,?)";
                $consulta = $this->conexion->prepare($query);
                $consulta->execute(array(
                    $data['plato'],
                    $data['precio']
                ));
            } catch (Exception $e) {
                die($e->getMessage());
            }
        }

        public function editar($data = []){
            try {
                $query = "CALL editarPlato(?,?,?,?)";
                $consulta = $this->conexion->prepare($query);
                $consulta->execute(array(
                    $data['idplato'],
                    $data['plato'],
                    $data['precio'],
                    $data['estado'],
                ));
            } catch (Exception $e) {
                die($e->getMessage());
            }
        }

        public function obtener($data = []){
            try {
                $query = "SELECT * FROM platos WHERE idplato = ?";
                $consulta = $this->conexion->prepare($query);
                $consulta->execute(array($data['idplato']));
                $datos = $consulta->fetch(PDO::FETCH_ASSOC);
                return $datos;
            } catch (Exception $e) {
                die($e->getMessage());
            }
        }

    }

?>