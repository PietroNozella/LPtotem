// ===== Mapa Interativo SP Security =====

function initMap() {
    // Verificar se o elemento do mapa existe
    const mapElement = document.getElementById('spMap');
    if (!mapElement) {
        console.log('Elemento spMap não encontrado');
        return;
    }
    
    // Verificar se Leaflet está disponível
    if (typeof L === 'undefined') {
        console.error('Leaflet não está carregado, tentando novamente em 500ms...');
        setTimeout(initMap, 500);
        return;
    }

    try {
        // Coordenadas centrais de São Paulo
        const spCenter = [-23.5505, -46.6333];
        
        // Inicializar o mapa
        const map = L.map('spMap', {
            center: spCenter,
            zoom: 9,
            scrollWheelZoom: false,
            zoomControl: true
        });

        // Adicionar camada de tiles com estilo escuro (CartoDB Dark Matter)
        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
            subdomains: 'abcd',
            maxZoom: 19
        }).addTo(map);

        // Ícone personalizado para a sede (São Paulo)
        const sedeIcon = L.divIcon({
            className: 'custom-marker sede-marker',
            html: '<div class="marker-pulse"></div><div class="marker-dot sede"></div>',
            iconSize: [30, 30],
            iconAnchor: [15, 15],
            popupAnchor: [0, -15]
        });

        // Ícone personalizado para cidades atendidas
        const cidadeIcon = L.divIcon({
            className: 'custom-marker cidade-marker',
            html: '<div class="marker-pulse"></div><div class="marker-dot"></div>',
            iconSize: [24, 24],
            iconAnchor: [12, 12],
            popupAnchor: [0, -12]
        });

        // Lista de cidades com coordenadas reais
        const cidades = [
            // Sede
            { nome: 'São Paulo', lat: -23.5505, lng: -46.6333, sede: true, descricao: 'Sede SP Security - Atendimento em toda Grande SP' },
            // Grande São Paulo
            { nome: 'Guarulhos', lat: -23.4538, lng: -46.5333, descricao: 'Projetos em condomínios e áreas comerciais' },
            { nome: 'Santo André', lat: -23.6639, lng: -46.5310, descricao: 'Cobertura completa no ABC Paulista' },
            { nome: 'São Bernardo do Campo', lat: -23.6914, lng: -46.5646, descricao: 'Segurança para indústrias e condomínios' },
            { nome: 'Osasco', lat: -23.5325, lng: -46.7917, descricao: 'Monitoramento urbano e empresarial' },
            { nome: 'Suzano', lat: -23.5472, lng: -46.3111, descricao: 'Projeto Smart Suzano - Cidade Inteligente' },
            { nome: 'Mogi das Cruzes', lat: -23.5225, lng: -46.1856, descricao: 'Totens de monitoramento urbano' },
            { nome: 'Diadema', lat: -23.6816, lng: -46.6206, descricao: 'Segurança em áreas públicas' },
            { nome: 'Carapicuíba', lat: -23.5225, lng: -46.8358, descricao: 'Monitoramento de praças e escolas' },
            { nome: 'Mauá', lat: -23.6678, lng: -46.4608, descricao: 'Projetos de segurança municipal' },
            { nome: 'Itaquaquecetuba', lat: -23.4864, lng: -46.3486, descricao: 'Câmeras e totens urbanos' },
            { nome: 'Taboão da Serra', lat: -23.6219, lng: -46.7581, descricao: 'Segurança em condomínios' },
            { nome: 'Barueri', lat: -23.5114, lng: -46.8761, descricao: 'Alphaville e região empresarial' },
            { nome: 'Cotia', lat: -23.6036, lng: -46.9192, descricao: 'Condomínios e áreas residenciais' },
            // Interior
            { nome: 'Jundiaí', lat: -23.1864, lng: -46.8842, descricao: 'Projeto Jundiaí é da Gente' },
            { nome: 'Campinas', lat: -22.9099, lng: -47.0626, descricao: 'Maior cidade do interior paulista' },
            { nome: 'Sorocaba', lat: -23.5015, lng: -47.4526, descricao: 'Projetos de segurança urbana' },
            { nome: 'São Roque', lat: -23.5292, lng: -47.1353, descricao: 'Totens para área turística' },
            { nome: 'São José dos Campos', lat: -23.1896, lng: -45.8840, descricao: 'Polo tecnológico e aeroespacial' },
            { nome: 'Santos', lat: -23.9608, lng: -46.3336, descricao: 'Litoral paulista' },
            { nome: 'Catanduva', lat: -21.1378, lng: -48.9753, descricao: 'Projeto Catanduva Segura' },
            { nome: 'Piracicaba', lat: -22.7338, lng: -47.6476, descricao: 'Monitoramento municipal' },
            { nome: 'Ribeirão Preto', lat: -21.1767, lng: -47.8208, descricao: 'Interior paulista' },
            { nome: 'Americana', lat: -22.7374, lng: -47.3331, descricao: 'Região metropolitana de Campinas' },
            { nome: 'Indaiatuba', lat: -23.0903, lng: -47.2181, descricao: 'Condomínios e empresas' },
            { nome: 'Atibaia', lat: -23.1172, lng: -46.5506, descricao: 'Área turística e residencial' },
            { nome: 'Jacareí', lat: -23.3050, lng: -45.9658, descricao: 'Vale do Paraíba' },
            { nome: 'Taubaté', lat: -23.0226, lng: -45.5558, descricao: 'Polo industrial' },
            { nome: 'Praia Grande', lat: -24.0058, lng: -46.4022, descricao: 'Litoral sul' },
            { nome: 'São Vicente', lat: -23.9631, lng: -46.3889, descricao: 'Baixada Santista' }
        ];

        // Adicionar marcadores ao mapa
        cidades.forEach(function(cidade) {
            const icon = cidade.sede ? sedeIcon : cidadeIcon;
            
            const marker = L.marker([cidade.lat, cidade.lng], { icon: icon }).addTo(map);
            
            // Popup personalizado
            const popupContent = '<div class="map-popup"><h4>' + cidade.nome + '</h4><p>' + cidade.descricao + '</p>' + (cidade.sede ? '<span class="popup-badge">Sede Principal</span>' : '') + '</div>';
            
            marker.bindPopup(popupContent, { className: 'custom-popup' });
        });

        // Desenhar círculo da região metropolitana
        L.circle(spCenter, {
            color: 'rgba(59, 130, 246, 0.5)',
            fillColor: 'rgba(59, 130, 246, 0.1)',
            fillOpacity: 0.3,
            radius: 50000,
            weight: 2,
            dashArray: '5, 10'
        }).addTo(map);

        // Habilitar scroll zoom quando o usuário clicar no mapa
        map.on('click', function() {
            map.scrollWheelZoom.enable();
        });

        // Desabilitar scroll zoom quando o mouse sair do mapa
        map.on('mouseout', function() {
            map.scrollWheelZoom.disable();
        });
        
        // Forçar redimensionamento após um pequeno delay (fix para quando o mapa carrega escondido)
        setTimeout(function() {
            map.invalidateSize();
        }, 100);
        
        console.log('Mapa SP Security inicializado com sucesso');
        
    } catch (error) {
        console.error('Erro ao inicializar o mapa:', error);
        mapElement.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;color:#a1a1aa;flex-direction:column;gap:10px;padding:40px;text-align:center;"><i class="fas fa-map-marker-alt" style="font-size:48px;color:#3b82f6;margin-bottom:10px;"></i><h3 style="color:#fff;margin:0;">Atendemos todo o Estado de São Paulo</h3><p style="margin:10px 0 0 0;">Grande SP, Campinas, Sorocaba, Santos e mais de 50 cidades</p></div>';
    }
}

// Iniciar quando o DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMap);
} else {
    // DOM já está pronto, esperar um pouco para o Leaflet carregar
    setTimeout(initMap, 100);
}
