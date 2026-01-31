// ===== Mapa SP Security - Versão Realista SVG =====

document.addEventListener('DOMContentLoaded', function() {
    var mapElement = document.getElementById('spMap');
    if (!mapElement) return;
    
    // Criar mapa SVG realista do estado de São Paulo
    mapElement.innerHTML = '\
    <div class="realistic-map-container">\
        <svg viewBox="0 0 800 600" class="sp-map-svg">\
            <!-- Definições de gradientes e filtros -->\
            <defs>\
                <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">\
                    <stop offset="0%" style="stop-color:#1a1a2e;stop-opacity:1" />\
                    <stop offset="50%" style="stop-color:#16213e;stop-opacity:1" />\
                    <stop offset="100%" style="stop-color:#0f1419;stop-opacity:1" />\
                </linearGradient>\
                \
                <filter id="glow">\
                    <feGaussianBlur stdDeviation="3" result="coloredBlur"/>\
                    <feMerge>\
                        <feMergeNode in="coloredBlur"/>\
                        <feMergeNode in="SourceGraphic"/>\
                    </feMerge>\
                </filter>\
                \
                <radialGradient id="markerGlow" cx="50%" cy="50%" r="50%">\
                    <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:0.8" />\
                    <stop offset="100%" style="stop-color:#3b82f6;stop-opacity:0" />\
                </radialGradient>\
                \
                <radialGradient id="sedeGlow" cx="50%" cy="50%" r="50%">\
                    <stop offset="0%" style="stop-color:#06b6d4;stop-opacity:0.9" />\
                    <stop offset="100%" style="stop-color:#06b6d4;stop-opacity:0" />\
                </radialGradient>\
            </defs>\
            \
            <!-- Contorno do Estado de São Paulo (forma realista simplificada) -->\
            <path d="M 150 180 L 180 150 L 220 140 L 280 130 L 340 135 L 400 145 L 450 160 L 500 180 L 540 210 L 560 250 L 570 290 L 575 330 L 570 370 L 550 410 L 520 440 L 480 460 L 440 475 L 400 485 L 360 488 L 320 485 L 280 475 L 240 460 L 200 440 L 170 410 L 150 370 L 140 330 L 140 280 L 145 230 L 150 180 Z" \
                  fill="url(#mapGradient)" \
                  stroke="#2563eb" \
                  stroke-width="2" \
                  opacity="0.4"/>\
            \
            <!-- Região Metropolitana de São Paulo (destaque) -->\
            <ellipse cx="400" cy="340" rx="80" ry="60" \
                     fill="rgba(6, 182, 212, 0.15)" \
                     stroke="#06b6d4" \
                     stroke-width="1.5" \
                     stroke-dasharray="5,5" \
                     opacity="0.6"/>\
            \
            <!-- Linhas de divisão regional (sutis) -->\
            <line x1="200" y1="200" x2="500" y2="250" stroke="#334155" stroke-width="0.5" opacity="0.3"/>\
            <line x1="250" y1="180" x2="450" y2="400" stroke="#334155" stroke-width="0.5" opacity="0.3"/>\
            <line x1="300" y1="150" x2="520" y2="350" stroke="#334155" stroke-width="0.5" opacity="0.3"/>\
            \
            <!-- Grid de referência sutil -->\
            <g opacity="0.1">\
                <line x1="150" y1="250" x2="575" y2="250" stroke="#475569" stroke-width="0.5"/>\
                <line x1="150" y1="350" x2="575" y2="350" stroke="#475569" stroke-width="0.5"/>\
                <line x1="300" y1="130" x2="300" y2="488" stroke="#475569" stroke-width="0.5"/>\
                <line x1="450" y1="145" x2="450" y2="475" stroke="#475569" stroke-width="0.5"/>\
            </g>\
            \
            <!-- Marcadores das Cidades -->\
            \
            <!-- São Paulo (Sede) - Centro -->\
            <g class="city-marker sede" data-city="São Paulo">\
                <circle cx="400" cy="340" r="25" fill="url(#sedeGlow)" class="pulse-ring"/>\
                <circle cx="400" cy="340" r="8" fill="#06b6d4" stroke="#fff" stroke-width="2" filter="url(#glow)"/>\
                <text x="400" y="365" text-anchor="middle" fill="#06b6d4" font-size="13" font-weight="600">São Paulo</text>\
            </g>\
            \
            <!-- Guarulhos - NE de SP -->\
            <g class="city-marker" data-city="Guarulhos">\
                <circle cx="420" cy="310" r="20" fill="url(#markerGlow)" class="pulse-ring"/>\
                <circle cx="420" cy="310" r="6" fill="#3b82f6" stroke="#fff" stroke-width="2"/>\
                <text x="420" y="300" text-anchor="middle" fill="#a1a1aa" font-size="11" class="city-label">Guarulhos</text>\
            </g>\
            \
            <!-- ABC Paulista - SE de SP -->\
            <g class="city-marker" data-city="ABC">\
                <circle cx="430" cy="360" r="20" fill="url(#markerGlow)" class="pulse-ring"/>\
                <circle cx="430" cy="360" r="6" fill="#3b82f6" stroke="#fff" stroke-width="2"/>\
                <text x="430" y="378" text-anchor="middle" fill="#a1a1aa" font-size="11" class="city-label">ABC Paulista</text>\
            </g>\
            \
            <!-- Osasco - Oeste de SP -->\
            <g class="city-marker" data-city="Osasco">\
                <circle cx="370" cy="340" r="20" fill="url(#markerGlow)" class="pulse-ring"/>\
                <circle cx="370" cy="340" r="6" fill="#3b82f6" stroke="#fff" stroke-width="2"/>\
                <text x="370" y="330" text-anchor="middle" fill="#a1a1aa" font-size="11" class="city-label">Osasco</text>\
            </g>\
            \
            <!-- Suzano - Leste -->\
            <g class="city-marker" data-city="Suzano">\
                <circle cx="450" cy="330" r="20" fill="url(#markerGlow)" class="pulse-ring"/>\
                <circle cx="450" cy="330" r="6" fill="#3b82f6" stroke="#fff" stroke-width="2"/>\
                <text x="450" y="320" text-anchor="middle" fill="#a1a1aa" font-size="11" class="city-label">Suzano</text>\
            </g>\
            \
            <!-- Campinas - Noroeste -->\
            <g class="city-marker" data-city="Campinas">\
                <circle cx="280" cy="260" r="20" fill="url(#markerGlow)" class="pulse-ring"/>\
                <circle cx="280" cy="260" r="6" fill="#3b82f6" stroke="#fff" stroke-width="2"/>\
                <text x="280" y="250" text-anchor="middle" fill="#a1a1aa" font-size="11" class="city-label">Campinas</text>\
            </g>\
            \
            <!-- Jundiaí - Norte de Campinas -->\
            <g class="city-marker" data-city="Jundiaí">\
                <circle cx="320" cy="280" r="20" fill="url(#markerGlow)" class="pulse-ring"/>\
                <circle cx="320" cy="280" r="6" fill="#3b82f6" stroke="#fff" stroke-width="2"/>\
                <text x="320" y="270" text-anchor="middle" fill="#a1a1aa" font-size="11" class="city-label">Jundiaí</text>\
            </g>\
            \
            <!-- Sorocaba - Sudoeste -->\
            <g class="city-marker" data-city="Sorocaba">\
                <circle cx="300" cy="390" r="20" fill="url(#markerGlow)" class="pulse-ring"/>\
                <circle cx="300" cy="390" r="6" fill="#3b82f6" stroke="#fff" stroke-width="2"/>\
                <text x="300" y="408" text-anchor="middle" fill="#a1a1aa" font-size="11" class="city-label">Sorocaba</text>\
            </g>\
            \
            <!-- Santos - Litoral -->\
            <g class="city-marker" data-city="Santos">\
                <circle cx="420" cy="440" r="20" fill="url(#markerGlow)" class="pulse-ring"/>\
                <circle cx="420" cy="440" r="6" fill="#3b82f6" stroke="#fff" stroke-width="2"/>\
                <text x="420" y="458" text-anchor="middle" fill="#a1a1aa" font-size="11" class="city-label">Santos</text>\
            </g>\
            \
            <!-- São José dos Campos - Vale do Paraíba -->\
            <g class="city-marker" data-city="S.J. Campos">\
                <circle cx="500" cy="280" r="20" fill="url(#markerGlow)" class="pulse-ring"/>\
                <circle cx="500" cy="280" r="6" fill="#3b82f6" stroke="#fff" stroke-width="2"/>\
                <text x="500" y="270" text-anchor="middle" fill="#a1a1aa" font-size="11" class="city-label">S.J. Campos</text>\
            </g>\
            \
            <!-- Ribeirão Preto - Norte -->\
            <g class="city-marker" data-city="Ribeirão Preto">\
                <circle cx="240" cy="200" r="20" fill="url(#markerGlow)" class="pulse-ring"/>\
                <circle cx="240" cy="200" r="6" fill="#3b82f6" stroke="#fff" stroke-width="2"/>\
                <text x="240" y="190" text-anchor="middle" fill="#a1a1aa" font-size="11" class="city-label">Ribeirão Preto</text>\
            </g>\
            \
            <!-- Catanduva - Noroeste -->\
            <g class="city-marker" data-city="Catanduva">\
                <circle cx="220" cy="220" r="20" fill="url(#markerGlow)" class="pulse-ring"/>\
                <circle cx="220" cy="220" r="6" fill="#3b82f6" stroke="#fff" stroke-width="2"/>\
                <text x="220" y="210" text-anchor="middle" fill="#a1a1aa" font-size="11" class="city-label">Catanduva</text>\
            </g>\
            \
            <!-- Legenda -->\
            <g class="map-legend" transform="translate(600, 180)">\
                <rect x="0" y="0" width="180" height="120" fill="rgba(10,10,15,0.85)" stroke="#334155" stroke-width="1" rx="8"/>\
                <text x="90" y="25" text-anchor="middle" fill="#e5e7eb" font-size="12" font-weight="600">Cobertura SP Security</text>\
                \
                <circle cx="20" cy="50" r="6" fill="#06b6d4" stroke="#fff" stroke-width="2"/>\
                <text x="35" y="55" fill="#a1a1aa" font-size="10">Sede Principal</text>\
                \
                <circle cx="20" cy="75" r="5" fill="#3b82f6" stroke="#fff" stroke-width="2"/>\
                <text x="35" y="80" fill="#a1a1aa" font-size="10">Áreas Atendidas</text>\
                \
                <ellipse cx="90" cy="100" rx="15" ry="10" fill="none" stroke="#06b6d4" stroke-width="1" stroke-dasharray="3,3"/>\
                <text x="110" y="105" fill="#a1a1aa" font-size="9">Região Metro</text>\
            </g>\
        </svg>\
    </div>\
    \
    <style>\
        .realistic-map-container {\
            width: 100%;\
            height: 100%;\
            display: flex;\
            align-items: center;\
            justify-content: center;\
            background: linear-gradient(135deg, #0a0a0f 0%, #12121a 100%);\
            padding: 20px;\
        }\
        \
        .sp-map-svg {\
            width: 100%;\
            max-width: 900px;\
            height: auto;\
        }\
        \
        .city-marker {\
            cursor: pointer;\
            transition: all 0.3s ease;\
        }\
        \
        .city-marker:hover {\
            transform: scale(1.1);\
        }\
        \
        .city-marker circle:last-of-type {\
            transition: all 0.3s ease;\
        }\
        \
        .city-marker:hover circle:last-of-type {\
            r: 8;\
            filter: drop-shadow(0 0 8px currentColor);\
        }\
        \
        .city-label {\
            opacity: 0;\
            transition: opacity 0.3s ease;\
        }\
        \
        .city-marker:hover .city-label {\
            opacity: 1;\
        }\
        \
        .city-marker.sede .city-label {\
            opacity: 1;\
        }\
        \
        .pulse-ring {\
            animation: pulse-animation 2s ease-out infinite;\
        }\
        \
        @keyframes pulse-animation {\
            0% {\
                r: 8;\
                opacity: 0.8;\
            }\
            100% {\
                r: 30;\
                opacity: 0;\
            }\
        }\
        \
        .map-legend {\
            opacity: 0.9;\
        }\
        \
        @media (max-width: 768px) {\
            .sp-map-svg {\
                max-width: 100%;\
            }\
            \
            .map-legend {\
                transform: translate(10, 400) scale(0.8);\
            }\
            \
            .city-label {\
                font-size: 9px;\
            }\
        }\
    </style>';
});
