# 🛒 GARDEM - Catálogo React con Base de Datos

## 📋 Requisitos Previos

- **Node.js** (versión 14 o superior)
- **MySQL** (XAMPP, WAMP, o MySQL Server)
- **npm** o **yarn**

## 🚀 Instalación y Configuración

### 1. Configurar la Base de Datos

1. **Abrir phpMyAdmin** en tu navegador (http://localhost/phpmyadmin)
2. **Ejecutar el archivo SQL**: 
   - Ve a la pestaña "SQL"
   - Copia y pega el contenido de `database/schema_simple.sql`
   - Haz clic en "Continuar"
3. **Verificar que se creó la base de datos** `react_catalogo_db` con todas las tablas

### 2. Instalar Dependencias del Backend

```bash
cd backend
npm install
```

### 3. Configurar Conexión a la Base de Datos

Edita el archivo `backend/server.js` y actualiza la configuración de MySQL:

```javascript
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // Cambia esto por tu contraseña de MySQL
  database: 'react_catalogo_db'
});
```

### 4. Instalar Dependencias del Frontend

```bash
# Desde la raíz del proyecto
npm install
```

## 🏃‍♂️ Ejecutar la Aplicación

### 1. Iniciar el Backend

```bash
cd backend
npm start
```

El servidor se ejecutará en `http://localhost:5000`

### 2. Iniciar el Frontend

En otra terminal:

```bash
# Desde la raíz del proyecto
npm start
```

La aplicación React se ejecutará en `http://localhost:3000`

## 📁 Estructura del Proyecto

```
react-catalogo/
├── backend/
│   ├── server.js          # Servidor Express + API
│   └── package.json       # Dependencias del backend
├── database/
│   ├── schema_simple.sql  # Esquema de la base de datos
│   └── backup_react_catalogo_db.sql  # Backup completo
├── public/
│   └── img/              # Imágenes de productos
├── src/
│   ├── App.js            # Componente principal
│   ├── services/
│   │   └── api.js        # Servicios de API
│   └── components/
│       └── Tarjeta.js    # Componente de producto
└── package.json          # Dependencias del frontend
```

## 🔧 API Endpoints

- `GET /api/productos` - Obtener todos los productos
- `GET /api/productos/categoria/:categoria` - Productos por categoría
- `GET /api/categorias` - Obtener categorías
- `GET /api/colores` - Obtener colores
- `GET /api/tallas/categoria/:categoria` - Tallas por categoría
- `POST /api/pedidos` - Crear pedido

## 🛠️ Funcionalidades

✅ **Catálogo de Productos**
- Visualización de productos por categoría
- Filtros por tipo (Caballero, Dama, Niño, Niña, Unisex)
- Imágenes de productos

✅ **Carrito de Compras**
- Agregar productos al carrito
- Seleccionar color y talla
- Calcular totales

✅ **Sistema de Pedidos**
- Formulario de datos del cliente
- Envío por WhatsApp
- Guardado en base de datos

✅ **Base de Datos**
- 55 productos de ejemplo
- 5 categorías
- 8 colores
- 28 tallas
- Sistema de pedidos completo

## 🔍 Solución de Problemas

### Error de Conexión a la Base de Datos
- Verifica que MySQL esté ejecutándose
- Revisa la contraseña en `backend/server.js`
- Asegúrate de que la base de datos `react_catalogo_db` existe

### Error de CORS
- El backend ya incluye CORS configurado
- Si persiste, verifica que el frontend esté en puerto 3000

### Imágenes no se cargan
- Verifica que las imágenes estén en `public/img/`
- Las rutas deben comenzar con `/img/`

## 📞 Soporte

Si tienes problemas:
1. Verifica que todos los servicios estén ejecutándose
2. Revisa la consola del navegador para errores
3. Verifica los logs del servidor backend

## 🎯 Próximos Pasos

- [ ] Agregar más productos a la base de datos
- [ ] Implementar sistema de usuarios
- [ ] Agregar panel de administración
- [ ] Implementar paginación
- [ ] Agregar búsqueda de productos 