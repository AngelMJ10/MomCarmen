-- Procedimientos almacenados -- 

-- Buscar Bebidas
DELIMITER $$
CREATE PROCEDURE buscarBebida
(
	IN _idmarca	SMALLINT,
	IN _bebida	VARCHAR(40),
	IN _precio	DECIMAL(6,2),
	IN _stock	INT,
	IN _estado	CHAR(1)
)
BEGIN
	SELECT beb.idbebida,mar.marca,beb.bebida,beb.precio,beb.stock,beb.estado,beb.fecha_creacion,beb.fecha_fin
	FROM bebidas beb
	INNER JOIN marcas mar ON mar.idmarca = beb.idmarca
	WHERE 
	(NULLIF(_idmarca, '') IS NULL OR beb.idmarca = _idmarca)
         AND (NULLIF(_bebida, '') IS NULL OR beb.bebida LIKE CONCAT('%', _bebida, '%'))
         AND (NULLIF(_precio, '') IS NULL OR beb.precio = _precio)
         AND (NULLIF(_stock, '') IS NULL OR beb.stock = _stock)
         AND (NULLIF(_estado, '') IS NULL OR beb.estado = _estado)
         GROUP BY beb.idbebida;
END $$

CALL buscarBebida('','','','','');

----------------------------

-- Editar Bebidas
DELIMITER $$ 
CREATE PROCEDURE editarBebida 
(
	IN _idbebida	SMALLINT,
	IN _idmarca	SMALLINT,
	IN _bebida	VARCHAR(40),
	IN _precio	DECIMAL(6,2),
	IN _stock	INT,
	IN _estado	CHAR(1)
)
BEGIN
	UPDATE bebidas SET idmarca = _idmarca, bebida = _bebida, precio = _precio , stock = _stock, estado = _estado
	WHERE idbebida = _idbebida;
END $$

CALL editarBebida(1,1,'Inka kola 1/2 litro',2,8,1);

-------------------------------------------------------

-- Listar bebidas
DELIMITER $$
CREATE PROCEDURE listarBebidas()
BEGIN
	SELECT beb.idbebida,mar.marca,beb.bebida,beb.precio,beb.stock,beb.estado,beb.fecha_creacion,beb.fecha_fin
	FROM bebidas beb
	INNER JOIN marcas mar ON mar.idmarca = beb.idmarca
	WHERE beb.estado = 1;
END $$

CALL listarBebidas();

---------------------------------------------------------

-- Actualizar stock automático
DELIMITER $$
CREATE PROCEDURE deshabilitar_bebida(IN _idbebida	SMALLINT)
BEGIN
	UPDATE bebidas SET estado = 0 WHERE idbebida = _idbebida;
END $$

CALL deshabilitar_bebida(1);


------------------------------
-- Actualizar Stock

DELIMITER $$ 
CREATE PROCEDURE quitarStockB 
(
	IN _idbebida	SMALLINT,
	IN _stock	INT
)
BEGIN
	UPDATE bebidas SET stock = _stock
	WHERE idbebida = _idbebida;
END $$



