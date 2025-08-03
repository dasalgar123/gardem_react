const API_BASE_URL = 'http://localhost:5000/api';

// Función para hacer peticiones a la API
const apiRequest = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error en petición API:', error);
    throw error;
  }
};

// Obtener todos los productos
export const getProductos = async () => {
  return await apiRequest('/productos');
};

// Obtener productos por categoría
export const getProductosPorCategoria = async (categoria) => {
  return await apiRequest(`/productos/categoria/${categoria}`);
};

// Obtener categorías
export const getCategorias = async () => {
  return await apiRequest('/categorias');
};

// Obtener colores
export const getColores = async () => {
  return await apiRequest('/colores');
};

// Obtener tallas por categoría
export const getTallasPorCategoria = async (categoria) => {
  return await apiRequest(`/tallas/categoria/${categoria}`);
};

// Crear pedido
export const crearPedido = async (cliente, items) => {
  return await apiRequest('/pedidos', {
    method: 'POST',
    body: JSON.stringify({ cliente, items }),
  });
}; 