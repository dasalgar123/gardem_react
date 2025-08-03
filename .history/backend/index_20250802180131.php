<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Configuración de la base de datos
$host = 'localhost';
$dbname = 'gardelcatalogo';
$username = 'root';
$password = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    echo json_encode(['error' => 'Error de conexión: ' . $e->getMessage()]);
    exit;
}

// Obtener la ruta de la petición
$request_uri = $_SERVER['REQUEST_URI'];
$path = parse_url($request_uri, PHP_URL_PATH);
$path = str_replace('/api/', '', $path);

// Router simple
switch($path) {
    case 'productos':
        obtenerProductos($pdo);
        break;
    case 'productos/categoria/caballero':
        obtenerProductosPorCategoria($pdo, 'caballero');
        break;
    case 'productos/categoria/dama':
        obtenerProductosPorCategoria($pdo, 'dama');
        break;
    case 'productos/categoria/nino':
        obtenerProductosPorCategoria($pdo, 'nino');
        break;
    default:
        echo json_encode(['error' => 'Ruta no encontrada']);
        break;
}

function obtenerProductos($pdo) {
    try {
        $stmt = $pdo->query("SELECT * FROM productos");
        $productos = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        // Transformar datos para el frontend
        $productosTransformados = array_map(function($producto) {
            return [
                'id' => $producto['id'],
                'nombre' => $producto['nombre'],
                'descripcion' => $producto['descripcion'] ?? '',
                'precio' => floatval($producto['precio']),
                'categoria' => $producto['tipo_producto'] ?? 'caballero',
                'imagen' => $producto['imagen'] ?? 'https://via.placeholder.com/300x300/0066cc/ffffff?text=Producto',
                'colores' => ['Azul', 'Rojo', 'Verde', 'Negro'],
                'tallas' => ['S', 'M', 'L', 'XL']
            ];
        }, $productos);
        
        echo json_encode($productosTransformados);
    } catch(PDOException $e) {
        echo json_encode(['error' => 'Error al obtener productos: ' . $e->getMessage()]);
    }
}

function obtenerProductosPorCategoria($pdo, $categoria) {
    try {
        $stmt = $pdo->prepare("SELECT * FROM productos WHERE tipo_producto = ?");
        $stmt->execute([$categoria]);
        $productos = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        // Transformar datos para el frontend
        $productosTransformados = array_map(function($producto) {
            return [
                'id' => $producto['id'],
                'nombre' => $producto['nombre'],
                'descripcion' => $producto['descripcion'] ?? '',
                'precio' => floatval($producto['precio']),
                'categoria' => $producto['tipo_producto'] ?? 'caballero',
                'imagen' => $producto['imagen'] ?? 'https://via.placeholder.com/300x300/0066cc/ffffff?text=Producto',
                'colores' => ['Azul', 'Rojo', 'Verde', 'Negro'],
                'tallas' => ['S', 'M', 'L', 'XL']
            ];
        }, $productos);
        
        echo json_encode($productosTransformados);
    } catch(PDOException $e) {
        echo json_encode(['error' => 'Error al obtener productos por categoría: ' . $e->getMessage()]);
    }
}
?> 