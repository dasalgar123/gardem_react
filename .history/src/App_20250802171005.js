import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  // Estado para el carrito de compras
  const [carrito, setCarrito] = useState([]);
  const [filtroCategoria, setFiltroCategoria] = useState('Todas los Productos');
  const [promocionActual, setPromocionActual] = useState(0);

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

  // Datos de productos de Gardem
  const productos = [
    {
      id: 1,
      nombre: "Boxer Clásico",
      precio: 1000,
      categoria: "caballero",
      imagen: "https://via.placeholder.com/200x200/0066cc/ffffff?text=Boxer+Azul",
      colores: ["Azul", "Rojo", "Verde", "Negro"],
      tallas: ["S", "M", "L", "XL"]
    },
    {
      id: 2,
      nombre: "Boxer Clásico",
      precio: 5000,
      categoria: "caballero", 
      imagen: "https://via.placeholder.com/200x200/cc0000/ffffff?text=Boxer+Rojo",
      colores: ["Azul", "Rojo", "Verde", "Negro"],
      tallas: ["S", "M", "L", "XL"]
    },
    {
      id: 3,
      nombre: "conjunto Deportivo Niña",
      precio: 5000,
      categoria: "niña",
      imagen: "https://via.placeholder.com/200x200/ff99cc/ffffff?text=Conjunto+Niña",
      colores: ["Rosa", "Azul", "Verde"],
      tallas: ["XS", "S", "M", "L"]
    },
    {
      id: 4,
      nombre: "Boxer Unisex Básico",
      precio: 5000,
      categoria: "caballero",
      imagen: "https://via.placeholder.com/200x200/99cc00/ffffff?text=Boxer+Verde",
      colores: ["Azul", "Rojo", "Verde", "Negro"],
      tallas: ["S", "M", "L", "XL"]
    },
    {
      id: 5,
      nombre: "Boxer Clásico",
      precio: 5000,
      categoria: "caballero",
      imagen: "https://via.placeholder.com/200x200/00cc00/ffffff?text=Boxer+Verde",
      colores: ["Azul", "Rojo", "Verde", "Negro"],
      tallas: ["S", "M", "L", "XL"]
    },
    {
      id: 6,
      nombre: "Boxer Unisex Básico",
      precio: 5000,
      categoria: "caballero",
      imagen: "https://via.placeholder.com/200x200/00cccc/ffffff?text=Boxer+Teal",
      colores: ["Azul", "Rojo", "Verde", "Negro"],
      tallas: ["S", "M", "L", "XL"]
    },
    {
      id: 7,
      nombre: "Boxer Clásico niño",
      precio: 5000,
      categoria: "niño",
      imagen: "https://via.placeholder.com/200x200/6699ff/ffffff?text=Boxer+Niño",
      colores: ["Azul", "Rojo", "Verde", "Negro"],
      tallas: ["XS", "S", "M", "L"]
    },
    {
      id: 8,
      nombre: "Boxer Clásico caballero",
      precio: 5000,
      categoria: "caballero",
      imagen: "https://via.placeholder.com/200x200/003366/ffffff?text=Boxer+Azul+Oscuro",
      colores: ["Azul", "Rojo", "Verde", "Negro"],
      tallas: ["S", "M", "L", "XL"]
    },
    {
      id: 9,
      nombre: "top algodon",
      precio: 10000,
      categoria: "dama",
      imagen: "https://via.placeholder.com/200x200/ffcc99/ffffff?text=Top+Algodón",
      colores: ["Rosa", "Azul", "Verde", "Negro"],
      tallas: ["XS", "S", "M", "L", "XL"]
    },
    {
      id: 10,
      nombre: "top niña",
      precio: 10000,
      categoria: "niña",
      imagen: "https://via.placeholder.com/200x200/ff99cc/ffffff?text=Top+Niña",
      colores: ["Rosa", "Azul", "Verde", "Amarillo"],
      tallas: ["XS", "S", "M", "L"]
    },
    {
      id: 11,
      nombre: "pantalon",
      precio: 5000,
      categoria: "caballero",
      imagen: "https://via.placeholder.com/200x200/999999/ffffff?text=Pantalón",
      colores: ["Negro", "Azul", "Gris"],
      tallas: ["S", "M", "L", "XL"]
    }
  ];

  // Filtrar productos por categoría
  const productosFiltrados = filtroCategoria === 'Todas los Productos' 
    ? productos 
    : productos.filter(p => p.categoria === filtroCategoria);

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

      {/* Grid de Productos */}
      <div className="productos-grid">
        {productosFiltrados.map((producto) => (
          <ProductoCard 
            key={producto.id}
            producto={producto}
            onAgregar={agregarAlCarrito}
          />
        ))}
      </div>

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

  const handleAgregar = () => {
    onAgregar(producto, color, talla, cantidad);
  };

  return (
    <div className="producto-card">
      <img src={producto.imagen} alt={producto.nombre} />
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
