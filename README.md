# Sistema de Control de Inventario - Videojuegos 🎮

¡Bienvenido! Este es un sistema web interactivo diseñado para la gestión y consulta centralizada de inventarios de videojuegos multiplataforma (PS5, PC, Nintendo Switch y Xbox). 

El objetivo principal de este proyecto es ofrecer una interfaz limpia, moderna y de nivel comercial, permitiendo a los administradores visualizar métricas clave del negocio en tiempo real, añadir nuevos títulos al catálogo y remover productos de manera dinámica.

## 🚀 Características Principales

- **Dashboard Automatizado:** Renderizado dinámico de tarjetas de productos agrupadas visualmente por los colores corporativos de cada plataforma.
- **Gestión CRUD en Tiempo Real:** Formulario integrado para añadir videojuegos con validación de tipos de datos, además de una opción rápida en cada tarjeta para quitar elementos del inventario.
- **Panel de Métricas Dinámico (Rúbrica):** - Cantidad total de videojuegos registrados en la muestra.
  - Conteo automatizado de productos en stock (Disponibles) y sin stock (Agotados).
  - Cálculo en tiempo real del valor neto total del inventario (Precio × Stock).
  - Identificación automática del videojuego más costoso del catálogo.
- **Diseño Responsive & Premium:** Interfaz clara, minimalista y ejecutiva (estilo Mac/iOS) con contrastes optimizados para una legibilidad perfecta.

## 📁 Estructura del Proyecto

El proyecto mantiene una arquitectura de archivos limpia y modular para separar los datos de la lógica de negocio y los estilos:

```text
├── index.html                  # Estructura semántica del Dashboard
├── assets/
│   ├── css/
│   │   └── estilos.css         # Reglas de diseño claro y grillas dinámicas (Grid/Flexbox)
│   └── js/
│       ├── datos.js            # Base de datos estática (Array de objetos de videojuegos)
│       └── app.js              # Lógica de renderizado, eventos del DOM y cálculos métricos
└── README.md                   # Documentación técnica del sistema