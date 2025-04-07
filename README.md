# GameStore - Tienda de Videojuegos

## Descripción
GameStore es una tienda de videojuegos en línea diseñada para ofrecer una experiencia de compra inmersiva y accesible para los usuarios. Este proyecto ha evolucionado desde su versión inicial en HTML5 puro a una aplicación web completa que utiliza HTML5, CSS3 y JavaScript para crear una experiencia de usuario moderna y dinámica.

## Características
- Diseño moderno con efectos neón y partículas animadas
- Página principal que muestra los últimos lanzamientos
- Catálogo de juegos con filtrado por categorías
- Páginas detalladas de productos con galería de imágenes
- Sistema de búsqueda en tiempo real
- Carrito de compras funcional con almacenamiento local
- Lista de deseos para guardar productos favoritos
- Sistema de registro e inicio de sesión
- Diseño responsive para dispositivos móviles y de escritorio
- Efectos visuales avanzados como lightbox para imágenes
- Páginas adicionales como soporte, contacto, nosotros y noticias

## Estructura del Proyecto
/GmeStoreZ
│
├── /Isesion
│   ├── index.html
│   ├── registro.html
│   ├── sesion.js
│   └── styles.css
│
├── /principal
│   ├── /dst
│   │   ├── main.css
│   │   └── responsive.css
│   │
│   ├── /img
│   │   ├── /juegos
│   │   │   └── [imágenes de juegos]
│   │   ├── /juegos2
│   │   │   └── [imágenes adicionales]
│   │   └── /banners
│   │       └── [banners promocionales]
│   │
│   ├── /pages
│   │   ├── /catalogo
│   │   │   ├── catalogo.html
│   │   │   ├── accion.html
│   │   │   └── [otras categorías]
│   │   │
│   │   ├── /productos
│   │   │   ├── productos.js
│   │   │   ├── products.css
│   │   │   ├── assassins.html
│   │   │   ├── doom.html
│   │   │   └── [otros productos]
│   │   │
│   │   ├── carrito.html
│   │   ├── contacto.html
│   │   ├── nosotros.html
│   │   ├── resultados-busqueda.html
│   │   └── soporte.html
│   │
│   ├── particulas.js
│   ├── responsive.js
│   ├── script.js
│   ├── search.js
│   └── README.md
│
├── index.html
└── README.md


## Tecnologías Utilizadas
- **HTML5**: Estructura y contenido de las páginas
- **CSS3**: Estilos, animaciones y efectos visuales
- **JavaScript**: Funcionalidades interactivas y dinámicas
- **LocalStorage**: Almacenamiento del carrito y lista de deseos
- **SessionStorage**: Gestión de sesiones de usuario

## Funcionalidades Principales

### Sistema de Partículas
El sitio cuenta con un sistema de partículas neón animadas que crean un ambiente futurista y dinámico, mejorando la experiencia visual del usuario.

### Carrito de Compras
- Añadir productos desde la página principal o páginas de detalle
- Modificar cantidades de productos
- Eliminar productos
- Persistencia de datos mediante localStorage

### Sistema de Búsqueda
- Búsqueda en tiempo real
- Filtrado por nombre, precio y categoría
- Página de resultados con filtros adicionales

### Páginas de Productos
- Galería de imágenes con lightbox
- Información detallada del producto
- Botones funcionales para añadir al carrito o lista de deseos
- Productos relacionados

### Autenticación de Usuarios
- Registro de nuevos usuarios
- Inicio de sesión
- Persistencia de sesión

## Instalación
1. Clona el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/GameStore.git

2. Navega al directorio del proyecto:
   ```bash
   cd GameStore

3. Abre el archivo index.html en tu navegador web.

## Uso
- Navega por las diferentes páginas utilizando los enlaces de navegación
- Utiliza la barra de búsqueda para encontrar juegos específicos
- Regístrate e inicia sesión para acceder a funcionalidades adicionales
- Añade productos al carrito o a tu lista de deseos
- Visualiza y modifica tu carrito de compras
- Explora las páginas de detalle de productos para ver más información
## Hosting
El proyecto está alojado en Vercel. Puedes acceder a la tienda en el siguiente enlace: GameStore en Vercel

## Contribuciones
Las contribuciones son bienvenidas. Si deseas contribuir, por favor sigue los siguientes pasos:

1. Haz un fork del repositorio
2. Crea una nueva rama ( git checkout -b feature/nueva-funcionalidad )
3. Realiza los cambios necesarios y haz commit ( git commit -am 'Añadir nueva funcionalidad' )
4. Haz push a la rama ( git push origin feature/nueva-funcionalidad )
5. Abre un Pull Request
## Próximas Mejoras
- Implementación de un sistema de pago
- Panel de administración para gestionar productos
- Sistema de reseñas y valoraciones
- Optimización de rendimiento para dispositivos móviles
- Integración con redes sociales
## Licencia
Este proyecto está bajo la Licencia MIT. Consulta el archivo LICENSE para más detalles.

## Contacto
Para cualquier consulta, puedes contactarme a través de abantohuamanp3@gmail.com .