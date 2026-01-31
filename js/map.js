// ===== Mapa SP Security - Versão Realista com Imagem =====

document.addEventListener('DOMContentLoaded', function() {
    var mapElement = document.getElementById('spMap');
    if (!mapElement) return;
    
    // Criar mapa realista com imagem de fundo e marcadores
    mapElement.innerHTML = '\
    <div class="realistic-map">\
        <div class="map-container-real">\
            <!-- Imagem do mapa de SP -->\
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/SaoPaulo_MesoMicroMunicip.svg/1200px-SaoPaulo_MesoMicroMunicip.svg.png" alt="Mapa de São Paulo" class="map-image">\
            \
            <!-- Overlay escuro para combinar com o tema -->\
            <div class="map-overlay"></div>\
            \
            <!-- Marcadores das cidades -->\
            <div class="marker sede" style="left: 52%; top: 58%;" data-city="São Paulo">\
                <div class="marker-pulse"></div>\
                <div class="marker-dot"></div>\
                <span class="marker-label">São Paulo</span>\
            </div>\
            \
            <div class="marker" style="left: 54%; top: 52%;" data-city="Guarulhos">\
                <div class="marker-pulse"></div>\
                <div class="marker-dot"></div>\
                <span class="marker-label">Guarulhos</span>\
            </div>\
            \
            <div class="marker" style="left: 56%; top: 62%;" data-city="ABC">\
                <div class="marker-pulse"></div>\
                <div class="marker-dot"></div>\
                <span class="marker-label">ABC Paulista</span>\
            </div>\
            \
            <div class="marker" style="left: 48%; top: 58%;" data-city="Osasco">\
                <div class="marker-pulse"></div>\
                <div class="marker-dot"></div>\
                <span class="marker-label">Osasco</span>\
            </div>\
            \
            <div class="marker" style="left: 38%; top: 48%;" data-city="Campinas">\
                <div class="marker-pulse"></div>\
                <div class="marker-dot"></div>\
                <span class="marker-label">Campinas</span>\
            </div>\
            \
            <div class="marker" style="left: 42%; top: 68%;" data-city="Sorocaba">\
                <div class="marker-pulse"></div>\
                <div class="marker-dot"></div>\
                <span class="marker-label">Sorocaba</span>\
            </div>\
            \
            <div class="marker" style="left: 54%; top: 78%;" data-city="Santos">\
                <div class="marker-pulse"></div>\
                <div class="marker-dot"></div>\
                <span class="marker-label">Santos</span>\
            </div>\
            \
            <div class="marker" style="left: 44%; top: 42%;" data-city="Jundiaí">\
                <div class="marker-pulse"></div>\
                <div class="marker-dot"></div>\
                <span class="marker-label">Jundiaí</span>\
            </div>\
            \
            <div class="marker" style="left: 68%; top: 42%;" data-city="S.J. Campos">\
                <div class="marker-pulse"></div>\
                <div class="marker-dot"></div>\
                <span class="marker-label">S.J. Campos</span>\
            </div>\
            \
            <div class="marker" style="left: 28%; top: 28%;" data-city="Ribeirão Preto">\
                <div class="marker-pulse"></div>\
                <div class="marker-dot"></div>\
                <span class="marker-label">Ribeirão Preto</span>\
            </div>\
            \
            <div class="marker" style="left: 58%; top: 55%;" data-city="Suzano">\
                <div class="marker-pulse"></div>\
                <div class="marker-dot"></div>\
                <span class="marker-label">Suzano</span>\
            </div>\
            \
            <div class="marker" style="left: 35%; top: 25%;" data-city="Catanduva">\
                <div class="marker-pulse"></div>\
                <div class="marker-dot"></div>\
                <span class="marker-label">Catanduva</span>\
            </div>\
        </div>\
    </div>\
    \
    <style>\
        .realistic-map {\
            width: 100%;\
            height: 100%;\
            display: flex;\
            align-items: center;\
            justify-content: center;\
            background: #0a0a0f;\
        }\
        \
        .map-container-real {\
            position: relative;\
            width: 100%;\
            max-width: 800px;\
            height: 100%;\
            display: flex;\
            align-items: center;\
            justify-content: center;\
        }\
        \
        .map-image {\
            width: 100%;\
            height: auto;\
            filter: brightness(0.4) contrast(1.2) saturate(0.3);\
            opacity: 0.9;\
        }\
        \
        .map-overlay {\
            position: absolute;\
            top: 0;\
            left: 0;\
            right: 0;\
            bottom: 0;\
            background: linear-gradient(135deg, rgba(10,10,15,0.3) 0%, rgba(18,18,26,0.5) 100%);\
            pointer-events: none;\
        }\
        \
        .marker {\
            position: absolute;\
            transform: translate(-50%, -50%);\
            cursor: pointer;\
            z-index: 10;\
        }\
        \
        .marker-dot {\
            width: 12px;\
            height: 12px;\
            background: #3b82f6;\
            border-radius: 50%;\
            border: 2px solid white;\
            box-shadow: 0 0 15px rgba(59, 130, 246, 0.6);\
            position: relative;\
            z-index: 2;\
            transition: transform 0.2s;\
        }\
        \
        .marker.sede .marker-dot {\
            width: 16px;\
            height: 16px;\
            background: #06b6d4;\
            box-shadow: 0 0 20px rgba(6, 182, 212, 0.8);\
        }\
        \
        .marker:hover .marker-dot {\
            transform: scale(1.3);\
        }\
        \
        .marker-pulse {\
            position: absolute;\
            top: 50%;\
            left: 50%;\
            transform: translate(-50%, -50%);\
            width: 30px;\
            height: 30px;\
            background: rgba(59, 130, 246, 0.4);\
            border-radius: 50%;\
            animation: marker-pulse 2s ease-out infinite;\
            z-index: 1;\
        }\
        \
        .marker.sede .marker-pulse {\
            width: 40px;\
            height: 40px;\
            background: rgba(6, 182, 212, 0.4);\
        }\
        \
        @keyframes marker-pulse {\
            0% {\
                transform: translate(-50%, -50%) scale(0.5);\
                opacity: 1;\
            }\
            100% {\
                transform: translate(-50%, -50%) scale(2);\
                opacity: 0;\
            }\
        }\
        \
        .marker-label {\
            position: absolute;\
            top: 100%;\
            left: 50%;\
            transform: translateX(-50%);\
            margin-top: 8px;\
            white-space: nowrap;\
            font-size: 11px;\
            font-weight: 500;\
            color: #a1a1aa;\
            background: rgba(10, 10, 15, 0.9);\
            padding: 4px 8px;\
            border-radius: 4px;\
            opacity: 0;\
            transition: opacity 0.2s;\
            pointer-events: none;\
        }\
        \
        .marker:hover .marker-label {\
            opacity: 1;\
        }\
        \
        .marker.sede .marker-label {\
            opacity: 1;\
            color: #06b6d4;\
            font-weight: 600;\
        }\
    </style>';
});
