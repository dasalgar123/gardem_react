import React, { useState } from 'react';
import './Navbar.css';

const Navbar = ({ filtroCategoria, onFiltroChange }) => {
  const handleCategoriaClick = (categoria) => {
    onFiltroChange(categoria);
    console.log('Filtro cambiado a:', categoria);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Filtros de Categorías */}
        <div className="navbar-filtros">
          <button 
            className={filtroCategoria === 'todos' ? 'activo' : ''}
            onClick={() => handleCategoriaClick('todos')}
          >
            Todos
          </button>
          <button 
            className={filtroCategoria === 'caballero' ? 'activo' : ''}
            onClick={() => handleCategoriaClick('caballero')}
          >
            Caballero
          </button>
          <button 
            className={filtroCategoria === 'dama' ? 'activo' : ''}
            onClick={() => handleCategoriaClick('dama')}
          >
            Dama
          </button>
          <button 
            className={filtroCategoria === 'nino' ? 'activo' : ''}
            onClick={() => handleCategoriaClick('nino')}
          >
            Niño
          </button>
          <button 
            className={filtroCategoria === 'ninas' ? 'activo' : ''}
            onClick={() => handleCategoriaClick('ninas')}
          >
            Niñas
          </button>
          <button 
            className={filtroCategoria === 'unisex' ? 'activo' : ''}
            onClick={() => handleCategoriaClick('unisex')}
          >
            Unisex
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 