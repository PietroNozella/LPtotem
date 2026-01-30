/**
 * SP Security - Totem SVG Customizer
 * Controle de cores: Corpo, LED, Fachada
 */

document.addEventListener('DOMContentLoaded', initCustomizer);

function initCustomizer() {
    // Cores padrão
    const defaultColors = {
        body: '#0a0a0f',
        led: '#3b82f6',
        facade: '#1e3a8a'
    };
    
    let colors = { ...defaultColors };
    
    // Elementos DOM
    const inputs = {
        body: document.getElementById('bodyColor'),
        led: document.getElementById('ledColor'),
        facade: document.getElementById('facadeColor')
    };
    
    const values = {
        body: document.getElementById('bodyColorValue'),
        led: document.getElementById('ledColorValue'),
        facade: document.getElementById('facadeColorValue')
    };
    
    const summary = {
        body: document.getElementById('summaryBody'),
        led: document.getElementById('summaryLed'),
        facade: document.getElementById('summaryFacade')
    };
    
    const svg = document.getElementById('totemSvg');
    const glow = document.getElementById('previewGlow');
    
    /**
     * Ajustar brilho de uma cor
     */
    function adjustBrightness(hex, percent) {
        const num = parseInt(hex.replace('#', ''), 16);
        const r = Math.min(255, Math.max(0, (num >> 16) + Math.round(2.55 * percent)));
        const g = Math.min(255, Math.max(0, ((num >> 8) & 0x00FF) + Math.round(2.55 * percent)));
        const b = Math.min(255, Math.max(0, (num & 0x0000FF) + Math.round(2.55 * percent)));
        return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
    }
    
    /**
     * Atualizar cor do CORPO
     */
    function updateBodyColor() {
        if (!svg) return;
        
        const base = colors.body;
        const dark = adjustBrightness(base, -15);
        const darker = adjustBrightness(base, -25);
        const light = adjustBrightness(base, 10);
        
        // Atualizar gradiente do corpo
        const bodyGrad1 = svg.querySelector('.body-grad-1');
        const bodyGrad2 = svg.querySelector('.body-grad-2');
        const bodyGrad3 = svg.querySelector('.body-grad-3');
        if (bodyGrad1) bodyGrad1.style.stopColor = light;
        if (bodyGrad2) bodyGrad2.style.stopColor = base;
        if (bodyGrad3) bodyGrad3.style.stopColor = light;
        
        // Topo
        svg.querySelectorAll('.top-peak').forEach(el => el.setAttribute('fill', base));
        svg.querySelectorAll('.top-bar').forEach(el => el.setAttribute('fill', dark));
        
        // Câmeras
        svg.querySelectorAll('.camera-arm-left, .camera-arm-right').forEach(el => el.setAttribute('fill', darker));
        svg.querySelectorAll('.camera-body-left, .camera-body-right').forEach(el => el.setAttribute('fill', dark));
        svg.querySelectorAll('.camera-back-left, .camera-back-right').forEach(el => el.setAttribute('fill', darker));
        svg.querySelectorAll('.camera-front-left, .camera-front-right').forEach(el => el.setAttribute('fill', base));
        svg.querySelectorAll('.camera-lens-left, .camera-lens-right').forEach(el => el.setAttribute('fill', darker));
        svg.querySelectorAll('.camera-visor-left, .camera-visor-right').forEach(el => el.setAttribute('fill', darker));
        
        // Laterais do corpo
        svg.querySelectorAll('.body-side-left, .body-side-right').forEach(el => el.setAttribute('fill', darker));
        
        // Base
        svg.querySelectorAll('.base-top').forEach(el => el.setAttribute('fill', base));
        svg.querySelectorAll('.base-main').forEach(el => el.setAttribute('fill', dark));
        svg.querySelectorAll('.base-bottom').forEach(el => el.setAttribute('fill', darker));
    }
    
    /**
     * Atualizar cor do LED
     */
    function updateLedColor() {
        if (!svg) return;
        
        const led = colors.led;
        
        // Atualizar gradiente do LED
        svg.querySelectorAll('.led-grad').forEach(stop => {
            stop.style.stopColor = led;
        });
        
        // Glow das câmeras
        svg.querySelectorAll('.camera-glow-left, .camera-glow-right').forEach(el => {
            el.setAttribute('fill', led);
        });
        
        // LED na base
        svg.querySelectorAll('.base-led').forEach(el => el.setAttribute('fill', led));
        
        // Glow no chão
        svg.querySelectorAll('.floor-glow').forEach(el => el.setAttribute('fill', led));
        
        // Texto "SECURITY" grande
        svg.querySelectorAll('.brand-security').forEach(el => el.setAttribute('fill', led));
        
        // Glow do preview
        if (glow) {
            glow.style.background = led;
        }
    }
    
    /**
     * Atualizar cor da FACHADA
     */
    function updateFacadeColor() {
        if (!svg) return;
        
        const facade = colors.facade;
        
        // Atualizar gradiente da fachada
        svg.querySelectorAll('.facade-grad').forEach(stop => {
            stop.style.stopColor = facade;
        });
    }
    
    /**
     * Atualizar todas as cores
     */
    function updateTotem() {
        updateBodyColor();
        updateLedColor();
        updateFacadeColor();
        
        // Atualizar resumo
        if (summary.body) summary.body.style.backgroundColor = colors.body;
        if (summary.led) summary.led.style.backgroundColor = colors.led;
        if (summary.facade) summary.facade.style.backgroundColor = colors.facade;
    }
    
    /**
     * Atualizar valor exibido
     */
    function updateValue(key) {
        if (values[key]) {
            values[key].textContent = colors[key].toUpperCase();
        }
    }
    
    /**
     * Atualizar preset ativo
     */
    function updatePresets(inputId, value) {
        const container = document.querySelector(`.color-presets[data-target="${inputId}"]`);
        if (!container) return;
        
        container.querySelectorAll('.preset').forEach(preset => {
            const isActive = preset.dataset.color.toLowerCase() === value.toLowerCase();
            preset.classList.toggle('active', isActive);
        });
    }
    
    /**
     * Handler de mudança de cor
     */
    function handleColorChange(key) {
        return function(e) {
            let color = e.target.value.trim().toLowerCase();
            if (!color.startsWith('#')) color = '#' + color;
            if (!/^#[0-9a-f]{6}$/.test(color)) return;
            
            colors[key] = color;
            updateValue(key);
            updateTotem();
            updatePresets(inputs[key].id, color);
        };
    }
    
    /**
     * Resetar cores
     */
    function resetColors() {
        colors = { ...defaultColors };
        
        Object.keys(inputs).forEach(key => {
            if (inputs[key]) {
                inputs[key].value = defaultColors[key];
                updateValue(key);
                updatePresets(inputs[key].id, defaultColors[key]);
            }
        });
        
        updateTotem();
    }
    
    /**
     * Inicializar presets
     */
    function initPresets() {
        document.querySelectorAll('.color-presets').forEach(container => {
            const targetId = container.dataset.target;
            const input = document.getElementById(targetId);
            
            container.querySelectorAll('.preset').forEach(preset => {
                preset.addEventListener('click', () => {
                    if (input) {
                        input.value = preset.dataset.color;
                        input.dispatchEvent(new Event('input'));
                    }
                });
            });
        });
    }
    
    /**
     * Mapa de cores para nomes amigáveis
     */
    const colorNames = {
        // Cores do corpo
        '#0a0a0f': 'Preto',
        '#1a1a2e': 'Azul Noite',
        '#1c1c27': 'Cinza Escuro',
        '#0c1929': 'Azul Petróleo',
        '#0d1f0d': 'Verde Escuro',
        '#1f0d0d': 'Vinho',
        '#2d2d2d': 'Grafite',
        '#1a1a1a': 'Carvão',
        '#0f172a': 'Slate',
        '#18181b': 'Zinc',
        '#1e1b4b': 'Índigo',
        '#172554': 'Azul Marinho',
        
        // Cores do LED
        '#3b82f6': 'Azul',
        '#22c55e': 'Verde',
        '#ef4444': 'Vermelho',
        '#eab308': 'Amarelo',
        '#a855f7': 'Roxo',
        '#06b6d4': 'Ciano',
        '#f97316': 'Laranja',
        '#ec4899': 'Rosa',
        '#14b8a6': 'Teal',
        '#84cc16': 'Lima',
        '#f43f5e': 'Rosa Vermelho',
        '#ffffff': 'Branco',
        
        // Cores da fachada
        '#1e3a8a': 'Azul',
        '#166534': 'Verde',
        '#991b1b': 'Vermelho',
        '#6b21a8': 'Roxo',
        '#c2410c': 'Laranja',
        '#155e75': 'Teal',
        '#0f766e': 'Verde Água',
        '#7c2d12': 'Marrom',
        '#4c1d95': 'Violeta',
        '#0c4a6e': 'Azul Escuro',
        '#831843': 'Pink',
        '#365314': 'Verde Oliva'
    };
    
    /**
     * Obter nome da cor ou retornar "Personalizada"
     */
    function getColorName(hex) {
        const normalized = hex.toLowerCase();
        return colorNames[normalized] || 'Personalizada';
    }
    
    /**
     * Gerar link com as cores configuradas
     */
    function generatePreviewLink() {
        const baseUrl = window.location.origin + window.location.pathname;
        const params = new URLSearchParams({
            corpo: colors.body.replace('#', ''),
            led: colors.led.replace('#', ''),
            fachada: colors.facade.replace('#', '')
        });
        return `${baseUrl}?${params.toString()}#customizar`;
    }
    
    /**
     * Carregar cores da URL (se existirem)
     */
    function loadColorsFromURL() {
        const params = new URLSearchParams(window.location.search);
        
        const corpo = params.get('corpo');
        const led = params.get('led');
        const fachada = params.get('fachada');
        
        if (corpo && /^[0-9a-f]{6}$/i.test(corpo)) {
            colors.body = '#' + corpo.toLowerCase();
            if (inputs.body) inputs.body.value = colors.body;
            updateValue('body');
            updatePresets('bodyColor', colors.body);
        }
        
        if (led && /^[0-9a-f]{6}$/i.test(led)) {
            colors.led = '#' + led.toLowerCase();
            if (inputs.led) inputs.led.value = colors.led;
            updateValue('led');
            updatePresets('ledColor', colors.led);
        }
        
        if (fachada && /^[0-9a-f]{6}$/i.test(fachada)) {
            colors.facade = '#' + fachada.toLowerCase();
            if (inputs.facade) inputs.facade.value = colors.facade;
            updateValue('facade');
            updatePresets('facadeColor', colors.facade);
        }
        
        updateTotem();
    }
    
    /**
     * Enviar WhatsApp
     */
    function startProject() {
        const bodyName = getColorName(colors.body);
        const ledName = getColorName(colors.led);
        const facadeName = getColorName(colors.facade);
        const previewLink = generatePreviewLink();
        
        const msg = encodeURIComponent(
            `Olá! Gostaria de um orçamento para *Totem SP Security* personalizado.\n\n` +
            `🎨 *Cores Escolhidas:*\n\n` +
            `🔲 *Corpo do Totem:*\n` +
            `   ${bodyName} (${colors.body.toUpperCase()})\n\n` +
            `💡 *LEDs e Iluminação:*\n` +
            `   ${ledName} (${colors.led.toUpperCase()})\n\n` +
            `🏢 *Fachada da Empresa:*\n` +
            `   ${facadeName} (${colors.facade.toUpperCase()})\n\n` +
            `🔗 *Visualizar meu Totem:*\n` +
            `${previewLink}\n\n` +
            `Aguardo retorno para mais detalhes!`
        );
        window.open(`https://wa.me/5511969218791?text=${msg}`, '_blank');
    }
    
    // ===== INIT =====
    
    // Event listeners
    Object.keys(inputs).forEach(key => {
        if (inputs[key]) {
            inputs[key].addEventListener('input', handleColorChange(key));
        }
    });
    
    initPresets();
    
    // Botões
    const resetBtn = document.getElementById('resetColors');
    if (resetBtn) resetBtn.addEventListener('click', resetColors);
    
    const startBtn = document.getElementById('startProject');
    if (startBtn) startBtn.addEventListener('click', startProject);
    
    // Carregar cores da URL (se houver)
    loadColorsFromURL();
    
    // Aplicar cores iniciais
    updateTotem();
    Object.keys(inputs).forEach(key => updateValue(key));
}
