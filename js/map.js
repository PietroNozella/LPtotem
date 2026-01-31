// ===== Mapa SP Security - Versão Simplificada com Câmeras =====

document.addEventListener('DOMContentLoaded', function() {
    var mapElement = document.getElementById('spMap');
    if (!mapElement) return;
    
    // Criar mapa com imagem estática e ícones de câmeras
    mapElement.innerHTML = `
    <div class="simple-map">
        <div class="map-container-simple">
            <!-- Imagem do mapa estático -->
            <img src="assets/mapa-sp-real.svg" alt="Mapa de São Paulo" class="map-static-image">
            
            <!-- Marcadores com ícones de câmeras -->
            
            <!-- São Paulo (Sede) - Centro -->
            <div class="camera-marker sede" style="left: 50%; top: 52%;" data-city="São Paulo">
                <div class="camera-pulse"></div>
                <div class="camera-icon">
                    <i class="fas fa-video"></i>
                </div>
                <span class="camera-label">São Paulo<br><small>Sede Principal</small></span>
            </div>
            
            <!-- Grande São Paulo -->
            <div class="camera-marker" style="left: 54%; top: 46%;" data-city="Guarulhos">
                <div class="camera-pulse"></div>
                <div class="camera-icon">
                    <i class="fas fa-video"></i>
                </div>
                <span class="camera-label">Guarulhos</span>
            </div>
            
            <div class="camera-marker" style="left: 56%; top: 56%;" data-city="ABC">
                <div class="camera-pulse"></div>
                <div class="camera-icon">
                    <i class="fas fa-video"></i>
                </div>
                <span class="camera-label">ABC Paulista</span>
            </div>
            
            <div class="camera-marker" style="left: 46%; top: 52%;" data-city="Osasco">
                <div class="camera-pulse"></div>
                <div class="camera-icon">
                    <i class="fas fa-video"></i>
                </div>
                <span class="camera-label">Osasco</span>
            </div>
            
            <div class="camera-marker" style="left: 58%; top: 50%;" data-city="Suzano">
                <div class="camera-pulse"></div>
                <div class="camera-icon">
                    <i class="fas fa-video"></i>
                </div>
                <span class="camera-label">Suzano</span>
            </div>
            
            <div class="camera-marker" style="left: 48%; top: 58%;" data-city="Taboão">
                <div class="camera-pulse"></div>
                <div class="camera-icon">
                    <i class="fas fa-video"></i>
                </div>
                <span class="camera-label">Taboão da Serra</span>
            </div>
            
            <!-- Interior - Região Campinas -->
            <div class="camera-marker" style="left: 32%; top: 38%;" data-city="Campinas">
                <div class="camera-pulse"></div>
                <div class="camera-icon">
                    <i class="fas fa-video"></i>
                </div>
                <span class="camera-label">Campinas</span>
            </div>
            
            <div class="camera-marker" style="left: 40%; top: 44%;" data-city="Jundiaí">
                <div class="camera-pulse"></div>
                <div class="camera-icon">
                    <i class="fas fa-video"></i>
                </div>
                <span class="camera-label">Jundiaí</span>
            </div>
            
            <!-- Vale do Paraíba -->
            <div class="camera-marker" style="left: 68%; top: 42%;" data-city="SJC">
                <div class="camera-pulse"></div>
                <div class="camera-icon">
                    <i class="fas fa-video"></i>
                </div>
                <span class="camera-label">São José dos Campos</span>
            </div>
            
            <div class="camera-marker" style="left: 72%; top: 48%;" data-city="Taubate">
                <div class="camera-pulse"></div>
                <div class="camera-icon">
                    <i class="fas fa-video"></i>
                </div>
                <span class="camera-label">Taubaté</span>
            </div>
            
            <!-- Baixada Santista -->
            <div class="camera-marker" style="left: 50%; top: 78%;" data-city="Santos">
                <div class="camera-pulse"></div>
                <div class="camera-icon">
                    <i class="fas fa-video"></i>
                </div>
                <span class="camera-label">Santos</span>
            </div>
            
            <div class="camera-marker" style="left: 46%; top: 80%;" data-city="Guaruja">
                <div class="camera-pulse"></div>
                <div class="camera-icon">
                    <i class="fas fa-video"></i>
                </div>
                <span class="camera-label">Guarujá</span>
            </div>
            
            <!-- Sorocaba -->
            <div class="camera-marker" style="left: 34%; top: 58%;" data-city="Sorocaba">
                <div class="camera-pulse"></div>
                <div class="camera-icon">
                    <i class="fas fa-video"></i>
                </div>
                <span class="camera-label">Sorocaba</span>
            </div>
            
            <!-- Interior Norte -->
            <div class="camera-marker" style="left: 26%; top: 28%;" data-city="Ribeirao">
                <div class="camera-pulse"></div>
                <div class="camera-icon">
                    <i class="fas fa-video"></i>
                </div>
                <span class="camera-label">Ribeirão Preto</span>
            </div>
            
            <div class="camera-marker" style="left: 30%; top: 32%;" data-city="Catanduva">
                <div class="camera-pulse"></div>
                <div class="camera-icon">
                    <i class="fas fa-video"></i>
                </div>
                <span class="camera-label">Catanduva</span>
            </div>
            
            <!-- Legenda -->
            <div class="map-legend-simple">
                <div class="legend-title">
                    <i class="fas fa-shield-alt"></i>
                    Cobertura SP Security
                </div>
                <div class="legend-items">
                    <div class="legend-item">
                        <div class="camera-icon-mini sede">
                            <i class="fas fa-video"></i>
                        </div>
                        <span>Sede Principal</span>
                    </div>
                    <div class="legend-item">
                        <div class="camera-icon-mini">
                            <i class="fas fa-video"></i>
                        </div>
                        <span>Áreas Monitoradas</span>
                    </div>
                </div>
                <div class="legend-stats">
                    <div class="stat-item">
                        <strong>15+</strong>
                        <span>Cidades</span>
                    </div>
                    <div class="stat-item">
                        <strong>24/7</strong>
                        <span>Monitoramento</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <style>
        .simple-map {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, #0a0a0f 0%, #12121a 100%);
            padding: 30px 20px;
            box-sizing: border-box;
        }
        
        .map-container-simple {
            position: relative;
            width: 100%;
            max-width: 1200px;
            aspect-ratio: 14 / 9;
        }
        
        .map-static-image {
            width: 100%;
            height: 100%;
            object-fit: contain;
            border-radius: 16px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
            display: block;
            opacity: 1;
            background: #0a0a0f;
        }
        
        /* Marcadores de câmera */
        .camera-marker {
            position: absolute;
            transform: translate(-50%, -50%);
            cursor: pointer;
            z-index: 10;
            transition: all 0.3s ease;
        }
        
        .camera-marker:hover {
            transform: translate(-50%, -50%) scale(1.15);
            z-index: 20;
        }
        
        .camera-icon {
            width: 36px;
            height: 36px;
            background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 16px;
            box-shadow: 0 4px 16px rgba(59, 130, 246, 0.6);
            border: 2px solid rgba(255, 255, 255, 0.9);
            position: relative;
            z-index: 2;
            transition: all 0.3s ease;
        }
        
        .camera-marker.sede .camera-icon {
            width: 44px;
            height: 44px;
            background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%);
            box-shadow: 0 6px 20px rgba(6, 182, 212, 0.7);
            font-size: 20px;
        }
        
        .camera-marker:hover .camera-icon {
            box-shadow: 0 6px 24px rgba(59, 130, 246, 0.9);
            transform: scale(1.1);
        }
        
        .camera-marker.sede:hover .camera-icon {
            box-shadow: 0 8px 28px rgba(6, 182, 212, 1);
        }
        
        /* Animação de pulso */
        .camera-pulse {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 50px;
            height: 50px;
            background: rgba(59, 130, 246, 0.4);
            border-radius: 10px;
            animation: camera-pulse 2s ease-out infinite;
            z-index: 1;
        }
        
        .camera-marker.sede .camera-pulse {
            width: 60px;
            height: 60px;
            background: rgba(6, 182, 212, 0.4);
        }
        
        @keyframes camera-pulse {
            0% {
                transform: translate(-50%, -50%) scale(0.7);
                opacity: 1;
            }
            100% {
                transform: translate(-50%, -50%) scale(2);
                opacity: 0;
            }
        }
        
        /* Labels das câmeras */
        .camera-label {
            position: absolute;
            top: 100%;
            left: 50%;
            transform: translateX(-50%);
            margin-top: 12px;
            white-space: nowrap;
            font-size: 12px;
            font-weight: 600;
            color: #e5e7eb;
            background: rgba(10, 10, 15, 0.95);
            padding: 6px 12px;
            border-radius: 6px;
            border: 1px solid rgba(59, 130, 246, 0.4);
            opacity: 0;
            transition: opacity 0.3s ease;
            pointer-events: none;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.6);
            text-align: center;
            line-height: 1.4;
        }
        
        .camera-label small {
            font-size: 10px;
            color: #06b6d4;
            font-weight: 700;
        }
        
        .camera-marker:hover .camera-label {
            opacity: 1;
        }
        
        .camera-marker.sede .camera-label {
            opacity: 1;
            border-color: rgba(6, 182, 212, 0.6);
        }
        
        /* Legenda */
        .map-legend-simple {
            position: absolute;
            top: 30px;
            right: 30px;
            background: rgba(10, 10, 15, 0.95);
            border: 2px solid rgba(59, 130, 246, 0.3);
            border-radius: 12px;
            padding: 20px;
            min-width: 220px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.6);
            backdrop-filter: blur(10px);
        }
        
        .legend-title {
            font-size: 16px;
            font-weight: 700;
            color: #e5e7eb;
            margin-bottom: 16px;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        
        .legend-title i {
            color: #3b82f6;
        }
        
        .legend-items {
            display: flex;
            flex-direction: column;
            gap: 12px;
            margin-bottom: 16px;
            padding-bottom: 16px;
            border-bottom: 1px solid rgba(59, 130, 246, 0.2);
        }
        
        .legend-item {
            display: flex;
            align-items: center;
            gap: 10px;
            font-size: 13px;
            color: #a1a1aa;
        }
        
        .camera-icon-mini {
            width: 28px;
            height: 28px;
            background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
            border-radius: 6px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 12px;
            border: 2px solid rgba(255, 255, 255, 0.8);
            flex-shrink: 0;
        }
        
        .camera-icon-mini.sede {
            background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%);
        }
        
        .legend-stats {
            display: flex;
            gap: 16px;
        }
        
        .stat-item {
            flex: 1;
            text-align: center;
        }
        
        .stat-item strong {
            display: block;
            font-size: 20px;
            font-weight: 700;
            color: #3b82f6;
            margin-bottom: 4px;
        }
        
        .stat-item span {
            font-size: 11px;
            color: #71717a;
        }
        
        /* Responsivo */
        @media (max-width: 768px) {
            .simple-map {
                padding: 20px 10px;
            }
            
            .camera-icon {
                width: 28px;
                height: 28px;
                font-size: 13px;
            }
            
            .camera-marker.sede .camera-icon {
                width: 36px;
                height: 36px;
                font-size: 16px;
            }
            
            .camera-label {
                font-size: 10px;
                padding: 4px 8px;
            }
            
            .map-legend-simple {
                top: 15px;
                right: 15px;
                padding: 12px;
                min-width: 160px;
            }
            
            .legend-title {
                font-size: 13px;
            }
            
            .legend-item {
                font-size: 11px;
            }
            
            .camera-icon-mini {
                width: 22px;
                height: 22px;
                font-size: 10px;
            }
            
            .stat-item strong {
                font-size: 16px;
            }
            
            .stat-item span {
                font-size: 9px;
            }
        }
    </style>
    `;
    
    console.log('Mapa simplificado com câmeras carregado com sucesso!');
});
