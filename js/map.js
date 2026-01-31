// ===== Mapa SP Security - Versão Realista com Imagem Local =====

document.addEventListener('DOMContentLoaded', function() {
    var mapElement = document.getElementById('spMap');
    if (!mapElement) return;
    
    // Criar mapa realista com imagem de fundo e marcadores
    mapElement.innerHTML = '\
    <div class="realistic-map">\
        <div class="map-container-real">\
            <!-- Imagem do mapa de SP (local) -->\
            <img src="assets/mapa-sp.svg" alt="Mapa de São Paulo" class="map-image" onerror="this.style.display=\'none\'">\
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
            max-width: 900px;\
            height: 100%;\
            display: flex;\
            align-items: center;\
            justify-content: center;\
        }\
        \
        .map-image {\
            width: 100%;\
            height: auto;\
            filter: brightness(0.5) contrast(1.3) saturate(0.4);\
            opacity: 0.95;\
        }\
        \
        .map-overlay {\
            position: absolute;\
            top: 0;\
            left: 0;\
            right: 0;\
            bottom: 0;\
            background: linear-gradient(135deg, rgba(10,10,15,0.2) 0%, rgba(18,18,26,0.4) 100%);\
            pointer-events: none;\
        }\
        \
        .marker {\
            position: absolute;\
            transform: translate(-50%, -50%);\
            cursor: pointer;\
            z-index: 10;\
            transition: transform 0.3s ease;\
        }\
        \
        .marker:hover {\
            transform: translate(-50%, -50%) scale(1.1);\
            z-index: 20;\
        }\
        \
        .marker-dot {\
            width: 14px;\
            height: 14px;\
            background: #3b82f6;\
            border-radius: 50%;\
            border: 3px solid white;\
            box-shadow: 0 0 20px rgba(59, 130, 246, 0.8), 0 0 40px rgba(59, 130, 246, 0.4);\
            position: relative;\
            z-index: 2;\
            transition: all 0.3s ease;\
        }\
        \
        .marker.sede .marker-dot {\
            width: 18px;\
            height: 18px;\
            background: #06b6d4;\
            box-shadow: 0 0 25px rgba(6, 182, 212, 0.9), 0 0 50px rgba(6, 182, 212, 0.5);\
        }\
        \
        .marker:hover .marker-dot {\
            transform: scale(1.3);\
            box-shadow: 0 0 30px rgba(59, 130, 246, 1), 0 0 60px rgba(59, 130, 246, 0.6);\
        }\
        \
        .marker.sede:hover .marker-dot {\
            box-shadow: 0 0 35px rgba(6, 182, 212, 1), 0 0 70px rgba(6, 182, 212, 0.7);\
        }\
        \
        .marker-pulse {\
            position: absolute;\
            top: 50%;\
            left: 50%;\
            transform: translate(-50%, -50%);\
            width: 35px;\
            height: 35px;\
            background: rgba(59, 130, 246, 0.5);\
            border-radius: 50%;\
            animation: marker-pulse 2s ease-out infinite;\
            z-index: 1;\
        }\
        \
        .marker.sede .marker-pulse {\
            width: 45px;\
            height: 45px;\
            background: rgba(6, 182, 212, 0.5);\
        }\
        \
        @keyframes marker-pulse {\
            0% {\
                transform: translate(-50%, -50%) scale(0.5);\
                opacity: 1;\
            }\
            100% {\
                transform: translate(-50%, -50%) scale(2.5);\
                opacity: 0;\
            }\
        }\
        \
        .marker-label {\
            position: absolute;\
            top: 100%;\
            left: 50%;\
            transform: translateX(-50%);\
            margin-top: 10px;\
            white-space: nowrap;\
            font-size: 12px;\
            font-weight: 600;\
            color: #a1a1aa;\
            background: rgba(10, 10, 15, 0.95);\
            padding: 6px 12px;\
            border-radius: 6px;\
            border: 1px solid rgba(59, 130, 246, 0.3);\
            opacity: 0;\
            transition: opacity 0.3s ease;\
            pointer-events: none;\
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);\
        }\
        \
        .marker:hover .marker-label {\
            opacity: 1;\
        }\
        \
        .marker.sede .marker-label {\
            opacity: 1;\
            color: #06b6d4;\
            font-weight: 700;\
            border-color: rgba(6, 182, 212, 0.5);\
            font-size: 13px;\
        }\
        \
        @media (max-width: 768px) {\
            .marker-dot {\
                width: 12px;\
                height: 12px;\
                border-width: 2px;\
            }\
            \
            .marker.sede .marker-dot {\
                width: 16px;\
                height: 16px;\
            }\
            \
            .marker-label {\
                font-size: 10px;\
                padding: 4px 8px;\
            }\
            \
            .marker.sede .marker-label {\
                font-size: 11px;\
            }\
        }\
    </style>';
    
    console.log('Mapa realista carregado com sucesso!');
});
