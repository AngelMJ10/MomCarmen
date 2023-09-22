CREATE DATABASE mamaCarmen
USE mamaCarmen;

CREATE TABLE persona
(
	idpersona		SMALLINT 	AUTO_INCREMENT PRIMARY KEY,
	apellidos		VARCHAR(40)	NOT NULL,
	nombre			VARCHAR(40)	NOT NULL,
	dni			CHAR(8)		NULL,
	telefono		CHAR(9)		NOT NULL,
	direccion		VARCHAR(200)	NOT NULL,
	estado			CHAR(1)		NOT NULL DEFAULT '1',
	fecha_creacion		DATETIME	NOT NULL DEFAULT NOW(),
	fecha_fin		DATETIME	NULL
)ENGINE = INNODB;

INSERT INTO persona(nombre,apellidos,dni,telefono,direccion)
VALUES('Marquina Jaime','Ángel Eduardo',72745028,951531166,'León de Vivero MZ V LT-22'),
('Jaime Espinoza','Consuelo',75698458,947857626,'Prolongación Grau 507'),
('Marquina Jaime','Miguel Anthony',75896487,932777928,'Pasaje la tinguiña');

SELECT * FROM persona;

-----------------------------------

CREATE TABLE usuario
(
	idpersona		SMALLINT	NOT NULL,
	idusuario		SMALLINT	AUTO_INCREMENT PRIMARY KEY,
	usuario			VARCHAR(20)	NOT NULL,
	clave			VARCHAR(200)	NOT NULL,
	nivelacceso		CHAR(1)		NOT NULL DEFAULT 'E',
	estado			CHAR(1)		NOT NULL DEFAULT '1',
	fecha_creacion		DATETIME	NOT NULL DEFAULT NOW(),
	fecha_fin		DATETIME	NULL,
	CONSTRAINT fk_idpersona_fk FOREIGN KEY (idpersona) REFERENCES persona (idpersona)
)ENGINE = INNODB;

INSERT INTO usuario (idpersona,usuario,clave)
VALUES	(1,'AngelMJ','SENATI'),
	(2,'ConsueloJE','SENATI');
	
SELECT * FROM usuario;
UPDATE usuario SET
	clave = '$2y$10$WY.iP85bEYxBMkVBG0jKO.9Q97kEbofLVwJPUT1OAmsDzLXQ8Pcka';
UPDATE usuario SET
	nivelacceso = 'A' WHERE idusuario = 1;
-----------------------------------------

CREATE TABLE platos
(
	idplato			SMALLINT	AUTO_INCREMENT PRIMARY KEY,
	plato			VARCHAR(40)	NOT NULL,
	precio			DECIMAL(6,2)	NOT NULL,
	estado			CHAR(1)		NOT NULL DEFAULT '1',
	fecha_creacion		DATETIME	NOT NULL DEFAULT NOW(),
	fecha_fin		DATETIME	NULL
)ENGINE = INNODB;

INSERT INTO platos(plato,precio)
VALUES	('Sopa Seca con Carapulcra','20'),
	('Chilcano','7'),
	('Ceviche con chicharron','12'),
	('Ceviche','10');
	
SELECT * FROM platos;

--------------------------------------------

CREATE TABLE marcas
(
	idmarca			SMALLINT 	AUTO_INCREMENT PRIMARY KEY,
	marca			VARCHAR(40)	NOT NULL,
	estado			CHAR(1)		NOT NULL DEFAULT '1',
	fecha_creacion		DATETIME	NOT NULL DEFAULT NOW(),
	fecha_fin		DATETIME	NULL
)ENGINE = INNODB;

INSERT INTO marcas(marca) 
VALUE("Inka Kola"),("Cerveza Cristal"),("Cifrut");

SELECT * FROM marcas

-------------------------------------------------

CREATE TABLE bebidas
(
	idbebida		SMALLINT 	AUTO_INCREMENT PRIMARY KEY,
	idmarca			SMALLINT	NOT NULL,
	bebida			VARCHAR(40)	NOT NULL,
	precio			DECIMAL(6,2)	NOT NULL,
	stock			INT 		NOT NULL,
	estado			CHAR(1)		NOT NULL DEFAULT '1',
	fecha_creacion		DATETIME	NOT NULL DEFAULT NOW(),
	fecha_fin		DATETIME	NULL,
	CONSTRAINT fk_idmarca_b FOREIGN KEY (idmarca) REFERENCES marcas (idmarca)
)ENGINE = INNODB;

INSERT INTO bebidas(idmarca,bebida,precio,stock)
VALUES(1,'Inka kola 1/2 litro',2,9),(2,'Cerveza Cristal 650 ml',6,12),(3,'Cifrut 1/2 litro',1.50,9);

SELECT * FROM bebidas;

----------------------------------------------

CREATE TABLE pedido_bebida
(
	idpedidoB		SMALLINT 	AUTO_INCREMENT PRIMARY KEY,
	idusuario		SMALLINT	NOT NULL,
	listabebida		JSON 		NOT NULL,
	fecha_creacion		DATETIME	NOT NULL DEFAULT NOW(),
	CONSTRAINT fk_idusuario_pb FOREIGN KEY(idusuario) REFERENCES usuario (idusuario)
)ENGINE = INNODB;

INSERT INTO pedido_bebida(idusuario,listabebida)
VALUES(1,'[{"idbebida" : "1" , "cantidad" : "2"}, {"idbebida" : "2" , "cantidad" : "2"}]')

SELECT * FROM pedido_bebida;

TRUNCATE TABLE pedido_bebida;
------------------------------------------

CREATE TABLE pedido_plato
(
	idpedidoP		SMALLINT 	AUTO_INCREMENT PRIMARY KEY,
	idusuario		SMALLINT	NOT NULL,
	listaplato		JSON 		NOT NULL,
	fecha_creacion		DATETIME	NOT NULL DEFAULT NOW(),
	CONSTRAINT fk_idusuario_pp FOREIGN KEY(idusuario) REFERENCES usuario (idusuario)
)ENGINE = INNODB;


INSERT INTO pedido_plato(idusuario,listaplato)
VALUES(1,'[{"idplato" : "1" , "cantidad" : "2"}, {"idplato" : "2" , "cantidad" : "2"}]');
SELECT * FROM pedido_plato
SELECT * FROM pedido_bebida;
SELECT * FROM venta;
-----------------------------------------------
CREATE TABLE venta
(
	idpedidoP		SMALLINT 	NULL,
	idpedidoB		SMALLINT	NULL,
	idpersona		SMALLINT	NULL,
	idventa			SMALLINT	AUTO_INCREMENT PRIMARY KEY,
	total			DECIMAL(6,2)	NOT NULL,
	idusuario		SMALLINT	NOT NULL,
	fecha_creacion		DATETIME	NOT NULL DEFAULT NOW(),
	comentario		VARCHAR(200)	NULL,
	CONSTRAINT fk_idusuario_v FOREIGN KEY(idusuario) REFERENCES usuario (idusuario),
	CONSTRAINT fk_idpedidoP_v FOREIGN KEY(idpedidoP) REFERENCES pedido_plato (idpedidoP),
	CONSTRAINT fk_idpedidoB_v FOREIGN KEY(idpedidoB) REFERENCES pedido_bebida (idpedidoB),
	CONSTRAINT fk_idpersona_v FOREIGN KEY(idpersona) REFERENCES persona (idpersona)
)ENGINE = INNODB;

INSERT INTO venta(idpedidoP,idpedidoB,idpersona,total,idusuario)
VALUES(1,1,3,30,1)

SELECT * FROM venta;

-----------------------------
CREATE TABLE deudores
(
	idpersona		SMALLINT	NOT NULL,
	usuario_creador		SMALLINT	NOT NULL,
	iddeudor		SMALLINT	AUTO_INCREMENT PRIMARY KEY,
	estado			CHAR(1)		NOT NULL DEFAULT '1',
	fecha_creacion		DATETIME	NOT NULL DEFAULT NOW(),
	fecha_update		DATETIME	NULL DEFAULT NOW(),
	CONSTRAINT fk_idpersona_d FOREIGN KEY (idpersona) REFERENCES persona (idpersona),
	CONSTRAINT fk_idusuario_d FOREIGN KEY (usuario_creador) REFERENCES usuario (idusuario)
) ENGINE = INNODB;

INSERT INTO deudores (idpersona,usuario_creador)
VALUES(3,1);

SELECT * FROM deudores;

------------------------------------------
CREATE TABLE deuda
(
	iddeudor		SMALLINT 	NOT NULL,
	iddeuda			SMALLINT 	AUTO_INCREMENT PRIMARY KEY,
	idventa			SMALLINT 	NOT NULL,
	comentario		VARCHAR(200)	NULL,
	estado			CHAR(1)		NOT NULL DEFAULT'1',
	fecha_creacion		DATETIME	NOT NULL DEFAULT NOW(),
	fecha_update		DATETIME	NULL DEFAULT NOW(),
	CONSTRAINT fk_iddeudor_d FOREIGN KEY (iddeudor) REFERENCES deudores (iddeudor)
)

INSERT INTO deuda(iddeudor,idventa,comentario)
VALUES(1,1,'Se compremetió a pagar el 12 de septiembre');

SELECT * FROM deuda;
