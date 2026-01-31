// ===== Mapa SP Security - Versão Estática com SVG =====

document.addEventListener('DOMContentLoaded', function() {
    var mapElement = document.getElementById('spMap');
    if (!mapElement) return;
    
    // Criar mapa estático com SVG
    mapElement.innerHTML = '\
    <div class="static-map">\
        <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid meet">\
            <!-- Contorno simplificado do estado de SP -->\
            <path class="sp-outline" d="M50,80 Q80,50 150,60 Q220,45 280,70 Q340,60 370,100 Q380,150 370,200 Q350,250 300,270 Q220,285 150,275 Q80,265 50,220 Q30,170 40,120 Q45,95 50,80 Z" fill="rgba(59,130,246,0.08)" stroke="rgba(59,130,246,0.3)" stroke-width="2"/>\
            \
            <!-- Região Metropolitana -->\
            <ellipse cx="240" cy="160" rx="50" ry="40" fill="rgba(59,130,246,0.15)" stroke="rgba(59,130,246,0.4)" stroke-width="1" stroke-dasharray="4,4"/>\
            \
            <!-- Cidades com pings animados -->\
            <!-- São Paulo (Sede) -->\
            <g class="city-marker sede">\
                <circle cx="240" cy="160" r="20" fill="rgba(6,182,212,0.2)" class="pulse-ring"/>\
                <circle cx="240" cy="160" r="8" fill="#06b6d4" stroke="#fff" stroke-width="2"/>\
                <text x="240" y="145" text-anchor="middle" fill="#06b6d4" font-size="10" font-weight="bold">São Paulo</text>\
            </g>\
            \
            <!-- Guarulhos -->\
            <g class="city-marker">\
                <circle cx="255" cy="140" r="5" fill="#3b82f6" stroke="#fff" stroke-width="1.5"/>\
            </g>\
            \
            <!-- ABC -->\
            <g class="city-marker">\
                <circle cx="255" cy="175" r="5" fill="#3b82f6" stroke="#fff" stroke-width="1.5"/>\
            </g>\
            \
            <!-- Osasco -->\
            <g class="city-marker">\
                <circle cx="220" cy="155" r="5" fill="#3b82f6" stroke="#fff" stroke-width="1.5"/>\
            </g>\
            \
            <!-- Campinas -->\
            <g class="city-marker">\
                <circle cx="160" cy="120" r="5" fill="#3b82f6" stroke="#fff" stroke-width="1.5"/>\
                <text x="160" y="110" text-anchor="middle" fill="#a1a1aa" font-size="8">Campinas</text>\
            </g>\
            \
            <!-- Sorocaba -->\
            <g class="city-marker">\
                <circle cx="180" cy="180" r="5" fill="#3b82f6" stroke="#fff" stroke-width="1.5"/>\
                <text x="180" y="195" text-anchor="middle" fill="#a1a1aa" font-size="8">Sorocaba</text>\
            </g>\
            \
            <!-- Santos -->\
            <g class="city-marker">\
                <circle cx="260" cy="210" r="5" fill="#3b82f6" stroke="#fff" stroke-width="1.5"/>\
                <text x="260" y="225" text-anchor="middle" fill="#a1a1aa" font-size="8">Santos</text>\
            </g>\
            \
            <!-- Jundiaí -->\
            <g class="city-marker">\
                <circle cx="200" cy="135" r="5" fill="#3b82f6" stroke="#fff" stroke-width="1.5"/>\
            </g>\
            \
            <!-- São José dos Campos -->\
            <g class="city-marker">\
                <circle cx="310" cy="130" r="5" fill="#3b82f6" stroke="#fff" stroke-width="1.5"/>\
                <text x="310" y="120" text-anchor="middle" fill="#a1a1aa" font-size="8">S.J. Campos</text>\
            </g>\
            \
            <!-- Ribeirão Preto -->\
            <g class="city-marker">\
                <circle cx="100" cy="80" r="5" fill="#3b82f6" stroke="#fff" stroke-width="1.5"/>\
                <text x="100" y="70" text-anchor="middle" fill="#a1a1aa" font-size="8">Ribeirão Preto</text>\
            </g>\
            \
            <!-- Catanduva -->\
            <g class="city-marker">\
                <circle cx="130" cy="60" r="5" fill="#3b82f6" stroke="#fff" stroke-width="1.5"/>\
            </g>\
            \
            <!-- Piracicaba -->\
            <g class="city-marker">\
                <circle cx="140" cy="150" r="5" fill="#3b82f6" stroke="#fff" stroke-width="1.5"/>\
            </g>\
            \
            <!-- Bauru -->\
            <g class="city-marker">\
                <circle cx="90" cy="140" r="5" fill="#3b82f6" stroke="#fff" stroke-width="1.5"/>\
            </g>\
        </svg>\
        \
        <style>\
            .static-map { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #0a0a0f 0%, #12121a 100%); }\
            .static-map svg { width: 100%; max-width: 600px; height: auto; }\
            .pulse-ring { animation: pulse 2s ease-out infinite; transform-origin: center; }\
            @keyframes pulse { 0% { r: 8; opacity: 0.8; } 100% { r: 25; opacity: 0; } }\
            .city-marker circle { transition: transform 0.2s; }\
            .city-marker:hover circle { transform: scale(1.3); }\
        </style>\
    </div>';
});
