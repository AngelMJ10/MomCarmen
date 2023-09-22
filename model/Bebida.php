<?php

    require_once 'Conexion.php';

    class Bebida extends Conexion {
        private $conexion;

        public function __construct()
        {
            $this->conexion = parent::getConexion();
        }

        public function listar(){
            try {
                $query = "CALL listarBebidas()";
                $consulta = $this->conexion->prepare($query);
                $consulta->execute();
                $datos = $consulta->fetchAll(PDO::FETCH_ASSOC);
                return $datos;
            } catch (Exception $e) {
                die($e->getMessage());
            }
        }

        public function obtener($data = []){
            try {
                $query = "SELECT * FROM bebidas WHERE idbebida = ?";
                $consulta = $this->conexion->prepare($query);
                $consulta->execute(array($data['idbebida']));
                $datos = $consulta->fetch(PDO::FETCH_ASSOC);
                return $datos;
            } catch (Exception $e) {
                die($e->getMessage());
            }
        }

        public function registrar($data = []){
            try {
                $query = "INSERT INTO bebidas(idmarca,bebida,precio,stock) values(?,?,?,?)";
                $consulta = $this->conexion->prepare($query);
                $consulta->execute(array(
                    $data['idmarca'],
                    $data['bebida'],
                    $data['precio'],
                    $data['stock']
                ));
            } catch (Exception $e) {
                die($e->getMessage());
            }
        }

        public function buscar($data = []){
            try {
                $query = "CALL buscarBebida(?,?,?,?,?)";
                $consulta = $this->conexion->prepare($query);
                $consulta->execute(array(
                    $data['idmarca'],
                    $data['bebida'],
                    $data['precio'],
                    $data['stock'],
                    $data['estado']
                ));
                $datos = $consulta->fetchAll(PDO::FETCH_ASSOC);
                return $datos;
            } catch (Exception $e) {
                die($e->getMessage());
            }
        }

        public function editar($data = []){
            try {
                $query = "CALL editarBebida(?,?,?,?,?,?)";
                $consulta = $this->conexion->prepare($query);
                $consulta->execute(array(
                    $data['idbebida'],
                    $data['idmarca'],
                    $data['bebida'],
                    $data['precio'],
                    $data['stock'],
                    $data['estado']
                ));
            } catch (Exception $e) {
                die($e->getMessage());
            }
        } 

        public function quitarStockB($data = []){
            try {
                $query = "CALL quitarStockB(?,?)";
                $consulta = $this->conexion->prepare($query);
                $consulta->execute(array(
                    $data['idbebida'],
                    $data['stock']
                ));
            } catch (Exception $e) {
                die($e->getMessage());
            }
        }

        public function sinStock(){
            try {
                $query = "SELECT * FROM bebidas where stock = 0";
                $consulta = $this->conexion->prepare($query);
                $consulta->execute();
                $datos = $consulta->fetchAll(PDO::FETCH_ASSOC);
                return $datos;
            } catch (Exception $e) {
                die($e->getMessage());
            }
        }

        public function updateStock($data = []){
            try {
                $query = "CALL deshabilitar_bebida(?)";
                $consulta = $this->conexion->prepare($query);
                $consulta->execute(array($data['idbebida']));
            } catch (Exception $e) {
                die($e->getMessage());
            }
        }

    }

?>