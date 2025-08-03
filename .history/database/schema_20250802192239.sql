-- Base de datos para Catálogo GARDEM
-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS gardem_catalog;
USE gardem_catalog;

-- Tabla de categorías
CREATE TABLE categorias (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL,
    descripcion TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla de colores
CREATE TABLE colores (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL,
    codigo_hex VARCHAR(7),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla de tallas
CREATE TABLE tallas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(10) NOT NULL,
    categoria_id INT,
    orden INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (categoria_id) REFERENCES categorias(id)
);

-- Tabla de productos
CREATE TABLE productos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10,2) NOT NULL,
    categoria_id INT NOT NULL,
    imagen_principal VARCHAR(255) NOT NULL,
    stock_disponible INT DEFAULT 0,
    activo BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (categoria_id) REFERENCES categorias(id)
);

-- Tabla de relación producto-colores
CREATE TABLE producto_colores (
    id INT PRIMARY KEY AUTO_INCREMENT,
    producto_id INT NOT NULL,
    color_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (producto_id) REFERENCES productos(id) ON DELETE CASCADE,
    FOREIGN KEY (color_id) REFERENCES colores(id) ON DELETE CASCADE,
    UNIQUE KEY unique_producto_color (producto_id, color_id)
);

-- Tabla de relación producto-tallas
CREATE TABLE producto_tallas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    producto_id INT NOT NULL,
    talla_id INT NOT NULL,
    stock_disponible INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (producto_id) REFERENCES productos(id) ON DELETE CASCADE,
    FOREIGN KEY (talla_id) REFERENCES tallas(id) ON DELETE CASCADE,
    UNIQUE KEY unique_producto_talla (producto_id, talla_id)
);

-- Tabla de imágenes adicionales del producto
CREATE TABLE producto_imagenes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    producto_id INT NOT NULL,
    url_imagen VARCHAR(255) NOT NULL,
    orden INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (producto_id) REFERENCES productos(id) ON DELETE CASCADE
);

-- Insertar categorías
INSERT INTO categorias (nombre, descripcion) VALUES
('caballero', 'Productos para caballeros'),
('dama', 'Productos para damas'),
('nino', 'Productos para niños'),
('ninas', 'Productos para niñas'),
('unisex', 'Productos unisex');

-- Insertar colores
INSERT INTO colores (nombre, codigo_hex) VALUES
('Azul', '#0000FF'),
('Rojo', '#FF0000'),
('Verde', '#008000'),
('Negro', '#000000'),
('Rosa', '#FFC0CB'),
('Blanco', '#FFFFFF'),
('Amarillo', '#FFFF00'),
('Gris', '#808080');

-- Insertar tallas por categoría
-- Caballeros
INSERT INTO tallas (nombre, categoria_id, orden) VALUES
('S', 1, 1),
('M', 1, 2),
('L', 1, 3),
('XL', 1, 4),
('XXL', 1, 5);

-- Damas
INSERT INTO tallas (nombre, categoria_id, orden) VALUES
('XS', 2, 1),
('S', 2, 2),
('M', 2, 3),
('L', 2, 4),
('XL', 2, 5);

-- Niños
INSERT INTO tallas (nombre, categoria_id, orden) VALUES
('2T', 3, 1),
('3T', 3, 2),
('4T', 3, 3),
('5T', 3, 4),
('6T', 3, 5),
('7T', 3, 6),
('8T', 3, 7);

-- Niñas
INSERT INTO tallas (nombre, categoria_id, orden) VALUES
('2T', 4, 1),
('3T', 4, 2),
('4T', 4, 3),
('5T', 4, 4),
('6T', 4, 5),
('7T', 4, 6),
('8T', 4, 7);

-- Unisex
INSERT INTO tallas (nombre, categoria_id, orden) VALUES
('S', 5, 1),
('M', 5, 2),
('L', 5, 3),
('XL', 5, 4);

-- Insertar productos CABALLEROS
INSERT INTO productos (nombre, descripcion, precio, categoria_id, imagen_principal) VALUES
('Boxer Caballero Clásico', 'Boxer de algodón clásico para caballero', 25000.00, 1, '/img/Caballeros/boxer1_1.jpeg'),
('Boxer Caballero Deportivo', 'Boxer deportivo para caballero', 28000.00, 1, '/img/Caballeros/boxer1_2.jpeg'),
('Boxer Caballero Premium', 'Boxer premium para caballero', 32000.00, 1, '/img/Caballeros/boxer1_3.jpeg'),
('Boxer Caballero Sin Costura', 'Boxer sin costura para caballero', 35000.00, 1, '/img/Caballeros/boxer1_4.jpeg'),
('Boxer Caballero Microfibra', 'Boxer de microfibra deportivo', 38000.00, 1, '/img/Caballeros/boxer1_5.jpeg'),
('Boxer Caballero Mezcla Stretch', 'Boxer con mezcla stretch', 30000.00, 1, '/img/Caballeros/boxer1_6.jpeg'),
('Boxer Caballero Compresión', 'Boxer con compresión ligera', 42000.00, 1, '/img/Caballeros/boxer1_7.jpeg'),
('Boxer Caballero Algodón Premium', 'Boxer de algodón premium', 45000.00, 1, '/img/Caballeros/boxer1_8.jpeg'),
('Boxer Caballero Calvin Klein', 'Boxer Calvin Klein original', 55000.00, 1, '/img/Caballeros/calvin-klein-4634-5882962-1-catalog-new.webp'),
('Boxer Caballero Modern Air', 'Boxer Modern Air Calvin Klein', 58000.00, 1, '/img/Caballeros/calvin-klein-5239-4624962-1-catalog-new.webp');

-- Insertar productos DAMAS
INSERT INTO productos (nombre, descripcion, precio, categoria_id, imagen_principal) VALUES
('Conjunto Dama Deportivo', 'Conjunto deportivo para dama', 35000.00, 2, '/img/Damas/damas1.jpg'),
('Conjunto Dama Elegante', 'Conjunto elegante para dama', 38000.00, 2, '/img/Damas/damas2.jpg'),
('Conjunto Dama Casual', 'Conjunto casual para dama', 32000.00, 2, '/img/Damas/damas3.jpeg'),
('Conjunto Dama Premium', 'Conjunto premium para dama', 42000.00, 2, '/img/Damas/damas4.jpeg'),
('Conjunto Dama Deportivo 2', 'Conjunto deportivo premium', 45000.00, 2, '/img/Damas/damas5.jpeg'),
('Conjunto Dama Elegante 2', 'Conjunto elegante premium', 48000.00, 2, '/img/Damas/damas6.jpeg'),
('Conjunto Dama Casual 2', 'Conjunto casual premium', 40000.00, 2, '/img/Damas/damas7.jpeg');

-- Insertar productos NIÑOS
INSERT INTO productos (nombre, descripcion, precio, categoria_id, imagen_principal) VALUES
('Boxer Niño Deportivo', 'Boxer deportivo para niños', 20000.00, 3, '/img/Niños/boxer3_1.jpeg'),
('Boxer Niño Clásico', 'Boxer clásico para niños', 18000.00, 3, '/img/Niños/boxer3_2.jpeg'),
('Boxer Niño Premium', 'Boxer premium para niños', 22000.00, 3, '/img/Niños/boxer3_3.jpeg'),
('Boxer Niño Microfibra', 'Boxer de microfibra para niños', 25000.00, 3, '/img/Niños/boxer3_4.jpeg'),
('Boxer Niño Stretch', 'Boxer con stretch para niños', 23000.00, 3, '/img/Niños/boxer3_5.jpeg'),
('Boxer Niño Compresión', 'Boxer con compresión para niños', 28000.00, 3, '/img/Niños/boxer3_6.jpeg'),
('Boxer Niño Algodón', 'Boxer de algodón para niños', 19000.00, 3, '/img/Niños/boxer3_7.jpeg'),
('Boxer Niño Premium 2', 'Boxer premium especial para niños', 26000.00, 3, '/img/Niños/boxer3_8.jpeg'),
('Boxer Niño Mezcla', 'Boxer con mezcla para niños', 24000.00, 3, '/img/Niños/boxer5_1.jpeg'),
('Boxer Niño Deportivo 2', 'Boxer deportivo especial para niños', 27000.00, 3, '/img/Niños/boxer5_2.jpeg'),
('Boxer Niño Clásico 2', 'Boxer clásico especial para niños', 21000.00, 3, '/img/Niños/boxer5_3.jpeg'),
('Boxer Niño Premium 3', 'Boxer premium especial para niños', 29000.00, 3, '/img/Niños/boxer5_4.jpeg'),
('Boxer Niño Microfibra 2', 'Boxer de microfibra especial', 31000.00, 3, '/img/Niños/boxer5_5.jpeg'),
('Boxer Niño Stretch 2', 'Boxer con stretch especial', 25000.00, 3, '/img/Niños/boxer5_6.jpeg'),
('Boxer Niño Compresión 2', 'Boxer con compresión especial', 33000.00, 3, '/img/Niños/boxer5_7.jpeg'),
('Boxer Niño Algodón 2', 'Boxer de algodón especial', 20000.00, 3, '/img/Niños/boxer5_8.jpeg');

-- Insertar productos NIÑAS
INSERT INTO productos (nombre, descripcion, precio, categoria_id, imagen_principal) VALUES
('Conjunto Niña Deportivo', 'Conjunto deportivo para niñas', 30000.00, 4, '/img/Niñas/nina2.jpg'),
('Conjunto Niña Elegante', 'Conjunto elegante para niñas', 32000.00, 4, '/img/Niñas/niña1.jpg'),
('Conjunto Niña Casual', 'Conjunto casual para niñas', 28000.00, 4, '/img/Niñas/niña3.jpeg'),
('Conjunto Niña Premium', 'Conjunto premium para niñas', 35000.00, 4, '/img/Niñas/niña4.jpeg'),
('Conjunto Niña Deportivo 2', 'Conjunto deportivo especial para niñas', 33000.00, 4, '/img/Niñas/niña5.jpeg'),
('Conjunto Niña Elegante 2', 'Conjunto elegante especial para niñas', 38000.00, 4, '/img/Niñas/niña6.jpg'),
('Conjunto Niña Casual 2', 'Conjunto casual especial para niñas', 31000.00, 4, '/img/Niñas/niña7.jpeg'),
('Conjunto Niña Premium 2', 'Conjunto premium especial para niñas', 42000.00, 4, '/img/Niñas/niña8.jpeg'),
('Conjunto Niña Deportivo 3', 'Conjunto deportivo premium para niñas', 36000.00, 4, '/img/Niñas/niña9.jpg'),
('Conjunto Niña Elegante 3', 'Conjunto elegante premium para niñas', 40000.00, 4, '/img/Niñas/niña10.jpg'),
('Conjunto Niña Casual 3', 'Conjunto casual premium para niñas', 34000.00, 4, '/img/Niñas/niña11.jpg'),
('Conjunto Niña Premium 3', 'Conjunto premium especial para niñas', 45000.00, 4, '/img/Niñas/niña12.jpg'),
('Conjunto Niña Deportivo 4', 'Conjunto deportivo exclusivo para niñas', 39000.00, 4, '/img/Niñas/niña13.jpg'),
('Conjunto Niña Elegante 4', 'Conjunto elegante exclusivo para niñas', 43000.00, 4, '/img/Niñas/niña14.jpg');

-- Insertar productos UNISEX
INSERT INTO productos (nombre, descripcion, precio, categoria_id, imagen_principal) VALUES
('Boxer Unisex Deportivo', 'Boxer deportivo unisex', 25000.00, 5, '/img/Unixes/boxer6_1.jpg'),
('Boxer Unisex Cómodo', 'Boxer cómodo unisex', 23000.00, 5, '/img/Unixes/boxer6_2.jpg'),
('Boxer Unisex Clásico', 'Boxer clásico unisex', 27000.00, 5, '/img/Unixes/boxer6_3.jpg'),
('Boxer Unisex Premium', 'Boxer premium unisex', 30000.00, 5, '/img/Unixes/boxer6_4.jpg'),
('Boxer Unisex Microfibra', 'Boxer de microfibra unisex', 32000.00, 5, '/img/Unixes/boxer6_5.jpg'),
('Boxer Unisex Stretch', 'Boxer con stretch unisex', 28000.00, 5, '/img/Unixes/boxer6_6.jpg'),
('Boxer Unisex Compresión', 'Boxer con compresión unisex', 35000.00, 5, '/img/Unixes/boxer6_7.jpg'),
('Boxer Unisex Algodón', 'Boxer de algodón unisex', 24000.00, 5, '/img/Unixes/boxer6_8.jpg');

-- Asignar colores a productos CABALLEROS
INSERT INTO producto_colores (producto_id, color_id) VALUES
(1, 1), (1, 2), (1, 3), (1, 4), -- Azul, Rojo, Verde, Negro
(2, 1), (2, 2), (2, 3), (2, 4),
(3, 1), (3, 2), (3, 3), (3, 4),
(4, 1), (4, 2), (4, 3), (4, 4),
(5, 1), (5, 2), (5, 3), (5, 4),
(6, 1), (6, 2), (6, 3), (6, 4),
(7, 1), (7, 2), (7, 3), (7, 4),
(8, 1), (8, 2), (8, 3), (8, 4),
(9, 4), (9, 1), (9, 8), -- Negro, Azul, Gris (Calvin Klein)
(10, 4), (10, 1), (10, 8);

-- Asignar colores a productos DAMAS
INSERT INTO producto_colores (producto_id, color_id) VALUES
(11, 5), (11, 1), (11, 4), (11, 6), -- Rosa, Azul, Negro, Blanco
(12, 5), (12, 1), (12, 4), (12, 6),
(13, 5), (13, 1), (13, 4), (13, 6),
(14, 5), (14, 1), (14, 4), (14, 6),
(15, 5), (15, 1), (15, 4), (15, 6),
(16, 5), (16, 1), (16, 4), (16, 6),
(17, 5), (17, 1), (17, 4), (17, 6);

-- Asignar colores a productos NIÑOS
INSERT INTO producto_colores (producto_id, color_id) VALUES
(18, 1), (18, 2), (18, 3), (18, 7), -- Azul, Rojo, Verde, Amarillo
(19, 1), (19, 2), (19, 3), (19, 7),
(20, 1), (20, 2), (20, 3), (20, 7),
(21, 1), (21, 2), (21, 3), (21, 7),
(22, 1), (22, 2), (22, 3), (22, 7),
(23, 1), (23, 2), (23, 3), (23, 7),
(24, 1), (24, 2), (24, 3), (24, 7),
(25, 1), (25, 2), (25, 3), (25, 7),
(26, 1), (26, 2), (26, 3), (26, 7),
(27, 1), (27, 2), (27, 3), (27, 7),
(28, 1), (28, 2), (28, 3), (28, 7),
(29, 1), (29, 2), (29, 3), (29, 7),
(30, 1), (30, 2), (30, 3), (30, 7),
(31, 1), (31, 2), (31, 3), (31, 7),
(32, 1), (32, 2), (32, 3), (32, 7),
(33, 1), (33, 2), (33, 3), (33, 7);

-- Asignar colores a productos NIÑAS
INSERT INTO producto_colores (producto_id, color_id) VALUES
(34, 5), (34, 1), (34, 4), (34, 6), -- Rosa, Azul, Negro, Blanco
(35, 5), (35, 1), (35, 4), (35, 6),
(36, 5), (36, 1), (36, 4), (36, 6),
(37, 5), (37, 1), (37, 4), (37, 6),
(38, 5), (38, 1), (38, 4), (38, 6),
(39, 5), (39, 1), (39, 4), (39, 6),
(40, 5), (40, 1), (40, 4), (40, 6),
(41, 5), (41, 1), (41, 4), (41, 6),
(42, 5), (42, 1), (42, 4), (42, 6),
(43, 5), (43, 1), (43, 4), (43, 6),
(44, 5), (44, 1), (44, 4), (44, 6),
(45, 5), (45, 1), (45, 4), (45, 6),
(46, 5), (46, 1), (46, 4), (46, 6),
(47, 5), (47, 1), (47, 4), (47, 6);

-- Asignar colores a productos UNISEX
INSERT INTO producto_colores (producto_id, color_id) VALUES
(48, 1), (48, 2), (48, 3), (48, 4), -- Azul, Rojo, Verde, Negro
(49, 1), (49, 2), (49, 3), (49, 4),
(50, 1), (50, 2), (50, 3), (50, 4),
(51, 1), (51, 2), (51, 3), (51, 4),
(52, 1), (52, 2), (52, 3), (52, 4),
(53, 1), (53, 2), (53, 3), (53, 4),
(54, 1), (54, 2), (54, 3), (54, 4),
(55, 1), (55, 2), (55, 3), (55, 4);

-- Asignar tallas a productos CABALLEROS (IDs 1-10)
INSERT INTO producto_tallas (producto_id, talla_id) VALUES
(1, 1), (1, 2), (1, 3), (1, 4), (1, 5), -- S, M, L, XL, XXL
(2, 1), (2, 2), (2, 3), (2, 4), (2, 5),
(3, 1), (3, 2), (3, 3), (3, 4), (3, 5),
(4, 1), (4, 2), (4, 3), (4, 4), (4, 5),
(5, 1), (5, 2), (5, 3), (5, 4), (5, 5),
(6, 1), (6, 2), (6, 3), (6, 4), (6, 5),
(7, 1), (7, 2), (7, 3), (7, 4), (7, 5),
(8, 1), (8, 2), (8, 3), (8, 4), (8, 5),
(9, 1), (9, 2), (9, 3), (9, 4), (9, 5),
(10, 1), (10, 2), (10, 3), (10, 4), (10, 5);

-- Asignar tallas a productos DAMAS (IDs 11-17)
INSERT INTO producto_tallas (producto_id, talla_id) VALUES
(11, 6), (11, 7), (11, 8), (11, 9), (11, 10), -- XS, S, M, L, XL
(12, 6), (12, 7), (12, 8), (12, 9), (12, 10),
(13, 6), (13, 7), (13, 8), (13, 9), (13, 10),
(14, 6), (14, 7), (14, 8), (14, 9), (14, 10),
(15, 6), (15, 7), (15, 8), (15, 9), (15, 10),
(16, 6), (16, 7), (16, 8), (16, 9), (16, 10),
(17, 6), (17, 7), (17, 8), (17, 9), (17, 10);

-- Asignar tallas a productos NIÑOS (IDs 18-33)
INSERT INTO producto_tallas (producto_id, talla_id) VALUES
(18, 11), (18, 12), (18, 13), (18, 14), (18, 15), (18, 16), (18, 17), -- 2T-8T
(19, 11), (19, 12), (19, 13), (19, 14), (19, 15), (19, 16), (19, 17),
(20, 11), (20, 12), (20, 13), (20, 14), (20, 15), (20, 16), (20, 17),
(21, 11), (21, 12), (21, 13), (21, 14), (21, 15), (21, 16), (21, 17),
(22, 11), (22, 12), (22, 13), (22, 14), (22, 15), (22, 16), (22, 17),
(23, 11), (23, 12), (23, 13), (23, 14), (23, 15), (23, 16), (23, 17),
(24, 11), (24, 12), (24, 13), (24, 14), (24, 15), (24, 16), (24, 17),
(25, 11), (25, 12), (25, 13), (25, 14), (25, 15), (25, 16), (25, 17),
(26, 11), (26, 12), (26, 13), (26, 14), (26, 15), (26, 16), (26, 17),
(27, 11), (27, 12), (27, 13), (27, 14), (27, 15), (27, 16), (27, 17),
(28, 11), (28, 12), (28, 13), (28, 14), (28, 15), (28, 16), (28, 17),
(29, 11), (29, 12), (29, 13), (29, 14), (29, 15), (29, 16), (29, 17),
(30, 11), (30, 12), (30, 13), (30, 14), (30, 15), (30, 16), (30, 17),
(31, 11), (31, 12), (31, 13), (31, 14), (31, 15), (31, 16), (31, 17),
(32, 11), (32, 12), (32, 13), (32, 14), (32, 15), (32, 16), (32, 17),
(33, 11), (33, 12), (33, 13), (33, 14), (33, 15), (33, 16), (33, 17);

-- Asignar tallas a productos NIÑAS (IDs 34-47)
INSERT INTO producto_tallas (producto_id, talla_id) VALUES
(34, 18), (34, 19), (34, 20), (34, 21), (34, 22), (34, 23), (34, 24), -- 2T-8T
(35, 18), (35, 19), (35, 20), (35, 21), (35, 22), (35, 23), (35, 24),
(36, 18), (36, 19), (36, 20), (36, 21), (36, 22), (36, 23), (36, 24),
(37, 18), (37, 19), (37, 20), (37, 21), (37, 22), (37, 23), (37, 24),
(38, 18), (38, 19), (38, 20), (38, 21), (38, 22), (38, 23), (38, 24),
(39, 18), (39, 19), (39, 20), (39, 21), (39, 22), (39, 23), (39, 24),
(40, 18), (40, 19), (40, 20), (40, 21), (40, 22), (40, 23), (40, 24),
(41, 18), (41, 19), (41, 20), (41, 21), (41, 22), (41, 23), (41, 24),
(42, 18), (42, 19), (42, 20), (42, 21), (42, 22), (42, 23), (42, 24),
(43, 18), (43, 19), (43, 20), (43, 21), (43, 22), (43, 23), (43, 24),
(44, 18), (44, 19), (44, 20), (44, 21), (44, 22), (44, 23), (44, 24),
(45, 18), (45, 19), (45, 20), (45, 21), (45, 22), (45, 23), (45, 24),
(46, 18), (46, 19), (46, 20), (46, 21), (46, 22), (46, 23), (46, 24),
(47, 18), (47, 19), (47, 20), (47, 21), (47, 22), (47, 23), (47, 24);

-- Asignar tallas a productos UNISEX (IDs 48-55)
INSERT INTO producto_tallas (producto_id, talla_id) VALUES
(48, 25), (48, 26), (48, 27), (48, 28), -- S, M, L, XL
(49, 25), (49, 26), (49, 27), (49, 28),
(50, 25), (50, 26), (50, 27), (50, 28),
(51, 25), (51, 26), (51, 27), (51, 28),
(52, 25), (52, 26), (52, 27), (52, 28),
(53, 25), (53, 26), (53, 27), (53, 28),
(54, 25), (54, 26), (54, 27), (54, 28),
(55, 25), (55, 26), (55, 27), (55, 28);

-- Crear índices para mejorar el rendimiento
CREATE INDEX idx_productos_categoria ON productos(categoria_id);
CREATE INDEX idx_producto_colores_producto ON producto_colores(producto_id);
CREATE INDEX idx_producto_colores_color ON producto_colores(color_id);
CREATE INDEX idx_producto_tallas_producto ON producto_tallas(producto_id);
CREATE INDEX idx_producto_tallas_talla ON producto_tallas(talla_id);
CREATE INDEX idx_tallas_categoria ON tallas(categoria_id); 