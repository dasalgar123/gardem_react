import React, { useState } from 'react';
import './Pedido.css';
import ApiWhatsApp from './ApiWhatsApp';

const Pedido = ({ 
  carrito, 
  onClose, 
  onClearCart, 
  isVisible 
}) => {
  const [datosCliente, setDatosCliente] = useState({
    nombre: '',
    telefono: '',
    direccion: '',
    ciudad: '',
    metodoPago: 'efectivo',
    observaciones: ''
  });

  const [pasoActual, setPasoActual] = useState(1);
  const [errores, setErrores] = useState({});

  const metodosPago = [
    { value: 'efectivo', label: 'Efectivo', icon: '💵' },
    { value: 'transferencia', label: 'Transferencia Bancaria', icon: '🏦' },
    { value: 'nequi', label: 'Nequi', icon: '📱' },
    { value: 'daviplata', label: 'Daviplata', icon: '📱' },
    { value: 'tarjeta', label: 'Tarjeta de Crédito/Débito', icon: '💳' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDatosCliente(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errores[name]) {
      setErrores(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validarFormulario = () => {
    const nuevosErrores = {};
    
    if (!datosCliente.nombre.trim()) {
      nuevosErrores.nombre = 'El nombre es obligatorio';
    }
    
    if (!datosCliente.telefono.trim()) {
      nuevosErrores.telefono = 'El teléfono es obligatorio';
    } else if (!/^\d{10}$/.test(datosCliente.telefono.replace(/\s/g, ''))) {
      nuevosErrores.telefono = 'El teléfono debe tener 10 dígitos';
    }
    
    if (!datosCliente.direccion.trim()) {
      nuevosErrores.direccion = 'La dirección es obligatoria';
    }
    
    if (!datosCliente.ciudad.trim()) {
      nuevosErrores.ciudad = 'La ciudad es obligatoria';
    }
    
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const calcularSubtotal = () => {
    return ApiWhatsApp.calcularSubtotal(carrito);
  };

  const calcularEnvio = () => {
    return ApiWhatsApp.calcularEnvio(calcularSubtotal());
  };

  const calcularTotal = () => {
    return ApiWhatsApp.calcularTotal(carrito);
  };

  const formatearPrecio = (precio) => {
    return ApiWhatsApp.formatearPrecio(precio);
  };

  const handleSiguiente = () => {
    if (validarFormulario()) {
      setPasoActual(2);
    }
  };

  const handleAnterior = () => {
    setPasoActual(1);
  };

  const enviarPedidoWhatsApp = () => {
    ApiWhatsApp.enviarPedido(datosCliente, carrito, metodosPago, onClearCart, onClose);
  };

  if (!isVisible) return null;

  return (
    <div className="pedido-overlay">
      <div className="pedido-container">
        <div className="pedido-header">
          <h2>Finalizar Pedido</h2>
          <button className="btn-cerrar" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="pedido-progress">
          <div className={`progress-step ${pasoActual >= 1 ? 'activo' : ''}`}>
            <span className="step-number">1</span>
            <span className="step-label">Datos Personales</span>
          </div>
          <div className={`progress-step ${pasoActual >= 2 ? 'activo' : ''}`}>
            <span className="step-number">2</span>
            <span className="step-label">Confirmar Pedido</span>
          </div>
        </div>

        {pasoActual === 1 && (
          <div className="pedido-form">
            <h3>Información de Envío</h3>
            
            <div className="form-row">
              <div className="form-group">
                <label>Nombre Completo *</label>
                <input
                  type="text"
                  name="nombre"
                  value={datosCliente.nombre}
                  onChange={handleInputChange}
                  placeholder="Tu nombre completo"
                  className={errores.nombre ? 'error' : ''}
                />
                {errores.nombre && <span className="error-message">{errores.nombre}</span>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Teléfono *</label>
                <input
                  type="tel"
                  name="telefono"
                  value={datosCliente.telefono}
                  onChange={handleInputChange}
                  placeholder="Ej: 3001234567"
                  className={errores.telefono ? 'error' : ''}
                />
                {errores.telefono && <span className="error-message">{errores.telefono}</span>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Dirección *</label>
                <input
                  type="text"
                  name="direccion"
                  value={datosCliente.direccion}
                  onChange={handleInputChange}
                  placeholder="Tu dirección de envío"
                  className={errores.direccion ? 'error' : ''}
                />
                {errores.direccion && <span className="error-message">{errores.direccion}</span>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Ciudad *</label>
                <input
                  type="text"
                  name="ciudad"
                  value={datosCliente.ciudad}
                  onChange={handleInputChange}
                  placeholder="Tu ciudad"
                  className={errores.ciudad ? 'error' : ''}
                />
                {errores.ciudad && <span className="error-message">{errores.ciudad}</span>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Método de Pago</label>
                <div className="metodos-pago">
                  {metodosPago.map(metodo => (
                    <label key={metodo.value} className="metodo-pago-option">
                      <input
                        type="radio"
                        name="metodoPago"
                        value={metodo.value}
                        checked={datosCliente.metodoPago === metodo.value}
                        onChange={handleInputChange}
                      />
                      <span className="metodo-icon">{metodo.icon}</span>
                      <span className="metodo-label">{metodo.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Observaciones (opcional)</label>
                <textarea
                  name="observaciones"
                  value={datosCliente.observaciones}
                  onChange={handleInputChange}
                  placeholder="Instrucciones especiales, horarios de entrega, etc."
                  rows="3"
                />
              </div>
            </div>

            <div className="pedido-actions">
              <button className="btn-cancelar" onClick={onClose}>
                Cancelar
              </button>
              <button className="btn-siguiente" onClick={handleSiguiente}>
                Continuar
              </button>
            </div>
          </div>
        )}

        {pasoActual === 2 && (
          <div className="pedido-confirmacion">
            <h3>Confirmar Pedido</h3>
            
            <div className="resumen-cliente">
              <h4>Datos de Envío</h4>
              <div className="datos-cliente">
                <p><strong>Nombre:</strong> {datosCliente.nombre}</p>
                <p><strong>Teléfono:</strong> {datosCliente.telefono}</p>
                <p><strong>Dirección:</strong> {datosCliente.direccion}</p>
                <p><strong>Ciudad:</strong> {datosCliente.ciudad}</p>
                <p><strong>Método de Pago:</strong> {metodosPago.find(m => m.value === datosCliente.metodoPago)?.label}</p>
                {datosCliente.observaciones && (
                  <p><strong>Observaciones:</strong> {datosCliente.observaciones}</p>
                )}
              </div>
            </div>

            <div className="resumen-productos">
              <h4>Productos</h4>
              <div className="productos-lista">
                {carrito.map((item, index) => (
                  <div key={index} className="producto-resumen">
                    <div className="producto-info">
                      <img src={item.imagen} alt={item.nombre} />
                      <div>
                        <h5>{item.nombre}</h5>
                        <p>Color: {item.color} | Talla: {item.talla}</p>
                        <p>Cantidad: {item.cantidad}</p>
                      </div>
                    </div>
                    <div className="producto-precio">
                      ${formatearPrecio(item.precio * item.cantidad)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="resumen-total">
              <div className="total-line">
                <span>Subtotal:</span>
                <span>${formatearPrecio(calcularSubtotal())}</span>
              </div>
              <div className="total-line">
                <span>Envío:</span>
                <span>{calcularEnvio() === 0 ? 'GRATIS' : `$${formatearPrecio(calcularEnvio())}`}</span>
              </div>
              <div className="total-line total-final">
                <span>Total:</span>
                <span>${formatearPrecio(calcularTotal())}</span>
              </div>
            </div>

            <div className="pedido-actions">
              <button className="btn-anterior" onClick={handleAnterior}>
                ← Volver
              </button>
              <button className="btn-whatsapp" onClick={enviarPedidoWhatsApp}>
                📱 Enviar por WhatsApp
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Pedido; 