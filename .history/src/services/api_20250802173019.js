const API_URL = 'http://localhost:3001/api';

// Función para obtener todos los productos
export const obtenerProductos = async () => {
  try {
    const response = await fetch(`${API_URL}/productos`);
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
    const response = await fetch(`${API_URL}/productos/categoria/${categoria}`);
    if (!response.ok) {
      throw new Error('Error al obtener productos por categoría');
    }
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

// Función para obtener productos con colores y tallas específicos por categoría
export const obtenerProductosConVariantes = async (categoria) => {
  try {
    const response = await fetch(`${API_URL}/productos/variantes/${categoria}`);
    if (!response.ok) {
      throw new Error('Error al obtener productos con variantes');
    }
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

// Función para obtener un producto por ID
export const obtenerProductoPorId = async (id) => {
  try {
    const response = await fetch(`${API_URL}/productos/${id}`);
    if (!response.ok) {
      throw new Error('Error al obtener producto');
    }
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

// Función para obtener colores disponibles
export const obtenerColores = async () => {
  try {
    const response = await fetch(`${API_URL}/colores`);
    if (!response.ok) {
      throw new Error('Error al obtener colores');
    }
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

// Función para obtener tallas por categoría
export const obtenerTallasPorCategoria = async (categoria) => {
  try {
    const response = await fetch(`${API_URL}/tallas/${categoria}`);
    if (!response.ok) {
      throw new Error('Error al obtener tallas por categoría');
    }
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}; 