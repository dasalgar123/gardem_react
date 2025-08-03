const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController');

// Obtener todos los productos
router.get('/productos', productoController.obtenerProductos);

// Obtener productos por categoría
router.get('/productos/categoria/:categoria', productoController.obtenerProductosPorCategoria);

module.exports = router; 