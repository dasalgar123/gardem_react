import React, { useState } from 'react';

const Tarjeta = ({ producto, onAgregarAlCarrito }) => {
  const [colorSeleccionado, setColorSeleccionado] = useState(producto.colores[0]);
  const [tallaSeleccionada, setTallaSeleccionada] = useState(producto.tallas[0]);
  const [cantidad, setCantidad] = useState(1);
  const [mostrarMeta, setMostrarMeta] = useState(false);

  const handleAgregar = () => {
    onAgregarAlCarrito(producto, colorSeleccionado, tallaSeleccionada, cantidad);
  };

  return (
    <div className="producto-card">
      <div className="producto-imagen-container">
        <img 
          src={producto.imagen} 
          alt={producto.nombre}
          onClick={() => setMostrarMeta(true)}
        />
        {mostrarMeta && (
          <div className="meta-overlay">
            <div className="meta-info">
              <h4>Información del Producto</h4>
              <p><strong>Material:</strong> {producto.meta?.material}</p>
              <p><strong>Origen:</strong> {producto.meta?.origen}</p>
              <p><strong>Garantía:</strong> {producto.meta?.garantia}</p>
              <button 
                className="cerrar-meta"
                onClick={() => setMostrarMeta(false)}
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </div>
      
      <h3>{producto.nombre}</h3>
      
      <div className="producto-opciones">
        <div className="opcion-grupo">
          <label>Color:</label>
          <select 
            value={colorSeleccionado} 
            onChange={(e) => setColorSeleccionado(e.target.value)}
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
          >
            {producto.tallas.map(talla => (
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
            >
              -
            </button>
            <span>{cantidad}</span>
            <button onClick={() => setCantidad(cantidad + 1)}>+</button>
          </div>
        </div>
      </div>
      
      <div className="producto-precio">
        ${producto.precio.toLocaleString()}
      </div>
      
      <button 
        className="btn-agregar"
        onClick={handleAgregar}
      >
        Agregar al Carrito
      </button>
    </div>
  );
};

export default Tarjeta; 