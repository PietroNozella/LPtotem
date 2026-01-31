/**
 * Mapa "Onde Estamos?" - Leaflet + CartoDB Dark Matter
 * Sede, raio de atuação e cidades atendidas. Compatível com Vercel (100% client-side, HTTPS).
 */
(function () {
    'use strict';

    var MAP_CONTAINER_ID = 'mapOndeEstamos';
    var SEDE = { lat: -23.5505, lng: -46.6333, nome: 'São Paulo – Sede', popup: 'SP Security – Sede' };
    var RAIO_KM = 100;
    var ZOOM_INICIAL = 8;
    var CENTRO = [SEDE.lat, SEDE.lng];

    // CartoDB Dark Matter - HTTPS (obrigatório para Vercel)
    var TILES_URL = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
    var TILES_OPTIONS = {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19,
        maxNativeZoom: 19
    };

    var CIDADES = [
        { nome: 'Guarulhos', lat: -23.4628, lng: -46.5322 },
        { nome: 'Campinas', lat: -22.9099, lng: -47.0626 },
        { nome: 'Jundiaí', lat: -23.1864, lng: -46.8842 },
        { nome: 'Sorocaba', lat: -23.5015, lng: -47.4526 },
        { nome: 'São José dos Campos', lat: -23.1896, lng: -45.8841 },
        { nome: 'São Bernardo do Campo', lat: -23.6815, lng: -46.5654 },
        { nome: 'Osasco', lat: -23.5325, lng: -46.7917 },
        { nome: 'Santo André', lat: -23.6639, lng: -46.5383 },
        { nome: 'Santos', lat: -23.9608, lng: -46.3332 },
        { nome: 'Ribeirão Preto', lat: -21.1699, lng: -47.8099 },
        { nome: 'Suzano', lat: -23.5425, lng: -46.3108 },
        { nome: 'Diadema', lat: -23.6861, lng: -46.6233 },
        { nome: 'Mauá', lat: -23.6677, lng: -46.4613 },
        { nome: 'Carapicuíba', lat: -23.5235, lng: -46.8406 },
        { nome: 'São Roque', lat: -23.5292, lng: -47.1353 }
    ];

    function initMap() {
        var container = document.getElementById(MAP_CONTAINER_ID);
        if (!container || typeof L === 'undefined') return;

        var map = L.map(MAP_CONTAINER_ID, {
            center: CENTRO,
            zoom: ZOOM_INICIAL,
            scrollWheelZoom: true,
            zoomControl: false
        });

        L.tileLayer(TILES_URL, TILES_OPTIONS).addTo(map);

        // Controles de zoom no canto (estilo da imagem)
        L.control.zoom({ position: 'topleft' }).addTo(map);

        // Círculo de raio (tracejado, azul)
        L.circle(CENTRO, {
            radius: RAIO_KM * 1000,
            color: '#60a5fa',
            fillColor: '#3b82f6',
            fillOpacity: 0.08,
            weight: 2,
            dashArray: '10, 10'
        }).addTo(map);

        // Marcador da sede (ícone prédio)
        var sedeIcon = L.divIcon({
            className: 'map-marker-sede',
            html: '<div class="map-marker-sede-inner"><i class="fas fa-building"></i></div>',
            iconSize: [40, 40],
            iconAnchor: [20, 40]
        });
        L.marker([SEDE.lat, SEDE.lng], { icon: sedeIcon })
            .addTo(map)
            .bindPopup('<strong>' + SEDE.nome + '</strong><br>' + (SEDE.popup || ''));

        // Marcadores das cidades
        CIDADES.forEach(function (c) {
            L.marker([c.lat, c.lng])
                .addTo(map)
                .bindPopup('<strong>' + c.nome + '</strong><br>Atendimento na região');
        });

        // Garantir que o mapa redimensione após o container estar visível (ex.: ao rolar até a seção)
        setTimeout(function () {
            map.invalidateSize();
        }, 300);
    }

    function whenReady() {
        var container = document.getElementById(MAP_CONTAINER_ID);
        if (!container) return;
        if (typeof L === 'undefined') return;

        function doInit() {
            initMap();
        }

        if ('IntersectionObserver' in window) {
            var obs = new IntersectionObserver(function (entries) {
                if (entries[0].isIntersecting) {
                    obs.disconnect();
                    doInit();
                }
            }, { rootMargin: '50px', threshold: 0 });
            obs.observe(container);
        } else {
            doInit();
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', whenReady);
    } else {
        whenReady();
    }
})();
