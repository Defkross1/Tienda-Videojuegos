// Función para renderizar las tarjetas de juegos
function renderizarTarjetas(juegos) {
    const container = document.getElementById('games-container');
    if (!container) return;
    container.innerHTML = ''; 

    juegos.forEach((juego, index) => {
        const clasePlataforma = juego.plataforma.toLowerCase().replace(/\s+/g, '-');
        const tieneStock = juego.stock > 0;
        const badgeStock = tieneStock ? 'badge-disponible' : 'badge-agotado';
        const textoStock = tieneStock ? `Disponible (${juego.stock})` : `Agotado (${juego.stock})`;

        container.innerHTML += `
            <div class="card-juego border-${clasePlataforma}">
                <div class="card-header-plataforma bg-${clasePlataforma}">
                    ${juego.plataforma}
                </div>
                <div class="card-body">
                    <h3>${juego.nombre}</h3>
                    <p class="clasificacion">Clasificación: <span>${juego.clasificacion}</span></p>
                    <p class="precio">$${juego.precio.toLocaleString('es-CL')}</p>
                    <span class="badge-status ${badgeStock}">${textoStock}</span>
                    
                    <div class="card-actions">
                        <button class="btn-delete" onclick="eliminarVideojuego(${index})">Quitar del inventario</button>
                    </div>
                </div>
            </div>
        `;
    });
}

// Función para procesar cálculos y renderizar el resumen
function renderizarResumen(juegos) {
    const container = document.getElementById('summary-container');
    if (!container) return;

    const totalJuegos = juegos.length;
    const disponibles = juegos.filter(j => j.stock > 0).length;
    const agotados = juegos.filter(j => j.stock === 0).length;
    const valorTotal = juegos.reduce((sum, j) => sum + (j.precio * j.stock), 0);
    
    // Control por si el inventario se queda completamente vacío
    const juegoMasCaro = juegos.length > 0 
        ? juegos.reduce((max, j) => j.precio > max.precio ? j : max, juegos[0])
        : { nombre: "N/A", plataforma: "N/A", precio: 0 };

    container.innerHTML = `
        <h2 class="section-title">Resumen del Inventario</h2>
        <div class="summary-grid">
            <div class="metric-card">
                <span class="metric-title">Cantidad de videojuegos</span>
                <span class="metric-number">${totalJuegos}</span>
            </div>
            <div class="metric-card">
                <span class="metric-title">Disponibles</span>
                <span class="metric-number text-success">${disponibles}</span>
            </div>
            <div class="metric-card">
                <span class="metric-title">Agotados</span>
                <span class="metric-number text-danger">${agotados}</span>
            </div>
            <div class="metric-card">
                <span class="metric-title">Valor del inventario</span>
                <span class="metric-number text-highlight">$${valorTotal.toLocaleString('es-CL')}</span>
            </div>
        </div>
        
        <div class="featured-banner">
            <div class="featured-info">
                <span class="featured-tag">🎮 Videojuego más caro</span>
                <h4 class="featured-title-name">${juegoMasCaro.nombre}</h4>
            </div>
            <div class="featured-meta">
                <span class="featured-platform">${juegoMasCaro.plataforma}</span>
                <span class="featured-price">$${juegoMasCaro.precio.toLocaleString('es-CL')}</span>
            </div>
        </div>
    `;
}

// Función global para eliminar un videojuego del array por su índice
window.eliminarVideojuego = function(index) {
    videojuegos.splice(index, 1); // Quitar el elemento del array
    // Volver a renderizar todo de forma reactiva con los nuevos datos
    renderizarTarjetas(videojuegos);
    renderizarResumen(videojuegos);
};

// Evento principal al cargar el DOM
document.addEventListener('DOMContentLoaded', () => {
    renderizarTarjetas(videojuegos);
    renderizarResumen(videojuegos);

    // Escuchar el evento del formulario para agregar productos
    const form = document.getElementById('game-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault(); // Evitar recarga de página

            // Capturar datos y convertirlos a tipos de datos correctos
            const nuevoJuego = {
                nombre: document.getElementById('form-nombre').value,
                plataforma: document.getElementById('form-plataforma').value,
                clasificacion: document.getElementById('form-clasificacion').value,
                precio: parseInt(document.getElementById('form-precio').value),
                stock: parseInt(document.getElementById('form-stock').value)
            };

            // Insertar al array global
            videojuegos.push(nuevoJuego);

            // Actualizar vista e indicadores inmediatamente
            renderizarTarjetas(videojuegos);
            renderizarResumen(videojuegos);

            // Limpiar campos del formulario
            form.reset();
        });
    }
});