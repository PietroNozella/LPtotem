// ===== CUSTOMIZER PREMIUM - Configurador Estilo Carros de Luxo =====

document.addEventListener('DOMContentLoaded', function() {
    // Elementos do Sistema de Imagens Reais (Técnica Profissional - Audi/Mercedes/BMW)
    const totemRealImage = document.getElementById('totemRealImage');
    const imageLoader = document.getElementById('imageLoader');
    
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
        '#f97316': 'Laranja',
        '#6b21a8': 'Violeta',
        '#8b5cf6': 'Roxo',
        '#06b6d4': 'Ciano',
        '#fbbf24': 'Dourado'
    };
    
    // Configurações Pré-Definidas com Imagens Reais Sem Fundo (Presets)
    const presetConfigurations = {
        'classic-blue': {
            body: '#0a0a0f',
            led: '#3b82f6',
            text: '#ffffff',
            name: 'Azul Clássico',
            image: 'assets/totem-azul-classico.png'
        },
        'modern-white': {
            body: '#ffffff',
            led: '#10b981',
            text: '#0a0a0f',
            name: 'Branco Moderno',
            image: 'assets/totem-branco-verde.png'
        },
        'premium-black': {
            body: '#0a0a0f',
            led: '#10b981',
            text: '#ffffff',
            name: 'Preto Premium',
            image: 'assets/totem-preto-premium.png'
        },
        'minimal-white': {
            body: '#1e3a8a',
            led: '#3b82f6',
            text: '#ffffff',
            name: 'Azul Escuro',
            image: 'assets/totem-azul-escuro.png'
        },
        'sp-red': {
            body: '#0a0a0f',
            led: '#ef4444',
            text: '#ef4444',
            name: 'SP Security Vermelho',
            image: 'assets/totem-vermelho.png'
        },
        'elegant-white': {
            body: '#1e3a8a',
            led: '#06b6d4',
            text: '#ffffff',
            name: 'Azul Claro',
            image: 'assets/totem-azul-claro.png'
        },
        'orange-gold': {
            body: '#0a0a0f',
            led: '#f59e0b',
            text: '#f59e0b',
            name: 'Laranja Dourado',
            image: 'assets/totem-laranja-dourado.png'
        },
        'blue-tech': {
            body: '#0a0a0f',
            led: '#3b82f6',
            text: '#3b82f6',
            name: 'Azul Tech',
            image: 'assets/totem-azul-tech.png'
        },
        'purple-orange': {
            body: '#6b21a8',
            led: '#f97316',
            text: '#f97316',
            name: 'Violeta Laranja',
            image: 'assets/totem-violeta-laranja.png'
        }
    };
    
    // Mapeamento direto para os presets (simplificado - apenas presets)
    const colorToImageMap = {
        'default': 'assets/totem-azul-classico.png'
    };
    
    // Função para trocar imagem do totem (Técnica Real - Audi/Mercedes/BMW)
    function changeTotemImage(imagePath) {
        if (!totemRealImage || !imageLoader) return;
        
        console.log(`Trocando imagem para: ${imagePath}`);
        
        // Adicionar classe de transição
        totemRealImage.classList.add('changing');
        
        // Mostrar loader
        imageLoader.classList.add('active');
        
        // Pré-carregar nova imagem
        const newImage = new Image();
        newImage.src = imagePath;
        
        newImage.onload = function() {
            // Aguardar animação de fade out
            setTimeout(() => {
                // Trocar imagem
                totemRealImage.src = imagePath;
                
                // Remover loader
                imageLoader.classList.remove('active');
                
                // Remover classe de transição (fade in)
                totemRealImage.classList.remove('changing');
            }, 200);
        };
        
        newImage.onerror = function() {
            console.error(`Erro ao carregar imagem: ${imagePath}`);
            imageLoader.classList.remove('active');
            totemRealImage.classList.remove('changing');
        };
    }
    
    // Função para obter imagem baseada na combinação de cores
    function getImageForColors(bodyColor, ledColor, textColor) {
        const key = `${bodyColor}-${ledColor}-${textColor}`;
        const image = colorToImageMap[key] || colorToImageMap['default'];
        console.log(`Combinação: ${key} -> Imagem: ${image}`);
        return image;
    }
    
    // Aplicar cores (agora apenas atualiza config e troca imagem)
    function applyBodyColor(color) {
        currentConfig.body = { color, name: colorNames[color] || color };
        updateTotemImage();
        updateSummary();
    }
    
    function applyLedColor(color) {
        currentConfig.led = { color, name: colorNames[color] || color };
        updateTotemImage();
        updateSummary();
    }
    
    function applyTextColor(color) {
        currentConfig.text = { color, name: colorNames[color] || color };
        updateTotemImage();
        updateSummary();
    }
    
    // Atualizar imagem do totem baseado na configuração atual
    function updateTotemImage() {
        const imagePath = getImageForColors(
            currentConfig.body.color,
            currentConfig.led.color,
            currentConfig.text.color
        );
        changeTotemImage(imagePath);
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
    
    // Função para aplicar preset completo com imagem real
    function applyPreset(presetKey) {
        const preset = presetConfigurations[presetKey];
        if (!preset) return;
        
        console.log(`Aplicando preset: ${preset.name}`);
        
        // Atualizar configuração atual
        currentConfig.body = { color: preset.body, name: colorNames[preset.body] || preset.body };
        currentConfig.led = { color: preset.led, name: colorNames[preset.led] || preset.led };
        currentConfig.text = { color: preset.text, name: colorNames[preset.text] || preset.text };
        currentConfig.preset = preset.name;
        
        // Trocar para a imagem do preset
        changeTotemImage(preset.image);
        
        // Atualizar resumo
        updateSummary();
    }
    
    // Event listeners para presets (apenas presets, sem customização individual)
    const presetCards = document.querySelectorAll('.preset-card');
    presetCards.forEach(card => {
        card.addEventListener('click', function() {
            const presetKey = this.dataset.preset;
            
            // Remover active de todos os presets
            presetCards.forEach(c => c.classList.remove('active'));
            
            // Adicionar active no clicado
            this.classList.add('active');
            
            // Aplicar preset
            applyPreset(presetKey);
            
            // Animação de feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
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
            let message = `Olá! Gostaria de solicitar um orçamento para um Totem SP Security com a seguinte configuração:\n\n`;
            
            // Se houver um preset selecionado
            if (currentConfig.preset) {
                message += `⭐ Configuração: ${currentConfig.preset}\n\n`;
            }
            
            message += `🎨 Corpo: ${currentConfig.body.name}\n` +
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
    
    // Inicialização do Sistema de Imagens Reais
    console.log('=== Customizer Profissional (Técnica Real - Audi/Mercedes/BMW) ===');
    console.log('Imagem Real:', totemRealImage ? 'OK' : 'ERRO');
    console.log('Loader:', imageLoader ? 'OK' : 'ERRO');
    
    // Garantir que a imagem esteja visível
    if (totemRealImage) {
        totemRealImage.style.opacity = '1';
    }
    
    // Aplicar configuração padrão (Azul Clássico)
    setTimeout(() => {
        currentConfig.body = { color: '#0a0a0f', name: 'Preto Fosco' };
        currentConfig.led = { color: '#3b82f6', name: 'Azul' };
        currentConfig.text = { color: '#ffffff', name: 'Branco' };
        updateSummary();
        
        // Marcar preset padrão como ativo
        const defaultPreset = document.querySelector('[data-preset="classic-blue"]');
        if (defaultPreset) {
            defaultPreset.classList.add('active');
        }
    }, 100);
    
    console.log('Sistema de imagens reais inicializado com sucesso!');
});
