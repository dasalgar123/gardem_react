const db = require('../config/database');

// Obtener todos los productos
const obtenerProductos = (req, res) => {
  const query = `
    SELECT 
      p.id,
      p.referencia,
      p.nombre,
      p.descripcion,
      p.precio,
      p.imagen,
      p.tipo_producto,
      c.nombre as categoria_nombre,
      t.nombre as talla_nombre,
      col.nombre as color_nombre
    FROM productos p
    LEFT JOIN categorias c ON p.categoria_id = c.id
    LEFT JOIN tallas t ON p.tallas_id = t.id
    LEFT JOIN colores col ON p.color_id = col.id
    ORDER BY p.id
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener productos:', err);
      return res.status(500).json({ 
        error: 'Error interno del servidor',
        message: err.message 
      });
    }

    // Transformar los datos para el frontend
    const productos = results.map(producto => ({
      id: producto.id,
      nombre: producto.nombre,
      precio: parseFloat(producto.precio),
      categoria: producto.tipo_producto || 'caballero',
      imagen: producto.imagen || 'https://via.placeholder.com/200x200/0066cc/ffffff?text=Producto',
      colores: producto.color_nombre ? [producto.color_nombre] : ['Azul', 'Rojo', 'Verde', 'Negro'],
      tallas: producto.talla_nombre ? [producto.talla_nombre] : ['S', 'M', 'L', 'XL'],
      meta: {
        material: "Algodón 95%",
        origen: "Colombia",
        garantia: "30 días"
      }
    }));

    res.json(productos);
  });
};

// Obtener producto por ID
const obtenerProductoPorId = (req, res) => {
  const { id } = req.params;
  
  const query = `
    SELECT 
      p.id,
      p.referencia,
      p.nombre,
      p.descripcion,
      p.precio,
      p.imagen,
      p.tipo_producto,
      c.nombre as categoria_nombre,
      t.nombre as talla_nombre,
      col.nombre as color_nombre
    FROM productos p
    LEFT JOIN categorias c ON p.categoria_id = c.id
    LEFT JOIN tallas t ON p.tallas_id = t.id
    LEFT JOIN colores col ON p.color_id = col.id
    WHERE p.id = ?
  `;

  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error al obtener producto:', err);
      return res.status(500).json({ 
        error: 'Error interno del servidor',
        message: err.message 
      });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    const producto = results[0];
    const productoFormateado = {
      id: producto.id,
      nombre: producto.nombre,
      precio: parseFloat(producto.precio),
      categoria: producto.tipo_producto || 'caballero',
      imagen: producto.imagen || 'https://via.placeholder.com/200x200/0066cc/ffffff?text=Producto',
      colores: producto.color_nombre ? [producto.color_nombre] : ['Azul', 'Rojo', 'Verde', 'Negro'],
      tallas: producto.talla_nombre ? [producto.talla_nombre] : ['S', 'M', 'L', 'XL'],
      meta: {
        material: "Algodón 95%",
        origen: "Colombia",
        garantia: "30 días"
      }
    };

    res.json(productoFormateado);
  });
};

// Obtener productos por categoría
const obtenerProductosPorCategoria = (req, res) => {
  const { categoria } = req.params;
  
  const query = `
    SELECT 
      p.id,
      p.referencia,
      p.nombre,
      p.descripcion,
      p.precio,
      p.imagen,
      p.tipo_producto,
      c.nombre as categoria_nombre,
      t.nombre as talla_nombre,
      col.nombre as color_nombre
    FROM productos p
    LEFT JOIN categorias c ON p.categoria_id = c.id
    LEFT JOIN tallas t ON p.tallas_id = t.id
    LEFT JOIN colores col ON p.color_id = col.id
    WHERE p.tipo_producto = ?
    ORDER BY p.id
  `;

  db.query(query, [categoria], (err, results) => {
    if (err) {
      console.error('Error al obtener productos por categoría:', err);
      return res.status(500).json({ 
        error: 'Error interno del servidor',
        message: err.message 
      });
    }

    const productos = results.map(producto => ({
      id: producto.id,
      nombre: producto.nombre,
      precio: parseFloat(producto.precio),
      categoria: producto.tipo_producto || 'caballero',
      imagen: producto.imagen || 'https://via.placeholder.com/200x200/0066cc/ffffff?text=Producto',
      colores: producto.color_nombre ? [producto.color_nombre] : ['Azul', 'Rojo', 'Verde', 'Negro'],
      tallas: producto.talla_nombre ? [producto.talla_nombre] : ['S', 'M', 'L', 'XL'],
      meta: {
        material: "Algodón 95%",
        origen: "Colombia",
        garantia: "30 días"
      }
    }));

    res.json(productos);
  });
};

module.exports = {
  obtenerProductos,
  obtenerProductoPorId,
  obtenerProductosPorCategoria
}; 