-- Base de datos para Catálogo React
-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS react_catalogo_db;
USE react_catalogo_db;

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

-- Crear índices para mejorar el rendimiento
CREATE INDEX idx_productos_categoria ON productos(categoria_id);
CREATE INDEX idx_producto_colores_producto ON producto_colores(producto_id);
CREATE INDEX idx_producto_colores_color ON producto_colores(color_id);
CREATE INDEX idx_producto_tallas_producto ON producto_tallas(producto_id);
CREATE INDEX idx_producto_tallas_talla ON producto_tallas(talla_id);
CREATE INDEX idx_tallas_categoria ON tallas(categoria_id); 