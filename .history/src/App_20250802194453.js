import React, { useState, useEffect } from 'react';
import './App.css';
import Tarjeta from './components/Tarjeta';
import { getProductos, getProductosPorCategoria, crearPedido } from './services/api';

function App() {
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [filtroCategoria, setFiltroCategoria] = useState('todos');
  const [promocionActual, setPromocionActual] = useState(0);
  const [mostrarCarrito, setMostrarCarrito] = useState(false);
  const [mostrarFormularioPedido, setMostrarFormularioPedido] = useState(false);
  const [datosCliente, setDatosCliente] = useState({
    nombre: '',
    telefono: '',
    direccion: '',
    ciudad: '',
    metodoPago: 'efectivo'
  });

  const promociones = [
    "Envíos a todo el país! Envíos gratis a Cúcuta centro",
    "Docena de boxers por $74.000",
    "Aprovecha nuestras promociones!"
  ];

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const productosData = await getProductos();
        setProductos(productosData);
      } catch (error) {
        console.error('Error al cargar productos:', error);
        // Fallback a datos de ejemplo si la API falla
        const productosEjemplo = [
          {
            id: 1,
            nombre: "Boxer Caballero Clásico",
            descripcion: "Boxer de algodón clásico para caballero",
            precio: 25000,
            categoria: "caballero",
            imagen: "/img/Caballeros/boxer1_1.jpeg",
            colores: ["Azul", "Rojo", "Verde", "Negro"]
          }
        ];
        setProductos(productosEjemplo);
      }
    };

    cargarProductos();
  }, []);
      {
        id: 2,
        nombre: "Boxer Caballero Deportivo",
        descripcion: "Boxer deportivo para caballero",
        precio: 28000,
        categoria: "caballero",
        imagen: "/img/Caballeros/boxer1_2.jpeg",
        colores: ["Azul", "Rojo", "Verde", "Negro"]
      },
      {
        id: 3,
        nombre: "Boxer Caballero Premium",
        descripcion: "Boxer premium para caballero",
        precio: 32000,
        categoria: "caballero",
        imagen: "/img/Caballeros/boxer1_3.jpeg",
        colores: ["Azul", "Rojo", "Verde", "Negro"]
      },
      {
        id: 4,
        nombre: "Boxer Caballero Sin Costura",
        descripcion: "Boxer sin costura para caballero",
        precio: 35000,
        categoria: "caballero",
        imagen: "/img/Caballeros/boxer1_4.jpeg",
        colores: ["Azul", "Rojo", "Verde", "Negro"]
      },
      {
        id: 5,
        nombre: "Boxer Caballero Microfibra",
        descripcion: "Boxer de microfibra deportivo",
        precio: 38000,
        categoria: "caballero",
        imagen: "/img/Caballeros/boxer1_5.jpeg",
        colores: ["Azul", "Rojo", "Verde", "Negro"]
      },
      {
        id: 6,
        nombre: "Boxer Caballero Mezcla Stretch",
        descripcion: "Boxer con mezcla stretch",
        precio: 30000,
        categoria: "caballero",
        imagen: "/img/Caballeros/boxer1_6.jpeg",
        colores: ["Azul", "Rojo", "Verde", "Negro"]
      },
      {
        id: 7,
        nombre: "Boxer Caballero Compresión",
        descripcion: "Boxer con compresión ligera",
        precio: 42000,
        categoria: "caballero",
        imagen: "/img/Caballeros/boxer1_7.jpeg",
        colores: ["Azul", "Rojo", "Verde", "Negro"]
      },
      {
        id: 8,
        nombre: "Boxer Caballero Algodón Premium",
        descripcion: "Boxer de algodón premium",
        precio: 45000,
        categoria: "caballero",
        imagen: "/img/Caballeros/boxer1_8.jpeg",
        colores: ["Azul", "Rojo", "Verde", "Negro"]
      },
      {
        id: 9,
        nombre: "Boxer Caballero Calvin Klein",
        descripcion: "Boxer Calvin Klein original",
        precio: 55000,
        categoria: "caballero",
        imagen: "/img/Caballeros/calvin-klein-4634-5882962-1-catalog-new.webp",
        colores: ["Negro", "Azul", "Gris"]
      },
      {
        id: 10,
        nombre: "Boxer Caballero Modern Air",
        descripcion: "Boxer Modern Air Calvin Klein",
        precio: 58000,
        categoria: "caballero",
        imagen: "/img/Caballeros/calvin-klein-5239-4624962-1-catalog-new.webp",
        colores: ["Negro", "Azul", "Gris"]
      },

      // DAMAS - Conjuntos
      {
        id: 11,
        nombre: "Conjunto Dama Deportivo",
        descripcion: "Conjunto deportivo para dama",
        precio: 35000,
        categoria: "dama",
        imagen: "/img/Damas/damas1.jpg",
        colores: ["Rosa", "Azul", "Negro", "Blanco"]
      },
      {
        id: 12,
        nombre: "Conjunto Dama Elegante",
        descripcion: "Conjunto elegante para dama",
        precio: 38000,
        categoria: "dama",
        imagen: "/img/Damas/damas2.jpg",
        colores: ["Rosa", "Azul", "Negro", "Blanco"]
      },
      {
        id: 13,
        nombre: "Conjunto Dama Casual",
        descripcion: "Conjunto casual para dama",
        precio: 32000,
        categoria: "dama",
        imagen: "/img/Damas/damas3.jpeg",
        colores: ["Rosa", "Azul", "Negro", "Blanco"]
      },
      {
        id: 14,
        nombre: "Conjunto Dama Premium",
        descripcion: "Conjunto premium para dama",
        precio: 42000,
        categoria: "dama",
        imagen: "/img/Damas/damas4.jpeg",
        colores: ["Rosa", "Azul", "Negro", "Blanco"]
      },
      {
        id: 15,
        nombre: "Conjunto Dama Deportivo 2",
        descripcion: "Conjunto deportivo premium",
        precio: 45000,
        categoria: "dama",
        imagen: "/img/Damas/damas5.jpeg",
        colores: ["Rosa", "Azul", "Negro", "Blanco"]
      },
      {
        id: 16,
        nombre: "Conjunto Dama Elegante 2",
        descripcion: "Conjunto elegante premium",
        precio: 48000,
        categoria: "dama",
        imagen: "/img/Damas/damas6.jpeg",
        colores: ["Rosa", "Azul", "Negro", "Blanco"]
      },
      {
        id: 17,
        nombre: "Conjunto Dama Casual 2",
        descripcion: "Conjunto casual premium",
        precio: 40000,
        categoria: "dama",
        imagen: "/img/Damas/damas7.jpeg",
        colores: ["Rosa", "Azul", "Negro", "Blanco"]
      },

      // NIÑOS - Boxers
      {
        id: 18,
        nombre: "Boxer Niño Deportivo",
        descripcion: "Boxer deportivo para niños",
        precio: 20000,
        categoria: "nino",
        imagen: "/img/Niños/boxer3_1.jpeg",
        colores: ["Azul", "Rojo", "Verde", "Amarillo"]
      },
      {
        id: 19,
        nombre: "Boxer Niño Clásico",
        descripcion: "Boxer clásico para niños",
        precio: 18000,
        categoria: "nino",
        imagen: "/img/Niños/boxer3_2.jpeg",
        colores: ["Azul", "Rojo", "Verde", "Amarillo"]
      },
      {
        id: 20,
        nombre: "Boxer Niño Premium",
        descripcion: "Boxer premium para niños",
        precio: 22000,
        categoria: "nino",
        imagen: "/img/Niños/boxer3_3.jpeg",
        colores: ["Azul", "Rojo", "Verde", "Amarillo"]
      },
      {
        id: 21,
        nombre: "Boxer Niño Microfibra",
        descripcion: "Boxer de microfibra para niños",
        precio: 25000,
        categoria: "nino",
        imagen: "/img/Niños/boxer3_4.jpeg",
        colores: ["Azul", "Rojo", "Verde", "Amarillo"]
      },
      {
        id: 22,
        nombre: "Boxer Niño Stretch",
        descripcion: "Boxer con stretch para niños",
        precio: 23000,
        categoria: "nino",
        imagen: "/img/Niños/boxer3_5.jpeg",
        colores: ["Azul", "Rojo", "Verde", "Amarillo"]
      },
      {
        id: 23,
        nombre: "Boxer Niño Compresión",
        descripcion: "Boxer con compresión para niños",
        precio: 28000,
        categoria: "nino",
        imagen: "/img/Niños/boxer3_6.jpeg",
        colores: ["Azul", "Rojo", "Verde", "Amarillo"]
      },
      {
        id: 24,
        nombre: "Boxer Niño Algodón",
        descripcion: "Boxer de algodón para niños",
        precio: 19000,
        categoria: "nino",
        imagen: "/img/Niños/boxer3_7.jpeg",
        colores: ["Azul", "Rojo", "Verde", "Amarillo"]
      },
      {
        id: 25,
        nombre: "Boxer Niño Premium 2",
        descripcion: "Boxer premium especial para niños",
        precio: 26000,
        categoria: "nino",
        imagen: "/img/Niños/boxer3_8.jpeg",
        colores: ["Azul", "Rojo", "Verde", "Amarillo"]
      },
      {
        id: 26,
        nombre: "Boxer Niño Mezcla",
        descripcion: "Boxer con mezcla para niños",
        precio: 24000,
        categoria: "nino",
        imagen: "/img/Niños/boxer5_1.jpeg",
        colores: ["Azul", "Rojo", "Verde", "Amarillo"]
      },
      {
        id: 27,
        nombre: "Boxer Niño Deportivo 2",
        descripcion: "Boxer deportivo especial para niños",
        precio: 27000,
        categoria: "nino",
        imagen: "/img/Niños/boxer5_2.jpeg",
        colores: ["Azul", "Rojo", "Verde", "Amarillo"]
      },
      {
        id: 28,
        nombre: "Boxer Niño Clásico 2",
        descripcion: "Boxer clásico especial para niños",
        precio: 21000,
        categoria: "nino",
        imagen: "/img/Niños/boxer5_3.jpeg",
        colores: ["Azul", "Rojo", "Verde", "Amarillo"]
      },
      {
        id: 29,
        nombre: "Boxer Niño Premium 3",
        descripcion: "Boxer premium especial para niños",
        precio: 29000,
        categoria: "nino",
        imagen: "/img/Niños/boxer5_4.jpeg",
        colores: ["Azul", "Rojo", "Verde", "Amarillo"]
      },
      {
        id: 30,
        nombre: "Boxer Niño Microfibra 2",
        descripcion: "Boxer de microfibra especial",
        precio: 31000,
        categoria: "nino",
        imagen: "/img/Niños/boxer5_5.jpeg",
        colores: ["Azul", "Rojo", "Verde", "Amarillo"]
      },
      {
        id: 31,
        nombre: "Boxer Niño Stretch 2",
        descripcion: "Boxer con stretch especial",
        precio: 25000,
        categoria: "nino",
        imagen: "/img/Niños/boxer5_6.jpeg",
        colores: ["Azul", "Rojo", "Verde", "Amarillo"]
      },
      {
        id: 32,
        nombre: "Boxer Niño Compresión 2",
        descripcion: "Boxer con compresión especial",
        precio: 33000,
        categoria: "nino",
        imagen: "/img/Niños/boxer5_7.jpeg",
        colores: ["Azul", "Rojo", "Verde", "Amarillo"]
      },
      {
        id: 33,
        nombre: "Boxer Niño Algodón 2",
        descripcion: "Boxer de algodón especial",
        precio: 20000,
        categoria: "nino",
        imagen: "/img/Niños/boxer5_8.jpeg",
        colores: ["Azul", "Rojo", "Verde", "Amarillo"]
      },

      // NIÑAS - Conjuntos
      {
        id: 34,
        nombre: "Conjunto Niña Deportivo",
        descripcion: "Conjunto deportivo para niñas",
        precio: 30000,
        categoria: "ninas",
        imagen: "/img/Niñas/nina2.jpg",
        colores: ["Rosa", "Azul", "Negro", "Blanco"]
      },
      {
        id: 35,
        nombre: "Conjunto Niña Elegante",
        descripcion: "Conjunto elegante para niñas",
        precio: 32000,
        categoria: "ninas",
        imagen: "/img/Niñas/niña1.jpg",
        colores: ["Rosa", "Azul", "Negro", "Blanco"]
      },
      {
        id: 36,
        nombre: "Conjunto Niña Casual",
        descripcion: "Conjunto casual para niñas",
        precio: 28000,
        categoria: "ninas",
        imagen: "/img/Niñas/niña3.jpeg",
        colores: ["Rosa", "Azul", "Negro", "Blanco"]
      },
      {
        id: 37,
        nombre: "Conjunto Niña Premium",
        descripcion: "Conjunto premium para niñas",
        precio: 35000,
        categoria: "ninas",
        imagen: "/img/Niñas/niña4.jpeg",
        colores: ["Rosa", "Azul", "Negro", "Blanco"]
      },
      {
        id: 38,
        nombre: "Conjunto Niña Deportivo 2",
        descripcion: "Conjunto deportivo especial para niñas",
        precio: 33000,
        categoria: "ninas",
        imagen: "/img/Niñas/niña5.jpeg",
        colores: ["Rosa", "Azul", "Negro", "Blanco"]
      },
      {
        id: 39,
        nombre: "Conjunto Niña Elegante 2",
        descripcion: "Conjunto elegante especial para niñas",
        precio: 38000,
        categoria: "ninas",
        imagen: "/img/Niñas/niña6.jpg",
        colores: ["Rosa", "Azul", "Negro", "Blanco"]
      },
      {
        id: 40,
        nombre: "Conjunto Niña Casual 2",
        descripcion: "Conjunto casual especial para niñas",
        precio: 31000,
        categoria: "ninas",
        imagen: "/img/Niñas/niña7.jpeg",
        colores: ["Rosa", "Azul", "Negro", "Blanco"]
      },
      {
        id: 41,
        nombre: "Conjunto Niña Premium 2",
        descripcion: "Conjunto premium especial para niñas",
        precio: 42000,
        categoria: "ninas",
        imagen: "/img/Niñas/niña8.jpeg",
        colores: ["Rosa", "Azul", "Negro", "Blanco"]
      },
      {
        id: 42,
        nombre: "Conjunto Niña Deportivo 3",
        descripcion: "Conjunto deportivo premium para niñas",
        precio: 36000,
        categoria: "ninas",
        imagen: "/img/Niñas/niña9.jpg",
        colores: ["Rosa", "Azul", "Negro", "Blanco"]
      },
      {
        id: 43,
        nombre: "Conjunto Niña Elegante 3",
        descripcion: "Conjunto elegante premium para niñas",
        precio: 40000,
        categoria: "ninas",
        imagen: "/img/Niñas/niña10.jpg",
        colores: ["Rosa", "Azul", "Negro", "Blanco"]
      },
      {
        id: 44,
        nombre: "Conjunto Niña Casual 3",
        descripcion: "Conjunto casual premium para niñas",
        precio: 34000,
        categoria: "ninas",
        imagen: "/img/Niñas/niña11.jpg",
        colores: ["Rosa", "Azul", "Negro", "Blanco"]
      },
      {
        id: 45,
        nombre: "Conjunto Niña Premium 3",
        descripcion: "Conjunto premium especial para niñas",
        precio: 45000,
        categoria: "ninas",
        imagen: "/img/Niñas/niña12.jpg",
        colores: ["Rosa", "Azul", "Negro", "Blanco"]
      },
      {
        id: 46,
        nombre: "Conjunto Niña Deportivo 4",
        descripcion: "Conjunto deportivo exclusivo para niñas",
        precio: 39000,
        categoria: "ninas",
        imagen: "/img/Niñas/niña13.jpg",
        colores: ["Rosa", "Azul", "Negro", "Blanco"]
      },
      {
        id: 47,
        nombre: "Conjunto Niña Elegante 4",
        descripcion: "Conjunto elegante exclusivo para niñas",
        precio: 43000,
        categoria: "ninas",
        imagen: "/img/Niñas/niña14.jpg",
        colores: ["Rosa", "Azul", "Negro", "Blanco"]
      },

      // UNISEX - Boxers
      {
        id: 48,
        nombre: "Boxer Unisex Deportivo",
        descripcion: "Boxer deportivo unisex",
        precio: 25000,
        categoria: "unisex",
        imagen: "/img/Unixes/boxer6_1.jpg",
        colores: ["Azul", "Rojo", "Verde", "Negro"]
      },
      {
        id: 49,
        nombre: "Boxer Unisex Cómodo",
        descripcion: "Boxer cómodo unisex",
        precio: 23000,
        categoria: "unisex",
        imagen: "/img/Unixes/boxer6_2.jpg",
        colores: ["Azul", "Rojo", "Verde", "Negro"]
      },
      {
        id: 50,
        nombre: "Boxer Unisex Clásico",
        descripcion: "Boxer clásico unisex",
        precio: 27000,
        categoria: "unisex",
        imagen: "/img/Unixes/boxer6_3.jpg",
        colores: ["Azul", "Rojo", "Verde", "Negro"]
      },
      {
        id: 51,
        nombre: "Boxer Unisex Premium",
        descripcion: "Boxer premium unisex",
        precio: 30000,
        categoria: "unisex",
        imagen: "/img/Unixes/boxer6_4.jpg",
        colores: ["Azul", "Rojo", "Verde", "Negro"]
      },
      {
        id: 52,
        nombre: "Boxer Unisex Microfibra",
        descripcion: "Boxer de microfibra unisex",
        precio: 32000,
        categoria: "unisex",
        imagen: "/img/Unixes/boxer6_5.jpg",
        colores: ["Azul", "Rojo", "Verde", "Negro"]
      },
      {
        id: 53,
        nombre: "Boxer Unisex Stretch",
        descripcion: "Boxer con stretch unisex",
        precio: 28000,
        categoria: "unisex",
        imagen: "/img/Unixes/boxer6_6.jpg",
        colores: ["Azul", "Rojo", "Verde", "Negro"]
      },
      {
        id: 54,
        nombre: "Boxer Unisex Compresión",
        descripcion: "Boxer con compresión unisex",
        precio: 35000,
        categoria: "unisex",
        imagen: "/img/Unixes/boxer6_7.jpg",
        colores: ["Azul", "Rojo", "Verde", "Negro"]
      },
      {
        id: 55,
        nombre: "Boxer Unisex Algodón",
        descripcion: "Boxer de algodón unisex",
        precio: 24000,
        categoria: "unisex",
        imagen: "/img/Unixes/boxer6_8.jpg",
        colores: ["Azul", "Rojo", "Verde", "Negro"]
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDatosCliente(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validarFormulario = () => {
    return datosCliente.nombre.trim() !== '' && 
           datosCliente.telefono.trim() !== '' && 
           datosCliente.direccion.trim() !== '' && 
           datosCliente.ciudad.trim() !== '';
  };

  const enviarPedidoWhatsApp = () => {
    if (!validarFormulario()) {
      alert('Por favor completa todos los campos obligatorios');
      return;
    }

    const total = carrito.reduce((total, item) => total + (item.precio * item.cantidad), 0);
    
    const mensaje = `🛒 *PEDIDO GARDEM* 🛒

👤 *DATOS DEL CLIENTE:*
• Nombre: ${datosCliente.nombre}
• Teléfono: ${datosCliente.telefono}
• Dirección: ${datosCliente.direccion}
• Ciudad: ${datosCliente.ciudad}
• Método de Pago: ${datosCliente.metodoPago}

📦 *PRODUCTOS:*
${carrito.map(item => 
  `• ${item.nombre} - ${item.color} - ${item.talla} x${item.cantidad} = $${(item.precio * item.cantidad).toLocaleString()}`
).join('\n')}

💰 *TOTAL: $${total.toLocaleString()}*

📞 *INFORMACIÓN DE CONTACTO:*
• Cliente: ${datosCliente.nombre}
• Teléfono: ${datosCliente.telefono}

📍 *DIRECCIÓN DE ENVÍO:*
${datosCliente.direccion}, ${datosCliente.ciudad}

¡Gracias por tu pedido! 🎉`;

    window.open(`https://wa.me/573216798086?text=${encodeURIComponent(mensaje)}`);
    
    // Limpiar carrito y formulario después del envío
    setCarrito([]);
    setDatosCliente({
      nombre: '',
      telefono: '',
      direccion: '',
      ciudad: '',
      metodoPago: 'efectivo'
    });
    setMostrarFormularioPedido(false);
    setMostrarCarrito(false);
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
              
              {!mostrarFormularioPedido ? (
                <button 
                  className="btn-whatsapp"
                  onClick={() => setMostrarFormularioPedido(true)}
                >
                  Completar Pedido
                </button>
              ) : (
                <div className="formulario-pedido">
                  <h4>Datos de Envío</h4>
                  
                  <div className="form-group">
                    <label>Nombre Completo *</label>
                    <input
                      type="text"
                      name="nombre"
                      value={datosCliente.nombre}
                      onChange={handleInputChange}
                      placeholder="Tu nombre completo"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Teléfono *</label>
                    <input
                      type="tel"
                      name="telefono"
                      value={datosCliente.telefono}
                      onChange={handleInputChange}
                      placeholder="Tu número de teléfono"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Dirección *</label>
                    <input
                      type="text"
                      name="direccion"
                      value={datosCliente.direccion}
                      onChange={handleInputChange}
                      placeholder="Tu dirección de envío"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Ciudad *</label>
                    <input
                      type="text"
                      name="ciudad"
                      value={datosCliente.ciudad}
                      onChange={handleInputChange}
                      placeholder="Tu ciudad"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Método de Pago</label>
                    <select
                      name="metodoPago"
                      value={datosCliente.metodoPago}
                      onChange={handleInputChange}
                    >
                      <option value="efectivo">Efectivo</option>
                      <option value="transferencia">Transferencia Bancaria</option>
                      <option value="nequi">Nequi</option>
                      <option value="daviplata">Daviplata</option>
                    </select>
                  </div>

                  <div className="botones-formulario">
                    <button 
                      className="btn-cancelar"
                      onClick={() => setMostrarFormularioPedido(false)}
                    >
                      Cancelar
                    </button>
                    <button 
                      className="btn-enviar"
                      onClick={enviarPedidoWhatsApp}
                      disabled={!validarFormulario()}
                    >
                      Enviar Pedido por WhatsApp
                    </button>
                  </div>
                </div>
              )}
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
