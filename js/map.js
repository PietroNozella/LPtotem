// ===== Mapa SP Security - Leaflet com OpenStreetMap =====

document.addEventListener('DOMContentLoaded', function() {
    var mapElement = document.getElementById('spMap');
    if (!mapElement) {
        console.error('Elemento #spMap não encontrado');
        return;
    }

    // Verificar se Leaflet está carregado
    if (typeof L === 'undefined') {
        console.error('Leaflet não está carregado');
        mapElement.innerHTML = '<div style="color:#ef4444;padding:40px;text-align:center;">Erro ao carregar biblioteca do mapa. Por favor, recarregue a página.</div>';
        return;
    }

    try {
        // Coordenadas das cidades de São Paulo
        const cities = [
            // Sede
            { name: 'São Paulo', coords: [-23.5505, -46.6333], isSede: true },
            
            // Grande São Paulo
            { name: 'Guarulhos', coords: [-23.4538, -46.5333], isSede: false },
            { name: 'ABC Paulista', coords: [-23.6821, -46.5650], isSede: false },
            { name: 'Osasco', coords: [-23.5329, -46.7919], isSede: false },
            { name: 'Suzano', coords: [-23.5425, -46.3108], isSede: false },
            
            // Interior - Região Campinas
            { name: 'Campinas', coords: [-22.9099, -47.0626], isSede: false },
            { name: 'Jundiaí', coords: [-23.1864, -46.8842], isSede: false },
            
            // Interior - Outras regiões
            { name: 'Sorocaba', coords: [-23.5015, -47.4526], isSede: false },
            { name: 'Santos', coords: [-23.9608, -46.3335], isSede: false },
            { name: 'São José dos Campos', coords: [-23.1791, -45.8872], isSede: false },
            { name: 'Ribeirão Preto', coords: [-21.1704, -47.8103], isSede: false },
            { name: 'Catanduva', coords: [-21.1378, -48.9728], isSede: false },
        ];

        // Centro do mapa (São Paulo)
        const spCenter = [-23.5505, -46.6333];

        // Inicializar mapa
        const map = L.map('spMap', {
            center: spCenter,
            zoom: 8,
            zoomControl: true,
            scrollWheelZoom: false, // Desabilitar zoom com scroll inicialmente
            dragging: true,
            touchZoom: true,
            doubleClickZoom: true,
            boxZoom: true,
            keyboard: true,
            attributionControl: true
        });

        // Habilitar zoom com scroll ao clicar no mapa
        map.on('click', function() {
            map.scrollWheelZoom.enable();
        });

        // Desabilitar zoom com scroll ao sair do mapa
        map.on('mouseout', function() {
            map.scrollWheelZoom.disable();
        });

        // Adicionar tiles do OpenStreetMap (sem necessidade de API key)
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
            maxZoom: 19,
            className: 'map-tiles'
        }).addTo(map);

        // Estilo customizado para os marcadores
        const sedeIcon = L.divIcon({
            className: 'custom-marker sede-marker',
            html: `
                <div class="marker-container">
                    <div class="marker-pulse"></div>
                    <div class="marker-pin sede">
                        <i class="fas fa-building"></i>
                    </div>
                </div>
            `,
            iconSize: [40, 40],
            iconAnchor: [20, 40],
            popupAnchor: [0, -40]
        });

        const cityIcon = L.divIcon({
            className: 'custom-marker city-marker',
            html: `
                <div class="marker-container">
                    <div class="marker-pulse"></div>
                    <div class="marker-pin">
                        <i class="fas fa-map-marker-alt"></i>
                    </div>
                </div>
            `,
            iconSize: [30, 30],
            iconAnchor: [15, 30],
            popupAnchor: [0, -30]
        });

        // Adicionar marcadores
        cities.forEach(city => {
            const marker = L.marker(city.coords, {
                icon: city.isSede ? sedeIcon : cityIcon,
                title: city.name
            }).addTo(map);

            // Popup personalizado
            const popupContent = `
                <div class="custom-popup ${city.isSede ? 'sede-popup' : ''}">
                    <h3>${city.name}</h3>
                    ${city.isSede ? '<p><strong>Sede Principal</strong></p>' : '<p>Área Atendida</p>'}
                    <p><i class="fas fa-phone"></i> Atendimento 24/7</p>
                </div>
            `;

            marker.bindPopup(popupContent, {
                className: 'leaflet-custom-popup',
                closeButton: true,
                offset: [0, -10]
            });

            // Abrir popup da sede automaticamente
            if (city.isSede) {
                marker.openPopup();
            }
        });

        // Adicionar círculo destacando a região metropolitana
        L.circle(spCenter, {
            color: '#06b6d4',
            fillColor: '#06b6d4',
            fillOpacity: 0.1,
            radius: 50000, // 50km
            weight: 2,
            dashArray: '10, 10'
        }).addTo(map);

        // Ajustar o mapa após carregar
        setTimeout(() => {
            map.invalidateSize();
        }, 100);

        console.log('Mapa Leaflet carregado com sucesso!');

    } catch (error) {
        console.error('Erro ao inicializar o mapa:', error);
        mapElement.innerHTML = '<div style="color:#ef4444;padding:40px;text-align:center;">Erro ao carregar o mapa. Por favor, recarregue a página.</div>';
    }
});

// Estilos CSS para os marcadores customizados
const style = document.createElement('style');
style.textContent = `
    /* Tiles do mapa com tema escuro */
    .map-tiles {
        filter: brightness(0.6) invert(1) contrast(1.2) hue-rotate(200deg) saturate(0.3) brightness(0.7);
    }

    /* Container do marcador */
    .marker-container {
        position: relative;
        width: 100%;
        height: 100%;
    }

    /* Animação de pulso */
    .marker-pulse {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 40px;
        height: 40px;
        background: rgba(59, 130, 246, 0.4);
        border-radius: 50%;
        animation: marker-pulse 2s ease-out infinite;
    }

    .sede-marker .marker-pulse {
        background: rgba(6, 182, 212, 0.5);
        width: 50px;
        height: 50px;
    }

    @keyframes marker-pulse {
        0% {
            transform: translate(-50%, -50%) scale(0.5);
            opacity: 1;
        }
        100% {
            transform: translate(-50%, -50%) scale(2);
            opacity: 0;
        }
    }

    /* Pin do marcador */
    .marker-pin {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 30px;
        height: 30px;
        background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
        border-radius: 50% 50% 50% 0;
        transform: translate(-50%, -50%) rotate(-45deg);
        border: 3px solid white;
        box-shadow: 0 4px 12px rgba(59, 130, 246, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
    }

    .marker-pin i {
        transform: rotate(45deg);
        color: white;
        font-size: 14px;
    }

    .marker-pin.sede {
        width: 40px;
        height: 40px;
        background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%);
        box-shadow: 0 6px 16px rgba(6, 182, 212, 0.6);
    }

    .marker-pin.sede i {
        font-size: 16px;
    }

    /* Hover effect */
    .custom-marker:hover .marker-pin {
        transform: translate(-50%, -50%) rotate(-45deg) scale(1.2);
        box-shadow: 0 6px 20px rgba(59, 130, 246, 0.8);
    }

    .sede-marker:hover .marker-pin {
        box-shadow: 0 8px 24px rgba(6, 182, 212, 0.9);
    }

    /* Popup customizado */
    .leaflet-custom-popup .leaflet-popup-content-wrapper {
        background: rgba(10, 10, 15, 0.95);
        color: #e5e7eb;
        border-radius: 12px;
        padding: 0;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
        border: 1px solid rgba(59, 130, 246, 0.3);
    }

    .leaflet-custom-popup .leaflet-popup-content {
        margin: 0;
        min-width: 200px;
    }

    .custom-popup {
        padding: 16px;
    }

    .custom-popup h3 {
        margin: 0 0 8px 0;
        font-size: 16px;
        font-weight: 600;
        color: #3b82f6;
    }

    .custom-popup.sede-popup h3 {
        color: #06b6d4;
    }

    .custom-popup p {
        margin: 4px 0;
        font-size: 13px;
        color: #a1a1aa;
    }

    .custom-popup p strong {
        color: #06b6d4;
    }

    .custom-popup i {
        margin-right: 6px;
        color: #3b82f6;
    }

    .leaflet-custom-popup .leaflet-popup-tip {
        background: rgba(10, 10, 15, 0.95);
        border: 1px solid rgba(59, 130, 246, 0.3);
    }

    .leaflet-custom-popup .leaflet-popup-close-button {
        color: #a1a1aa !important;
        font-size: 20px !important;
        padding: 8px !important;
    }

    .leaflet-custom-popup .leaflet-popup-close-button:hover {
        color: #3b82f6 !important;
    }

    /* Controles do zoom */
    .leaflet-control-zoom a {
        background: rgba(10, 10, 15, 0.9) !important;
        color: #3b82f6 !important;
        border: 1px solid rgba(59, 130, 246, 0.3) !important;
    }

    .leaflet-control-zoom a:hover {
        background: rgba(59, 130, 246, 0.2) !important;
        color: #06b6d4 !important;
    }

    /* Attribution */
    .leaflet-control-attribution {
        background: rgba(10, 10, 15, 0.8) !important;
        color: #71717a !important;
        font-size: 10px !important;
    }

    .leaflet-control-attribution a {
        color: #3b82f6 !important;
    }
`;

document.head.appendChild(style);
