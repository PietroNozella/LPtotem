// ===== CUSTOMIZER PREMIUM - Configurador Estilo Carros de Luxo =====

document.addEventListener('DOMContentLoaded', function() {
    // Elementos das Camadas (Layer Composition)
    const layerBase = document.getElementById('layerBase');
    const layerColorBody = document.getElementById('layerColorBody');
    const layerDetails = document.getElementById('layerDetails');
    const layerText = document.getElementById('layerText');
    const layerLedGlow = document.getElementById('layerLedGlow');
    
    const summaryBody = document.getElementById('summaryBody');
    const summaryLed = document.getElementById('summaryLed');
    const summaryText = document.getElementById('summaryText');
    
    const resetBtn = document.getElementById('resetConfig');
    const saveBtn = document.getElementById('saveConfig');
    const quoteBtn = document.getElementById('requestQuote');
    
    // Configuração atual
    let currentConfig = {
        body: { color: '#0a0a0f', name: 'Preto Fosco' },
        led: { color: '#3b82f6', name: 'Azul' },
        text: { color: '#ffffff', name: 'Branco' }
    };
    
    // Nomes das cores
    const colorNames = {
        '#0a0a0f': 'Preto Fosco',
        '#1e293b': 'Cinza Escuro',
        '#ffffff': 'Branco',
        '#1e3a8a': 'Azul Marinho',
        '#7c2d12': 'Vermelho Escuro',
        '#064e3b': 'Verde Escuro',
        '#3b82f6': 'Azul',
        '#ef4444': 'Vermelho',
        '#10b981': 'Verde',
        '#f59e0b': 'Âmbar',
        '#8b5cf6': 'Roxo',
        '#06b6d4': 'Ciano',
        '#fbbf24': 'Dourado'
    };
    
    // Aplicar cores usando Sistema de Camadas (Layer Composition)
    function applyBodyColor(color) {
        if (!layerColorBody) return;
        
        // Aplicar cor diretamente na camada de cor
        layerColorBody.style.backgroundColor = color;
        
        // Ajustar mix-blend-mode baseado na luminosidade da cor
        const brightness = getBrightnessFromColor(color);
        
        if (brightness > 180) {
            // Cores claras (branco, cinza claro)
            layerColorBody.style.mixBlendMode = 'lighten';
            layerColorBody.style.opacity = '0.75';
            
            // Ajustar base para cores claras
            if (layerBase) {
                layerBase.style.filter = 'grayscale(1) brightness(1.1) contrast(1.05) drop-shadow(0 30px 60px rgba(0, 0, 0, 0.3))';
            }
        } else if (brightness > 100) {
            // Cores médias
            layerColorBody.style.mixBlendMode = 'multiply';
            layerColorBody.style.opacity = '0.85';
            
            if (layerBase) {
                layerBase.style.filter = 'grayscale(1) brightness(0.95) contrast(1.1) drop-shadow(0 30px 60px rgba(0, 0, 0, 0.4))';
            }
        } else {
            // Cores escuras
            layerColorBody.style.mixBlendMode = 'multiply';
            layerColorBody.style.opacity = '0.9';
            
            if (layerBase) {
                layerBase.style.filter = 'grayscale(1) brightness(0.9) contrast(1.15) drop-shadow(0 30px 60px rgba(0, 0, 0, 0.5))';
            }
        }
        
        currentConfig.body = { color, name: colorNames[color] || color };
        updateSummary();
    }
    
    function applyLedColor(color) {
        if (!layerLedGlow) return;
        
        // Aplicar cor do LED na camada de brilho
        layerLedGlow.style.color = color;
        layerLedGlow.style.opacity = '0.7';
        
        // Intensificar brilho para cores mais vibrantes
        const saturation = getSaturationFromColor(color);
        if (saturation > 70) {
            layerLedGlow.style.opacity = '0.85';
            layerLedGlow.style.filter = 'blur(3px)';
        } else {
            layerLedGlow.style.opacity = '0.6';
            layerLedGlow.style.filter = 'blur(2px)';
        }
        
        currentConfig.led = { color, name: colorNames[color] || color };
        updateSummary();
    }
    
    function applyTextColor(color) {
        if (!layerText) return;
        
        // Aplicar cor do texto na camada de texto
        layerText.style.color = color;
        layerText.style.opacity = '0.9';
        
        // Ajustar visibilidade baseado no contraste
        const brightness = getBrightnessFromColor(color);
        if (brightness > 200) {
            // Texto claro
            layerText.style.opacity = '1';
            layerText.style.filter = 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.5))';
        } else if (brightness < 50) {
            // Texto escuro
            layerText.style.opacity = '0.95';
            layerText.style.filter = 'drop-shadow(0 2px 4px rgba(255, 255, 255, 0.3))';
        } else {
            // Texto médio
            layerText.style.opacity = '0.9';
            layerText.style.filter = 'none';
        }
        
        currentConfig.text = { color, name: colorNames[color] || color };
        updateSummary();
    }
    
    // Funções auxiliares para conversão de cores
    function getHueFromColor(hex) {
        const rgb = hexToRgb(hex);
        if (!rgb) return 0;
        
        const r = rgb.r / 255;
        const g = rgb.g / 255;
        const b = rgb.b / 255;
        
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        const delta = max - min;
        
        if (delta === 0) return 0;
        
        let hue;
        if (max === r) {
            hue = ((g - b) / delta) % 6;
        } else if (max === g) {
            hue = (b - r) / delta + 2;
        } else {
            hue = (r - g) / delta + 4;
        }
        
        hue = Math.round(hue * 60);
        if (hue < 0) hue += 360;
        
        return hue;
    }
    
    function getSaturationFromColor(hex) {
        const rgb = hexToRgb(hex);
        if (!rgb) return 100;
        
        const r = rgb.r / 255;
        const g = rgb.g / 255;
        const b = rgb.b / 255;
        
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        const delta = max - min;
        
        if (max === 0) return 0;
        
        const saturation = (delta / max) * 100;
        return Math.round(saturation);
    }
    
    function getBrightnessFromColor(hex) {
        const rgb = hexToRgb(hex);
        if (!rgb) return 100;
        
        const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
        return Math.round((brightness / 255) * 100);
    }
    
    function hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }
    
    // Atualizar resumo
    function updateSummary() {
        if (summaryBody) summaryBody.textContent = currentConfig.body.name;
        if (summaryLed) summaryLed.textContent = currentConfig.led.name;
        if (summaryText) summaryText.textContent = currentConfig.text.name;
    }
    
    // Event listeners para botões de cor
    const colorButtons = document.querySelectorAll('.color-option');
    colorButtons.forEach(button => {
        button.addEventListener('click', function() {
            const type = this.dataset.type;
            const color = this.dataset.color;
            
            // Remover active dos irmãos
            const siblings = this.parentElement.querySelectorAll('.color-option');
            siblings.forEach(btn => btn.classList.remove('active'));
            
            // Adicionar active no clicado
            this.classList.add('active');
            
            // Aplicar cor
            switch(type) {
                case 'body':
                    applyBodyColor(color);
                    break;
                case 'led':
                    applyLedColor(color);
                    break;
                case 'text':
                    applyTextColor(color);
                    break;
            }
            
            // Animação de feedback
            this.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
    
    // Resetar configuração
    if (resetBtn) {
        resetBtn.addEventListener('click', function() {
            // Resetar para padrão
            document.querySelector('[data-type="body"][data-color="#0a0a0f"]').click();
            document.querySelector('[data-type="led"][data-color="#3b82f6"]').click();
            document.querySelector('[data-type="text"][data-color="#ffffff"]').click();
            
            // Feedback visual
            this.innerHTML = '<i class="fas fa-check"></i> Resetado!';
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-rotate-left"></i> Resetar';
            }, 2000);
        });
    }
    
    // Salvar configuração
    if (saveBtn) {
        saveBtn.addEventListener('click', function() {
            // Salvar no localStorage
            localStorage.setItem('totemConfig', JSON.stringify(currentConfig));
            
            // Feedback visual
            const originalHTML = this.innerHTML;
            this.innerHTML = '<i class="fas fa-check"></i> Configuração Salva!';
            this.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
            
            setTimeout(() => {
                this.innerHTML = originalHTML;
                this.style.background = '';
            }, 2000);
        });
    }
    
    // Solicitar orçamento
    if (quoteBtn) {
        quoteBtn.addEventListener('click', function() {
            const message = `Olá! Gostaria de solicitar um orçamento para um Totem SP Security com a seguinte configuração:\n\n` +
                `🎨 Corpo: ${currentConfig.body.name}\n` +
                `💡 LED: ${currentConfig.led.name}\n` +
                `✍️ Texto: ${currentConfig.text.name}\n\n` +
                `Aguardo retorno!`;
            
            const whatsappURL = `https://wa.me/5511969218791?text=${encodeURIComponent(message)}`;
            window.open(whatsappURL, '_blank');
        });
    }
    
    // Carregar configuração salva (se existir)
    const savedConfig = localStorage.getItem('totemConfig');
    if (savedConfig) {
        try {
            const config = JSON.parse(savedConfig);
            
            // Aplicar configuração salva
            if (config.body) {
                const bodyBtn = document.querySelector(`[data-type="body"][data-color="${config.body.color}"]`);
                if (bodyBtn) bodyBtn.click();
            }
            if (config.led) {
                const ledBtn = document.querySelector(`[data-type="led"][data-color="${config.led.color}"]`);
                if (ledBtn) ledBtn.click();
            }
            if (config.text) {
                const textBtn = document.querySelector(`[data-type="text"][data-color="${config.text.color}"]`);
                if (textBtn) textBtn.click();
            }
        } catch (e) {
            console.error('Erro ao carregar configuração salva:', e);
        }
    }
    
    // Garantir que todas as camadas estejam configuradas corretamente
    console.log('=== Sistema de Camadas (Layer Composition) ===');
    console.log('Layer Base (z-0):', layerBase ? 'OK' : 'ERRO');
    console.log('Layer Color Body (z-10):', layerColorBody ? 'OK' : 'ERRO');
    console.log('Layer Details (z-20):', layerDetails ? 'OK' : 'ERRO');
    console.log('Layer Text (z-30):', layerText ? 'OK' : 'ERRO');
    console.log('Layer LED Glow (z-40):', layerLedGlow ? 'OK' : 'ERRO');
    
    // Garantir visibilidade das camadas principais
    if (layerBase) {
        layerBase.style.opacity = '1';
    }
    if (layerDetails) {
        layerDetails.style.opacity = '1';
    }
    
    // Inicializar com cores padrão
    applyBodyColor('#0a0a0f');
    applyLedColor('#3b82f6');
    applyTextColor('#ffffff');
    
    console.log('Customizer Premium carregado com sucesso!');
    console.log('Sistema de camadas inicializado!');
});
