// ===== CUSTOMIZER PREMIUM - Configurador Estilo Carros de Luxo =====

document.addEventListener('DOMContentLoaded', function() {
    // Elementos das Camadas (Técnica Profissional - Audi/Mercedes Style)
    const totemBaseImg = document.getElementById('totemBaseImg');
    const totemBodyColor = document.getElementById('totemBodyColor');
    const totemLedColor = document.getElementById('totemLedColor');
    const totemTextColor = document.getElementById('totemTextColor');
    
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
    
    // Técnica Profissional: Overlay com Mix Blend Modes (como Audi/Mercedes)
    function applyBodyColor(color) {
        if (!totemBodyColor) return;
        
        const brightness = getBrightnessFromColor(color);
        
        // Aplicar cor como overlay
        totemBodyColor.style.backgroundColor = color;
        
        // Ajustar blend mode e opacidade baseado na luminosidade
        if (brightness > 200) {
            // Cores muito claras (branco)
            totemBodyColor.style.mixBlendMode = 'lighten';
            totemBodyColor.style.opacity = '0.6';
        } else if (brightness > 150) {
            // Cores claras
            totemBodyColor.style.mixBlendMode = 'overlay';
            totemBodyColor.style.opacity = '0.5';
        } else if (brightness > 80) {
            // Cores médias
            totemBodyColor.style.mixBlendMode = 'multiply';
            totemBodyColor.style.opacity = '0.7';
        } else {
            // Cores escuras
            totemBodyColor.style.mixBlendMode = 'multiply';
            totemBodyColor.style.opacity = '0.8';
        }
        
        currentConfig.body = { color, name: colorNames[color] || color };
        updateSummary();
    }
    
    function applyLedColor(color) {
        if (!totemLedColor) return;
        
        // Criar gradiente radial para o LED (área do topo)
        totemLedColor.style.background = `
            radial-gradient(
                ellipse 25% 6% at 50% 7%,
                ${color} 0%,
                ${color}dd 20%,
                ${color}88 40%,
                transparent 70%
            )
        `;
        totemLedColor.style.opacity = '0.9';
        totemLedColor.style.mixBlendMode = 'screen';
        
        currentConfig.led = { color, name: colorNames[color] || color };
        updateSummary();
    }
    
    function applyTextColor(color) {
        if (!totemTextColor) return;
        
        // Criar gradiente linear para área do texto/marca
        totemTextColor.style.background = `
            linear-gradient(
                to bottom,
                transparent 0%,
                transparent 38%,
                ${color} 40%,
                ${color} 45%,
                transparent 47%,
                transparent 100%
            )
        `;
        totemTextColor.style.opacity = '0.8';
        totemTextColor.style.mixBlendMode = 'overlay';
        
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
    
    // Inicialização do Sistema de Camadas Profissional
    console.log('=== Customizer Profissional (Técnica Audi/Mercedes) ===');
    console.log('Imagem Base:', totemBaseImg ? 'OK' : 'ERRO');
    console.log('Overlay Corpo:', totemBodyColor ? 'OK' : 'ERRO');
    console.log('Overlay LED:', totemLedColor ? 'OK' : 'ERRO');
    console.log('Overlay Texto:', totemTextColor ? 'OK' : 'ERRO');
    
    // Garantir que a imagem base esteja visível
    if (totemBaseImg) {
        totemBaseImg.style.opacity = '1';
    }
    
    // Inicializar overlays como transparentes
    if (totemBodyColor) {
        totemBodyColor.style.opacity = '0';
        totemBodyColor.style.backgroundColor = 'transparent';
    }
    if (totemLedColor) {
        totemLedColor.style.opacity = '0';
        totemLedColor.style.background = 'transparent';
    }
    if (totemTextColor) {
        totemTextColor.style.opacity = '0';
        totemTextColor.style.background = 'transparent';
    }
    
    // Aplicar cores padrão após pequeno delay
    setTimeout(() => {
        applyBodyColor('#0a0a0f');
        applyLedColor('#3b82f6');
        applyTextColor('#ffffff');
    }, 150);
    
    console.log('Sistema de camadas inicializado com sucesso!');
});
