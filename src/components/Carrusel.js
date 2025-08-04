import React, { useState, useEffect } from 'react';
import './Carrusel.css';

const Carrusel = ({ promociones }) => {
  const [promocionActual, setPromocionActual] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPromocionActual((prev) => (prev + 1) % promociones.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [promociones.length]);

  return (
    <div className="promociones-banner">
      <div className="carrusel-container">
        <div className="carrusel-promociones">
          <div className="promocion-activa">
            {promociones[promocionActual]}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carrusel; 