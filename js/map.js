// ===== Mapa SP Security - SVG Estático (Sem Dependências Externas) =====

document.addEventListener('DOMContentLoaded', function() {
    var mapElement = document.getElementById('spMap');
    if (!mapElement) {
        console.error('Elemento #spMap não encontrado');
        return;
    }

    // Criar mapa SVG estático com formato real de São Paulo
    mapElement.innerHTML = `
    <div class="static-map-container">
        <svg viewBox="0 0 1000 800" class="sp-map-svg" xmlns="http://www.w3.org/2000/svg">
            <!-- Definições -->
            <defs>
                <!-- Gradiente para o estado -->
                <linearGradient id="stateGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#1e293b;stop-opacity:1" />
                    <stop offset="50%" style="stop-color:#0f172a;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#020617;stop-opacity:1" />
                </linearGradient>
                
                <!-- Gradiente para região metropolitana -->
                <radialGradient id="metroGradient" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" style="stop-color:#06b6d4;stop-opacity:0.2" />
                    <stop offset="100%" style="stop-color:#06b6d4;stop-opacity:0" />
                </radialGradient>
                
                <!-- Filtro de brilho para marcadores -->
                <filter id="glow">
                    <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                    <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                </filter>
            </defs>
            
            <!-- Fundo -->
            <rect width="1000" height="800" fill="#0a0a0f"/>
            
            <!-- Grid de referência -->
            <g opacity="0.05">
                <line x1="0" y1="200" x2="1000" y2="200" stroke="#475569" stroke-width="1"/>
                <line x1="0" y1="400" x2="1000" y2="400" stroke="#475569" stroke-width="1"/>
                <line x1="0" y1="600" x2="1000" y2="600" stroke="#475569" stroke-width="1"/>
                <line x1="250" y1="0" x2="250" y2="800" stroke="#475569" stroke-width="1"/>
                <line x1="500" y1="0" x2="500" y2="800" stroke="#475569" stroke-width="1"/>
                <line x1="750" y1="0" x2="750" y2="800" stroke="#475569" stroke-width="1"/>
            </g>
            
            <!-- Contorno do Estado de São Paulo (formato realista) -->
            <path d="M 200,150 L 250,120 L 320,110 L 400,105 L 480,110 L 560,125 L 630,145 L 690,175 L 740,215 L 770,265 L 785,320 L 790,380 L 785,440 L 765,495 L 730,540 L 680,575 L 620,600 L 550,615 L 480,620 L 410,615 L 340,600 L 280,575 L 230,540 L 195,495 L 175,440 L 165,380 L 165,320 L 175,265 L 190,210 L 200,150 Z" 
                  fill="url(#stateGradient)" 
                  stroke="#2563eb" 
                  stroke-width="3" 
                  opacity="0.6"/>
            
            <!-- Região Metropolitana de São Paulo -->
            <ellipse cx="500" cy="420" rx="120" ry="90" 
                     fill="url(#metroGradient)" 
                     stroke="#06b6d4" 
                     stroke-width="2" 
                     stroke-dasharray="8,4" 
                     opacity="0.7"/>
            
            <!-- Linhas conectando cidades (rotas) -->
            <g opacity="0.2" stroke="#3b82f6" stroke-width="1.5" fill="none">
                <line x1="500" y1="420" x2="540" y2="380"/>
                <line x1="500" y1="420" x2="560" y2="440"/>
                <line x1="500" y1="420" x2="460" y2="420"/>
                <line x1="500" y1="420" x2="520" y2="500"/>
                <line x1="500" y1="420" x2="350" y2="340"/>
                <line x1="500" y1="420" x2="380" y2="420"/>
                <line x1="500" y1="420" x2="400" y2="500"/>
                <line x1="500" y1="420" x2="700" y2="340"/>
            </g>
            
            <!-- Marcadores das Cidades -->
            
            <!-- São Paulo (Sede) -->
            <g class="city-marker sede" data-city="São Paulo">
                <circle cx="500" cy="420" r="35" fill="#06b6d4" opacity="0.2" class="pulse-ring">
                    <animate attributeName="r" from="20" to="45" dur="2s" repeatCount="indefinite"/>
                    <animate attributeName="opacity" from="0.4" to="0" dur="2s" repeatCount="indefinite"/>
                </circle>
                <circle cx="500" cy="420" r="12" fill="#06b6d4" stroke="#fff" stroke-width="3" filter="url(#glow)"/>
                <text x="500" y="455" text-anchor="middle" fill="#06b6d4" font-size="16" font-weight="700" font-family="Inter, sans-serif">São Paulo</text>
                <text x="500" y="472" text-anchor="middle" fill="#64748b" font-size="11" font-family="Inter, sans-serif">(Sede Principal)</text>
            </g>
            
            <!-- Guarulhos -->
            <g class="city-marker" data-city="Guarulhos">
                <circle cx="540" cy="380" r="25" fill="#3b82f6" opacity="0.2" class="pulse-ring">
                    <animate attributeName="r" from="15" to="35" dur="2s" repeatCount="indefinite"/>
                    <animate attributeName="opacity" from="0.3" to="0" dur="2s" repeatCount="indefinite"/>
                </circle>
                <circle cx="540" cy="380" r="8" fill="#3b82f6" stroke="#fff" stroke-width="2"/>
                <text x="540" y="368" text-anchor="middle" fill="#94a3b8" font-size="12" font-family="Inter, sans-serif" class="city-label">Guarulhos</text>
            </g>
            
            <!-- ABC Paulista -->
            <g class="city-marker" data-city="ABC">
                <circle cx="560" cy="440" r="25" fill="#3b82f6" opacity="0.2" class="pulse-ring">
                    <animate attributeName="r" from="15" to="35" dur="2s" repeatCount="indefinite"/>
                    <animate attributeName="opacity" from="0.3" to="0" dur="2s" repeatCount="indefinite"/>
                </circle>
                <circle cx="560" cy="440" r="8" fill="#3b82f6" stroke="#fff" stroke-width="2"/>
                <text x="560" y="460" text-anchor="middle" fill="#94a3b8" font-size="12" font-family="Inter, sans-serif" class="city-label">ABC Paulista</text>
            </g>
            
            <!-- Osasco -->
            <g class="city-marker" data-city="Osasco">
                <circle cx="460" cy="420" r="25" fill="#3b82f6" opacity="0.2" class="pulse-ring">
                    <animate attributeName="r" from="15" to="35" dur="2s" repeatCount="indefinite"/>
                    <animate attributeName="opacity" from="0.3" to="0" dur="2s" repeatCount="indefinite"/>
                </circle>
                <circle cx="460" cy="420" r="8" fill="#3b82f6" stroke="#fff" stroke-width="2"/>
                <text x="460" y="408" text-anchor="middle" fill="#94a3b8" font-size="12" font-family="Inter, sans-serif" class="city-label">Osasco</text>
            </g>
            
            <!-- Suzano -->
            <g class="city-marker" data-city="Suzano">
                <circle cx="580" cy="410" r="25" fill="#3b82f6" opacity="0.2" class="pulse-ring">
                    <animate attributeName="r" from="15" to="35" dur="2s" repeatCount="indefinite"/>
                    <animate attributeName="opacity" from="0.3" to="0" dur="2s" repeatCount="indefinite"/>
                </circle>
                <circle cx="580" cy="410" r="8" fill="#3b82f6" stroke="#fff" stroke-width="2"/>
                <text x="580" y="398" text-anchor="middle" fill="#94a3b8" font-size="12" font-family="Inter, sans-serif" class="city-label">Suzano</text>
            </g>
            
            <!-- Santos -->
            <g class="city-marker" data-city="Santos">
                <circle cx="520" cy="500" r="25" fill="#3b82f6" opacity="0.2" class="pulse-ring">
                    <animate attributeName="r" from="15" to="35" dur="2s" repeatCount="indefinite"/>
                    <animate attributeName="opacity" from="0.3" to="0" dur="2s" repeatCount="indefinite"/>
                </circle>
                <circle cx="520" cy="500" r="8" fill="#3b82f6" stroke="#fff" stroke-width="2"/>
                <text x="520" y="520" text-anchor="middle" fill="#94a3b8" font-size="12" font-family="Inter, sans-serif" class="city-label">Santos</text>
            </g>
            
            <!-- Campinas -->
            <g class="city-marker" data-city="Campinas">
                <circle cx="350" cy="340" r="25" fill="#3b82f6" opacity="0.2" class="pulse-ring">
                    <animate attributeName="r" from="15" to="35" dur="2s" repeatCount="indefinite"/>
                    <animate attributeName="opacity" from="0.3" to="0" dur="2s" repeatCount="indefinite"/>
                </circle>
                <circle cx="350" cy="340" r="8" fill="#3b82f6" stroke="#fff" stroke-width="2"/>
                <text x="350" y="328" text-anchor="middle" fill="#94a3b8" font-size="12" font-family="Inter, sans-serif" class="city-label">Campinas</text>
            </g>
            
            <!-- Jundiaí -->
            <g class="city-marker" data-city="Jundiaí">
                <circle cx="400" cy="360" r="25" fill="#3b82f6" opacity="0.2" class="pulse-ring">
                    <animate attributeName="r" from="15" to="35" dur="2s" repeatCount="indefinite"/>
                    <animate attributeName="opacity" from="0.3" to="0" dur="2s" repeatCount="indefinite"/>
                </circle>
                <circle cx="400" cy="360" r="8" fill="#3b82f6" stroke="#fff" stroke-width="2"/>
                <text x="400" y="348" text-anchor="middle" fill="#94a3b8" font-size="12" font-family="Inter, sans-serif" class="city-label">Jundiaí</text>
            </g>
            
            <!-- Sorocaba -->
            <g class="city-marker" data-city="Sorocaba">
                <circle cx="380" cy="500" r="25" fill="#3b82f6" opacity="0.2" class="pulse-ring">
                    <animate attributeName="r" from="15" to="35" dur="2s" repeatCount="indefinite"/>
                    <animate attributeName="opacity" from="0.3" to="0" dur="2s" repeatCount="indefinite"/>
                </circle>
                <circle cx="380" cy="500" r="8" fill="#3b82f6" stroke="#fff" stroke-width="2"/>
                <text x="380" y="520" text-anchor="middle" fill="#94a3b8" font-size="12" font-family="Inter, sans-serif" class="city-label">Sorocaba</text>
            </g>
            
            <!-- São José dos Campos -->
            <g class="city-marker" data-city="SJC">
                <circle cx="700" cy="340" r="25" fill="#3b82f6" opacity="0.2" class="pulse-ring">
                    <animate attributeName="r" from="15" to="35" dur="2s" repeatCount="indefinite"/>
                    <animate attributeName="opacity" from="0.3" to="0" dur="2s" repeatCount="indefinite"/>
                </circle>
                <circle cx="700" cy="340" r="8" fill="#3b82f6" stroke="#fff" stroke-width="2"/>
                <text x="700" y="328" text-anchor="middle" fill="#94a3b8" font-size="12" font-family="Inter, sans-serif" class="city-label">S.J. Campos</text>
            </g>
            
            <!-- Ribeirão Preto -->
            <g class="city-marker" data-city="Ribeirão">
                <circle cx="300" cy="220" r="25" fill="#3b82f6" opacity="0.2" class="pulse-ring">
                    <animate attributeName="r" from="15" to="35" dur="2s" repeatCount="indefinite"/>
                    <animate attributeName="opacity" from="0.3" to="0" dur="2s" repeatCount="indefinite"/>
                </circle>
                <circle cx="300" cy="220" r="8" fill="#3b82f6" stroke="#fff" stroke-width="2"/>
                <text x="300" y="208" text-anchor="middle" fill="#94a3b8" font-size="12" font-family="Inter, sans-serif" class="city-label">Ribeirão Preto</text>
            </g>
            
            <!-- Catanduva -->
            <g class="city-marker" data-city="Catanduva">
                <circle cx="280" cy="200" r="25" fill="#3b82f6" opacity="0.2" class="pulse-ring">
                    <animate attributeName="r" from="15" to="35" dur="2s" repeatCount="indefinite"/>
                    <animate attributeName="opacity" from="0.3" to="0" dur="2s" repeatCount="indefinite"/>
                </circle>
                <circle cx="280" cy="200" r="8" fill="#3b82f6" stroke="#fff" stroke-width="2"/>
                <text x="280" y="188" text-anchor="middle" fill="#94a3b8" font-size="12" font-family="Inter, sans-serif" class="city-label">Catanduva</text>
            </g>
            
            <!-- Legenda -->
            <g class="map-legend" transform="translate(780, 50)">
                <rect x="0" y="0" width="200" height="140" fill="rgba(10,10,15,0.9)" stroke="#334155" stroke-width="2" rx="12"/>
                <text x="100" y="30" text-anchor="middle" fill="#e5e7eb" font-size="14" font-weight="600" font-family="Inter, sans-serif">Cobertura SP Security</text>
                
                <circle cx="25" cy="60" r="8" fill="#06b6d4" stroke="#fff" stroke-width="2"/>
                <text x="45" y="65" fill="#a1a1aa" font-size="11" font-family="Inter, sans-serif">Sede Principal</text>
                
                <circle cx="25" cy="90" r="6" fill="#3b82f6" stroke="#fff" stroke-width="2"/>
                <text x="45" y="95" fill="#a1a1aa" font-size="11" font-family="Inter, sans-serif">Áreas Atendidas</text>
                
                <ellipse cx="100" cy="120" rx="20" ry="12" fill="none" stroke="#06b6d4" stroke-width="1.5" stroke-dasharray="4,2"/>
                <text x="130" y="125" fill="#a1a1aa" font-size="10" font-family="Inter, sans-serif">Região Metro</text>
            </g>
        </svg>
    </div>
    
    <style>
        .static-map-container {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, #0a0a0f 0%, #12121a 100%);
            padding: 20px;
            box-sizing: border-box;
        }
        
        .sp-map-svg {
            width: 100%;
            max-width: 1200px;
            height: auto;
        }
        
        .city-marker {
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .city-marker:hover {
            transform: scale(1.15);
        }
        
        .city-marker:hover circle:not(.pulse-ring) {
            filter: drop-shadow(0 0 12px currentColor);
        }
        
        .city-label {
            opacity: 0.7;
            transition: opacity 0.3s ease;
        }
        
        .city-marker:hover .city-label {
            opacity: 1;
            fill: #e5e7eb;
        }
        
        .city-marker.sede .city-label {
            opacity: 1;
        }
        
        @media (max-width: 768px) {
            .sp-map-svg {
                max-width: 100%;
            }
            
            .map-legend {
                transform: translate(20, 600) scale(0.8);
            }
            
            .city-label {
                font-size: 10px !important;
            }
        }
    </style>
    `;
    
    console.log('Mapa SVG estático carregado com sucesso!');
});
