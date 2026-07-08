// Variables acumuladoras globales para el estado y finanzas
let cantidadDisponibles = 0;
let cantidadAgotados = 0;
let valorInventarioTotal = 0;

// Variable de control para buscar el elemento con mayor precio
let videojuegoMasCaro = inventarioVideojuegos[0];

console.log("=== PROCESANDO DATOS DEL INVENTARIO ===");

// Recorrido principal del arreglo de objetos mediante bucle tradicional
for (let i = 0; i < inventarioVideojuegos.length; i++) {
    let juego = inventarioVideojuegos[i];
    
    // 4. Calcular el valor del inventario por cada producto (precio * stock)
    let valorPorJuego = juego.precio * juego.stock;
    valorInventarioTotal += valorPorJuego;

    // 2. Mostrar el estado del producto utilizando una estructura if/else
    let estadoStock = "";
    if (juego.stock > 0) {
        estadoStock = "Disponible";
        cantidadDisponibles++; // 3. Contar videojuegos disponibles
    } else {
        estadoStock = "Agotado";
        cantidadAgotados++;
    }

    //Clasificar los videojuegos según su precio
    let clasificacionPrecio = "";
    if (juego.precio < 40000) {
        clasificacionPrecio = "Económico";
    } else if (juego.precio >= 40000 && juego.precio <= 60000) {
        clasificacionPrecio = "Precio Medio";
    } else {
        clasificacionPrecio = "Premium";
    }

    // 5. Identificar el videojuego más caro mediante comparación
    if (juego.precio > videojuegoMasCaro.precio) {
        videojuegoMasCaro = juego;
    }

    // Imprimir el desarrollo detallado solicitado en los puntos 1 y 2
    console.log(`Nombre: ${juego.nombre}`);
    console.log(`Estado: ${estadoStock}`);
    console.log(`Clasificación de Costo: ${clasificacionPrecio}`);
    console.log("---------------------------------------");
}

// 6. Mostrar el Resumen Final Estructurado en la consola
console.log("==========================================");
console.log("          RESUMEN DEL INVENTARIO          ");
console.log("==========================================");
console.log(`Cantidad de videojuegos: ${inventarioVideojuegos.length}`);
console.log(`Disponibles: ${cantidadDisponibles}`);
console.log(`Agotados: ${cantidadAgotados}`);
console.log(`Valor del inventario: $${valorInventarioTotal.toLocaleString('es-CL')}`);
console.log(`Videojuego más caro:\n${videojuegoMasCaro.nombre}\nPrecio: $${videojuegoMasCaro.precio}`);
console.log("==========================================");


// 5. Vinculación con el DOM para renderizado en la interfaz web (HTML)

// Capturamos los contenedores semánticos definidos en el archivo index.html
const contenedorProductos = document.getElementById("contenedor-videojuegos");
const contenedorResumen = document.getElementById("detalle-resumen");

// Variable acumuladora para construir las tarjetas visuales como fragmentos HTML
let estructuraTarjetasHTML = "";

// Volvemos a iterar para mapear los objetos directamente al árbol de nodos (DOM)
for (let j = 0; j < inventarioVideojuegos.length; j++) {
    let itemJuego = inventarioVideojuegos[i];
    
    // Calcular estados locales para la interfaz visual
    let textoStock = itemJuego.stock > 0 ? "Disponible" : "Agotado";
    let colorBadge = itemJuego.stock > 0 ? "text-emerald-600 bg-emerald-50" : "text-red-600 bg-red-50";

    // Clasificación de precios para el Desafío
    let etiquetaPrecio = "";
    if (juego.precio < 40000) {
        clasificacionPrecio = "Económico";
    } else if (juego.precio >= 40000 && juego.precio <= 60000) {
        clasificacionPrecio = "Precio Medio";
    } else {
        clasificacionPrecio = "Premium";
    }

    // Inyección de componentes usando plantillas literales estructuradas con Tailwind CSS
    estructuraTarjetasHTML += `
        <article class="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col justify-between lift">
            <div>
                <span class="inline-block px-2 py-0.5 text-xs font-semibold rounded-full bg-slate-100 text-slate-600 mb-2">
                    ${itemJuego.plataforma}
                </span>
                <h3 class="text-slate-900 font-bold text-xl mb-1">${itemJuego.nombre}</h3>
                <p class="text-slate-500 text-sm font-medium mb-4">Clasificación: ${etiquetaPrecio}</p>
            </div>
            <div class="flex items-center justify-between border-t border-slate-100 pt-3 mt-2">
                <span class="text-slate-900 font-bold text-lg">$${itemJuego.precio.toLocaleString('es-CL')}</span>
                <span class="px-2.5 py-1 text-xs font-bold rounded-xl ${colorBadge}">
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

// Construir la sección informativa del resumen analítico final solicitado
let estructuraResumenHTML = `
    <div class="grid gap-3 sm:grid-cols-2 md:grid-cols-4 text-sm mt-4">
        <div class="bg-slate-50 border border-slate-200 p-4 rounded-xl">
            <p class="text-slate-500 font-medium">Total Catálogo</p>
            <p class="text-2xl font-bold text-slate-900">${inventarioVideojuegos.length} Juegos</p>
        </div>
        <div class="bg-emerald-50 border border-emerald-100 p-4 rounded-xl">
            <p class="text-emerald-700 font-medium">Disponibles</p>
            <p class="text-2xl font-bold text-emerald-900">${cantidadDisponibles}</p>
        </div>
        <div class="bg-red-50 border border-red-100 p-4 rounded-xl">
            <p class="text-red-700 font-medium">Agotados</p>
            <p class="text-2xl font-bold text-red-900">${cantidadAgotados}</p>
        </div>
        <div class="bg-orange-50 border border-orange-100 p-4 rounded-xl">
            <p class="text-orange-700 font-medium">Valor Inventario</p>
            <p class="text-2xl font-bold text-orange-900">$${valorInventarioTotal.toLocaleString('es-CL')}</p>
        </div>
    </div>
    <div class="bg-orange-500/10 border border-orange-500/20 p-4 rounded-xl mt-4 text-sm">
        <p class="text-orange-800 font-bold flex items-center gap-1.5">⭐ Videojuego más caro:</p>
        <p class="text-slate-900 font-bold text-base mt-1">${videojuegoMasCaro.nombre}</p>
        <p class="text-slate-600 font-medium">Valor Unitario: $${videojuegoMasCaro.precio.toLocaleString('es-CL')} | Plataforma: ${videojuegoMasCaro.plataforma}</p>
    </div>
`;

// Inyectar el bloque de resumen final en la vista HTML
if (contenedorResumen) {
    contenedorResumen.innerHTML = estructuraResumenHTML;
}