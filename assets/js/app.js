// Función para renderizar las tarjetas en la cuadrícula superior
function renderizarPlataformas(listaJuegos) {
    const container = document.getElementById('games-container');
    if (!container) return;
    container.innerHTML = '';

    listaJuegos.forEach(juego => {
        // Clase limpia para CSS basada en la plataforma (ps5, pc, nintendoswitch, xbox)
        const clasePlataforma = juego.plataforma.toLowerCase().replace(/\s+/g, '');
        const tieneStock = juego.stock > 0;
        const claseStock = tieneStock ? 'status-disponible' : 'status-agotado';
        const textoStock = tieneStock ? `Disponible (${juego.stock})` : `Agotado (${juego.stock})`;

        const card = document.createElement('div');
        card.classList.add('game-card');
        
        card.innerHTML = `
            <div class="card-header-platform platform-${clasePlataforma}">
                ${juego.plataforma}
            </div>
            <div class="card-content">
                <h3>${juego.nombre}</h3>
                <p class="game-info">Clasificación: ${juego.clasificacion}</p>
                <p class="game-price">$${juego.precio.toLocaleString('es-CL')}</p>
                <p class="game-stock ${claseStock}">${textoStock}</p>
            </div>
        `;
        container.appendChild(card);
    });
}

// Función para calcular métricas de la rúbrica y renderizar el panel de resumen
function calcularYRenderizarResumen(listaJuegos) {
    const summaryContainer = document.getElementById('summary-container');
    if (!summaryContainer) return;

    // 1. Cálculos de stock y totales
    const totalJuegos = listaJuegos.length;
    const disponibles = listaJuegos.filter(j => j.stock > 0).length;
    const agotados = listaJuegos.filter(j => j.stock === 0).length;
    
    // 2. Valor total multiplicando precio por stock de cada uno
    const valorInventario = listaJuegos.reduce((acc, juego) => acc + (juego.precio * juego.stock), 0);

    // 3. Buscar el videojuego más caro
    const juegoMasCaro = listaJuegos.reduce((max, juego) => juego.precio > max.precio ? juego : max, listaJuegos[0]);

    // Inyección limpia respetando tus textos originales pero con diseño estilizado
    summaryContainer.innerHTML = `
        <h2>Resumen del Inventario</h2>
        <div class="summary-grid">
            <div class="summary-box">
                <span class="summary-label">Cantidad de videojuegos</span>
                <span class="summary-value">${totalJuegos}</span>
            </div>
            <div class="summary-box">
                <span class="summary-label">Disponibles</span>
                <span class="summary-value">${disponibles}</span>
            </div>
            <div class="summary-box">
                <span class="summary-label">Agotados</span>
                <span class="summary-value">${agotados}</span>
            </div>
            <div class="summary-box">
                <span class="summary-label">Valor del inventario</span>
                <span class="summary-value">$${valorInventario.toLocaleString('es-CL')}</span>
            </div>
        </div>
        
        <div class="featured-box">
            <div class="featured-left">
                <span class="featured-title">🎮 Videojuego más caro:</span>
                <span class="featured-name">${juegoMasCaro.nombre}</span>
            </div>
            <div class="featured-right">
                <span class="featured-meta">Precio: $${juegoMasCaro.precio.toLocaleString('es-CL')} | Plataforma: ${juegoMasCaro.plataforma}</span>
            </div>
        </div>
    `;
}

// Inicializar la aplicación una vez cargado el DOM
document.addEventListener('DOMContentLoaded', () => {
    renderizarPlataformas(videojuegos);
    calcularYRenderizarResumen(videojuegos);
});