// ===== SEÇÃO "ONDE ESTAMOS" - MAPA LEAFLET =====
// Configuração do mapa com Leaflet para mostrar área de atendimento

(function() {
    'use strict';
    
    // Configuração das cidades atendidas na Grande São Paulo
    const serviceCities = [
        { name: 'São Paulo (Sede)', lat: -23.5505, lng: -46.6333, isHeadquarters: true },
        { name: 'Guarulhos', lat: -23.4538, lng: -46.5333 },
        { name: 'São Bernardo', lat: -23.6914, lng: -46.5650 },
        { name: 'Santo André', lat: -23.6636, lng: -46.5341 },
        { name: 'Osasco', lat: -23.5329, lng: -46.7919 },
        { name: 'Barueri', lat: -23.5106, lng: -46.8767 },
        { name: 'Cotia', lat: -23.6040, lng: -46.9189 },
        { name: 'Taboão da Serra', lat: -23.6093, lng: -46.7584 },
        { name: 'Diadema', lat: -23.6860, lng: -46.6228 },
        { name: 'Mauá', lat: -23.6678, lng: -46.4614 },
        { name: 'Suzano', lat: -23.5425, lng: -46.3108 },
        { name: 'Mogi das Cruzes', lat: -23.5225, lng: -46.1883 },
        { name: 'Itaquaquecetuba', lat: -23.4864, lng: -46.3483 },
        { name: 'Carapicuíba', lat: -23.5225, lng: -46.8358 },
        { name: 'Itapecerica da Serra', lat: -23.7172, lng: -46.8489 }
    ];
    
    let map = null;
    let markersLayer = null;
    
    // Inicializar mapa quando a seção estiver visível
    function initMap() {
        if (map) return; // Já inicializado
        
        const mapContainer = document.getElementById('serviceAreaMap');
        if (!mapContainer) return;
        
        try {
            // Criar mapa com tema escuro
            map = L.map('serviceAreaMap', {
                center: [-23.5505, -46.6333], // São Paulo
                zoom: 10,
                zoomControl: true,
                scrollWheelZoom: false, // Desabilitar scroll zoom para melhor UX
                dragging: true,
                touchZoom: true,
                doubleClickZoom: true
            });
            
            // Adicionar tiles com tema escuro (CartoDB Dark Matter)
            L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
                subdomains: 'abcd',
                maxZoom: 19
            }).addTo(map);
            
            // Criar layer para markers
            markersLayer = L.layerGroup().addTo(map);
            
            // Adicionar círculo de cobertura (raio de ~30km)
            const coverageCircle = L.circle([-23.5505, -46.6333], {
                color: '#3b82f6',
                fillColor: '#3b82f6',
                fillOpacity: 0.1,
                weight: 2,
                dashArray: '10, 10',
                radius: 30000 // 30km em metros
            }).addTo(map);
            
            coverageCircle.bindPopup('<strong>Área de Cobertura SP Security</strong><br>Raio de 30km');
            
            // Criar ícones personalizados
            const defaultIcon = L.divIcon({
                className: 'custom-marker',
                html: '<div class="marker-pin"></div>',
                iconSize: [30, 42],
                iconAnchor: [15, 42],
                popupAnchor: [0, -42]
            });
            
            const headquartersIcon = L.divIcon({
                className: 'custom-marker headquarters',
                html: '<div class="marker-pin headquarters"><i class="fas fa-star"></i></div>',
                iconSize: [40, 52],
                iconAnchor: [20, 52],
                popupAnchor: [0, -52]
            });
            
            // Adicionar markers para cada cidade
            serviceCities.forEach(city => {
                const icon = city.isHeadquarters ? headquartersIcon : defaultIcon;
                const marker = L.marker([city.lat, city.lng], { icon: icon })
                    .addTo(markersLayer);
                
                const popupContent = city.isHeadquarters 
                    ? `<strong>${city.name}</strong><br><span style="color: #3b82f6;">⭐ Sede Principal</span>`
                    : `<strong>${city.name}</strong><br>Área Atendida`;
                
                marker.bindPopup(popupContent);
            });
            
            // Ajustar bounds para mostrar todos os markers
            const bounds = L.latLngBounds(serviceCities.map(c => [c.lat, c.lng]));
            map.fitBounds(bounds, { padding: [50, 50] });
            
            // Fix para tiles que não carregam
            setTimeout(() => {
                if (map) map.invalidateSize();
            }, 250);
            
            console.log('✓ Mapa "Onde Estamos" carregado com sucesso');
            
        } catch (error) {
            console.error('Erro ao carregar mapa:', error);
            showMapError();
        }
    }
    
    // Mostrar mensagem de erro
    function showMapError() {
        const mapContainer = document.getElementById('serviceAreaMap');
        if (mapContainer) {
            mapContainer.innerHTML = `
                <div class="map-error">
                    <i class="fas fa-exclamation-triangle"></i>
                    <p>Não foi possível carregar o mapa.</p>
                    <button onclick="location.reload()" class="btn-reload">
                        <i class="fas fa-rotate-right"></i> Recarregar
                    </button>
                </div>
            `;
        }
    }
    
    // Observar quando a seção entra na viewport
    function setupIntersectionObserver() {
        const section = document.getElementById('onde-estamos');
        if (!section) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !map) {
                    initMap();
                    observer.disconnect(); // Inicializar apenas uma vez
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '100px'
        });
        
        observer.observe(section);
    }
    
    // Inicializar quando o DOM estiver pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setupIntersectionObserver);
    } else {
        setupIntersectionObserver();
    }
    
    // Cleanup ao sair da página
    window.addEventListener('beforeunload', () => {
        if (map) {
            map.remove();
            map = null;
        }
    });
    
})();
