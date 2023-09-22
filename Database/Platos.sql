-- Procedimientos almacenados -- 
DELIMITER $$ 
CREATE PROCEDURE editarPlato 
(
	IN _idplato	SMALLINT,
	IN _plato	VARCHAR(40),
	IN _precio	DECIMAL(6,2),
	IN _estado	CHAR(1)
)
BEGIN
	UPDATE platos SET plato = _plato, precio = _precio, estado = _estado
	WHERE idplato = _idplato;
END $$

CALL editarPlato(1,'Sopa Seca con Carapulcra','20','1');

------------------------------

DELIMITER $$
CREATE PROCEDURE buscarPlato
(
	IN _plato	VARCHAR(40),
	IN _precio	DECIMAL(6,2),
	IN _estado	CHAR(1)
)
BEGIN
	SELECT * FROM platos
	WHERE 
         (NULLIF(_plato, '') IS NULL OR plato LIKE CONCAT('%', _plato, '%'))
         AND (NULLIF(_precio, '') IS NULL OR precio = _precio)
         AND (NULLIF(_estado, '') IS NULL OR estado = _estado)
         GROUP BY idplato;
END $$

CALL buscarPlato('','','');