const db = require('../config/database');

// Función para revisar la estructura de la tabla productos
const revisarEstructuraProductos = (req, res) => {
  const query = `
    DESCRIBE productos
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error al revisar estructura:', err);
      return res.status(500).json({ 
        error: 'Error interno del servidor',
        message: err.message 
      });
    }

    res.json({
      message: 'Estructura de la tabla productos',
      estructura: results
    });
  });
};

// Función para obtener algunos productos de ejemplo
const obtenerProductosEjemplo = (req, res) => {
  const query = `
    SELECT * FROM productos LIMIT 5
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener productos ejemplo:', err);
      return res.status(500).json({ 
        error: 'Error interno del servidor',
        message: err.message 
      });
    }

    res.json({
      message: 'Productos de ejemplo',
      productos: results
    });
  });
};

// Obtener todos los productos - CONSULTA SIMPLE
const obtenerProductos = (req, res) => {
  const query = `SELECT * FROM productos`;

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
      colores: ['Azul', 'Rojo', 'Verde', 'Negro'],
      tallas: ['S', 'M', 'L', 'XL'],
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

// Obtener productos por categoría - CONSULTA SIMPLE
const obtenerProductosPorCategoria = (req, res) => {
  const { categoria } = req.params;
  
  const query = `SELECT * FROM productos WHERE tipo_producto = ?`;

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
      colores: ['Azul', 'Rojo', 'Verde', 'Negro'],
      tallas: ['S', 'M', 'L', 'XL'],
      meta: {
        material: "Algodón 95%",
        origen: "Colombia",
        garantia: "30 días"
      }
    }));

    res.json(productos);
  });
};

// Obtener colores disponibles
const obtenerColores = (req, res) => {
  const query = 'SELECT id, nombre FROM colores ORDER BY nombre';
  
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener colores:', err);
      return res.status(500).json({ 
        error: 'Error interno del servidor',
        message: err.message 
      });
    }

    res.json(results);
  });
};

// Obtener tallas por categoría
const obtenerTallasPorCategoria = (req, res) => {
  const { categoria } = req.params;
  
  // Mapear categorías de frontend a categorías de base de datos
  const categoriaMap = {
    'caballero': 'Hombres',
    'dama': 'Mujeres', 
    'niño': 'Niños',
    'niña': 'Niñas'
  };
  
  const categoriaDB = categoriaMap[categoria] || 'Hombres';
  
  const query = 'SELECT id, nombre FROM tallas WHERE categoria = ? ORDER BY nombre';
  
  db.query(query, [categoriaDB], (err, results) => {
    if (err) {
      console.error('Error al obtener tallas por categoría:', err);
      return res.status(500).json({ 
        error: 'Error interno del servidor',
        message: err.message 
      });
    }

    res.json(results);
  });
};

// Obtener productos con colores y tallas específicos por categoría
const obtenerProductosConVariantes = (req, res) => {
  const { categoria } = req.params;
  
  // Primero obtener los productos de la categoría
  const productosQuery = `
    SELECT 
      p.id,
      p.referencia,
      p.nombre,
      p.descripcion,
      p.precio,
      p.imagen,
      p.tipo_producto
    FROM productos p
    WHERE p.tipo_producto = ?
    ORDER BY p.id
  `;

  db.query(productosQuery, [categoria], async (err, productos) => {
    if (err) {
      console.error('Error al obtener productos:', err);
      return res.status(500).json({ 
        error: 'Error interno del servidor',
        message: err.message 
      });
    }

    try {
      // Obtener colores disponibles
      const coloresQuery = 'SELECT id, nombre FROM colores ORDER BY nombre';
      const colores = await new Promise((resolve, reject) => {
        db.query(coloresQuery, (err, results) => {
          if (err) reject(err);
          else resolve(results);
        });
      });

      // Obtener tallas por categoría
      const categoriaMap = {
        'caballero': 'Hombres',
        'dama': 'Mujeres', 
        'niño': 'Niños',
        'niña': 'Niñas'
      };
      
      const categoriaDB = categoriaMap[categoria] || 'Hombres';
      const tallasQuery = 'SELECT id, nombre FROM tallas WHERE categoria = ? ORDER BY nombre';
      const tallas = await new Promise((resolve, reject) => {
        db.query(tallasQuery, [categoriaDB], (err, results) => {
          if (err) reject(err);
          else resolve(results);
        });
      });

      // Formatear productos con colores y tallas
      const productosFormateados = productos.map(producto => ({
        id: producto.id,
        nombre: producto.nombre,
        precio: parseFloat(producto.precio),
        categoria: producto.tipo_producto || 'caballero',
        imagen: producto.imagen || 'https://via.placeholder.com/200x200/0066cc/ffffff?text=Producto',
        colores: colores.map(c => c.nombre),
        tallas: tallas.map(t => t.nombre),
        meta: {
          material: "Algodón 95%",
          origen: "Colombia",
          garantia: "30 días"
        }
      }));

      res.json(productosFormateados);
    } catch (error) {
      console.error('Error al obtener variantes:', error);
      res.status(500).json({ 
        error: 'Error interno del servidor',
        message: error.message 
      });
    }
  });
};

module.exports = {
  revisarEstructuraProductos,
  obtenerProductosEjemplo,
  obtenerProductos,
  obtenerProductoPorId,
  obtenerProductosPorCategoria,
  obtenerColores,
  obtenerTallasPorCategoria,
  obtenerProductosConVariantes
}; 