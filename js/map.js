// ===== Mapa SP Security - Google Maps Embed =====
// Solução simplificada com iframe do Google Maps

document.addEventListener('DOMContentLoaded', function() {
    var mapElement = document.getElementById('spMap');
    if (!mapElement) return;
    
    // Embed do Google Maps centrado em São Paulo com zoom adequado
    var iframe = document.createElement('iframe');
    iframe.src = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d467689.0388184012!2d-46.87529555!3d-23.6820635!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce448183a461d1%3A0x9ba94b08ff335bae!2sS%C3%A3o%20Paulo%2C%20SP!5e0!3m2!1spt-BR!2sbr!4v1706700000000!5m2!1spt-BR!2sbr';
    iframe.width = '100%';
    iframe.height = '100%';
    iframe.style.border = '0';
    iframe.style.filter = 'grayscale(100%) invert(92%) contrast(90%)';
    iframe.allowFullscreen = true;
    iframe.loading = 'lazy';
    iframe.referrerPolicy = 'no-referrer-when-downgrade';
    
    mapElement.innerHTML = '';
    mapElement.appendChild(iframe);
});
