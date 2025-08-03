const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Configuración de la base de datos
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // Cambia esto por tu contraseña de MySQL
  database: 'react_catalogo_db'
});

// Conectar a la base de datos
db.connect((err) => {
  if (err) {
    console.error('Error conectando a la base de datos:', err);
    return;
  }
  console.log('Conectado a la base de datos MySQL');
});

// Rutas API

// Obtener todos los productos
app.get('/api/productos', (req, res) => {
  const query = `
    SELECT 
      p.id,
      p.nombre,
      p.descripcion,
      p.precio,
      p.imagen_principal,
      p.stock_disponible,
      p.activo,
      c.nombre as categoria,
      GROUP_CONCAT(DISTINCT col.nombre) as colores,
      GROUP_CONCAT(DISTINCT t.nombre) as tallas
    FROM productos p
    LEFT JOIN categorias c ON p.categoria_id = c.id
    LEFT JOIN producto_colores pc ON p.id = pc.producto_id
    LEFT JOIN colores col ON pc.color_id = col.id
    LEFT JOIN producto_tallas pt ON p.id = pt.producto_id
    LEFT JOIN tallas t ON pt.talla_id = t.id
    WHERE p.activo = 1
    GROUP BY p.id
    ORDER BY p.id
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener productos:', err);
      res.status(500).json({ error: 'Error interno del servidor' });
      return;
    }

    // Formatear los resultados
    const productos = results.map(row => ({
      id: row.id,
      nombre: row.nombre,
      descripcion: row.descripcion,
      precio: parseFloat(row.precio),
      categoria: row.categoria,
      imagen: row.imagen_principal,
      stock_disponible: row.stock_disponible,
      colores: row.colores ? row.colores.split(',') : [],
      tallas: row.tallas ? row.tallas.split(',') : []
    }));

    res.json(productos);
  });
});

// Obtener productos por categoría
app.get('/api/productos/categoria/:categoria', (req, res) => {
  const categoria = req.params.categoria;
  
  const query = `
    SELECT 
      p.id,
      p.nombre,
      p.descripcion,
      p.precio,
      p.imagen_principal,
      p.stock_disponible,
      p.activo,
      c.nombre as categoria,
      GROUP_CONCAT(DISTINCT col.nombre) as colores,
      GROUP_CONCAT(DISTINCT t.nombre) as tallas
    FROM productos p
    LEFT JOIN categorias c ON p.categoria_id = c.id
    LEFT JOIN producto_colores pc ON p.id = pc.producto_id
    LEFT JOIN colores col ON pc.color_id = col.id
    LEFT JOIN producto_tallas pt ON p.id = pt.producto_id
    LEFT JOIN tallas t ON pt.talla_id = t.id
    WHERE p.activo = 1 AND c.nombre = ?
    GROUP BY p.id
    ORDER BY p.id
  `;

  db.query(query, [categoria], (err, results) => {
    if (err) {
      console.error('Error al obtener productos por categoría:', err);
      res.status(500).json({ error: 'Error interno del servidor' });
      return;
    }

    const productos = results.map(row => ({
      id: row.id,
      nombre: row.nombre,
      descripcion: row.descripcion,
      precio: parseFloat(row.precio),
      categoria: row.categoria,
      imagen: row.imagen_principal,
      stock_disponible: row.stock_disponible,
      colores: row.colores ? row.colores.split(',') : [],
      tallas: row.tallas ? row.tallas.split(',') : []
    }));

    res.json(productos);
  });
});

// Obtener categorías
app.get('/api/categorias', (req, res) => {
  const query = 'SELECT * FROM categorias ORDER BY nombre';
  
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener categorías:', err);
      res.status(500).json({ error: 'Error interno del servidor' });
      return;
    }
    res.json(results);
  });
});

// Obtener colores
app.get('/api/colores', (req, res) => {
  const query = 'SELECT * FROM colores ORDER BY nombre';
  
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener colores:', err);
      res.status(500).json({ error: 'Error interno del servidor' });
      return;
    }
    res.json(results);
  });
});

// Obtener tallas por categoría
app.get('/api/tallas/categoria/:categoria', (req, res) => {
  const categoria = req.params.categoria;
  
  const query = `
    SELECT t.* 
    FROM tallas t
    JOIN categorias c ON t.categoria_id = c.id
    WHERE c.nombre = ?
    ORDER BY t.orden
  `;
  
  db.query(query, [categoria], (err, results) => {
    if (err) {
      console.error('Error al obtener tallas:', err);
      res.status(500).json({ error: 'Error interno del servidor' });
      return;
    }
    res.json(results);
  });
});

// Crear pedido
app.post('/api/pedidos', (req, res) => {
  const { cliente, items } = req.body;
  
  // Validar datos
  if (!cliente || !items || items.length === 0) {
    return res.status(400).json({ error: 'Datos incompletos' });
  }

  // Calcular total
  const total = items.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);

  // Insertar pedido
  const pedidoQuery = `
    INSERT INTO pedidos (
      cliente_nombre, 
      cliente_telefono, 
      cliente_direccion, 
      cliente_ciudad, 
      metodo_pago_id,
      subtotal,
      total
    ) VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  const metodoPagoId = cliente.metodoPago === 'efectivo' ? 1 : 
                       cliente.metodoPago === 'transferencia' ? 2 :
                       cliente.metodoPago === 'nequi' ? 3 :
                       cliente.metodoPago === 'daviplata' ? 4 : 1;

  db.query(pedidoQuery, [
    cliente.nombre,
    cliente.telefono,
    cliente.direccion,
    cliente.ciudad,
    metodoPagoId,
    total,
    total
  ], (err, result) => {
    if (err) {
      console.error('Error al crear pedido:', err);
      res.status(500).json({ error: 'Error al crear pedido' });
      return;
    }

    const pedidoId = result.insertId;

    // Insertar items del pedido
    const itemsQuery = `
      INSERT INTO pedido_items (
        pedido_id, 
        producto_id, 
        color, 
        talla, 
        cantidad, 
        precio_unitario, 
        precio_total
      ) VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    let itemsInserted = 0;
    items.forEach(item => {
      db.query(itemsQuery, [
        pedidoId,
        item.id,
        item.color,
        item.talla,
        item.cantidad,
        item.precio,
        item.precio * item.cantidad
      ], (err) => {
        if (err) {
          console.error('Error al insertar item:', err);
        } else {
          itemsInserted++;
          if (itemsInserted === items.length) {
            res.json({ 
              success: true, 
              pedidoId: pedidoId,
              message: 'Pedido creado exitosamente' 
            });
          }
        }
      });
    });
  });
});

// Ruta para servir la aplicación React
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
  console.log(`API disponible en http://localhost:${PORT}/api`);
}); 