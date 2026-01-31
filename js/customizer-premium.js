// ===== CUSTOMIZER PREMIUM - Configurador Estilo Carros de Luxo =====

document.addEventListener('DOMContentLoaded', function() {
    // Elementos
    const bodyOverlay = document.getElementById('bodyOverlay');
    const ledOverlay = document.getElementById('ledOverlay');
    const textOverlay = document.getElementById('textOverlay');
    const totemBase = document.querySelector('.totem-base');
    
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
    
    // Aplicar cores com filtros CSS
    function applyBodyColor(color) {
        if (!bodyOverlay || !totemBase) return;
        
        // Aplicar filtro de cor na imagem base
        const hue = getHueFromColor(color);
        const saturation = getSaturationFromColor(color);
        const brightness = getBrightnessFromColor(color);
        
        totemBase.style.filter = `
            brightness(${brightness}%)
            saturate(${saturation}%)
            hue-rotate(${hue}deg)
            drop-shadow(0 30px 60px rgba(0, 0, 0, 0.5))
        `;
        
        bodyOverlay.style.background = color;
        
        currentConfig.body = { color, name: colorNames[color] || color };
        updateSummary();
    }
    
    function applyLedColor(color) {
        if (!ledOverlay) return;
        
        ledOverlay.style.background = `radial-gradient(ellipse at center, ${color} 0%, transparent 70%)`;
        ledOverlay.style.opacity = '0.8';
        
        currentConfig.led = { color, name: colorNames[color] || color };
        updateSummary();
    }
    
    function applyTextColor(color) {
        if (!textOverlay) return;
        
        textOverlay.style.background = color;
        textOverlay.style.opacity = '0.6';
        
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
    
    // Inicializar com cores padrão
    applyBodyColor('#0a0a0f');
    applyLedColor('#3b82f6');
    applyTextColor('#ffffff');
    
    console.log('Customizer Premium carregado com sucesso!');
});
