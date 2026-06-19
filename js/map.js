/**
 * Painel editorial de aplicacoes por ambiente.
 */
(function () {
    'use strict';

    var applications = {
        condominio: {
            index: '01',
            title: 'Condom\u00ednio',
            description: 'Controle de entradas, circula\u00e7\u00e3o e \u00e1reas comuns com monitoramento integrado.',
            risks: 'Acessos sem controle e pontos cegos.',
            solution: 'CFTV + controle de acesso + monitoramento.',
            outcome: 'Mais visibilidade e controle das \u00e1reas cr\u00edticas.',
            image: 'assets/projeto-totem-condominio.jpeg'
        },
        empresa: {
            index: '02',
            title: 'Empresa',
            description: 'Prote\u00e7\u00e3o de recep\u00e7\u00e3o, estoque, \u00e1reas internas e movimenta\u00e7\u00e3o operacional.',
            risks: 'Circula\u00e7\u00e3o sem registro e \u00e1reas sens\u00edveis.',
            solution: 'Controle de acesso + c\u00e2meras + gest\u00e3o de alertas.',
            outcome: 'Mais controle sobre entradas e ocorr\u00eancias.',
            image: 'assets/projeto-totem-empresa.jpeg'
        },
        comercio: {
            index: '03',
            title: 'Com\u00e9rcio',
            description: 'Prote\u00e7\u00e3o de entrada, circula\u00e7\u00e3o e \u00e1rea externa da opera\u00e7\u00e3o.',
            risks: 'Fluxo intenso e pontos cegos na rotina.',
            solution: 'CFTV + controle de acesso + monitoramento.',
            outcome: 'Mais visibilidade e controle da opera\u00e7\u00e3o.',
            image: 'assets/projeto-totem-comercio.jpeg'
        },
        prefeitura: {
            index: '04',
            title: 'Prefeitura',
            description: 'Monitoramento de pr\u00e9dios, \u00e1reas p\u00fablicas e pontos estrat\u00e9gicos.',
            risks: 'Grande circula\u00e7\u00e3o e \u00e1reas abertas.',
            solution: 'Totens + videomonitoramento + apoio operacional.',
            outcome: 'Mais presen\u00e7a, visibilidade e apoio \u00e0 decis\u00e3o.',
            image: 'assets/projeto-sao-roque.png'
        },
        estacionamento: {
            index: '05',
            title: 'Estacionamento',
            description: 'Acompanhamento de ve\u00edculos, acessos e movimenta\u00e7\u00f5es externas.',
            risks: 'Baixa visibilidade e circula\u00e7\u00e3o n\u00e3o identificada.',
            solution: 'C\u00e2meras + sensores + monitoramento perimetral.',
            outcome: 'Mais clareza sobre movimenta\u00e7\u00f5es relevantes.',
            image: 'assets/projeto-totem-estacionamento.jpeg'
        },
        'area-externa': {
            index: '06',
            title: '\u00c1rea externa',
            description: 'Prote\u00e7\u00e3o de per\u00edmetros, entradas secund\u00e1rias e regi\u00f5es vulner\u00e1veis.',
            risks: 'Aproxima\u00e7\u00f5es n\u00e3o identificadas e resposta lenta.',
            solution: 'Sensores perimetrais + CFTV + alertas.',
            outcome: 'Identifica\u00e7\u00e3o antecipada e resposta coordenada.',
            image: 'assets/projeto-totem-perimetro.jpeg'
        }
    };

    var options = Array.prototype.slice.call(document.querySelectorAll('.security-application-option'));
    var details = document.getElementById('securityMapDetails');
    var placeholder = document.getElementById('securityMapPlaceholder');
    var index = document.getElementById('securityMapIndex');
    var title = document.getElementById('securityMapTitleText');
    var description = document.getElementById('securityMapDescriptionText');
    var risks = document.getElementById('securityMapRisks');
    var solution = document.getElementById('securityMapSolution');
    var outcome = document.getElementById('securityMapOutcome');

    if (!options.length || !details || !placeholder || !index || !title || !description || !risks || !solution || !outcome) return;

    function createMedia(application) {
        return '<img src="' + application.image + '" alt="Aplica\u00e7\u00e3o de seguran\u00e7a em ' + application.title + '">';
    }

    function setActiveOption(key) {
        options.forEach(function (option) {
            var isSelected = option.dataset.application === key;
            option.classList.toggle('is-active', isSelected);
            option.setAttribute('aria-pressed', String(isSelected));
        });
    }

    function selectApplication(key) {
        var application = applications[key];
        if (!application) return;

        details.classList.remove('is-updating');
        void details.offsetWidth;
        details.classList.add('is-updating');

        setActiveOption(key);

        index.textContent = application.index;
        title.textContent = application.title;
        description.textContent = application.description;
        risks.textContent = application.risks;
        solution.textContent = application.solution;
        outcome.textContent = application.outcome;
        placeholder.innerHTML = createMedia(application);

        window.setTimeout(function () {
            details.classList.remove('is-updating');
        }, 320);
    }

    options.forEach(function (option) {
        var key = option.dataset.application;

        option.addEventListener('click', function () {
            selectApplication(key);
        });
    });

    selectApplication('condominio');
})();
