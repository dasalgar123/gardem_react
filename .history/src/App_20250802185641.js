import React, { useState, useEffect } from 'react';
import './App.css';
import Tarjeta from './components/Tarjeta';

function App() {
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [filtroCategoria, setFiltroCategoria] = useState('todos');
  const [promocionActual, setPromocionActual] = useState(0);
  const [mostrarCarrito, setMostrarCarrito] = useState(false);

  const promociones = [
    "Envíos a todo el país! Envíos gratis a Cúcuta centro",
    "Docena de boxers por $74.000",
    "Aprovecha nuestras promociones!"
  ];

  useEffect(() => {
    // Datos de ejemplo
    const productosEjemplo = [
      {
        id: 1,
        nombre: "Boxer Caballero",
        descripcion: "Boxer de algodón premium para caballero",
        precio: 25000,
        categoria: "caballero",
        imagen: "/img/Caballeros/boxer1_1.jpeg",
        colores: ["Azul", "Rojo", "Verde", "Negro"],
        tallas: ["S", "M", "L", "XL"]
      },
      {
        id: 2,
        nombre: "Boxer Caballero 2",
        descripcion: "Boxer deportivo para caballero",
        precio: 28000,
        categoria: "caballero",
        imagen: "/img/Caballeros/boxer1_2.jpeg",
        colores: ["Azul", "Rojo", "Verde", "Negro"],
        tallas: ["S", "M", "L", "XL"]
      },
      {
        id: 3,
        nombre: "Boxer Caballero 3",
        descripcion: "Boxer clásico para caballero",
        precio: 22000,
        categoria: "caballero",
        imagen: "/img/Caballeros/boxer1_3.jpeg",
        colores: ["Azul", "Rojo", "Verde", "Negro"],
        tallas: ["S", "M", "L", "XL"]
      },
      {
        id: 4,
        nombre: "Conjunto Dama 1",
        descripcion: "Conjunto deportivo para dama",
        precio: 35000,
        categoria: "dama",
        imagen: "/img/Damas/damas1.jpg",
        colores: ["Rosa", "Azul", "Negro", "Blanco"],
        tallas: ["S", "M", "L"]
      },
      {
        id: 5,
        nombre: "Conjunto Dama 2",
        descripcion: "Conjunto elegante para dama",
        precio: 38000,
        categoria: "dama",
        imagen: "/img/Damas/damas2.jpg",
        colores: ["Rosa", "Azul", "Negro", "Blanco"],
        tallas: ["S", "M", "L"]
      },
      {
        id: 6,
        nombre: "Conjunto Dama 3",
        descripcion: "Conjunto casual para dama",
        precio: 32000,
        categoria: "dama",
        imagen: "/img/Damas/damas3.jpeg",
        colores: ["Rosa", "Azul", "Negro", "Blanco"],
        tallas: ["S", "M", "L"]
      },
      {
        id: 7,
        nombre: "Boxer Niño 1",
        descripcion: "Boxer divertido para niños",
        precio: 20000,
        categoria: "nino",
        imagen: "/img/Niños/boxer3_1.jpeg",
        colores: ["Azul", "Rojo", "Verde", "Amarillo"],
        tallas: ["XS", "S", "M", "L"]
      },
      {
        id: 8,
        nombre: "Boxer Niño 2",
        descripcion: "Boxer deportivo para niños",
        precio: 22000,
        categoria: "nino",
        imagen: "/img/Niños/boxer3_2.jpeg",
        colores: ["Azul", "Rojo", "Verde", "Amarillo"],
        tallas: ["XS", "S", "M", "L"]
      },
      {
        id: 9,
        nombre: "Boxer Niño 3",
        descripcion: "Boxer cómodo para niños",
        precio: 18000,
        categoria: "nino",
        imagen: "/img/Niños/boxer3_3.jpeg",
        colores: ["Azul", "Rojo", "Verde", "Amarillo"],
        tallas: ["XS", "S", "M", "L"]
      },
      {
        id: 10,
        nombre: "Conjunto Niña 1",
        descripcion: "Conjunto deportivo para niñas",
        precio: 30000,
        categoria: "ninas",
        imagen: "/img/Niñas/nina2.jpg",
        colores: ["Rosa", "Azul", "Negro", "Blanco"],
        tallas: ["XS", "S", "M", "L"]
      },
      {
        id: 11,
        nombre: "Conjunto Niña 2",
        descripcion: "Conjunto elegante para niñas",
        precio: 32000,
        categoria: "ninas",
        imagen: "/img/Niñas/niña1.jpg",
        colores: ["Rosa", "Azul", "Negro", "Blanco"],
        tallas: ["XS", "S", "M", "L"]
      },
      {
        id: 12,
        nombre: "Conjunto Niña 3",
        descripcion: "Conjunto casual para niñas",
        precio: 28000,
        categoria: "ninas",
        imagen: "/img/Niñas/niña3.jpeg",
        colores: ["Rosa", "Azul", "Negro", "Blanco"],
        tallas: ["XS", "S", "M", "L"]
      },
      {
        id: 13,
        nombre: "Boxer Unisex 1",
        descripcion: "Boxer deportivo unisex",
        precio: 25000,
        categoria: "unisex",
        imagen: "/img/Unixes/boxer6_1.jpg",
        colores: ["Azul", "Rojo", "Verde", "Negro"],
        tallas: ["S", "M", "L", "XL"]
      },
      {
        id: 14,
        nombre: "Boxer Unisex 2",
        descripcion: "Boxer cómodo unisex",
        precio: 23000,
        categoria: "unisex",
        imagen: "/img/Unixes/boxer6_2.jpg",
        colores: ["Azul", "Rojo", "Verde", "Negro"],
        tallas: ["S", "M", "L", "XL"]
      },
      {
        id: 15,
        nombre: "Boxer Unisex 3",
        descripcion: "Boxer clásico unisex",
        precio: 27000,
        categoria: "unisex",
        imagen: "/img/Unixes/boxer6_3.jpg",
        colores: ["Azul", "Rojo", "Verde", "Negro"],
        tallas: ["S", "M", "L", "XL"]
      }
    ];
    
    setProductos(productosEjemplo);
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

  const totalItems = carrito.reduce((total, item) => total + item.cantidad, 0);

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
          <button 
            className={filtroCategoria === 'ninas' ? 'activo' : ''}
            onClick={() => setFiltroCategoria('ninas')}
          >
            Niñas
          </button>
          <button 
            className={filtroCategoria === 'unisex' ? 'activo' : ''}
            onClick={() => setFiltroCategoria('unisex')}
          >
            Unisex
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
                  const mensaje = `Hola! Quiero hacer un pedido:\n${carrito.map(item => 
                    `${item.nombre} - ${item.color} - ${item.talla} x${item.cantidad} = $${(item.precio * item.cantidad).toLocaleString()}`
                  ).join('\n')}\n\nTotal: $${carrito.reduce((total, item) => total + (item.precio * item.cantidad), 0).toLocaleString()}`;
                  window.open(`https://wa.me/573001234567?text=${encodeURIComponent(mensaje)}`);
                }}
              >
                Enviar Pedido por WhatsApp
              </button>
            </>
          ) : (
            <p>El carrito está vacío</p>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
