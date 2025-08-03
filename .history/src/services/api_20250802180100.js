const API_URL = 'http://localhost/backend';

// Función para obtener todos los productos
export const obtenerProductos = async () => {
  try {
    const response = await fetch(`${API_URL}/index.php/api/productos`);
    if (!response.ok) {
      throw new Error('Error al obtener productos');
    }
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

// Función para obtener productos por categoría
export const obtenerProductosPorCategoria = async (categoria) => {
  try {
    const response = await fetch(`${API_URL}/index.php/api/productos/categoria/${categoria}`);
    if (!response.ok) {
      throw new Error('Error al obtener productos por categoría');
    }
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}; 