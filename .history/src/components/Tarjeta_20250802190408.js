import React, { useState } from 'react';

const Tarjeta = ({ producto, onAgregarAlCarrito }) => {
  const [colorSeleccionado, setColorSeleccionado] = useState(producto.colores[0]);
  const [tallaSeleccionada, setTallaSeleccionada] = useState('');
  const [cantidad, setCantidad] = useState(1);

  // Función para obtener las tallas según la categoría
  const obtenerTallasPorCategoria = (categoria) => {
    switch (categoria) {
      case 'caballero':
        return ['S', 'M', 'L', 'XL', 'XXL'];
      case 'dama':
        return ['XS', 'S', 'M', 'L', 'XL'];
      case 'nino':
        return ['2T', '3T', '4T', '5T', '6T', '7T', '8T'];
      case 'ninas':
        return ['2T', '3T', '4T', '5T', '6T', '7T', '8T'];
      case 'unisex':
        return ['S', 'M', 'L', 'XL'];
      default:
        return ['S', 'M', 'L', 'XL'];
    }
  };

  // Obtener las tallas específicas para esta categoría
  const tallasDisponibles = obtenerTallasPorCategoria(producto.categoria);
  
  // Establecer la talla seleccionada por defecto
  React.useEffect(() => {
    if (!tallaSeleccionada && tallasDisponibles.length > 0) {
      setTallaSeleccionada(tallasDisponibles[0]);
    }
  }, [tallaSeleccionada, tallasDisponibles]);

  const handleAgregar = () => {
    if (tallaSeleccionada) {
      onAgregarAlCarrito(producto, colorSeleccionado, tallaSeleccionada, cantidad);
    }
  };

  return (
    <div className="producto-card">
      {/* Imagen del producto */}
      <div className="producto-imagen">
        <img 
          src={producto.imagen} 
          alt={producto.nombre}
        />
      </div>
      
      {/* Información del producto */}
      <div className="producto-info">
        <h3 className="producto-nombre">{producto.nombre}</h3>
        
        {producto.descripcion && (
          <p className="producto-descripcion">{producto.descripcion}</p>
        )}
        
        <div className="producto-precio">
          ${producto.precio.toLocaleString()}
        </div>
      </div>
      
      {/* Selectores */}
      <div className="producto-opciones">
        <div className="opcion-grupo">
          <label>Color:</label>
          <select 
            value={colorSeleccionado} 
            onChange={(e) => setColorSeleccionado(e.target.value)}
            className="selector-opcion"
          >
            {producto.colores.map(color => (
              <option key={color} value={color}>{color}</option>
            ))}
          </select>
        </div>
        
        <div className="opcion-grupo">
          <label>Talla:</label>
          <select 
            value={tallaSeleccionada} 
            onChange={(e) => setTallaSeleccionada(e.target.value)}
            className="selector-opcion"
          >
            {tallasDisponibles.map(talla => (
              <option key={talla} value={talla}>{talla}</option>
            ))}
          </select>
        </div>
        
        <div className="opcion-grupo">
          <label>Cantidad:</label>
          <div className="cantidad-controls">
            <button 
              onClick={() => setCantidad(Math.max(1, cantidad - 1))}
              disabled={cantidad <= 1}
              className="btn-cantidad"
            >
              -
            </button>
            <span className="cantidad-numero">{cantidad}</span>
            <button 
              onClick={() => setCantidad(cantidad + 1)}
              className="btn-cantidad"
            >
              +
            </button>
          </div>
        </div>
      </div>
      
      {/* Botón agregar pedido */}
      <button 
        className="btn-agregar"
        onClick={handleAgregar}
        disabled={!tallaSeleccionada}
      >
        Agregar Pedido
      </button>
    </div>
  );
};

export default Tarjeta; 