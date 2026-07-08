// Función para renderizar las tarjetas de juegos
function renderizarTarjetas(juegos) {
    const container = document.getElementById('games-container');
    if (!container) return;
    container.innerHTML = ''; // Limpiar residuos

    juegos.forEach(juego => {
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
                </div>
            </div>
        `;
    });
}

// Función para procesar cálculos de la rúbrica y renderizar resumen ejecutivo
function renderizarResumen(juegos) {
    const container = document.getElementById('summary-container');
    if (!container) return;

    // Métricas dinámicas requeridas
    const totalJuegos = juegos.length;
    const disponibles = juegos.filter(j => j.stock > 0).length;
    const agotados = juegos.filter(j => j.stock === 0).length;
    const valorTotal = juegos.reduce((sum, j) => sum + (j.precio * j.stock), 0);
    const juegoMasCaro = juegos.reduce((max, j) => j.precio > max.precio ? j : max, juegos[0]);

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
            <div class="metric-card shadow-value">
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

// Evento seguro: Se ejecuta cuando el DOM está completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    if (typeof videojuegos !== 'undefined') {
        renderizarTarjetas(videojuegos);
        renderizarResumen(videojuegos);
    } else {
        console.error("Error: El archivo datos.js no se cargó correctamente.");
    }
});