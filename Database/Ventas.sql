DELIMITER $$
CREATE PROCEDURE listarVentas()
BEGIN
	SELECT ven.idventa, pdb.listabebida, pdp.listaplato,ven.total, usu.usuario
	FROM venta ven
	INNER JOIN pedido_bebida pdb ON pdb.idpedidoB = ven.idpedidoB
	INNER JOIN pedido_plato pdp ON pdp.idpedidoP = ven.idpedidoP
	INNER JOIN usuario usu ON usu.idusuario = ven.idusuario;
END $$

CALL listarVentas();

---------------------

DELIMITER $$
CREATE PROCEDURE obtenerVenta(IN _idventa SMALLINT)
BEGIN
	SELECT ven.idventa, pdb.listabebida, pdp.listaplato,ven.total, usu.usuario
	FROM venta ven
	INNER JOIN pedido_bebida pdb ON pdb.idpedidoB = ven.idpedidoB
	INNER JOIN pedido_plato pdp ON pdp.idpedidoP = ven.idpedidoP
	INNER JOIN usuario usu ON usu.idusuario = ven.idusuario
	WHERE ven.idventa = _idventa;
END $$

CALL obtenerVenta(1);

SELECT * FROM venta

SELECT * FROM pedido_bebida
ORDER BY idpedidoB DESC
LIMIT 1;
