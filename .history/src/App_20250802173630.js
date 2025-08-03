import React, { useState, useEffect } from 'react';
import './App.css';
import { obtenerProductos, obtenerProductosPorCategoria } from './services/api';

function App() {
  // Estado para el carrito de compras
  const [carrito, setCarrito] = useState([]);
  const [filtroCategoria, setFiltroCategoria] = useState('Todas los Productos');
  const [promocionActual, setPromocionActual] = useState(0);
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Promociones para el carrusel
  const promociones = [
    "Envíos a todo el país!",
    "Envíos gratis a Cúcuta centro",
    "Docena de boxers por $74.000",
    "Aprovecha nuestras promociones!"
  ];

  // Carrusel automático de promociones
  useEffect(() => {
    const interval = setInterval(() => {
      setPromocionActual((prev) => (prev + 1) % promociones.length);
    }, 3000); // Cambia cada 3 segundos

    return () => clearInterval(interval);
  }, [promociones.length]);

  // Cargar productos desde la API
  useEffect(() => {
    const cargarProductos = async () => {
      try {
        setLoading(true);
        const data = await obtenerProductos();
        setProductos(data);
        setError(null);
      } catch (err) {
        console.error('Error cargando productos:', err);
        setError('Error al cargar los productos. Verifica que el backend esté funcionando.');
      } finally {
        setLoading(false);
      }
    };

    cargarProductos();
  }, []);

  // Cargar productos por categoría
  useEffect(() => {
    const cargarProductosPorCategoria = async () => {
      if (filtroCategoria === 'Todas los Productos') {
        try {
          setLoading(true);
          const data = await obtenerProductos();
          setProductos(data);
          setError(null);
        } catch (err) {
          console.error('Error cargando productos:', err);
          setError('Error al cargar los productos.');
        } finally {
          setLoading(false);
        }
      } else {
        try {
          setLoading(true);
          const data = await obtenerProductosPorCategoria(filtroCategoria);
          setProductos(data);
          setError(null);
        } catch (err) {
          console.error('Error cargando productos por categoría:', err);
          setError('Error al cargar los productos por categoría.');
        } finally {
          setLoading(false);
        }
      }
    };

    cargarProductosPorCategoria();
  }, [filtroCategoria]);

  // Agregar producto al carrito
  const agregarAlCarrito = (producto, color, talla, cantidad) => {
    const item = {
      ...producto,
      color,
      talla,
      cantidad: parseInt(cantidad)
    };
    setCarrito([...carrito, item]);
  };

  // Calcular total del carrito
  const totalCarrito = carrito.reduce((total, item) => total + (item.precio * item.cantidad), 0);

  return (
    <div className="App">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <h1 className="logo">GARDEM</h1>
        </div>
      </header>

      {/* Carrusel de Promociones */}
      <div className="carrusel-container">
        <div className="carrusel-promociones">
          <p className="promocion-activa">{promociones[promocionActual]}</p>
        </div>
      </div>

      {/* Filtros */}
      <div className="filtros">
        <div className="filtro-categorias">
          <button 
            className={filtroCategoria === 'Todas los Productos' ? 'activo' : ''}
            onClick={() => setFiltroCategoria('Todas los Productos')}
          >
            Todas los Productos
          </button>
          <button 
            className={filtroCategoria === 'caballero' ? 'activo' : ''}
            onClick={() => setFiltroCategoria('caballero')}
          >
            caballero
          </button>
          <button 
            className={filtroCategoria === 'dama' ? 'activo' : ''}
            onClick={() => setFiltroCategoria('dama')}
          >
            dama
          </button>
          <button 
            className={filtroCategoria === 'niño' ? 'activo' : ''}
            onClick={() => setFiltroCategoria('niño')}
          >
            niño
          </button>
          <button 
            className={filtroCategoria === 'niña' ? 'activo' : ''}
            onClick={() => setFiltroCategoria('niña')}
          >
            niña
          </button>
        </div>
        <div className="filtro-extra">
          <span>Filtrar por:</span>
          <select>
            <option>Precio</option>
            <option>Nombre</option>
          </select>
        </div>
      </div>

      {/* Mensaje de error */}
      {error && (
        <div className="error-message">
          <p>{error}</p>
          <p>Asegúrate de que el backend esté corriendo en http://localhost:3001</p>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="loading">
          <p>Cargando productos...</p>
        </div>
      )}

      {/* Grid de Productos */}
      {!loading && !error && (
        <div className="productos-grid">
          {productos.map((producto) => (
            <ProductoCard 
              key={producto.id}
              producto={producto}
              onAgregar={agregarAlCarrito}
            />
          ))}
        </div>
      )}

      {/* Carrito */}
      {carrito.length > 0 && (
        <div className="carrito">
          <h3>Tu Pedido ({carrito.length} productos)</h3>
          <div className="carrito-items">
            {carrito.map((item, index) => (
              <div key={index} className="carrito-item">
                <img src={item.imagen} alt={item.nombre} />
                <div>
                  <h4>{item.nombre}</h4>
                  <p>Color: {item.color} | Talla: {item.talla}</p>
                  <p>Cantidad: {item.cantidad}</p>
                  <p>Precio: ${item.precio.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="carrito-total">
            <h4>Total: ${totalCarrito.toLocaleString()}</h4>
            <button className="btn-whatsapp">
              Enviar Pedido por WhatsApp
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Componente ProductoCard
function ProductoCard({ producto, onAgregar }) {
  const [color, setColor] = useState(producto.colores[0]);
  const [talla, setTalla] = useState(producto.tallas[0]);
  const [cantidad, setCantidad] = useState(1);
  const [mostrarMeta, setMostrarMeta] = useState(false);

  const handleAgregar = () => {
    onAgregar(producto, color, talla, cantidad);
  };

  return (
    <div className="producto-card">
      <div className="producto-imagen-container">
        <img src={producto.imagen} alt={producto.nombre} />
        <div className="meta-overlay" onClick={() => setMostrarMeta(!mostrarMeta)}>
          <span className="meta-icon">ℹ️</span>
        </div>
        {mostrarMeta && (
          <div className="meta-info">
            <h4>Información del Producto</h4>
            <p><strong>Material:</strong> {producto.meta.material}</p>
            <p><strong>Origen:</strong> {producto.meta.origen}</p>
            <p><strong>Garantía:</strong> {producto.meta.garantia}</p>
            <button className="cerrar-meta" onClick={() => setMostrarMeta(false)}>
              ✕
            </button>
          </div>
        )}
      </div>
      <h3>{producto.nombre}</h3>
      
      <div className="producto-opciones">
        <div className="opcion">
          <label>Color:</label>
          <select value={color} onChange={(e) => setColor(e.target.value)}>
            {producto.colores.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        
        <div className="opcion">
          <label>Talla:</label>
          <select value={talla} onChange={(e) => setTalla(e.target.value)}>
            {producto.tallas.map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
        
        <div className="opcion">
          <label>Cantidad:</label>
          <div className="cantidad-control">
            <button onClick={() => setCantidad(Math.max(1, cantidad - 1))}>-</button>
            <span>{cantidad}</span>
            <button onClick={() => setCantidad(cantidad + 1)}>+</button>
          </div>
        </div>
      </div>
      
      <div className="producto-precio">
        <span className="precio">${producto.precio.toLocaleString()}</span>
      </div>
      
      <button className="btn-agregar" onClick={handleAgregar}>
        AGREGAR AL PEDIDO
      </button>
    </div>
  );
}

export default App;
