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