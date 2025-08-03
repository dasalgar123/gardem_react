import React, { useState, useEffect } from 'react';
import './App.css';
import { obtenerProductos } from './services/api';
import Tarjeta from './components/Tarjeta';

function App() {
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [filtroCategoria, setFiltroCategoria] = useState('todos');
  const [promocionActual, setPromocionActual] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const promociones = [
    "Envíos a todo el país! Envíos gratis a Cúcuta centro",
    "Docena de boxers por $74.000",
    "Aprovecha nuestras promociones!"
  ];

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        setLoading(true);
        const data = await obtenerProductos();
        setProductos(data);
        setError(null);
      } catch (err) {
        console.error('Error cargando productos:', err);
        setError('Error al cargar productos');
      } finally {
        setLoading(false);
      }
    };

    cargarProductos();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setPromocionActual((prev) => (prev + 1) % promociones.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [promociones.length]);

  const agregarAlCarrito = (producto, colorSeleccionado, tallaSeleccionada, cantidad) => {
    const itemExistente = carrito.find(
      item => item.id === producto.id && 
      item.color === colorSeleccionado && 
      item.talla === tallaSeleccionada
    );

    if (itemExistente) {
      setCarrito(carrito.map(item =>
        item.id === producto.id && 
        item.color === colorSeleccionado && 
        item.talla === tallaSeleccionada
          ? { ...item, cantidad: item.cantidad + cantidad }
          : item
      ));
    } else {
      setCarrito([...carrito, {
        ...producto,
        color: colorSeleccionado,
        talla: tallaSeleccionada,
        cantidad
      }]);
    }
  };

  const productosFiltrados = filtroCategoria === 'todos' 
    ? productos 
    : productos.filter(producto => producto.categoria === filtroCategoria);

  if (loading) {
    return <div className="App">Cargando productos...</div>;
  }

  if (error) {
    return <div className="App">Error: {error}</div>;
  }

  return (
    <div className="App">
      <header className="header">
        <h1 className="logo">GARDEM</h1>
        <div className="carrusel-container">
          <div className="carrusel-promociones">
            <div className="promocion-activa">
              {promociones[promocionActual]}
            </div>
          </div>
        </div>
      </header>

      <div className="filtros">
        <div className="filtro-categorias">
          <button 
            className={filtroCategoria === 'todos' ? 'activo' : ''}
            onClick={() => setFiltroCategoria('todos')}
          >
            Todos
          </button>
          <button 
            className={filtroCategoria === 'caballero' ? 'activo' : ''}
            onClick={() => setFiltroCategoria('caballero')}
          >
            Caballero
          </button>
          <button 
            className={filtroCategoria === 'dama' ? 'activo' : ''}
            onClick={() => setFiltroCategoria('dama')}
          >
            Dama
          </button>
          <button 
            className={filtroCategoria === 'nino' ? 'activo' : ''}
            onClick={() => setFiltroCategoria('nino')}
          >
            Niño
          </button>
        </div>
      </div>

      <div className="productos-grid">
        {productosFiltrados.map(producto => (
          <Tarjeta 
            key={producto.id} 
            producto={producto} 
            onAgregarAlCarrito={agregarAlCarrito}
          />
        ))}
      </div>

      {carrito.length > 0 && (
        <div className="carrito">
          <h3>Carrito de Compras</h3>
          {carrito.map((item, index) => (
            <div key={index} className="carrito-item">
              <span>{item.nombre} - {item.color} - {item.talla} x{item.cantidad}</span>
              <span>${(item.precio * item.cantidad).toLocaleString()}</span>
            </div>
          ))}
          <div className="carrito-total">
            <strong>Total: ${carrito.reduce((total, item) => total + (item.precio * item.cantidad), 0).toLocaleString()}</strong>
          </div>
          <button 
            className="btn-whatsapp"
            onClick={() => {
              const mensaje = `Hola! Quiero hacer un pedido:\n${carrito.map(item => 
                `${item.nombre} - ${item.color} - ${item.talla} x${item.cantidad} = $${(item.precio * item.cantidad).toLocaleString()}`
              ).join('\n')}\n\nTotal: $${carrito.reduce((total, item) => total + (item.precio * item.cantidad), 0).toLocaleString()}`;
              window.open(`https://wa.me/573001234567?text=${encodeURIComponent(mensaje)}`);
            }}
          >
            Enviar Pedido por WhatsApp
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
