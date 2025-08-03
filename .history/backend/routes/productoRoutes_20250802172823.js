const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController');

// Obtener todos los productos
router.get('/productos', productoController.obtenerProductos);

// Obtener producto por ID
router.get('/productos/:id', productoController.obtenerProductoPorId);

// Obtener productos por categoría
router.get('/productos/categoria/:categoria', productoController.obtenerProductosPorCategoria);

// Obtener productos con colores y tallas específicos por categoría
router.get('/productos/variantes/:categoria', productoController.obtenerProductosConVariantes);

// Obtener colores disponibles
router.get('/colores', productoController.obtenerColores);

// Obtener tallas por categoría
router.get('/tallas/:categoria', productoController.obtenerTallasPorCategoria);

module.exports = router; 