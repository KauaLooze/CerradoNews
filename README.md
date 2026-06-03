# CerradoNews

**O Jornal do Coração do Brasil** — Portal de notícias regional do Centro-Oeste (Goiás, Mato Grosso, Mato Grosso do Sul e Distrito Federal).

---

## Integrantes do Grupo

| Nome | RA |
|---|---|
| *(adicionar nome)* | *(adicionar RA)* |
| *(adicionar nome)* | *(adicionar RA)* |
| *(adicionar nome)* | *(adicionar RA)* |
| *(adicionar nome)* | *(adicionar RA)* |
| *(adicionar nome)* | *(adicionar RA)* |

---

## Representação Regional

O CerradoNews representa a **região Centro-Oeste do Brasil**, abrangendo os estados de **Mato Grosso**, **Mato Grosso do Sul**, **Goiás** e o **Distrito Federal**.

A identidade visual do site foi extraída diretamente do bioma Cerrado: o verde resistente da vegetação nativa, o dourado do fruto do baru, a terra-vermelha do latossolo e o branco-areia das formações rochosas. O portal cobre temas centrais da região: agronegócio, Pantanal, povos indígenas, cultura popular (viola de cocho, cavalhada de Pirenópolis, Festival do Peixe de Corumbá) e a realidade urbana de Brasília, Cuiabá, Campo Grande e Goiânia.

---

## Paleta de Cores

| Token | Hex | Uso |
|---|---|---|
| `--verde-cerrado` | `#35513B` | Cor principal da marca — vegetação nativa |
| `--dourado-baru`  | `#BE8C32` | Acento premium — fruto do baru |
| `--terra-vermelha`| `#A4432B` | Editorias, kickers, energia |
| `--areia`         | `#F6F1E7` | Fundo de página — nunca branco puro |
| `--carvao`        | `#262320` | Texto principal — nunca `#000` |
| `--destaque`      | `#2E6E86` | Links e foco — céu do cerrado |
| `--erro`          | `#B23322` | Plantão / breaking news |

**Justificativa:** A paleta foi extraída do bioma Cerrado. O verde escuro representa a vegetação resistente à seca; o dourado remete ao baru, fruto nativo símbolo do bioma; a terra-vermelha vem do latossolo vermelho característico do solo do Centro-Oeste; o areia substitui o branco puro para dar leveza quente de papel impresso premium.

---

## Wireframe

> Adicionar link do Figma ou Canva aqui

---

## Tecnologias

- HTML5 semântico
- CSS3 (variáveis, grid, flexbox, animações)
- JavaScript puro (ES6+, módulos)
- [Lucide Icons](https://lucide.dev) via CDN
- [Google Fonts](https://fonts.google.com): Newsreader · Spectral · Archivo
- [HG Brasil API](https://hgbrasil.com) — Previsão do tempo e cotação de moedas

---

## Estrutura de Arquivos

```
cerradonews/
├── index.html              # Página principal
├── README.md               # Este arquivo
├── css/
│   ├── tokens.css          # Variáveis do Design System (cores, tipografia, espaçamento)
│   ├── base.css            # Reset, body, utilitários tipográficos, placeholders
│   ├── layout.css          # Container, masthead, navbar, footer, section heading
│   ├── components.css      # Cards, tirinhas, widgets, sidebar, newsletter
│   ├── sections.css        # Estilos de cada seção da homepage
│   └── responsive.css      # Breakpoints tablet (960px) e mobile (600px)
└── js/
    ├── data.js             # Dados estáticos: cidades, fallback de clima e câmbio
    ├── weather.js          # Módulo de previsão do tempo (API HG Brasil)
    ├── currency.js         # Módulo de cotação de moedas (API HG Brasil)
    ├── ui.js               # Interações: masthead, nav ativo, abas, newsletter
    └── main.js             # Ponto de entrada — inicializa todos os módulos
```

---

## Como rodar localmente

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/cerradonews.git
   ```

2. Abra o arquivo `index.html` no navegador — ou use uma extensão como **Live Server** no VS Code para recarregamento automático.

3. Não são necessárias dependências extras; todas as bibliotecas são carregadas via CDN.

---

## APIs utilizadas

| API | Endpoint | Dado |
|---|---|---|
| HG Brasil Weather | `api.hgbrasil.com/weather` | Previsão do tempo por cidade |
| HG Brasil Finance | `api.hgbrasil.com/finance` | Cotação de moedas (USD, EUR, BTC…) |

> As APIs são chamadas sem chave (modo público com limite de requisições). Em produção, adicione uma chave HG Brasil para remover os limites.

---

## Critérios de Avaliação — checklist

- [x] Estrutura condizente com jornais digitais
- [x] Notícias regionais (Centro-Oeste)
- [x] Tirinhas originais sobre a cultura local
- [x] Consumo de API — Previsão do Tempo (HG Brasil)
- [x] Consumo de API — Cotação de Moedas (HG Brasil)
- [x] Site responsivo (mobile e tablet)
- [x] Paleta de cores justificada
- [ ] Link para o wireframe (Figma/Canva) — *adicionar*
- [ ] Nome dos integrantes — *adicionar acima*
