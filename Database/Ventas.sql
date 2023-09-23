DELIMITER $$
CREATE PROCEDURE listarVentas(IN _fecha_buscada DATE)
BEGIN
	SELECT ven.idventa, pdb.listabebida, pdp.listaplato,ven.total,ven.fecha_creacion, usu.usuario
	FROM venta ven
	LEFT JOIN pedido_bebida pdb ON pdb.idpedidoB = ven.idpedidoB
	LEFT JOIN pedido_plato pdp ON pdp.idpedidoP = ven.idpedidoP
	INNER JOIN usuario usu ON usu.idusuario = ven.idusuario
	WHERE DATE(ven.fecha_creacion) = DATE(_fecha_buscada);
END $$

CALL listarVentas('2023-09-22');

---------------------

DELIMITER $$
CREATE PROCEDURE obtenerVenta(IN _idventa SMALLINT)
BEGIN
	SELECT ven.idventa, pdb.listabebida, pdp.listaplato,ven.total, usu.usuario
	FROM venta ven
	LEFT JOIN pedido_bebida pdb ON pdb.idpedidoB = ven.idpedidoB
	LEFT JOIN pedido_plato pdp ON pdp.idpedidoP = ven.idpedidoP
	INNER JOIN usuario usu ON usu.idusuario = ven.idusuario
	WHERE ven.idventa = _idventa;
END $$

CALL obtenerVenta(78);

SELECT * FROM venta WHERE idventa = 78
