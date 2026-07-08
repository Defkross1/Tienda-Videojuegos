// Variables acumuladoras globales para el estado y finanzas
let cantidadDisponibles = 0;
let cantidadAgotados = 0;
let valorInventarioTotal = 0;

// Variable de control para buscar el elemento con mayor precio
let videojuegoMasCaro = inventarioVideojuegos[0];

console.log("=== PROCESANDO DATOS DEL INVENTARIO ===");

// PARTE 1: Ciclo de cálculos lógicos principales
for (let i = 0; i < inventarioVideojuegos.length; i++) {
    let juego = inventarioVideojuegos[i];
    
    // Calcular el valor del inventario por cada producto (precio * stock)
    let valorPorJuego = juego.precio * juego.stock;
    valorInventarioTotal += valorPorJuego;

    // Verificar el estado del stock
    if (juego.stock > 0) {
        cantidadDisponibles++; 
    } else {
        cantidadAgotados++;
    }

    // Buscar el videojuego más caro mediante comparación
    if (juego.precio > videojuegoMasCaro.precio) {
        videojuegoMasCaro = juego;
    }
}

//Vinculación con el DOM e Inyección Dinámica en la Interfaz (HTML)

const contenedorProductos = document.getElementById("contenedor-videojuegos");
const contenedorResumen = document.getElementById("detalle-resumen");

let estructuraTarjetasHTML = "";

// Iteramos para mapear de forma segura cada objeto al contenedor web
for (let j = 0; j < inventarioVideojuegos.length; j++) {
    let itemJuego = inventarioVideojuegos[j]; // Corregido: usamos la j del ciclo
    
    let textoStock = itemJuego.stock > 0 ? "Disponible" : "Agotado";
    let colorBadge = itemJuego.stock > 0 ? "bg-emerald-100 text-emerald-800" : "bg-red-100 text-red-800";

    // Clasificación de precios para el Desafío solicitado
    let etiquetaPrecio = "";
    if (itemJuego.precio < 40000) {
        etiquetaPrecio = "Económico";
    } else if (itemJuego.precio >= 40000 && itemJuego.precio <= 60000) {
        etiquetaPrecio = "Precio Medio";
    } else {
        etiquetaPrecio = "Premium";
    }

    // Inyección de componentes usando maquetación limpia y Tailwind CSS
    estructuraTarjetasHTML += `
        <article class="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between shadow-sm lift">
            <div class="mb-4">
                <span class="inline-block px-2.5 py-0.5 text-xs font-bold rounded-full bg-slate-100 text-slate-600 mb-2">
                    ${itemJuego.plataforma}
                </span>
                <h3 class="text-slate-900 font-bold text-xl leading-tight mb-1">${itemJuego.nombre}</h3>
                <p class="text-slate-500 text-xs font-medium">Clasificación: <span class="font-semibold text-slate-700">${etiquetaPrecio}</span></p>
            </div>
            <div class="flex items-center justify-between border-t border-slate-100 pt-4 mt-2">
                <span class="text-slate-900 font-bold text-lg">$${itemJuego.precio.toLocaleString('es-CL')}</span>
                <span class="px-2.5 py-1 text-xs font-bold rounded-full ${colorBadge}">
                    ${textoStock} (${itemJuego.stock})
                </span>
            </div>
        </article>
    `;
}

// Pintar las tarjetas procesadas dentro del contenedor de la cuadrícula
if (contenedorProductos) {
    contenedorProductos.innerHTML = estructuraTarjetasHTML;
}

// Construir e inyectar el bloque del panel resumen final solicitado
let estructuraResumenHTML = `
    <div class="grid gap-4 sm:grid-cols-2 md:grid-cols-4 text-sm mt-4">
        <div class="bg-slate-50 border border-slate-200 p-4 rounded-xl">
            <p class="text-slate-500 font-medium mb-1">Cantidad de videojuegos</p>
            <p class="text-2xl font-bold text-slate-900">${inventarioVideojuegos.length}</p>
        </div>
        <div class="bg-emerald-50 border border-emerald-100 p-4 rounded-xl">
            <p class="text-emerald-700 font-medium mb-1">Disponibles</p>
            <p class="text-2xl font-bold text-emerald-900">${cantidadDisponibles}</p>
        </div>
        <div class="bg-red-50 border border-red-100 p-4 rounded-xl">
            <p class="text-red-700 font-medium mb-1">Agotados</p>
            <p class="text-2xl font-bold text-red-900">${cantidadAgotados}</p>
        </div>
        <div class="bg-orange-50 border border-orange-100 p-4 rounded-xl">
            <p class="text-orange-700 font-medium mb-1">Valor del inventario</p>
            <p class="text-2xl font-bold text-orange-900">$${valorInventarioTotal.toLocaleString('es-CL')}</p>
        </div>
    </div>
    <div class="bg-orange-50 border border-orange-200 p-4 rounded-xl mt-4 text-sm">
        <p class="text-orange-800 font-bold flex items-center gap-1.5">🎮 Videojuego más caro:</p>
        <p class="text-slate-900 font-bold text-base mt-1">${videojuegoMasCaro.nombre}</p>
        <p class="text-slate-600 font-medium mt-0.5">Precio: $${videojuegoMasCaro.precio.toLocaleString('es-CL')} | Plataforma: ${videojuegoMasCaro.plataforma}</p>
    </div>
`;

if (contenedorResumen) {
    contenedorResumen.innerHTML = estructuraResumenHTML;
}