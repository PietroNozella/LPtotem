/**
 * Mapa conceitual de aplicações de segurança.
 * Para adicionar um ponto, inclua os dados abaixo e um botão correspondente no HTML.
 */
(function () {
    'use strict';

    var applications = {
        condominio: {
            index: '01',
            title: 'Condomínio',
            description: 'Camadas de segurança para organizar acessos, ampliar a visibilidade das áreas comuns e apoiar respostas a eventos.',
            solution: 'CFTV + controle de acesso',
            status: 'Projeto realizado',
            image: 'assets/projeto-totem-condominio.jpeg',
            icon: 'building'
        },
        empresa: {
            index: '02',
            title: 'Empresa',
            description: 'Proteção integrada para entradas, áreas restritas e rotinas internas, com gestão centralizada dos eventos de segurança.',
            solution: 'Controle de acesso + integração',
            status: 'Projeto realizado',
            image: 'assets/projeto-totem-empresa.jpeg',
            icon: 'office'
        },
        comercio: {
            index: '03',
            title: 'Comércio',
            description: 'Totem com câmeras instalado em frente ao comércio para ampliar a presença preventiva e o acompanhamento da área externa.',
            solution: 'Totem de monitoramento + CFTV',
            status: 'Projeto realizado',
            image: 'assets/projeto-totem-comercio.jpeg',
            icon: 'store'
        },
        perimetro: {
            index: '04',
            title: 'Perímetro',
            description: 'Detecção antecipada em limites e acessos externos para ampliar o tempo de reação diante de movimentações não autorizadas.',
            solution: 'Sensores + monitoramento',
            status: 'Projeto realizado',
            image: 'assets/projeto-totem-perimetro.jpeg',
            icon: 'perimeter'
        },
        estacionamento: {
            index: '05',
            title: 'Estacionamento',
            description: 'Visibilidade de entradas, saídas e circulação de veículos, combinando registro de imagens e pontos de apoio preventivo.',
            solution: 'CFTV + totem',
            status: 'Projeto realizado',
            image: 'assets/projeto-totem-estacionamento.jpeg',
            icon: 'parking'
        },
        operacao: {
            index: '06',
            title: 'Operação',
            description: 'Integração de sinais, imagens e alertas para concentrar informações e apoiar decisões em ambientes operacionais.',
            solution: 'Monitoramento + integração',
            status: 'Projeto realizado',
            image: 'assets/projeto-totem-operacao.jpeg',
            icon: 'operation'
        }
    };

    var iconPaths = {
        building: '<path d="M54 146V61l46-24 46 24v85M76 146V84h48v62M88 99h9m15 0h9m-33 20h9m15 0h9M39 146h122"/>',
        office: '<path d="M43 146V54h72v92M115 82h42v64M64 75h12m17 0h12M64 98h12m17 0h12M64 121h12m17 0h12m35-18h9m-9 21h9M35 146h130"/>',
        store: '<path d="M43 78h114l-12-32H55L43 78Zm8 0v68h98V78M70 146v-39h34v39m20-43h13m-76-25c0 12 18 12 18 0 0 12 18 12 18 0 0 12 18 12 18 0 0 12 18 12 18 0 0 12 18 12 18 0"/>',
        perimeter: '<path d="M45 151V55m110 96V55M45 76h110M45 111h110M65 55v96m35-96v96m35-96v96M34 151h132"/>',
        parking: '<path d="M47 151V48h57c34 0 52 14 52 40s-18 41-52 41H78m0-50h27c14 0 21 3 21 10s-7 10-21 10H78v52"/>',
        operation: '<path d="M43 139h114M56 139V67h88v72M71 84h58v37H71V84Zm-20-30h98M77 54V39m46 15V39M86 151h28M94 121v18m12-18v18"/>'
    };

    var points = Array.prototype.slice.call(document.querySelectorAll('.security-map-point'));
    var details = document.getElementById('securityMapDetails');
    var placeholder = document.getElementById('securityMapPlaceholder');
    var index = document.getElementById('securityMapIndex');
    var title = document.getElementById('securityMapTitleText');
    var description = document.getElementById('securityMapDescriptionText');
    var solution = document.getElementById('securityMapSolution');
    var status = document.getElementById('securityMapStatus');
    var supportsHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    if (!points.length || !details || !placeholder) return;

    function createMedia(application) {
        if (application.image) {
            return '<img src="' + application.image + '" alt="Aplicação de segurança em ' + application.title + '">';
        }

        var path = iconPaths[application.icon] || iconPaths.operation;

        return [
            '<svg viewBox="0 0 200 200" role="img" aria-label="Placeholder para imagem de ', application.title, '">',
            '<defs>',
            '<linearGradient id="placeholderGradient" x1="0" y1="0" x2="1" y2="1">',
            '<stop offset="0" stop-color="#2563eb" stop-opacity=".34"/>',
            '<stop offset="1" stop-color="#06b6d4" stop-opacity=".06"/>',
            '</linearGradient>',
            '<pattern id="placeholderGrid" width="18" height="18" patternUnits="userSpaceOnUse">',
            '<path d="M18 0H0V18" fill="none" stroke="#93c5fd" stroke-opacity=".08"/>',
            '</pattern>',
            '</defs>',
            '<rect width="200" height="200" fill="#081321"/>',
            '<rect width="200" height="200" fill="url(#placeholderGrid)"/>',
            '<circle cx="100" cy="98" r="70" fill="url(#placeholderGradient)" stroke="#60a5fa" stroke-opacity=".16"/>',
            '<g fill="none" stroke="#9ac8ff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">',
            path,
            '</g>',
            '</svg>'
        ].join('');
    }

    function selectApplication(key) {
        var application = applications[key];
        if (!application) return;

        details.classList.remove('is-updating');
        void details.offsetWidth;
        details.classList.add('is-updating');

        points.forEach(function (point) {
            var isSelected = point.dataset.application === key;
            point.classList.toggle('is-active', isSelected);
            point.setAttribute('aria-pressed', String(isSelected));
        });

        index.textContent = application.index;
        title.textContent = application.title;
        description.textContent = application.description;
        solution.textContent = application.solution;
        status.textContent = application.status;
        placeholder.classList.toggle('has-image', Boolean(application.image));
        placeholder.innerHTML = createMedia(application);

        window.setTimeout(function () {
            details.classList.remove('is-updating');
        }, 360);
    }

    points.forEach(function (point) {
        var key = point.dataset.application;

        point.addEventListener('click', function () {
            selectApplication(key);
        });

        point.addEventListener('keydown', function (event) {
            if (event.key !== 'Enter' && event.key !== ' ') return;

            event.preventDefault();
            selectApplication(key);
        });

        if (supportsHover) {
            point.addEventListener('mouseenter', function () {
                selectApplication(key);
            });
        }
    });

    selectApplication('condominio');
})();
