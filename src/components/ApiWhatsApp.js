import React from 'react';

const ApiWhatsApp = {
  // Función para formatear precio en formato colombiano
  formatearPrecio: (precio) => {
    return precio.toLocaleString('es-CO');
  },

  // Función para calcular subtotal
  calcularSubtotal: (carrito) => {
    return carrito.reduce((total, item) => total + (item.precio * item.cantidad), 0);
  },

  // Función para calcular envío
  calcularEnvio: (subtotal) => {
    // Envío gratis para pedidos mayores a $100,000
    return subtotal >= 100000 ? 0 : 8000;
  },

  // Función para calcular total
  calcularTotal: (carrito) => {
    const subtotal = ApiWhatsApp.calcularSubtotal(carrito);
    const envio = ApiWhatsApp.calcularEnvio(subtotal);
    return subtotal + envio;
  },

  // Función para generar mensaje de WhatsApp
  generarMensaje: (datosCliente, carrito, metodosPago) => {
    const total = ApiWhatsApp.calcularTotal(carrito);
    const envio = ApiWhatsApp.calcularEnvio(ApiWhatsApp.calcularSubtotal(carrito));
    
    const mensaje = `🛒 *PEDIDO GARDEM* 🛒

👤 *DATOS DEL CLIENTE:*
• Nombre: ${datosCliente.nombre}
• Teléfono: ${datosCliente.telefono}
• Dirección: ${datosCliente.direccion}
• Ciudad: ${datosCliente.ciudad}
• Método de Pago: ${metodosPago.find(m => m.value === datosCliente.metodoPago)?.label}
${datosCliente.observaciones ? `• Observaciones: ${datosCliente.observaciones}` : ''}

📦 *PRODUCTOS:*
${carrito.map(item => 
  `• ${item.nombre} - ${item.color} - ${item.talla} x${item.cantidad} = $${ApiWhatsApp.formatearPrecio(item.precio * item.cantidad)}`
).join('\n')}

💰 *RESUMEN:*
• Subtotal: $${ApiWhatsApp.formatearPrecio(ApiWhatsApp.calcularSubtotal(carrito))}
• Envío: ${envio === 0 ? 'GRATIS' : `$${ApiWhatsApp.formatearPrecio(envio)}`}
• Total: $${ApiWhatsApp.formatearPrecio(total)}

📞 *INFORMACIÓN DE CONTACTO:*
• Cliente: ${datosCliente.nombre}
• Teléfono: ${datosCliente.telefono}

📍 *DIRECCIÓN DE ENVÍO:*
${datosCliente.direccion}, ${datosCliente.ciudad}

¡Gracias por tu pedido! 🎉`;

    return mensaje;
  },

  // Función para enviar pedido por WhatsApp
  enviarPedido: (datosCliente, carrito, metodosPago, onClearCart, onClose) => {
    const mensaje = ApiWhatsApp.generarMensaje(datosCliente, carrito, metodosPago);
    const numeroWhatsApp = '573216798086';
    
    // Abrir WhatsApp con el mensaje pre-llenado
    window.open(`https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`);
    
    // Limpiar carrito y cerrar checkout
    onClearCart();
    onClose();
    
    alert('¡Pedido enviado exitosamente! Revisa WhatsApp para confirmar.');
  }
};

export default ApiWhatsApp; 