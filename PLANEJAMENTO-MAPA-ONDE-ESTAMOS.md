# Planejamento: Mapa "Onde Estamos?"

Objetivo: ter uma seção na LP com mapa interativo mostrando onde a SP Security atua (Grande São Paulo e principais cidades do estado), com marcador da sede, raio de atuação e cidades atendidas — **sem escrever código ainda**, apenas planejamento, e garantindo que funcione na hospedagem **Vercel**.

---

## 1. Objetivo e escopo

- **Seção:** "Onde Estamos?" (título) + subtítulo + mapa.
- **Mapa:** Estado de São Paulo (foco na Grande SP e principais cidades).
- **Elementos no mapa:**
  - Um **marcador central** (sede) em São Paulo, com ícone diferenciado (ex.: prédio).
  - Um **círculo tracejado** (raio de atuação) em volta da sede.
  - **Marcadores** nas cidades onde a empresa atua (ex.: Guarulhos, Campinas, Jundiaí, Sorocaba, São José dos Campos, etc.).
- **Interatividade:** zoom (+/-), arrastar mapa, clicar nos marcadores (opcional: popup com nome da cidade ou texto curto).
- **Visual:** tema escuro, alinhado ao restante da LP.

---

## 2. Funcionamento na Vercel

- O site na Vercel é estático (HTML/CSS/JS) ou com build estático. O mapa será **100% no front-end** (navegador).
- **Não é necessário:**
  - Backend próprio.
  - API da Vercel para o mapa.
  - Variáveis de ambiente obrigatórias só para exibir o mapa (dependendo da escolha de tiles — ver abaixo).
- **É necessário:**
  - Carregar a biblioteca de mapas (Leaflet) no projeto (CDN ou bundling).
  - Carregar **tiles de mapa** (imagens dos blocos do mapa) a partir de um serviço externo (OpenStreetMap, CartoDB, etc.) — isso já é “externo” por natureza.
- Conclusão: **o mapa pode funcionar normalmente na Vercel**, desde que usemos tiles e scripts que sejam acessíveis por HTTPS e não exijam backend.

---

## 3. Dependências externas (o que você precisa saber)

| Item | Externo? | O que é | Observação |
|------|----------|--------|------------|
| **Leaflet.js** | Sim (CDN ou npm) | Biblioteca de mapas no navegador | Gratuito, muito usada. Pode ser via CDN (jsdelivr, unpkg) ou npm e bundler. |
| **Tiles do mapa** | Sim | Imagens que formam o mapa (ruas, cidades) | Servidas por terceiros (OpenStreetMap, CartoDB, etc.). Sem isso o mapa não “desenha” o chão. |
| **OpenStreetMap / CartoDB** | Sim | Provedores de tiles | Uso gratuito com atribuição (ex.: “© OpenStreetMap contributors”). CartoDB tem tema escuro (ex.: Dark Matter), bom para LP escura. |
| **Coordenadas (lat/lng)** | Não | Lista de cidades + sede + raio | Podemos definir no próprio código ou em um JSON no projeto — nada externo obrigatório. |
| **Geocoding** (opcional) | Só se quiser | Converter endereço → coordenadas | Se no futuro quiser “buscar por endereço”, aí sim usaria um serviço (ex.: Nominatim, gratuito; ou Google, com API key). Por ora **não é necessário** para só exibir sede + cidades. |

**Resumo:**  
- Para **só mostrar o mapa com sede, raio e cidades**, precisamos apenas de:  
  - Leaflet (externo, gratuito).  
  - Tiles (externo, gratuito com atribuição).  
- Nada disso exige conta na Vercel além da que você já tem, e não quebra o deploy estático.

---

## 4. Dados necessários (sem código, só definição)

- **Sede:**  
  - Nome (ex.: “São Paulo – Sede”).  
  - Coordenadas (latitude, longitude) — ex.: centro de São Paulo ou endereço real.  
- **Raio de atuação:**  
  - Valor em km (ex.: 80 km, 100 km) para o círculo ao redor da sede.  
- **Lista de cidades onde atua:**  
  - Nome da cidade + coordenadas (lat/lng) para cada marcador.  
  - Ex.: Guarulhos, Campinas, Jundiaí, Sorocaba, São José dos Campos, São Bernardo do Campo, Osasco, etc.  
- **Textos:**  
  - Título da seção: ex. “Onde Estamos?”.  
  - Subtítulo: ex. “Atendemos toda a Grande São Paulo e principais cidades do estado com excelência e rapidez.”  
  - Texto do popup da sede (opcional).  
  - Texto dos popups das cidades (opcional): só o nome já basta; pode ter uma linha extra (ex.: “Atendimento na região”).  

Isso pode ficar em um objeto/array no JS ou em um arquivo JSON dentro do projeto — sem backend.

---

## 5. Stack técnica sugerida (para implementação futura)

- **Mapa:** Leaflet.js (leve, funciona bem em mobile, compatível com Vercel).
- **Tiles:** CartoDB Dark Matter (tema escuro) ou OpenStreetMap — ambos via HTTPS, sem API key para uso básico.
- **Ícones:** Marcador padrão Leaflet para cidades; ícone customizado (ex.: prédio) para a sede — pode ser SVG ou PNG no próprio projeto.
- **Círculo:** `L.circle` do Leaflet, com borda tracejada e preenchimento semi-transparente (cor alinhada à LP).

Tudo isso roda no cliente; zero impacto em limites de serverless da Vercel.

---

## 6. Estrutura da seção na página (conceitual)

1. **Container da seção** (mesmo padrão das outras: fundo escuro, container, padding).
2. **Cabeçalho:**  
   - Badge pequeno (ex.: “Cobertura”).  
   - Título: “Onde Estamos?” (com gradiente em “Estamos?” se quiser).  
   - Subtítulo sobre Grande SP e principais cidades.
3. **Container do mapa:**  
   - Altura fixa ou mínima (ex.: 400–500 px) e largura 100% (dentro do container da LP).  
   - Dentro: uma `div` com `id` para o Leaflet inicializar o mapa.
4. **Atribuição:** Texto pequeno no canto do mapa: “© OpenStreetMap contributors” (e/ou CartoDB, conforme o provedor de tiles).

Não é necessário seção extra no backend nem rotas especiais na Vercel.

---

## 7. Passos de implementação (ordem sugerida, sem código)

1. Definir lista final de cidades + coordenadas + raio + texto da sede.  
2. Incluir Leaflet no projeto (CDN ou npm) e CSS do Leaflet.  
3. Adicionar no HTML a seção “Onde Estamos?” com título, subtítulo e a `div` do mapa.  
4. No JS: inicializar o mapa (centro em SP, zoom inicial), adicionar camada de tiles (CartoDB Dark ou OSM).  
5. Adicionar marcador da sede com ícone diferenciado.  
6. Adicionar círculo de raio (km) ao redor da sede.  
7. Adicionar marcadores para cada cidade; opcional: popup ao clicar.  
8. Ajustar estilo (cores, bordas) para combinar com a LP.  
9. Garantir que o mapa seja responsivo (largura 100%, altura adequada em mobile).  
10. Testar em produção na Vercel (deploy estático).

---

## 8. Checklist “externo” para você

- [ ] **Leaflet:** vamos usar CDN ou pacote npm — não exige conta nem chave.  
- [ ] **Tiles:** uso de serviço gratuito (OSM/CartoDB) com atribuição — sem API key.  
- [ ] **Geocoding:** não será usado na primeira versão; se no futuro quiser “buscar por endereço”, aí sim entra um serviço externo (e te aviso).  
- [ ] **Vercel:** nenhuma configuração extra necessária para esse mapa; deploy continua estático.

Se quiser, o próximo passo pode ser a implementação em código seguindo esse planejamento (seção no HTML, JS com Leaflet, lista de cidades e raio conforme você definir).
