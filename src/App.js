import React, { useState, useEffect } from 'react';
import './App.css';
import Tarjeta from './components/Tarjeta';
import Pedido from './components/Pedido';
import Navbar from './components/Navbar';
import Titulo from './components/Titulo';
import Carrusel from './components/Carrusel';

import { getProductos, getProductosPorCategoria, crearPedido } from './services/api';
import productosData from './data/productos.json';
import mensajesData from './data/mensajes.json';

function App() {
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [filtroCategoria, setFiltroCategoria] = useState('todos');
  const [mostrarCarrito, setMostrarCarrito] = useState(false);
  const [mostrarCheckout, setMostrarCheckout] = useState(false);

  const promociones = mensajesData;

  useEffect(() => {
    const cargarProductos = async () => {
      // Usar datos del JSON importado
      setProductos(productosData);
    };

    cargarProductos();
  }, []);



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

  const limpiarCarrito = () => {
    setCarrito([]);
  };

  const cerrarCheckout = () => { setMostrarCheckout(false);};



  const productosFiltrados = productos
    .filter(producto => {
      // Filtro por categoría
      const categoriaMatch = filtroCategoria === 'todos' || producto.categoria === filtroCategoria;
      
      return categoriaMatch;
    });

  const totalItems = carrito.reduce((total, item) => total + item.cantidad, 0);

  return (
    <div className="App">
      {/* Título */}
      <Titulo />

      {/* Promociones Banner */}
      <Carrusel promociones={promociones} />

      {/* Navbar */}
      <Navbar 
        filtroCategoria={filtroCategoria}
        onFiltroChange={setFiltroCategoria}
      />

      <div className="productos-grid">
        {productosFiltrados.map(producto => (
          <Tarjeta 
            key={producto.id} 
            producto={producto} 
            onAgregarAlCarrito={agregarAlCarrito}
          />
        ))}
      </div>

      {/* Icono flotante del carrito */}
      <div className="carrito-flotante" onClick={() => setMostrarCarrito(!mostrarCarrito)}>
        <span className="carrito-icono">🛒</span>
        {totalItems > 0 && (
          <span className="carrito-contador">{totalItems}</span>
        )}
      </div>

      {/* Carrito desplegable */}
      {mostrarCarrito && (
        <div className="carrito">
          <h3>Carrito de Compras</h3>
          {carrito.length > 0 ? (
            <>
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
                  setMostrarCarrito(false);
                  setMostrarCheckout(true);
                }}
              >
                Completar Pedido
              </button>
            </>
          ) : (
            <p>El carrito está vacío</p>
          )}
        </div>
      )}

            {/* Componente Pedido */}
      <Pedido
        carrito={carrito}
        onClose={cerrarCheckout}
        onClearCart={limpiarCarrito}
        isVisible={mostrarCheckout}
      />
    </div>
  );
}

export default App; 