<?php

    require_once 'Conexion.php';

    class Venta extends Conexion{

        private $conexion;

        public function __construct()
        {
            $this->conexion = parent::getConexion();
        }

        public function listar(){
            try {
                $consulta = $this->conexion->prepare("CALL listarVentas()");
                $consulta->execute();
                $datos = $consulta->fetchAll(PDO::FETCH_ASSOC);
                return $datos;
            } catch (Exception $e) {
                die($e->getMessage());
            } 
        }

        public function obtener($data = []){
            try {
                $consulta = $this->conexion->prepare("CALL obtenerVenta(?)");
                $consulta->execute(array($data['idventa']));
                $datos = $consulta->fetch(PDO::FETCH_ASSOC);
                return $datos;
            } catch (Exception $e) {
                die($e->getMessage());
            } 
        }

        public function listarPB(){
            try {
                $query = "SELECT * FROM pedido_bebida
                        ORDER BY idpedidoB DESC
                        LIMIT 1;";
                $consulta = $this->conexion->prepare($query);
                $consulta->execute();
                $datos = $consulta->fetch(PDO::FETCH_ASSOC);
                return $datos;
            } catch (Exception $e) {
                die($e->getMessage());
            }
        }

        public function obtenerPB($data = []){
            try {
                $query = "SELECT * FROM pedido_bebida where idpedidoB = ?";
                $consulta = $this->conexion->prepare($query);
                $consulta->execute(array($data['idpedidoB']));
                $datos = $consulta->fetch(PDO::FETCH_ASSOC);
                return $datos;
            } catch (Exception $e) {
                die($e->getMessage());
            }
        }

        public function obtenerPP($data = []){
            try {
                $query = "SELECT * FROM pedido_plato where idpedidoP = ?";
                $consulta = $this->conexion->prepare($query);
                $consulta->execute(array($data['idpedidoP']));
                $datos = $consulta->fetch(PDO::FETCH_ASSOC);
                return $datos;
            } catch (Exception $e) {
                die($e->getMessage());
            }
        }

        public function listarPP(){
            try {
                $query = "SELECT * FROM pedido_plato
                ORDER BY idpedidoP DESC
                LIMIT 1;";
                $consulta = $this->conexion->prepare($query);
                $consulta->execute();
                $datos = $consulta->fetch(PDO::FETCH_ASSOC);
                return $datos;
            } catch (Exception $e) {
                die($e->getMessage());
            }
        }

        public function pedidoB($data = []){
            try {
                $query = "INSERT INTO pedido_bebida(idusuario,listabebida) values(?,?)";
                $consulta = $this->conexion->prepare($query);
                $consulta->execute(array(
                    $data['idusuario'],
                    $data['listabebida'],
                ));
            } catch (Exception $e) {
                die($e->getMessage());
            }
        }

        public function pedidoP($data = []){
            try {
                $query = "INSERT INTO pedido_plato(idusuario,listaplato) values(?,?)";
                $consulta = $this->conexion->prepare($query);
                $consulta->execute(array(
                    $data['idusuario'],
                    $data['listaplato'],
                ));
            } catch (Exception $e) {
                die($e->getMessage());
            }
        }

        public function vender($data = []){
            try {
                $query = "INSERT INTO venta(idpedidoP,idpedidoB,total,idusuario)
                VALUES(?,?,?,?)";
                $consulta = $this->conexion->prepare($query);
                $consulta->execute(array(
                    $data['idpedidoP'],
                    $data['idpedidoB'],
                    $data['total'],
                    $data['idusuario']
                ));
            } catch (Exception $e) {
                die($e->getMessage());
            }
        }

        public function ventaB($data = []){
            try {
                $query = "INSERT INTO venta(idpedidoB,total,idusuario)
                VALUES(?,?,?)";
                $consulta = $this->conexion->prepare($query);
                $consulta->execute(array(
                    $data['idpedidoB'],
                    $data['total'],
                    $data['idusuario']
                ));
            } catch (Exception $e) {
                die($e->getMessage());
            }
        }

        public function ventaP($data = []){
            try {
                $query = "INSERT INTO venta(idpedidoP,total,idusuario)
                VALUES(?,?,?)";
                $consulta = $this->conexion->prepare($query);
                $consulta->execute(array(
                    $data['idpedidoP'],
                    $data['total'],
                    $data['idusuario']
                ));
            } catch (Exception $e) {
                die($e->getMessage());
            }
        }

    }

?>